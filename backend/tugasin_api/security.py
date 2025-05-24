# backend/tugas_kuliah_api/security.py
from pyramid.security import Allow, Everyone

# A simple security factory for JWT
class RootFactory(object):
    __acl__ = [
        (Allow, Everyone, 'view'),
        # Add more permissions here if needed
    ]

    def __init__(self, request):
        pass