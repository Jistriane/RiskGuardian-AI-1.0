FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache git curl python3 make g++

# Criar usuário não-root
RUN addgroup -g 1001 -S contracts && \
    adduser -S contracts -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Instalar Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/root/.foundry/bin:${PATH}"
RUN foundryup

# Copiar arquivos de configuração primeiro
COPY package*.json ./
COPY hardhat.config.ts ./
COPY tsconfig.json ./
COPY remappings.txt ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Alterar proprietário para usuário não-root
RUN chown -R contracts:contracts /app

# Mudar para usuário não-root
USER contracts

# Comando padrão
CMD ["npm", "run", "compile"] 