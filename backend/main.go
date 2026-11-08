
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
)

func main() {
    // Menghubungkan backend ke database MySQL
    if err := ConnectDatabase(); err != nil {
        log.Fatal(err)
    }

    defer DB.Close()

    // Membuat akun admin pertama
    if len(os.Args) > 1 && os.Args[1] == "create-admin" {
        username := os.Getenv("ADMIN_USERNAME")
        password := os.Getenv("ADMIN_PASSWORD")

        if username == "" || password == "" {
            log.Fatal("ADMIN_USERNAME dan ADMIN_PASSWORD wajib diisi")
        }

        // Menyimpan akun admin ke MySQL
        if err := CreateAdmin(username, password); err != nil {
            log.Fatal("Gagal membuat akun admin: ", err)
        }

        log.Println("Akun admin berhasil disimpan ke MySQL!")
        return
    }

    // Endpoint autentikasi admin
    http.HandleFunc("/api/admin/login", LoginHandler)
    http.HandleFunc("/api/admin/me", AdminMeHandler)
    http.HandleFunc("/api/admin/logout", AdminLogoutHandler)

    // Endpoint untuk mengecek kesehatan server
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")

        if r.Method != http.MethodGet {
            w.Header().Set("Allow", http.MethodGet)
            http.Error(
                w,
                `{"message":"Method tidak diizinkan"}`,
                http.StatusMethodNotAllowed,
            )
            return
        }

        json.NewEncoder(w).Encode(map[string]string{
            "status":  "ok",
            "message": "Backend Rengginang Putra Jaya berjalan",
        })
    })

    // Menjalankan server backend
    log.Println("Server berjalan di http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}