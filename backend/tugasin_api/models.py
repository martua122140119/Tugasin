# backend/tugasin_api/models.py
from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    Date,
    Boolean,
    ForeignKey
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    relationship
)
# UBAH BARIS INI: dari ZopeTransactionExtension menjadi ZopeTransactionEvents
from zope.sqlalchemy import ZopeTransactionEvents # UBAH NAMA INI
from passlib.hash import pbkdf2_sha256

# UBAH BARIS INI: dari ZopeTransactionExtension() menjadi ZopeTransactionEvents()
DBSession = scoped_session(sessionmaker(extension=ZopeTransactionEvents())) # UBAH NAMA INI
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)

    # Relasi
    matkuls = relationship('MataKuliah', back_populates='user', cascade='all, delete-orphan')
    tugas = relationship('Tugas', back_populates='user', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = pbkdf2_sha256.hash(password)

    def check_password(self, password):
        return pbkdf2_sha256.verify(password, self.password_hash)

class MataKuliah(Base):
    __tablename__ = 'mata_kuliah'
    id = Column(Integer, primary_key=True)
    nama_matkul = Column(String(100), nullable=False)
    semester = Column(String(50), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Relasi
    user = relationship('User', back_populates='matkuls')
    tugas = relationship('Tugas', back_populates='mata_kuliah', cascade='all, delete-orphan')


class Tugas(Base):
    __tablename__ = 'tugas'
    id = Column(Integer, primary_key=True)
    judul = Column(String(255), nullable=False)
    deskripsi = Column(Text)
    deadline = Column(Date, nullable=False)
    status = Column(String(50), default='Belum Selesai', nullable=False) # e.g., 'Belum Selesai', 'Selesai'
    matkul_id = Column(Integer, ForeignKey('mata_kuliah.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Relasi
    mata_kuliah = relationship('MataKuliah', back_populates='tugas')
    user = relationship('User', back_populates='tugas')