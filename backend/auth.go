
package main

import (
    "database/sql"
    "errors"
    "fmt"

    "golang.org/x/crypto/bcrypt"
)

// Membuat akun admin dan menyimpan password sebagai hash.
func CreateAdmin(username, password string) error {
    if username == "" || len(password) < 8 {
        return fmt.Errorf("username wajib diisi dan password minimal 8 karakter")
    }

    // Membuat hash password
    hash, err := bcrypt.GenerateFromPassword(
        []byte(password),
        bcrypt.DefaultCost,
    )
    if err != nil {
        return fmt.Errorf("gagal membuat hash password: %w", err)
    }

    // Menyimpan akun ke tabel admin
    _, err = DB.Exec(
        "INSERT INTO admin (username, password_hash) VALUES (?, ?)",
        username,
        string(hash),
    )
    if err != nil {
        return fmt.Errorf("gagal menyimpan akun admin: %w", err)
    }

    return nil
}

// Memverifikasi username dan password admin.
func VerifyAdmin(username, password string) (bool, error) {
    var storedHash string

    err := DB.QueryRow(
        "SELECT password_hash FROM admin WHERE username = ?",
        username,
    ).Scan(&storedHash)

    if errors.Is(err, sql.ErrNoRows) {
        return false, nil
    }
    if err != nil {
        return false, fmt.Errorf("gagal membaca akun admin: %w", err)
    }

    err = bcrypt.CompareHashAndPassword(
        []byte(storedHash),
        []byte(password),
    )

    if err == bcrypt.ErrMismatchedHashAndPassword {
        return false, nil
    }
    if err != nil {
        return false, fmt.Errorf("gagal memverifikasi password: %w", err)
    }

    return true, nil
}
