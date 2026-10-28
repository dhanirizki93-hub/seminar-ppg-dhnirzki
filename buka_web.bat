@echo off
title Seminar PPG 2026 - Dhani Rizki (UPI)
color 4F

echo ======================================================================
echo          SEMINAR PENDIDIKAN PROFESI GURU (PPG) PRAJABATAN 2026
echo             Universitas Pendidikan Indonesia (UPI Bandung)
echo                Mahasiswa: Dhani Rizki (NIM: 2531049)
echo ======================================================================
echo.
echo Menjalankan Server Lokal (Localhost)...
echo Membuka peramban (browser) secara otomatis...
echo.

python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [INFO] Menjalankan menggunakan Python HTTP server standar...
    start http://localhost:8080
    python -m http.server 8080
)

pause
