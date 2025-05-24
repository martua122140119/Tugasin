# backend/tugas_kuliah_api/scripts/initializedb.py
import os
import sys

from pyramid.paster import (
    setup_logging,
    get_appsettings,
)
from pyramid.scripts.common import parse_vars

from ..models import (
    DBSession,
    Base,
    User,
    MataKuliah,
    Tugas,
)
from sqlalchemy import engine_from_config
import transaction

def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri> [var=value]\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)

def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, name='main', options=options)

    # Konfigurasi engine database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    Base.metadata.create_all(engine) # Membuat semua tabel

    # Tambahkan dummy user jika database kosong
    with transaction.manager:
        if DBSession.query(User).count() == 0:
            print("Adding dummy user: test@example.com")
            user = User(name='Admin Demo', email='test@example.com')
            user.set_password('password123') # Password dummy
            DBSession.add(user)
            DBSession.flush() # Commit user to get its ID before adding related data

            print(f"Adding dummy Mata Kuliah for {user.name}")
            matkul1 = MataKuliah(nama_matkul='Pemrograman Web', semester='Genap 2024/2025', user_id=user.id)
            matkul2 = MataKuliah(nama_matkul='Basis Data', semester='Genap 2024/2025', user_id=user.id)
            DBSession.add_all([matkul1, matkul2])
            DBSession.flush()

            print(f"Adding dummy Tugas for {user.name}")
            tugas1 = Tugas(
                judul='Selesaikan Proyek Pyramid',
                deskripsi='Membuat API untuk tracking tugas.',
                deadline='2025-06-30',
                status='Belum Selesai',
                matkul_id=matkul1.id,
                user_id=user.id
            )
            tugas2 = Tugas(
                judul='Belajar PostgreSQL',
                deskripsi='Membaca dokumentasi dan praktik SQL.',
                deadline='2025-06-15',
                status='Belum Selesai',
                matkul_id=matkul2.id,
                user_id=user.id
            )
            DBSession.add_all([tugas1, tugas2])

            print("Database initialized and dummy data added.")