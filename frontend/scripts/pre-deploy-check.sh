#!/bin/bash

# RiskGuardian AI - Script de Verificação Pré-Deploy
# Executa verificações antes do deploy na Vercel

set -e

echo "🚀 RiskGuardian AI - Verificação Pré-Deploy"
echo "==========================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    log_error "Execute este script dentro do diretório frontend/"
    exit 1
fi

log_info "Iniciando verificações..."

# 1. Verificar Node.js version
log_info "Verificando versão do Node.js..."
NODE_VERSION=$(node --version)
if [[ $NODE_VERSION =~ ^v1[8-9]\.|^v[2-9][0-9]\. ]]; then
    log_success "Node.js $NODE_VERSION (✓ Compatível)"
else
    log_error "Node.js $NODE_VERSION não é compatível. Necessário v18+"
    exit 1
fi

# 2. Verificar dependências
log_info "Verificando dependências..."
if npm list --depth=0 > /dev/null 2>&1; then
    log_success "Todas as dependências estão instaladas"
else
    log_warning "Algumas dependências podem estar faltando"
    log_info "Instalando dependências..."
    npm install
fi

# 3. Verificar TypeScript
log_info "Verificando TypeScript..."
if npm run type-check > /dev/null 2>&1; then
    log_success "TypeScript - Sem erros de tipos"
else
    log_error "TypeScript - Erros encontrados"
    npm run type-check
    exit 1
fi

# 4. Verificar ESLint
log_info "Verificando ESLint..."
if npm run lint > /dev/null 2>&1; then
    log_success "ESLint - Sem erros de lint"
else
    log_warning "ESLint - Avisos encontrados"
    npm run lint
fi

# 5. Testar build
log_info "Testando build de produção..."
if npm run build > /dev/null 2>&1; then
    log_success "Build de produção executado com sucesso"
    
    # Verificar se .next foi criado
    if [ -d ".next" ]; then
        log_success "Diretório .next criado"
        
        # Verificar tamanho do build
        BUILD_SIZE=$(du -sh .next | cut -f1)
        log_info "Tamanho do build: $BUILD_SIZE"
    else
        log_error "Diretório .next não foi criado"
        exit 1
    fi
else
    log_error "Falha no build de produção"
    npm run build
    exit 1
fi

# 6. Verificar arquivos de configuração
log_info "Verificando arquivos de configuração..."

# Verificar next.config.js
if [ -f "next.config.js" ]; then
    log_success "next.config.js encontrado"
else
    log_error "next.config.js não encontrado"
    exit 1
fi

# Verificar vercel.json na raiz do projeto
if [ -f "../vercel.json" ]; then
    log_success "vercel.json encontrado"
else
    log_error "vercel.json não encontrado na raiz do projeto"
    exit 1
fi

# 7. Verificar variáveis de ambiente
log_info "Verificando configuração de variáveis de ambiente..."
if [ -f "vercel-env.example" ]; then
    log_success "vercel-env.example encontrado"
    log_info "Lembre-se de configurar estas variáveis na Vercel:"
    echo ""
    cat vercel-env.example | grep -E "^[A-Z]" | head -10
    echo ""
else
    log_warning "vercel-env.example não encontrado"
fi

# 8. Verificar rotas da API
log_info "Verificando rotas da API..."
if [ -d "src/app/api" ]; then
    API_ROUTES=$(find src/app/api -name "route.ts" | wc -l)
    log_success "Encontradas $API_ROUTES rotas de API"
else
    log_warning "Diretório src/app/api não encontrado"
fi

# 9. Verificar componentes críticos
log_info "Verificando componentes críticos..."
CRITICAL_FILES=(
    "src/app/layout.tsx"
    "src/app/dashboard/page.tsx"
    "src/providers/root-provider.tsx"
    "src/hooks/useRealTimeData.ts"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "$file ✓"
    else
        log_error "$file não encontrado"
        exit 1
    fi
done

# 10. Limpar cache (opcional)
log_info "Limpando cache..."
rm -rf .next/cache
log_success "Cache limpo"

echo ""
echo "=========================================="
log_success "🎉 Todas as verificações passaram!"
echo "=========================================="
echo ""
log_info "Próximos passos para deploy na Vercel:"
echo "1. Faça commit das alterações"
echo "2. Push para o repositório GitHub"
echo "3. Configure as variáveis de ambiente na Vercel"
echo "4. Execute o deploy"
echo ""
log_info "Consulte o guia: DEPLOY_VERCEL_GUIDE_COMPLETO.md"
echo "" 