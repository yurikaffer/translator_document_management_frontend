# Etapa de construção
FROM node:18-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto para o container
COPY . .

# Compila a aplicação Next.js
RUN npm run build

# Etapa de execução
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários da etapa de construção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Exponha a porta na qual a aplicação estará rodando
EXPOSE 3000

# Comando para rodar a aplicação em modo de produção
CMD ["npx", "next", "start"]