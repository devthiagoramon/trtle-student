# TrtleStudy

Essa é uma aplicação ReactJS para um sistema de gerenciamento de tarefas.

## Funcionalidades:

- Cadastro de Usuário
- Login (Autenticação) via email e senha
- CRUD de lista de tarefas
- Timer Pomodoro
- Dashboard de produtividade (tempo de acesso, tarefas realizadas)

## Frontend

- ReactJS
- react-router-dom
- axios
- @mui/icons-material
- react-toastify

## Backend

- Python
- Flask
- SQLAlchemy
- PostregreSQL

## Banco de Dados
<img width="720" alt="Diagrama Físico de Banco de Dados" src="https://github.com/user-attachments/assets/b9aa3702-f860-4e55-9edc-eda90e5a0196" />

## Casos de Uso
<img width="720" alt="Diagrama de Casos de Uso" src="https://github.com/user-attachments/assets/1d796904-767b-4170-842b-b8381050f475" />

## Diagrama de Classes
<img width="720"  alt="Diagrama de Classes" src="https://github.com/user-attachments/assets/912fdefd-f6c5-457e-9e2a-c18bc75a4185" />

## Execução de Backend
- Instalar Postgre.sql
- Instalar Python
- Clonar repositório
- No arquivo `backend\.env`:
  * DEV_DATABASE_URL = "postgresql://postgres:[sua-senha-de-acesso-ao-postgresql]@localhost:[porta-de-acesso]/"
  * Porta de acesso padrão: 5432
- `cd backend`
- `pip install -r requirements.txt`
- `python app.py`

## Execução do Frontend
- Instalar Nodejs
- `cd frontend\trtle-student-web`
- `npm i`
- `npm run dev`
