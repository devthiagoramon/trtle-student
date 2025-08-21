from flask import Flask
from .config import config
from .extensions import db, migrate, jwt, cors,bcrypt

def create_app(config_name='default'):
    app = Flask(__name__)
    
    # Configuração
    app.config.from_object(config[config_name])
    
    # Inicializa extensões
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)
    bcrypt.init_app(app)
    
    # Registra blueprints
    from .routes.auth import auth_bp
    from .routes.users import users_bp
    from .routes.products import products_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(products_bp, url_prefix='/products')
    
    # Cria tabelas (em desenvolvimento)
    with app.app_context():
        db.create_all()
    
    return app