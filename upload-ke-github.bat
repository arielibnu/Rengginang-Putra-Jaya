@echo off
title Push Rengginang Putra Jaya ke GitHub
echo ========================================================
echo   UPLOAD PROYEK KE GITHUB: arielibnu/Rengginang-Putra-Jaya
echo ========================================================
echo.

set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
if not exist "%GIT_CMD%" (
    where git >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        set "GIT_CMD=git"
    ) else (
        echo [ERROR] Git belum terdeteksi. Silakan restart terminal atau buka VS Code.
        pause
        exit /b
    )
)

echo [OK] Menggunakan Git dari: %GIT_CMD%
echo.
echo Melakukan push ke branch main di GitHub...
echo (Jika jendela browser muncul, silakan klik 'Authorize' untuk akun GitHub arielibnu)
echo.

"%GIT_CMD%" push -u origin main

echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo   BERHASIL! Silakan cek repositori Anda:
    echo   https://github.com/arielibnu/Rengginang-Putra-Jaya
) else (
    echo   Gagal push. Pastikan koneksi internet stabil dan
    echo   Anda sudah login ke akun GitHub yang memiliki akses.
)
echo ========================================================
pause
