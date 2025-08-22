from flask import Flask
from .config import Config
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
    from .controllers.auth_controller import auth_bp
    from .controllers.user_controller import user_bp
    from .controllers.tasklist_controller import tasklist_bp
    from .controllers.task_controller import task_bp
    from .controllers.session_controller import session_bp

    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(tasklist_bp, url_prefix='/task_list')
    app.register_blueprint(task_bp,url_prefix ='/tasks')
    app.register_blueprint(session_bp,url_prefix= '/sessions')
    
    
    # Cria tabelas (em desenvolvimento)
    with app.app_context():
        db.create_all()
    
    return app