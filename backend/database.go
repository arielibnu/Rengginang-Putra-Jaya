
package main

import (
    "database/sql"
    "fmt"
    "os"
    "time"

    "github.com/go-sql-driver/mysql"
    "github.com/joho/godotenv"
)

var DB *sql.DB

func ConnectDatabase() error {
    // Membaca konfigurasi dari file .env
    if err := godotenv.Load(); err != nil {
        return fmt.Errorf("gagal membaca .env: %w", err)
    }

    // Konfigurasi koneksi MySQL
    config := mysql.Config{
        User:                 os.Getenv("DB_USER"),
        Passwd:               os.Getenv("DB_PASSWORD"),
        Net:                  "tcp",
        Addr:                 os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT"),
        DBName:               os.Getenv("DB_NAME"),
        ParseTime:            true,
        AllowNativePasswords: true,
    }

    // Membuka koneksi ke MySQL
    db, err := sql.Open("mysql", config.FormatDSN())
    if err != nil {
        return fmt.Errorf("gagal membuka koneksi database: %w", err)
    }

    // Mengatur koneksi database
    db.SetConnMaxLifetime(3 * time.Minute)
    db.SetMaxOpenConns(10)
    db.SetMaxIdleConns(10)

    // Memastikan MySQL dapat diakses
    if err := db.Ping(); err != nil {
        db.Close()
        return fmt.Errorf("gagal terhubung ke MySQL: %w", err)
    }

    // Menyimpan koneksi database
    DB = db

    fmt.Println("Berhasil terhubung ke MySQL!")

    return nil
}