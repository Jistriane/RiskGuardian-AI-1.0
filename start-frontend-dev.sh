#!/bin/bash

# 🚀 RiskGuardian AI - Frontend Development Starter
# Script para inicializar o ambiente de desenvolvimento

echo "🚀 Iniciando RiskGuardian AI Frontend..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Verificar se estamos na pasta correta
if [ ! -f "package.json" ]; then
    error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    error "Node.js não está instalado. Instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

log "✅ Node.js $(node -v) detectado"

# Verificar se yarn ou npm está disponível
if command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
    log "📦 Usando Yarn como gerenciador de pacotes"
elif command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
    log "📦 Usando NPM como gerenciador de pacotes"
else
    error "Nem npm nem yarn foram encontrados"
    exit 1
fi

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    log "📦 Instalando dependências..."
    if [ "$PACKAGE_MANAGER" = "yarn" ]; then
        yarn install
    else
        npm install
    fi
    
    if [ $? -ne 0 ]; then
        error "Falha na instalação das dependências"
        exit 1
    fi
    log "✅ Dependências instaladas com sucesso"
else
    log "✅ Dependências já estão instaladas"
fi

# Verificar arquivo de ambiente
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        log "📄 Criando .env.local a partir de .env.example..."
        cp .env.example .env.local
        warn "⚠️  Configure as variáveis de ambiente em .env.local"
    else
        warn "⚠️  Arquivo .env.local não encontrado. Criando com valores padrão..."
        cat > .env.local << EOL
# RiskGuardian AI - Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000
NEXT_PUBLIC_ELIZAOS_URL=http://localhost:3001
NEXT_PUBLIC_ELIZAOS_WS=ws://localhost:3001
NEXT_PUBLIC_ELIZAOS_AGENT_ID=riskguardian-agent

# Optional: Analytics and monitoring
# NEXT_PUBLIC_ANALYTICS_ID=
# NEXT_PUBLIC_SENTRY_DSN=
EOL
        warn "⚠️  Configure as variáveis de ambiente em .env.local conforme necessário"
    fi
fi

# Verificar se serviços externos estão rodando
info "🔍 Verificando serviços externos..."

# Verificar backend API
API_URL=${NEXT_PUBLIC_API_URL:-"http://localhost:3000/api"}
if curl -s "$API_URL/health" > /dev/null 2>&1; then
    log "✅ Backend API está acessível em $API_URL"
else
    warn "⚠️  Backend API não está acessível em $API_URL"
    warn "   Certifique-se de que o backend está rodando"
fi

# Verificar ElizaOS Agent
ELIZAOS_URL=${NEXT_PUBLIC_ELIZAOS_URL:-"http://localhost:3001"}
if curl -s "$ELIZAOS_URL/health" > /dev/null 2>&1; then
    log "✅ ElizaOS Agent está acessível em $ELIZAOS_URL"
else
    warn "⚠️  ElizaOS Agent não está acessível em $ELIZAOS_URL"
    warn "   O chat com IA pode não funcionar corretamente"
fi

# Verificar TypeScript
log "🔧 Verificando TypeScript..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn tsc --noEmit > /dev/null 2>&1
else
    npx tsc --noEmit > /dev/null 2>&1
fi

if [ $? -eq 0 ]; then
    log "✅ Verificação TypeScript passou"
else
    warn "⚠️  Existem erros de TypeScript. Execute 'npm run type-check' para detalhes"
fi

# Exibir informações úteis
echo ""
info "🌟 Informações do Projeto:"
info "   📁 Diretório: $(pwd)"
info "   📦 Gerenciador: $PACKAGE_MANAGER"
info "   🟢 Node.js: $(node -v)"
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    info "   📦 Yarn: $(yarn -v)"
else
    info "   📦 NPM: $(npm -v)"
fi

echo ""
info "🚀 Comandos Disponíveis:"
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    info "   yarn dev          - Iniciar servidor de desenvolvimento"
    info "   yarn build        - Build para produção"
    info "   yarn start        - Iniciar servidor de produção"
    info "   yarn lint         - Executar linter"
    info "   yarn type-check   - Verificar TypeScript"
else
    info "   npm run dev       - Iniciar servidor de desenvolvimento"
    info "   npm run build     - Build para produção"
    info "   npm run start     - Iniciar servidor de produção"
    info "   npm run lint      - Executar linter"
    info "   npm run type-check - Verificar TypeScript"
fi

echo ""
info "📚 Links Úteis:"
info "   🌐 Frontend: http://localhost:3000"
info "   📡 API Docs: http://localhost:3000/api/docs"
info "   🤖 ElizaOS: http://localhost:3001"
info "   📖 Documentação: ./FRONTEND_IMPLEMENTATION.md"

echo ""
log "🎯 Tudo pronto! Execute o comando abaixo para iniciar:"
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    echo -e "${GREEN}yarn dev${NC}"
else
    echo -e "${GREEN}npm run dev${NC}"
fi

# Perguntar se deve iniciar automaticamente
echo ""
read -p "🚀 Deseja iniciar o servidor de desenvolvimento agora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "🚀 Iniciando servidor de desenvolvimento..."
    if [ "$PACKAGE_MANAGER" = "yarn" ]; then
        yarn dev
    else
        npm run dev
    fi
fi 