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

# ================================================================================
# ⚙️ RISKGUARDIAN AI - CONFIGURAÇÃO INICIAL
# ================================================================================
# 
# Script de configuração inicial para primeiros usuários
# Prepara o ambiente e explica como usar o sistema
#
# ================================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_ROOT=$(pwd)

log() {
    echo -e "${GREEN}[SETUP]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

show_welcome() {
    echo -e "${PURPLE}"
    echo "════════════════════════════════════════════════════════════════════════"
    echo "║                  🛡️  RISKGUARDIAN AI SETUP                           ║"
    echo "║               Configuração Inicial do Sistema                         ║"
    echo "════════════════════════════════════════════════════════════════════════"
    echo -e "${NC}"
    echo ""
    echo -e "${CYAN}Bem-vindo ao RiskGuardian AI!${NC}"
    echo "Este script irá configurar seu ambiente de desenvolvimento."
    echo ""
}

check_system() {
    log "🔍 Verificando sistema..."
    
    # Check OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        info "Sistema: Linux ✅"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        info "Sistema: macOS ✅"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        info "Sistema: Windows ✅"
    else
        warning "Sistema não testado: $OSTYPE"
    fi
    
    # Check Node.js
    if command_exists "node"; then
        local node_version=$(node --version)
        local major_version=$(echo $node_version | cut -d'v' -f2 | cut -d'.' -f1)
        
        if [ "$major_version" -ge 18 ]; then
            success "Node.js $node_version ✅"
        else
            error "Node.js 18+ necessário. Versão atual: $node_version"
            echo "Instale uma versão mais recente: https://nodejs.org/"
            exit 1
        fi
    else
        error "Node.js não encontrado!"
        echo "Instale Node.js 18+: https://nodejs.org/"
        exit 1
    fi
    
    # Check npm
    if command_exists "npm"; then
        local npm_version=$(npm --version)
        success "npm $npm_version ✅"
    else
        error "npm não encontrado!"
        exit 1
    fi
    
    # Check git
    if command_exists "git"; then
        local git_version=$(git --version)
        success "$git_version ✅"
    else
        warning "Git não encontrado - alguns recursos podem não funcionar"
    fi
    
    # Optional tools
    if command_exists "curl"; then
        info "curl disponível ✅"
    else
        warning "curl não encontrado - health checks podem falhar"
    fi
    
    echo ""
}

setup_environment() {
    log "🔧 Configurando ambiente..."
    
    # Create .gitignore additions if needed
    if [ ! -f ".gitignore" ]; then
        log "Criando .gitignore..."
        cat > .gitignore << 'GITIGNORE'
# RiskGuardian AI
riskguardian-startup.log
*.pid
.env-*
node_modules/
dist/
build/
.next/
GITIGNORE
    else
        # Add RiskGuardian specific ignores
        if ! grep -q "riskguardian-startup.log" .gitignore 2>/dev/null; then
            log "Adicionando entradas ao .gitignore..."
            echo "" >> .gitignore
            echo "# RiskGuardian AI" >> .gitignore
            echo "riskguardian-startup.log" >> .gitignore
            echo "*.pid" >> .gitignore
        fi
    fi
    
    # Make scripts executable
    log "Tornando scripts executáveis..."
    chmod +x *.sh 2>/dev/null || true
    
    # Create environment template if needed
    if [ ! -f "backend/.env-dev" ] && [ -f "backend/env.example" ]; then
        log "Criando arquivo de ambiente de desenvolvimento..."
        cp backend/env.example backend/.env-dev
        info "Edite backend/.env-dev com suas configurações"
    fi
    
    success "Ambiente configurado!"
    echo ""
}

install_dependencies() {
    log "📦 Instalando dependências..."
    
    ./start-riskguardian.sh test
    
    success "Dependências instaladas!"
    echo ""
}

show_next_steps() {
    echo -e "${CYAN}🚀 Próximos Passos:${NC}"
    echo ""
    echo "1. ${YELLOW}Iniciar o sistema:${NC}"
    echo "   ./start-riskguardian.sh dev"
    echo ""
    echo "2. ${YELLOW}Verificar status:${NC}"
    echo "   ./status-riskguardian.sh"
    echo ""
    echo "3. ${YELLOW}Acessar aplicação:${NC}"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:3001"
    echo ""
    echo "4. ${YELLOW}Parar sistema:${NC}"
    echo "   ./stop-riskguardian.sh"
    echo ""
    echo -e "${CYAN}📚 Documentação:${NC}"
    echo "   cat SCRIPTS_SISTEMA.md"
    echo ""
    echo -e "${CYAN}🔗 URLs de Produção:${NC}"
    echo "   Frontend: https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app"
    echo "   Backend:  https://riskguardian-backend.onrender.com"
    echo ""
}

show_tips() {
    echo -e "${YELLOW}💡 Dicas Úteis:${NC}"
    echo ""
    echo "• Use ${CYAN}./start-riskguardian.sh dev${NC} para desenvolvimento"
    echo "• Use ${CYAN}./start-riskguardian.sh blockchain${NC} apenas para testes de contratos"
    echo "• Use ${CYAN}./status-riskguardian.sh${NC} para monitorar o sistema"
    echo "• Logs ficam em ${CYAN}riskguardian-startup.log${NC}"
    echo "• Pressione ${CYAN}Ctrl+C${NC} para parar os serviços"
    echo ""
    echo -e "${GREEN}🛡️ RiskGuardian AI configurado com sucesso!${NC}"
    echo ""
}

main() {
    show_welcome
    
    check_system
    setup_environment
    install_dependencies
    
    echo -e "${GREEN}"
    echo "════════════════════════════════════════════════════════════════════════"
    echo "║                        ✅ SETUP COMPLETO                              ║"
    echo "════════════════════════════════════════════════════════════════════════"
    echo -e "${NC}"
    echo ""
    
    show_next_steps
    show_tips
}

main "$@"
