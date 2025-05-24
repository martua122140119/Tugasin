# backend/setup.py
from setuptools import setup, find_packages

setup(
    name='tugasin_api', # UBAH INI
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'pyramid',
        'sqlalchemy',
        'psycopg2-binary',
        'pyramid_jwt',
        'cornice',
        'pyramid_debugtoolbar',
        'waitress',
        'gunicorn',
    ],
    entry_points={
        'paste.app_factory': [
            'main = tugasin_api:main', # UBAH INI
        ],
        'console_scripts': [
            'initialize_db = tugasin_api.scripts.initializedb:main', # UBAH INI
        ],
    },
)