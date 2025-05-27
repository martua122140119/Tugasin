from pyramid.security import Allow, Everyone, Authenticated
from .models import User

def get_user(request):
    user_id = request.authenticated_userid
    if user_id:
        return request.dbsession.query(User).get(user_id)

def groupfinder(userid, request):
    if userid:
        return ['group:users']
    return None

class RootFactory(object):
    __acl__ = [
        (Allow, Authenticated, 'view'),
        (Allow, 'group:users', 'edit'),
    ]
    
    def __init__(self, request):
        pass