# backend/tugasin_api/__init__.py
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession, Base

# IMPOR INI UNTUK SEMENTARA: Kebijakan autentikasi berbasis token tiket
from pyramid.authentication import AuthTktAuthenticationPolicy

# IMPOR INI (SUDAH ADA)
from pyramid.authorization import ACLAuthorizationPolicy
from .security import RootFactory

# Fungsi untuk menambahkan CORS (Tidak Berubah)
def add_cors_headers_response_callback(event):
    def add_cors_headers(request, response):
        settings = request.registry.settings
        if 'cors.origins' in settings:
            origins = settings['cors.origins']
            response.headers['Access-Control-Allow-Origin'] = origins
        if 'cors.headers' in settings:
            headers = settings['cors.headers']
            response.headers['Access-Control-Allow-Headers'] = headers
        if 'cors.methods' in settings:
            methods = settings['cors.methods']
            response.headers['Access-Control-Allow-Methods'] = methods
        if 'cors.max_age' in settings:
            max_age = settings['cors.max_age']
            response.headers['Access-Control-Max-Age'] = max_age

    event.request.add_response_callback(add_cors_headers)

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)

    # Konfigurasi Database (Tidak Berubah)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    # TETAP INI: untuk mengaktifkan fungsi JWT lainnya seperti request.create_jwt_token
    config.include('pyramid_jwt') 

    # UBAH BAGIAN KONFIGURASI AUTENTIKASI INI
    # Gunakan AuthTktAuthenticationPolicy sebagai placeholder
    config.set_authentication_policy(
        AuthTktAuthenticationPolicy(
            settings['pyramid_jwt.secret'], # Menggunakan secret yang sama dari .ini
            callback=None, # Tidak ada callback untuk policy sederhana ini
            hashalg='sha512' # Algoritma hash yang aman
        )
    )

    # Konfigurasi Authorization Policy (Tidak Berubah, sudah benar)
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.set_default_permission('view')
    config.set_root_factory(RootFactory)

    # Tambahkan CORS (Tidak Berubah)
    config.add_subscriber(add_cors_headers_response_callback, 'pyramid.events.NewRequest')
    
    # Menangani OPTIONS requests (preflight) (Tidak Berubah)
    config.add_route('cors-preflight', '/{path:.*}', request_method='OPTIONS')
    config.add_view(lambda request: {}, route_name='cors-preflight')


    # Konfigurasi View dan Routes (Cornice) (Tidak Berubah)
    config.include('cornice')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.scan('.') # Scan semua views dan models di package saat ini

    # Konfigurasi Debug Toolbar (Hanya untuk development) (Tidak Berubah)
    if settings.get('pyramid.debug_all'):
        config.include('pyramid_debugtoolbar')

    return config.make_wsgi_app()