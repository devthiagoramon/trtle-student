import os
from datetime import timedelta
import re

basedir = os.path.abspath(os.path.dirname(__file__))

def get_database_uri():
    uri = os.environ.get('DEV_DATABASE_URL')
    print(uri)
    if uri and uri.startswith("postgres://"):
        # Compatibilidade com URLs do Heroku
        uri = re.sub(r'^postgres://', 'postgresql://', uri)
    return uri

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-123'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-123'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = get_database_uri() or f'sqlite:///{os.path.join(basedir, "dev.db")}'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = get_database_uri()
    if not SQLALCHEMY_DATABASE_URI:
        raise RuntimeError("DATABASE_URL is required in production!")

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    JWT_SECRET_KEY = 'test-jwt-secret'  # Evita necessidade de variáveis externas

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
