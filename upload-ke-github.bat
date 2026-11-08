@echo off
title Push Rengginang Putra Jaya ke GitHub
echo ========================================================
echo   UPLOAD PROYEK KE GITHUB: arielibnu/Rengginang-Putra-Jaya
echo ========================================================
echo.

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git belum terdeteksi di komputer Anda.
    echo.
    echo Silakan unduh dan pasang Git terlebih dahulu dari:
    echo https://git-scm.com/download/win
    echo.
    echo Atau buka folder ini langsung di VS Code, lalu tekan:
    echo Ctrl + Shift + G ^> Publish to GitHub.
    echo.
    pause
    exit /b
)

echo [1/5] Menginisialisasi Git repository...
if not exist ".git" (
    git init
)

echo [2/5] Menyiapkan branch main...
git branch -M main

echo [3/5] Menambahkan remote GitHub...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/arielibnu/Rengginang-Putra-Jaya.git

echo [4/5] Menambahkan seluruh file source code...
git add .

echo [5/5] Melakukan commit & push...
git commit -m "feat: implementasi web React.js Rengginang Situbondo Putra Jaya"
git push -u origin main

echo.
echo ========================================================
echo   SELESAI! Silakan cek https://github.com/arielibnu/Rengginang-Putra-Jaya
echo ========================================================
pause

