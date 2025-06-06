# Agenda App

Este repositório contém uma aplicação de Agenda composta por:

- **Backend**: API REST em NestJS com TypeORM e PostgreSQL (containerizado).  
- **Frontend**: SPA em React (Create React App) para consumir o backend, servida via Nginx (containerizado).  
- **Docker Compose**: orquestra os três containers (PostgreSQL, backend e frontend) para facilitar instalação e execução.

---

## Índice

1. [Pré-requisitos](#pré-requisitos)  
2. [Estrutura de Pastas](#estrutura-de-pastas)  
3. [Configurações de Ambiente](#configurações-de-ambiente)  
4. [Instalação](#instalação)  
5. [Execução com Docker Compose](#execução-com-docker-compose)  
6. [Execução Manual](#execução-manual)  
   - [Backend NestJS](#backend-nestjs)  
   - [Frontend React](#frontend-react)  
7. [Rotas da API](#rotas-da-api)  
8. [Uso](#uso)  

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Docker** (versão estável)  
- **Docker Compose**  
- (Opcional) **Node.js** (v18+) e **npm** apenas se quiser rodar sem Docker  

---

## Estrutura de Pastas

```plaintext
/ (raiz do projeto)
├── docker-compose.yml          # Orquestra os serviços (Postgres, backend, frontend)
├── backend/
│   ├── Dockerfile              # Dockerfile para o NestJS
│   ├── package.json            # Dependências do backend
│   └── src/
│       ├── app.module.ts       # Configuração do TypeORM e módulos
│       ├── main.ts             # Ponto de entrada
│       └── contato/            # Módulo Contato (entity, service, controller)
└── frontend/
    ├── Dockerfile              # Dockerfile para o React + Nginx
    ├── package.json            # Dependências do frontend
    └── src/
        ├── index.js            # Ponto de entrada do React
        ├── App.jsx             # Rotas e estado global
        ├── services/
        │   └── api.js          # Cliente Axios para chamar a API de contatos
        └── components/         # Componentes React (NavBar, ContactList, AddContact)
````

---

## Configurações de Ambiente

As variáveis de ambiente principais são definidas no `docker-compose.yml`. Caso queira sobrescrevê-las, edite conforme abaixo:

- **PostgreSQL (serviço db)**
  - `POSTGRES_USER`: usuário do DB (ex: `postgres`)
  - `POSTGRES_PASSWORD`: senha do DB
  - `POSTGRES_DB`: nome do banco (ex: `agenda`)

- **Backend (serviço backend)**
  - `DB_HOST`: host do PostgreSQL (dentro do Docker Compose é `db`)
  - `DB_PORT`: porta do PostgreSQL (padrão `5432`)
  - `DB_USER`: mesmo `POSTGRES_USER`
  - `DB_PASSWORD`: mesmo `POSTGRES_PASSWORD`
  - `DB_NAME`: mesmo `POSTGRES_DB`
  - `NODE_ENV`: `production` ou `development`

- **Frontend (serviço frontend)**
  - `REACT_APP_API_URL`: URL base da API (dentro do Compose, `http://backend:3000`)

Caso rode sem Docker, crie um arquivo `.env` em cada pasta (`backend/` e `frontend/`) definindo essas variáveis antes de iniciar.

---

## Instalação

1. **Clone este repositório**  
   ```bash
   git clone https://github.com/seu-usuario/agenda-app.git
   cd agenda-app

2. **(Opcional) Ajuste variáveis de ambiente**

   - Se for rodar sem Docker, copie e edite:

      - backend/.env.example → backend/.env

      - frontend/.env.example → frontend/.env

---

 ## Execução com Docker Compose
Dentro da pasta raiz (agenda-app/), execute:

```bash
docker-compose up --build
````

O Docker Compose vai:

1. Subir o Postgres (porta local 5433:5432, banco agenda)

2. Aguardar o Postgres ficar saudável

3. Subir o backend NestJS em http://localhost:3000

4. Subir o frontend React em http://localhost:3001 (servido via Nginx)

A primeira vez o volume pgdata será criado. Caso queira reiniciar, rode:

```bash
docker-compose down
docker volume rm pgdata
docker-compose up --build
````

> Observação: para o frontend funcionar, o backend deve estar rodando em http://backend:3000 (dentro da rede Docker Compose). O REACT_APP_API_URL já está configurado para apontar a esse endereço.

---

## Execução Manual

Caso prefira não usar Docker, siga estes passos separadamente para backend e frontend.

### Backend NestJS
1. Acesse a pasta do backend
 ```bash
cd backend
````
2. Instale dependências
```bash
npm install
```

3. Configure variáveis de ambiente
```plaintext

Crie um arquivo backend/.env ou exporte:
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=Postgres@!123
export DB_NAME=agenda
export NODE_ENV=development
```

4. Certifique-se de ter um banco PostgreSQL rodando localmente com essas credenciais.

5. Suba o NestJS
```bash
npm run start:dev
```

A API ficará esperando em http://localhost:3000.

### Frontend React

1. Acesse a pasta do frontend
```bash
cd frontend
```

2. Instale dependências
```bash
npm install
```
3. Configure variável de ambiente
- Crie frontend/.env com:
```plaintext REACT_APP_API_URL=http://localhost:3000 ```

> Isso aponta o cliente Axios para o backend local.

4. Inicie o React em modo de desenvolvimento
```bash npm start ```

5. O CRA abrirá em http://localhost:3000 (ou em http://localhost:3001 se 3000 estiver ocupado). Caso conflitante, edite o script "start" para forçar outra porta.

--- 

## Rotas da API

O backend NestJS expõe um resource /contatos.

- GET /contatos
Retorna um array JSON com todos os contatos:
```json
[
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@example.com",
        "telefone": "11 99999-0001",
        "observacoes": null,
        "criadoEm": "2025-06-06T00: 00: 00.000Z"
    },
    ...
]
```

- GET /contatos/:id
Retorna o contato de id específico:
```json
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@example.com",
        "telefone": "11 99999-0001",
        "observacoes": null,
        "criadoEm": "2025-06-06T00: 00: 00.000Z"
    },
```

- POST /contatos

Cria um novo contato. Envie JSON no corpo:

```json
    {
        "nome": "João Silva",
        "email": "joao@example.com",
        "telefone": "11 99999-0001",
    },
```

Retorna o objeto criado com id e criadoEm.

- PUT /contatos/:id

Atualiza parcialmente um contato existente. Corpo JSON com campos a atualizar, ex:
```json
{
"telefone": "21 99999-1111"
}
```

Retorna o objeto atualizado.

- DELETE /contatos/:id

Remove o contato. Retorna 204 No Content no sucesso.

---

## Uso

1. Acesse no navegador http://localhost:3001.

2. A tela principal (/) exibe a lista de contatos carregados via API.

3. Clique em “Novo Contato” para ir a /cadastro e preencher o formulário.

4. Após salvar, você retorna para a lista e vê o novo registro.

5. Clique em “Remover” ao lado de qualquer contato para excluí-lo—o frontend atualiza instantaneamente.

---

## Observações Finais

1. CORS: o backend está configurado com app.enableCors() para permitir qualquer origem.

2. Volumes: o volume nomeado pgdata garante persistência dos dados do Postgres.

3. Ambientes: em produção, ajuste NODE_ENV=production e configure secrets adequadas.

4. Migrações: para produção, mantenha synchronize: false e use migrações controladas.