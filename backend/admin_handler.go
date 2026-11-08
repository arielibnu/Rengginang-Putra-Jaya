
package main

import (
    "encoding/json"
    "net/http"
)

// Memeriksa apakah admin sudah login.
func AdminMeHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    if r.Method != http.MethodGet {
        w.Header().Set("Allow", http.MethodGet)
        http.Error(w, `{"message":"Method tidak diizinkan"}`,
            http.StatusMethodNotAllowed)
        return
    }

    username, valid := CheckSession(r)

    if !valid {
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Belum login atau sesi sudah berakhir",
        })
        return
    }

    json.NewEncoder(w).Encode(map[string]string{
        "message":  "Sesi admin valid",
        "username": username,
    })
}

// Mengakhiri sesi login admin.
func AdminLogoutHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    if r.Method != http.MethodPost {
        w.Header().Set("Allow", http.MethodPost)
        http.Error(w, `{"message":"Method tidak diizinkan"}`,
            http.StatusMethodNotAllowed)
        return
    }

    DeleteSession(w, r)

    json.NewEncoder(w).Encode(map[string]string{
        "message": "Logout admin berhasil",
    })
}
