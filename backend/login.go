
package main

import (
    "encoding/json"
    "io"
    "log"
    "net/http"
)

type LoginRequest struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

// LoginHandler menangani autentikasi admin.
func LoginHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    // Hanya menerima metode POST
    if r.Method != http.MethodPost {
        w.Header().Set("Allow", http.MethodPost)
        w.WriteHeader(http.StatusMethodNotAllowed)
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Method tidak diizinkan",
        })
        return
    }

    // Memeriksa format dan ukuran request JSON
    r.Body = http.MaxBytesReader(w, r.Body, 4096)

    var request LoginRequest

    decoder := json.NewDecoder(r.Body)
    decoder.DisallowUnknownFields()

    if err := decoder.Decode(&request); err != nil {
        http.Error(
            w,
            `{"message":"Format JSON tidak valid"}`,
            http.StatusBadRequest,
        )
        return
    }

    // Menolak data JSON tambahan
    if err := decoder.Decode(&struct{}{}); err != io.EOF {
        http.Error(
            w,
            `{"message":"Request harus berisi satu objek JSON"}`,
            http.StatusBadRequest,
        )
        return
    }

    // Memastikan username dan password diisi
    if request.Username == "" || request.Password == "" {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Username dan password wajib diisi",
        })
        return
    }

    // Memverifikasi kredensial melalui MySQL dan bcrypt
    valid, err := VerifyAdmin(
        request.Username,
        request.Password,
    )

    if err != nil {
        log.Printf("Gagal memverifikasi login: %v", err)

        http.Error(
            w,
            `{"message":"Terjadi kesalahan server"}`,
            http.StatusInternalServerError,
        )
        return
    }

    // Menolak username atau password yang salah
    if !valid {
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Username atau password salah",
        })
        return
    }

    // Membuat sesi ketika login berhasil
    if err := CreateSession(w, request.Username); err != nil {
        log.Printf("Gagal membuat sesi admin: %v", err)

        http.Error(
            w,
            `{"message":"Gagal membuat sesi login"}`,
            http.StatusInternalServerError,
        )
        return
    }

    // Mengirim respons login berhasil
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Login admin berhasil",
    })
}