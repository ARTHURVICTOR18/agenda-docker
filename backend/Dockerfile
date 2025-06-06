# Etapa de build: utiliza imagem oficial Node
FROM node:18-alpine AS builder

WORKDIR /app

# 1) Copia package.json e package-lock.json
COPY package*.json ./

# 2) Instala todas as dependências (incluindo devDependencies)
RUN npm install

# 3) Copia o restante do código e executa o build do Nest
COPY . .
RUN npm run build

# Etapa final: imagem mínima apenas com dist e node_modules
FROM node:18-alpine AS runner

WORKDIR /app

# Copia node_modules e dist do estágio “builder”
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta 3000
EXPOSE 3000

# Inicia a aplicação em produção
CMD ["node", "dist/main.js"]
