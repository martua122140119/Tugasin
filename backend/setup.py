from setuptools import setup

requires = [
    'pyramid',
    'sqlalchemy',
    'psycopg2-binary',
    'pyramid_jwt',
    'cornice',
    'pyramid_debugtoolbar',
    'waitress',
    'gunicorn',
    'passlib',
    'zope.sqlalchemy',
    'bcrypt',
    'python-dotenv',
    'alembic'
]

setup(
    name='tugasin_api',
    version='0.1',
    description='Tugasin Backend API',
    author='Your Name',
    author_email='your.email@example.com',
    packages=['tugasin_api'],
    include_package_data=True,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = tugasin_api:main',
        ],
    },
)