# Dockerfile corrigido para o React + Nginx

# 1) Etapa de build do React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Etapa final: serve com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# NÃO removemos o default.conf do Nginx; assim ele já serve de /usr/share/nginx/html
# Se você quisesse apagar, precisaria fornecer um novo conf. Mas aqui podemos usar o padrão.

# Limpa apenas o conteúdo antigo (se houvesse) e copia o build
RUN rm -rf ./*
COPY --from=builder /app/build .

# Expõe porta 80
EXPOSE 80

# Comando para manter o Nginx rodando em foreground
CMD ["nginx", "-g", "daemon off;"]
