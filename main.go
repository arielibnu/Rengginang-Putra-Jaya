
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
)

// Struktur data produk
type Produk struct {
	IDProduk   int    `json:"id_produk"`
	NamaProduk string `json:"nama_produk"`
	Deskripsi  string `json:"deskripsi"`
	Status     string `json:"status"`
}

// Penyimpanan sementara
var (
	produkList = []Produk{}
	nextID     = 1
	mu         sync.Mutex
)

// Mengirim respons JSON
func responseJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

// Endpoint daftar dan tambah produk
func produkHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:

		mu.Lock()
		defer mu.Unlock()

		responseJSON(w, http.StatusOK, map[string]interface{}{
			"status": true,
			"data":   produkList,
		})

	case http.MethodPost:

		var produk Produk

		err := json.NewDecoder(r.Body).Decode(&produk)
		if err != nil {
			responseJSON(w, http.StatusBadRequest, map[string]interface{}{
				"status": false,
				"message": "Format JSON tidak valid",
			})
			return
		}

		if strings.TrimSpace(produk.NamaProduk) == "" {
			responseJSON(w, http.StatusBadRequest, map[string]interface{}{
				"status": false,
				"message": "Nama produk wajib diisi",
			})
			return
		}

		if produk.Status == "" {
			produk.Status = "aktif"
		}

		if produk.Status != "aktif" && produk.Status != "tidak_aktif" {
			responseJSON(w, http.StatusBadRequest, map[string]interface{}{
				"status": false,
				"message": "Status produk tidak valid",
			})
			return
		}

		mu.Lock()
		produk.IDProduk = nextID
		nextID++
		produkList = append(produkList, produk)
		mu.Unlock()

		responseJSON(w, http.StatusCreated, map[string]interface{}{
			"status": true,
			"message": "Produk berhasil ditambahkan",
			"data": produk,
		})

	default:
		responseJSON(w, http.StatusMethodNotAllowed, map[string]interface{}{
			"status": false,
			"message": "Method tidak diizinkan",
		})
	}
}

// Endpoint detail, ubah, dan hapus produk
func produkDetailHandler(w http.ResponseWriter, r *http.Request) {

	idString := strings.TrimPrefix(r.URL.Path, "/api/produk/")
	id, err := strconv.Atoi(idString)

	if err != nil || id <= 0 {
		responseJSON(w, http.StatusBadRequest, map[string]interface{}{
			"status": false,
			"message": "ID produk tidak valid",
		})
		return
	}

	mu.Lock()
	defer mu.Unlock()

	index := -1

	for i, produk := range produkList {
		if produk.IDProduk == id {
			index = i
			break
		}
	}

	if index == -1 {
		responseJSON(w, http.StatusNotFound, map[string]interface{}{
			"status": false,
			"message": "Produk tidak ditemukan",
		})
		return
	}

	switch r.Method {

	case http.MethodGet:

		responseJSON(w, http.StatusOK, map[string]interface{}{
			"status": true,
			"data": produkList[index],
		})

	case http.MethodPut:

		var produkBaru Produk

		err := json.NewDecoder(r.Body).Decode(&produkBaru)
		if err != nil || strings.TrimSpace(produkBaru.NamaProduk) == "" {
			responseJSON(w, http.StatusBadRequest, map[string]interface{}{
				"status": false,
				"message": "Data produk tidak valid",
			})
			return
		}

		if produkBaru.Status == "" {
			produkBaru.Status = "aktif"
		}

		if produkBaru.Status != "aktif" && produkBaru.Status != "tidak_aktif" {
			responseJSON(w, http.StatusBadRequest, map[string]interface{}{
				"status": false,
				"message": "Status produk tidak valid",
			})
			return
		}

		produkBaru.IDProduk = id
		produkList[index] = produkBaru

		responseJSON(w, http.StatusOK, map[string]interface{}{
			"status": true,
			"message": "Produk berhasil diperbarui",
			"data": produkBaru,
		})

	case http.MethodDelete:

		produkList = append(produkList[:index], produkList[index+1:]...)

		responseJSON(w, http.StatusOK, map[string]interface{}{
			"status": true,
			"message": "Produk berhasil dihapus",
		})

	default:

		responseJSON(w, http.StatusMethodNotAllowed, map[string]interface{}{
			"status": false,
			"message": "Method tidak diizinkan",
		})
	}
}

func main() {

	http.HandleFunc("/api/produk", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/api/produk" {
			http.NotFound(w, r)
			return
		}
		produkHandler(w, r)
	})

	http.HandleFunc("/api/produk/", produkDetailHandler)

	log.Println("Backend Rengginang berjalan di http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Server gagal dijalankan:", err)
	}
}
