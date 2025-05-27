from pyramid.view import view_config
from pyramid.response import Response
from pyramid.security import remember, forget
from cornice import Service
from .models import User, Course, Task
import json
import bcrypt
from datetime import datetime

# Services
auth_service = Service(name='auth', path='/api/auth/{action}')
task_service = Service(name='tasks', path='/api/tasks')
course_service = Service(name='courses', path='/api/courses')

@auth_service.post(validators=('validate_login',))
def login(request):
    try:
        body = request.json_body
        email = body['email']
        password = body['password']
        
        user = request.dbsession.query(User).filter(User.email == email).first()
        if user and user.verify_password(password):
            headers = remember(request, user.id)
            return {
                'status': 'success',
                'user': {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email
                }
            }
        
        return Response(
            json_body={'message': 'Invalid email or password'},
            status=401
        )
    except Exception as e:
        return Response(
            json_body={'message': str(e)},
            status=500
        )