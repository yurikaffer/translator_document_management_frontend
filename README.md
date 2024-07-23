# Translator Document Management Front-end

Front-end para consumo da API através de uma interface de usuário amigável e responsiva.

## Tecnologias Utilizadas

- **Next.js 14.2.4**
- **React 18.3.1**
- **TypeScript 5.0.4**
- **TailwindCSS 3.4.3**
- **Axios**
- **SW**R
- **Zod**
- **ESLint**
- **Prettier**
- **Docker**

## Funcionalidades do Sistema

1. **Configuração de Formulários**
    - Utilização do `react-hook-form` para gerenciamento de formulários
    - Validação de formulários com `@hookform/resolvers` e `zod`
2. **Componentes UI**
    - Utilização de componentes da biblioteca `@nextui-org`
    - Configuração de tema com `next-themes`
3. **Interações e Animações**
    - Animações utilizando `framer-motion`
4. **Gerenciamento de Dados**
    - Fetching de dados com `axios`
    - SWR para caching e revalidação de dados

## Configurações

### Variáveis de Ambiente

O sistema utiliza variáveis de ambiente para configuração de URLs e modo de execução:

- `NEXT_PUBLIC_API_BASE_URL`: URL base para a API
- `NODE_ENV`: Ambiente de execução (`development`, `production`)

Exemplo de um arquivo `.env`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1/
NODE_ENV=production
```

### Docker

O projeto inclui um `Dockerfile` para construção da imagem Docker e um `docker-compose.yml` para orquestração dos serviços.

## Como Executar a Aplicação

### Pré-requisitos

- **Node.js 18**
- **NPM ou Yarn**
- **Docker**
- **Docker Compose**

### Passos para execução

1. **Clone o Repositório:**
    
    ```bash
    git clone https://github.com/seu_usuario/next-app-template
    cd next-app-template
    ```
    
2. **Instale as Dependências:**
    
    ```bash
    npm install
    # ou
    yarn install
    ```
    
3. **Configure as Variáveis de Ambiente:**
    
    Crie um arquivo `.env`na raiz do projeto com as seguintes configurações:
    
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1/
    #Ou aponte para a url da api.
    ```
    
4. **Execute a Aplicação em Desenvolvimento:**
    
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    
5. **Construa e Execute a Aplicação em Produção:**
    
    ```bash
    npm run build
    npm start
    # ou
    yarn build
    yarn start
    
    ```
    

### Executando com Docker

1. **Construa e Execute os Serviços com Docker Compose:**
    
    ```bash
    docker-compose up --build
    ```
    
2. **Acesse a Aplicação**
    
    A aplicação estará disponível em `http://localhost:3000`.
    

## Scripts Disponíveis

- `dev`: Inicia a aplicação Next.js em modo de desenvolvimento
- `build`: Constrói a aplicação para produção
- `start`: Inicia a aplicação em modo de produção
- `lint`: Executa o ESLint para verificação de código

## Notas do Desenvolvedor

1. Como eu sabia que o tempo ficaria apertado para implementar tudo que eu tinha em mente, tomei a decisão de utilizar o Nextjs com React por estar mais familiarizado com as tecnologias e garantir a entrega de uma solução. (Espero muito que essa decisão não me desqualifique do processo 😭)
2. O processo de desenvolvimento de toda a solução foi massa.
3. Ainda há muitas oportunidades de melhorias, boas práticas e refatoração de código. (Conforme o tempo foi apertando o código foi ficando mais feio 😅)