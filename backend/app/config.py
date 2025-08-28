import os
from datetime import timedelta
import re
from urllib.parse import quote_plus
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

def get_database_uri():
    uri = os.environ.get('DEV_DATABASE_URL')
    if uri:
        print("Database URI (raw):", uri)
        if uri.startswith("postgres://"):
            # Compatibilidade com URLs do Heroku
            uri = re.sub(r'^postgres://', 'postgresql://', uri)

        # Escapa usuário e senha
        match = re.match(r'postgresql://([^:]+):([^@]+)@(.*)', uri)
        if match:
            user, password, rest = match.groups()
            user_enc = quote_plus(user)
            password_enc = quote_plus(password)
            uri = f'postgresql://{user_enc}:{password_enc}@{rest}'
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
    JWT_SECRET_KEY = 'test-jwt-secret'

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
