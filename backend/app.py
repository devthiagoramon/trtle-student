# app.py

import os
from app import create_app  # Altere 'meuapp' para o nome da pasta do seu app

# Lê configuração a partir da variável de ambiente FLASK_ENV, ou usa 'development'
config_name = os.environ.get('FLASK_ENV', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    print(f">>> Rodando aplicação Flask com configuração: {config_name}")
    app.run(debug=app.config['DEBUG'])
