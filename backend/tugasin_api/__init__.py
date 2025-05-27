from pyramid.config import Configurator
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.security import ALL_PERMISSIONS
from pyramid.session import SignedCookieSessionFactory
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from .security import get_user, groupfinder

def main(global_config, **settings):
    config = Configurator(settings=settings)
    
    # Authentication & Authorization
    session_factory = SignedCookieSessionFactory('tugasin-secret')
    config.set_session_factory(session_factory)
    
    authn_policy = AuthTktAuthenticationPolicy(
        'sosecret', callback=groupfinder, hashalg='sha512')
    authz_policy = ACLAuthorizationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    
    # Database
    engine = engine_from_config(settings, 'sqlalchemy.')
    config.registry['dbsession_factory'] = sessionmaker(bind=engine)
    
    # CORS
    config.add_cors_preflight_handler()
    config.add_cors_policy({
        'origins': ['http://localhost:3000'],
        'allow_credentials': True,
        'max_age': 86400,
    })

    # Include packages
    config.include('pyramid_jwt')
    config.include('cornice')
    
    # Routes
    config.add_route('home', '/')
    config.add_route('login', '/api/auth/login')
    config.add_route('register', '/api/auth/register')
    config.add_route('tasks', '/api/tasks')
    config.add_route('task', '/api/tasks/{id}')
    config.add_route('courses', '/api/courses')
    config.add_route('course', '/api/courses/{id}')
    
    config.scan('.views')
    return config.make_wsgi_app()