from flask import Flask
from .config import config
from .extensions import db, migrate, jwt, cors, bcrypt

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # Configurações da aplicação
    app.config.from_object(config[config_name])

    # Inicializa extensões
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)
    bcrypt.init_app(app)

    # Registra os blueprints
    from .controllers.auth_controller import auth_bp
    from .controllers.user_controller import user_bp
    from .controllers.tasklist_controller import tasklist_bp
    from .controllers.task_controller import task_bp
    from .controllers.session_controller import session_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(tasklist_bp, url_prefix='/tasklists')
    app.register_blueprint(task_bp, url_prefix='/tasks')
    app.register_blueprint(session_bp, url_prefix='/sessions')

    # Criação automática das tabelas apenas em desenvolvimento
    if config_name == 'development':
        with app.app_context():
            db.create_all()

    return app

