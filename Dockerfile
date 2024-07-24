# Etapa de construção e desenvolvimento
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto para o container
COPY . .

# Exponha a porta na qual a aplicação estará rodando
EXPOSE 3000

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npx", "next", "dev"]
