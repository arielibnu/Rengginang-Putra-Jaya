
package main

import (
    "crypto/rand"
    "encoding/hex"
    "net/http"
    "sync"
    "time"
)

type AdminSession struct {
    Username  string
    ExpiresAt time.Time
}

var (
    sessionMutex sync.Mutex
    sessions = make(map[string]AdminSession)
)

const sessionDuration = 2 * time.Hour

// Membuat sesi setelah login berhasil.
func CreateSession(w http.ResponseWriter, username string) error {
    randomBytes := make([]byte, 32)

    if _, err := rand.Read(randomBytes); err != nil {
        return err
    }

    token := hex.EncodeToString(randomBytes)

    sessionMutex.Lock()
    sessions[token] = AdminSession{
        Username:  username,
        ExpiresAt: time.Now().Add(sessionDuration),
    }
    sessionMutex.Unlock()

    http.SetCookie(w, &http.Cookie{
        Name:     "admin_session",
        Value:    token,
        Path:     "/",
        HttpOnly: true,
        Secure:   false, // Khusus pengujian localhost HTTP
        SameSite: http.SameSiteLaxMode,
        MaxAge:   int(sessionDuration.Seconds()),
    })

    return nil
}

// Memeriksa sesi admin.
func CheckSession(r *http.Request) (string, bool) {
    cookie, err := r.Cookie("admin_session")
    if err != nil {
        return "", false
    }

    sessionMutex.Lock()
    defer sessionMutex.Unlock()

    session, exists := sessions[cookie.Value]

    if !exists {
        return "", false
    }

    if time.Now().After(session.ExpiresAt) {
        delete(sessions, cookie.Value)
        return "", false
    }

    return session.Username, true
}

// Menghapus sesi ketika admin logout.
func DeleteSession(w http.ResponseWriter, r *http.Request) {
    cookie, err := r.Cookie("admin_session")

    if err == nil {
        sessionMutex.Lock()
        delete(sessions, cookie.Value)
        sessionMutex.Unlock()
    }

    http.SetCookie(w, &http.Cookie{
        Name:     "admin_session",
        Value:    "",
        Path:     "/",
        HttpOnly: true,
        Secure:   false,
        SameSite: http.SameSiteLaxMode,
        MaxAge:   -1,
    })
}