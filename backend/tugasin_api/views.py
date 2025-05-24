# backend/tugasin_api/views.py
from cornice import Service
from pyramid.response import Response
from pyramid.view import view_config

# --- BARIS INI (from pyramid_jwt.api import JWTClaims) SUDAH DIHAPUS TOTAL ---
# --- JANGAN ADA IMPORT JWTClaims DARI MANAPUN ---

from .models import DBSession, User, MataKuliah, Tugas
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound
import transaction
from datetime import date # Import date untuk deadline

# ==============================================================================
# Auth Service (Login & Register)
# ==============================================================================
auth_service = Service(name='auth', path='/api/auth', description='Authentication Service') # path='/api/auth' dikembalikan di sini

@auth_service.post('login') # Gunakan string path relatif 'login', tanpa permission='view'
def login_user(request):
    try:
        data = request.json_body
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            request.response.status = 400
            return {'message': 'Email dan password harus diisi.'}

        user = DBSession.query(User).filter_by(email=email).first()
        if user and user.check_password(password):
            # GUNAKAN DICTIONARY BIASA UNTUK KLAIM (BUKAN JWTClaims())
            claims = {
                'user_id': user.id,
                'email': user.email,
                'name': user.name,
                # Anda bisa menambahkan claims lain di sini
            }
            token = request.create_jwt_token(claims)
            request.response.status = 200
            return {
                'token': token,
                'user': {'id': user.id, 'name': user.name, 'email': user.email}
            }
        else:
            request.response.status = 401
            return {'message': 'Email atau password salah.'}

    except Exception as e:
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@auth_service.post('register') # Gunakan string path relatif 'register', tanpa permission='view'
def register_user(request):
    try:
        data = request.json_body
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            request.response.status = 400
            return {'message': 'Nama, email, dan password harus diisi.'}

        if DBSession.query(User).filter_by(email=email).first():
            request.response.status = 409 # Conflict
            return {'message': 'Email sudah terdaftar.'}

        user = User(name=name, email=email)
        user.set_password(password)
        DBSession.add(user)
        transaction.commit() # Commit changes to DB

        request.response.status = 201 # Created
        return {'message': 'Registrasi berhasil! Silakan login.', 'user': {'id': user.id, 'name': user.name, 'email': user.email}}

    except IntegrityError: # Handle unique constraint violation (should be caught by filter_by already, but for safety)
        transaction.abort()
        request.response.status = 409
        return {'message': 'Email sudah terdaftar.'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

# ==============================================================================
# Home View (Example of protected endpoint, for testing purposes)
# ==============================================================================
@view_config(route_name='home', renderer='json', permission='view')
def home_view(request):
    user_id = request.authenticated_userid # Gunakan request.authenticated_userid
    if user_id:
        user = DBSession.query(User).get(user_id)
        return {'message': f'Welcome, {user.name}! You are authenticated.', 'user_id': user_id}
    return {'message': 'Hello from Pyramid API!'}


# ==============================================================================
# Mata Kuliah Service (CRUD)
# ==============================================================================
# TETAPKAN path di sini karena ini adalah base path untuk Matkul
matkul_service = Service(name='matkuls', path='/api/matkuls', description='Mata Kuliah Service')

@matkul_service.get(permission='view') # Ini adalah GET /api/matkuls
def get_all_matkuls(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    matkuls = DBSession.query(MataKuliah).filter_by(user_id=user_id).all()
    # Ubah objek SQLAlchemy menjadi format JSON yang bisa dikirim
    return [
        {'id': m.id, 'nama_matkul': m.nama_matkul, 'semester': m.semester}
        for m in matkuls
    ]

@matkul_service.post(permission='view') # Ini adalah POST /api/matkuls
def create_matkul(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    try:
        data = request.json_body
        nama_matkul = data.get('nama_matkul')
        semester = data.get('semester')

        if not nama_matkul or not semester:
            request.response.status = 400
            return {'message': 'Nama mata kuliah dan semester harus diisi.'}
        
        matkul = MataKuliah(nama_matkul=nama_matkul, semester=semester, user_id=user_id)
        DBSession.add(matkul)
        transaction.commit()
        request.response.status = 201 # Created
        return {'id': matkul.id, 'nama_matkul': matkul.nama_matkul, 'semester': matkul.semester}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@matkul_service.get(renderer='json', path='/{id}', permission='view') # Ini adalah GET /api/matkuls/{id}
def get_matkul_by_id(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    matkul_id = request.matchdict['id']
    try:
        matkul = DBSession.query(MataKuliah).filter_by(id=matkul_id, user_id=user_id).one()
        return {'id': matkul.id, 'nama_matkul': matkul.nama_matkul, 'semester': matkul.semester}
    except NoResultFound:
        request.response.status = 404
        return {'message': 'Mata kuliah tidak ditemukan atau bukan milik Anda.'}
    except Exception as e:
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@matkul_service.put(renderer='json', path='/{id}', permission='view') # Ini adalah PUT /api/matkuls/{id}
def update_matkul(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    matkul_id = request.matchdict['id']
    try:
        matkul = DBSession.query(MataKuliah).filter_by(id=matkul_id, user_id=user_id).one()
        data = request.json_body
        
        nama_matkul = data.get('nama_matkul')
        semester = data.get('semester')

        if not nama_matkul or not semester:
            request.response.status = 400
            return {'message': 'Nama mata kuliah dan semester harus diisi.'}

        matkul.nama_matkul = nama_matkul
        matkul.semester = semester
        transaction.commit()
        return {'id': matkul.id, 'nama_matkul': matkul.nama_matkul, 'semester': matkul.semester}
    except NoResultFound:
        transaction.abort()
        request.response.status = 404
        return {'message': 'Mata kuliah tidak ditemukan atau bukan milik Anda.'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@matkul_service.delete(renderer='json', path='/{id}', permission='view') # Ini adalah DELETE /api/matkuls/{id}
def delete_matkul(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    matkul_id = request.matchdict['id']
    try:
        matkul = DBSession.query(MataKuliah).filter_by(id=matkul_id, user_id=user_id).one()
        DBSession.delete(matkul)
        transaction.commit()
        request.response.status = 204 # No Content (successful deletion)
        return {'message': 'Mata kuliah berhasil dihapus.'}
    except NoResultFound:
        transaction.abort()
        request.response.status = 404
        return {'message': 'Mata kuliah tidak ditemukan atau bukan milik Anda.'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

# ==============================================================================
# Tugas Service (CRUD)
# ==============================================================================
# TETAPKAN path di sini karena ini adalah base path untuk Tugas
tugas_service = Service(name='tugas', path='/api/tugas', description='Tugas Service')

@tugas_service.get(permission='view') # Ini adalah GET /api/tugas
def get_all_tugas(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    query = DBSession.query(Tugas).filter_by(user_id=user_id)
    
    # Filter opsional berdasarkan status atau deadline (dari query params)
    status_filter = request.params.get('status')
    deadline_filter = request.params.get('deadline')
    
    if status_filter:
        query = query.filter(Tugas.status == status_filter)
    
    if deadline_filter:
        try:
            # Pastikan format tanggal sesuai dengan di DB (YYYY-MM-DD)
            # Anda mungkin perlu library date parsing yang lebih robust di production
            parsed_date = date.fromisoformat(deadline_filter)
            query = query.filter(Tugas.deadline == parsed_date)
        except ValueError:
            request.response.status = 400
            return {'message': 'Format deadline tidak valid (YYYY-MM-DD).'}

    tugas = query.order_by(Tugas.deadline).all() # Urutkan berdasarkan deadline
    
    return [
        {
            'id': t.id,
            'judul': t.judul,
            'deskripsi': t.deskripsi,
            'deadline': t.deadline.isoformat() if t.deadline else None, # Format date ke string
            'status': t.status,
            'matkul_id': t.matkul_id,
            'matkul_name': t.mata_kuliah.nama_matkul if t.mata_kuliah else None # Sertakan nama matkul
        }
        for t in tugas
    ]

@tugas_service.post(permission='view') # Ini adalah POST /api/tugas
def create_tugas(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    try:
        data = request.json_body
        judul = data.get('judul')
        deskripsi = data.get('deskripsi')
        deadline_str = data.get('deadline')
        matkul_id = data.get('matkul_id')
        status = data.get('status', 'Belum Selesai') # Default status jika tidak dikirim
        
        if not judul or not deadline_str or not matkul_id:
            request.response.status = 400
            return {'message': 'Judul, deadline, dan mata kuliah harus diisi.'}
        
        # Validasi matkul_id dan pastikan milik user
        matkul = DBSession.query(MataKuliah).filter_by(id=matkul_id, user_id=user_id).first()
        if not matkul:
            request.response.status = 400
            return {'message': 'Mata kuliah tidak valid atau bukan milik Anda.'}
            
        # Konversi deadline string ke objek Date
        parsed_deadline = date.fromisoformat(deadline_str)

        tugas = Tugas(
            judul=judul,
            deskripsi=deskripsi,
            deadline=parsed_deadline,
            status=status,
            matkul_id=matkul_id,
            user_id=user_id
        )
        DBSession.add(tugas)
        transaction.commit()
        request.response.status = 201
        return {
            'id': tugas.id,
            'judul': tugas.judul,
            'deskripsi': tugas.deskripsi,
            'deadline': tugas.deadline.isoformat(),
            'status': tugas.status,
            'matkul_id': tugas.matkul_id,
            'matkul_name': tugas.mata_kuliah.nama_matkul
        }
    except ValueError:
        transaction.abort()
        request.response.status = 400
        return {'message': 'Format deadline tidak valid (YYYY-MM-DD).'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@tugas_service.get(renderer='json', path='/{id}', permission='view') # Ini adalah GET /api/tugas/{id}
def get_tugas_by_id(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    tugas_id = request.matchdict['id']
    try:
        tugas = DBSession.query(Tugas).filter_by(id=tugas_id, user_id=user_id).one()
        return {
            'id': tugas.id,
            'judul': tugas.judul,
            'deskripsi': tugas.deskripsi,
            'deadline': tugas.deadline.isoformat() if tugas.deadline else None,
            'status': tugas.status,
            'matkul_id': tugas.matkul_id,
            'matkul_name': tugas.mata_kuliah.nama_matkul if tugas.mata_kuliah else None
        }
    except NoResultFound:
        request.response.status = 404
        return {'message': 'Tugas tidak ditemukan atau bukan milik Anda.'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@tugas_service.put(renderer='json', path='/{id}', permission='view') # Ini adalah PUT /api/tugas/{id}
def update_tugas(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    tugas_id = request.matchdict['id']
    try:
        tugas = DBSession.query(Tugas).filter_by(id=tugas_id, user_id=user_id).one()
        data = request.json_body
        
        judul = data.get('judul', tugas.judul)
        deskripsi = data.get('deskripsi', tugas.deskripsi)
        deadline_str = data.get('deadline', tugas.deadline.isoformat() if tugas.deadline else None)
        matkul_id = data.get('matkul_id', tugas.matkul_id)
        status = data.get('status', tugas.status)

        if not judul or not deadline_str or not matkul_id:
            request.response.status = 400
            return {'message': 'Judul, deadline, dan mata kuliah harus diisi.'}
        
        if matkul_id != tugas.matkul_id:
            matkul = DBSession.query(MataKuliah).filter_by(id=matkul_id, user_id=user_id).first()
            if not matkul:
                request.response.status = 400
                return {'message': 'Mata kuliah tidak valid atau bukan milik Anda.'}

        tugas.judul = judul
        tugas.deskripsi = deskripsi
        tugas.deadline = date.fromisoformat(deadline_str)
        tugas.matkul_id = matkul_id
        tugas.status = status
        
        transaction.commit()
        return {
            'id': tugas.id,
            'judul': tugas.judul,
            'deskripsi': tugas.deskripsi,
            'deadline': tugas.deadline.isoformat(),
            'status': tugas.status,
            'matkul_id': tugas.matkul_id,
            'matkul_name': tugas.mata_kuliah.nama_matkul
        }
    except NoResultFound:
        transaction.abort()
        request.response.status = 404
        return {'message': 'Tugas tidak ditemukan atau bukan milik Anda.'}
    except ValueError:
        transaction.abort()
        request.response.status = 400
        return {'message': 'Format deadline tidak valid (YYYY-MM-DD).'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}

@tugas_service.delete(renderer='json', path='/{id}', permission='view') # Ini adalah DELETE /api/tugas/{id}
def delete_tugas(request):
    user_id = request.authenticated_userid
    if not user_id:
        request.response.status = 401
        return {'message': 'Autentikasi diperlukan.'}
    
    tugas_id = request.matchdict['id']
    try:
        tugas = DBSession.query(Tugas).filter_by(id=tugas_id, user_id=user_id).one()
        DBSession.delete(tugas)
        transaction.commit()
        request.response.status = 204
        return {'message': 'Tugas berhasil dihapus.'}
    except NoResultFound:
        transaction.abort()
        request.response.status = 404
        return {'message': 'Tugas tidak ditemukan atau bukan milik Anda.'}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'message': f'Terjadi kesalahan server: {str(e)}'}