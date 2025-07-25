#!/bin/bash
#
# RiskGuardian AI - Sistema Avançado de Proteção DeFi
# Author: Jistriane (jistriane@live.com)
# Description: Sistema completo de gestão de riscos para portfolios DeFi
# GitHub: https://github.com/Jistriane/RiskGuardian-AI-1.0
# LinkedIn: https://www.linkedin.com/in/jibso
# Twitter: @jistriane
# License: MIT
# Version: 1.0.0
# Created: 2025
#

#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para exibir mensagens
log() {
  echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
  echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warn() {
  echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
  error "Node.js não está instalado. Por favor, instale o Node.js e tente novamente."
  exit 1
fi

# Criar diretório de logs se não existir
mkdir -p logs

# Instalar dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
  log "Instalando dependências..."
  npm install
fi

# Verificar se .env existe, se não copiar do exemplo
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  log "Copiando .env.example para .env..."
  cp .env.example .env
  warn "Arquivo .env criado. Por favor, atualize as variáveis de ambiente."
fi

# Iniciar o servidor de desenvolvimento
log "Iniciando servidor de desenvolvimento..."
npm run dev 