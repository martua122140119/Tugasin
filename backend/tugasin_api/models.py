from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import bcrypt

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    tasks = relationship("Task", back_populates="user")

    def verify_password(self, password):
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password.encode('utf-8')
        )

class Course(Base):
    __tablename__ = 'courses'
    
    id = Column(Integer, primary_key=True)
    nama_matkul = Column(String(255), nullable=False)
    semester = Column(String(50), nullable=False)
    tasks = relationship("Task", back_populates="course")

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True)
    judul = Column(String(255), nullable=False)
    deskripsi = Column(Text)
    deadline = Column(Date, nullable=False)
    status = Column(String(50), default='Belum Selesai')
    user_id = Column(Integer, ForeignKey('users.id'))
    matkul_id = Column(Integer, ForeignKey('courses.id'))
    
    user = relationship("User", back_populates="tasks")
    course = relationship("Course", back_populates="tasks")