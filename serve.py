#!/usr/bin/env python3
"""
Сервер для Harbor: раздаёт файлы из текущей папки.
Любой путь без реального файла отдаёт index.html (SPA: /home, /read/letter-1 и т.д.).
"""
import http.server
import os
import socketserver

PORT = 8765


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            self.path = "/index.html"
        return http.server.SimpleHTTPRequestHandler.do_GET(self)


with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}/")
    httpd.serve_forever()
