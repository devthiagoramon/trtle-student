import os
from app import create_app
from app.extensions import db

# Define o ambiente (pode ser 'development', 'production', 'testing')
config_name = os.environ.get('FLASK_ENV', 'development')

# Cria a aplicação Flask
app = create_app(config_name)

def check_database():
    with app.app_context():
        try:
            # Testa conexão
            engine = db.engine
            connection = engine.connect()
            print("✅ Conexão com o banco PostgreSQL OK!")
            connection.close()
        except Exception as e:
            print("❌ Erro ao conectar no banco:", e)
            return

        # Lista tabelas
        inspector = db.inspect(engine)
        tables = inspector.get_table_names()

        if tables:
            print(f"📋 Tabelas existentes ({len(tables)}): {tables}")
        else:
            print("⚠️ Nenhuma tabela encontrada no banco.")

if __name__ == '__main__':
    print(f">>> Verificando banco de dados para configuração: {config_name}")
    check_database()
