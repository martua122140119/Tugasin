# backend/runapp.py
from waitress import serve
from pyramid.paster import get_appsettings, setup_logging
from pyramid.config import Configurator
import os

# Fungsi untuk menginisialisasi dan menjalankan aplikasi
def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('tugasin_api') # Nama package Anda
    config.scan('tugasin_api')    # Scan package Anda
    return config.make_wsgi_app()

if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    config_uri = os.path.join(here, 'development.ini') # Default ke development.ini
    
    # Baca konfigurasi dari .ini file
    settings = get_appsettings(config_uri)
    setup_logging(config_uri)
    
    # Inisialisasi dan jalankan aplikasi WSGI
    app = main({}, **settings)
    
    print(f"Server is running on http://{settings['server:main']['host']}:{settings['server:main']['port']}")
    serve(app, host=settings['server:main']['host'], port=settings['server:main']['port'])