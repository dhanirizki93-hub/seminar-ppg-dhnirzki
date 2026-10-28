#!/usr/bin/env python3
"""
Server Lokal Website Seminar PPG 2026
Dhani Rizki (NIM: 2531049) - Universitas Pendidikan Indonesia
"""

import http.server
import socketserver
import webbrowser
import os
import sys

DEFAULT_PORT = 8080

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for smooth local browsing
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    # Set current directory to the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    port = DEFAULT_PORT
    server = None
    
    for attempt_port in [DEFAULT_PORT, 8000, 8888, 3000, 5000]:
        try:
            handler = CustomHTTPRequestHandler
            socketserver.TCPServer.allow_reuse_address = True
            server_class = getattr(http.server, 'ThreadingHTTPServer', socketserver.TCPServer)
            server = server_class(("", attempt_port), handler)
            port = attempt_port
            break
        except OSError:
            continue
            
    if not server:
        print("[!] Tidak dapat menemukan port yang terbuka. Silakan buka index.html secara langsung.")
        sys.exit(1)

    url = f"http://localhost:{port}"
    print("=" * 65, flush=True)
    print("SERVER LOKAL WEBSITE SEMINAR PPG PRAJABATAN 2026 BERJALAN", flush=True)
    print("=" * 65, flush=True)
    print(f" Mahasiswa : Dhani Rizki (NIM: 2531049)", flush=True)
    print(f" LPTK      : Universitas Pendidikan Indonesia (UPI)", flush=True)
    print(f" Akses Web : {url}", flush=True)
    print("=" * 65, flush=True)
    print(" Tekan CTRL + C pada jendela ini untuk menghentikan server.")
    print("=" * 65)
    
    # Open browser automatically
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Silakan buka peramban Anda dan kunjungi: {url}")
        
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Server dihentikan. Terima kasih!")
        server.server_close()

if __name__ == "__main__":
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    run_server()
