# DESENVOLVIMENTO DO PROJETO

Este documento tem por fim documentar o processo de desenvolvimento, bem como seus desafios e principais tarefas.

---

## PLANEJAMENTO DO PROJETO

Objetivo acadêmico: criar uma aplicação de agenda simples (CRUD de contatos) integrando backend em NestJS e frontend em React, com foco em containerização via Docker.

Definição das funcionalidades mínimas:
- API REST para contatos (endpoints GET, POST, PUT, DELETE)
- Interface web React para listar, adicionar e remover contatos
- Persistência em PostgreSQL
- Orquestração com Docker Compose

Backlog compactado com histórias de usuário básicas e critérios de aceitação mínimos.

---

## SPRINT ÚNICA

- Escopo de uma única sprint:

1. Inicialização do repositório Git e configuração de ESLint/Prettier

2. Estruturação do backend NestJS:
  - Criação do módulo “Contato”
  - Definição da entidade Contato (id, nome, email, telefone, criadoEm)
  - Configuração do TypeORM para conectar ao PostgreSQL
  - Implementação dos controladores e serviços com os endpoints CRUD

3. Estruturação do frontend React:
  - Create React App e instalação de dependências (react-router-dom, axios)
  - Componentes NavBar, ContactList e AddContact
  - Estado de contatos elevado ao App.jsx para sincronizar criação e exclusão em tempo real

4. Configuração do Docker:
  - Dockerfile para o backend (build TypeScript e imagem Node)
  - Dockerfile para o frontend (build React e Nginx)
  - docker-compose.yml para orquestrar três serviços: db (Postgres), backend, frontend
  - Healthcheck no serviço db e script de espera (netcat) no backend

5. Testes básicos manuais:
  - Verificar conexão do NestJS com Postgres no container
  - Testar rotas com Postman/Insomnia
  - Acessar frontend em container e validar fluxo de CRUD
   
6. Documentação final:
  - README.md com instruções de instalação e execução
  - DESENVOLVIMENTO.md (este arquivo) com resumo do processo

---

## DURAÇÃO DA SPRINT E METODOLOGIAS APLICADAS

14 dias (duas semanas) em regime acadêmico, dedicando parte do tempo a estudos e ajustes de Docker, mais do que ao desenvolvimento em si.

- METODOLOGIA ÁGIL UTILIZADA

- Scrum simplificado em uma única sprint:
  - Planejamento inicial para definir backlog e estimativas aproximadas
  - Reuniões informais diárias (ou check-ins pessoais) para avaliar progresso
  - Revisão final (demonstração do app funcionando em containers)
  - Retrospectiva informal para listar aprendizados sobre Docker e integração de tecnologias

---

## FERRAMENTAS UTILIZADAS

- GitHub (repositório, versionamento)

- Docker e Docker Compose (containerização)

- NestJS CLI (scaffold e estrutura de backend)

- Create React App (scaffold e estrutura de frontend)

- Visual Studio Code (IDE) com extensões ESLint, Prettier, Docker

- Postman ou Insomnia (testes de API)

- Terminal (Linux/WSL ou macOS) para comandos Docker e Node

---

## DESAFIOS ENFRENTADOS E SOLUÇÕES ADOTADAS

1. Configuração inicial do TypeORM
  - Desafio: conectar o NestJS ao Postgres dentro do container sem expor dados sensíveis
  - Solução: usar variáveis de ambiente definidas no docker-compose.yml e criar um arquivo data-source.ts apontando para DB_HOST=db, DB_PORT=5432, DB_NAME=agenda

2. Backend iniciando antes do Postgres
  - Desafio: container NestJS falhava ao tentar conectar antes do banco estar pronto
  - Solução: adicionar no comando de inicialização do backend:
      ```bash
        until nc -z db 5432; do sleep 1; done; node dist/main.js
      ```
  - e configurar healthcheck no serviço db para pg_isready

3. Dockerfile do frontend
  - Desafio: remover default.conf do Nginx sem cópia de nova configuração fazia o container parar imediatamente
  - Solução: não remover default.conf ou copiar build React diretamente sobre /usr/share/nginx/html sem alterar config padrão

4. Atualização da lista de contatos no frontend
  - Desafio: componente ContactList não refletia alterações após chamada à API
  - Solução: elevar o estado de contatos ao componente App.jsx, passar setContatos a ContactList e AddContact, garantindo atualização imediata ao criar/excluir

5. CORS entre React e NestJS
  - Desafio: navegador bloqueava requisições do frontend para a API
  - Solução: adicionar app.enableCors() em src/main.ts do backend para liberar qualquer origem durante desenvolvimento acadêmico

5. Documentação e versionamento
  - Desafio: manter README.md e DESENVOLVIMENTO.md claros sem perder foco acadêmico
  - Solução: estruturar arquivos de forma concisa, apontando apenas configurações e dicas essenciais para rodar o projeto

---

### CONCLUSÃO

- Sprint única foi suficiente para implementação acadêmica, com foco predominantemente em configurar Docker e integrar tecnologias.

- Aplicação alcançou o propósito de permitir cadastro, listagem e remoção de contatos de forma containerizada, servindo de material de estudo para Docker, NestJS, React e Postgres.

- Retrospectiva destacou aprendizado em orquestração de containers, configuração de healthchecks e sincronização de estado no frontend.

Próximos passos (além do escopo acadêmico) poderiam incluir testes automatizados, autenticação de usuários e deploy em ambiente de nuvem.