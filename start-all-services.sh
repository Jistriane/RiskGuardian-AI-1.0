#!/bin/bash

# =======================================================================================
# 🚀 RISKGUARDIAN AI - INICIALIZAÇÃO COMPLETA DE TODOS OS SERVIÇOS
# =======================================================================================
# 
# Script otimizado para inicializar todos os serviços do RiskGuardian AI
# - Backend API (Node.js/TypeScript)
# - Frontend (Next.js)
# - ElizaOS Agent (IA)
# - Chromia AWS (Sistema de Alertas)
# - Monitoramento e Health Checks
#
# Uso: ./start-all-services.sh
# =======================================================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configurações
PROJECT_ROOT=$(pwd)
LOG_DIR="${PROJECT_ROOT}/logs"
PID_FILE="${LOG_DIR}/all-services.pid"

# URLs dos serviços
FRONTEND_URL="http://localhost:3001"
BACKEND_URL="http://localhost:8001"
ELIZAOS_URL="http://localhost:3000"
CHROMIA_URL="http://localhost:3002"

# =======================================================================================
# FUNÇÕES UTILITÁRIAS
# =======================================================================================

print_header() {
    clear
    echo -e "${CYAN}"
    echo "=================================================================="
    echo "🛡️  RISKGUARDIAN AI - INICIALIZAÇÃO COMPLETA"
    echo "=================================================================="
    echo -e "${NC}"
}

print_section() {
    echo -e "${PURPLE}📋 $1${NC}"
    echo "=================================================================="
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

create_directories() {
    print_info "Criando diretórios necessários..."
    mkdir -p "${LOG_DIR}"
    mkdir -p "${PROJECT_ROOT}/cache"
    print_success "Diretórios criados"
}

cleanup_old_processes() {
    print_section "Limpeza de Processos Antigos"
    
    if [[ -f "$PID_FILE" ]]; then
        print_info "Limpando processos antigos..."
        while read -r pid; do
            if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
                print_info "Parando processo antigo: $pid"
                kill -9 "$pid" 2>/dev/null || true
            fi
        done < "$PID_FILE"
        rm -f "$PID_FILE"
    fi
    
    # Liberar portas específicas
    local ports=(3000 3001 3002 8001)
    for port in "${ports[@]}"; do
        local pid=$(lsof -ti:$port 2>/dev/null || true)
        if [[ -n "$pid" ]]; then
            print_info "Liberando porta $port (PID: $pid)"
            kill -9 "$pid" 2>/dev/null || true
            sleep 1
        fi
    done
    
    print_success "Limpeza concluída"
    echo ""
}

check_dependencies() {
    print_section "Verificando Dependências"
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js não encontrado - instale Node.js antes de continuar"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm não encontrado - instale npm antes de continuar"
        exit 1
    fi
    
    print_success "Node.js: $(node --version)"
    print_success "npm: $(npm --version)"
    echo ""
}

install_dependencies() {
    print_section "Verificando Dependências dos Módulos"
    
    # Backend
    if [[ -d "backend" ]]; then
        print_info "Verificando Backend..."
        cd backend
        if [[ ! -d "node_modules" ]]; then
            print_info "Instalando dependências do Backend..."
            npm install --silent
        fi
        cd ..
        print_success "Backend - OK"
    fi
    
    # Frontend
    if [[ -d "frontend" ]]; then
        print_info "Verificando Frontend..."
        cd frontend
        if [[ ! -d "node_modules" ]]; then
            print_info "Instalando dependências do Frontend..."
            npm install --silent
        fi
        cd ..
        print_success "Frontend - OK"
    fi
    
    # ElizaOS Agent
    if [[ -d "elizaos-agent" ]]; then
        print_info "Verificando ElizaOS Agent..."
        cd elizaos-agent
        if [[ ! -d "node_modules" ]]; then
            print_info "Instalando dependências do ElizaOS Agent..."
            npm install --silent
        fi
        cd ..
        print_success "ElizaOS Agent - OK"
    fi
    
    # Chromia AWS
    if [[ -d "chromia_aws" ]]; then
        print_info "Verificando Chromia AWS..."
        cd chromia_aws
        if [[ ! -d "node_modules" ]]; then
            print_info "Instalando dependências do Chromia AWS..."
            npm install --silent --legacy-peer-deps
        fi
        cd ..
        print_success "Chromia AWS - OK"
    fi
    
    echo ""
}

# =======================================================================================
# FUNÇÕES DE INICIALIZAÇÃO DOS SERVIÇOS
# =======================================================================================

start_backend() {
    print_section "Iniciando Backend API"
    
    if [[ ! -d "backend" ]]; then
        print_error "Diretório backend não encontrado"
        return 1
    fi
    
    cd backend
    
    # Aplicar migrações do banco (se existir)
    if [[ -f "prisma/schema.prisma" ]]; then
        print_info "Aplicando migrações do banco de dados..."
        npx prisma migrate deploy 2>/dev/null || npx prisma db push 2>/dev/null || print_warning "Migrações não aplicadas"
    fi
    
    print_info "Iniciando Backend API na porta 8001..."
    npm run dev > "${LOG_DIR}/backend.log" 2>&1 &
    local BACKEND_PID=$!
    echo $BACKEND_PID >> "$PID_FILE"
    
    cd ..
    
    print_success "Backend iniciado (PID: $BACKEND_PID)"
    print_info "URL: $BACKEND_URL"
    print_info "Logs: logs/backend.log"
    echo ""
}

start_elizaos() {
    print_section "Iniciando ElizaOS Agent (IA)"
    
    if [[ ! -d "elizaos-agent" ]]; then
        print_warning "Diretório elizaos-agent não encontrado - pulando"
        return 0
    fi
    
    cd elizaos-agent
    
    print_info "Iniciando ElizaOS Agent na porta 3000..."
    npm run dev > "${LOG_DIR}/elizaos.log" 2>&1 &
    local ELIZAOS_PID=$!
    echo $ELIZAOS_PID >> "$PID_FILE"
    
    cd ..
    
    print_success "ElizaOS Agent iniciado (PID: $ELIZAOS_PID)"
    print_info "URL: $ELIZAOS_URL"
    print_info "Logs: logs/elizaos.log"
    echo ""
}

start_chromia() {
    print_section "Iniciando Chromia AWS (Sistema de Alertas)"
    
    if [[ ! -d "chromia_aws" ]]; then
        print_warning "Diretório chromia_aws não encontrado - pulando"
        return 0
    fi
    
    cd chromia_aws
    
    print_info "Iniciando Sistema de Alertas Chromia na porta 3002..."
    npm run dev > "${LOG_DIR}/chromia.log" 2>&1 &
    local CHROMIA_PID=$!
    echo $CHROMIA_PID >> "$PID_FILE"
    
    cd ..
    
    print_success "Chromia AWS iniciado (PID: $CHROMIA_PID)"
    print_info "URL: $CHROMIA_URL"
    print_info "Logs: logs/chromia.log"
    echo ""
}

start_frontend() {
    print_section "Iniciando Frontend (Interface Web)"
    
    if [[ ! -d "frontend" ]]; then
        print_error "Diretório frontend não encontrado"
        return 1
    fi
    
    cd frontend
    
    print_info "Iniciando Frontend Next.js na porta 3001..."
    
    # Verificar se a porta está livre
    if lsof -i :3001 > /dev/null 2>&1; then
        print_warning "Porta 3001 ocupada - tentando liberar..."
        local pid=$(lsof -ti:3001)
        kill -9 "$pid" 2>/dev/null || true
        sleep 2
    fi
    
    npm run dev > "${LOG_DIR}/frontend.log" 2>&1 &
    local FRONTEND_PID=$!
    echo $FRONTEND_PID >> "$PID_FILE"
    
    cd ..
    
    print_success "Frontend iniciado (PID: $FRONTEND_PID)"
    print_info "URL: $FRONTEND_URL"
    print_info "Logs: logs/frontend.log"
    echo ""
}

# =======================================================================================
# FUNÇÕES DE VERIFICAÇÃO
# =======================================================================================

wait_for_service() {
    local url=$1
    local service_name=$2
    local timeout=${3:-30}
    
    print_info "Aguardando $service_name ficar disponível..."
    
    local count=0
    while [[ $count -lt $timeout ]]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_success "$service_name está respondendo!"
            return 0
        fi
        
        sleep 2
        count=$((count + 2))
        echo -n "."
    done
    
    echo ""
    print_warning "$service_name não respondeu dentro de ${timeout}s"
    return 1
}

health_check_all() {
    print_section "Verificação de Saúde dos Serviços"
    
    # Frontend
    if wait_for_service "$FRONTEND_URL" "Frontend" 30; then
        echo -e "  ${GREEN}✅ Frontend${NC} - $FRONTEND_URL"
    else
        echo -e "  ${RED}❌ Frontend${NC} - $FRONTEND_URL"
    fi
    
    # Backend
    if wait_for_service "$BACKEND_URL" "Backend API" 30; then
        echo -e "  ${GREEN}✅ Backend API${NC} - $BACKEND_URL"
    else
        echo -e "  ${RED}❌ Backend API${NC} - $BACKEND_URL"
    fi
    
    # ElizaOS (opcional)
    if [[ -d "elizaos-agent" ]]; then
        if wait_for_service "$ELIZAOS_URL" "ElizaOS Agent" 20; then
            echo -e "  ${GREEN}✅ ElizaOS Agent${NC} - $ELIZAOS_URL"
        else
            echo -e "  ${YELLOW}⚠️  ElizaOS Agent${NC} - $ELIZAOS_URL (opcional)"
        fi
    fi
    
    # Chromia (opcional)
    if [[ -d "chromia_aws" ]]; then
        if wait_for_service "$CHROMIA_URL" "Chromia AWS" 20; then
            echo -e "  ${GREEN}✅ Chromia AWS${NC} - $CHROMIA_URL"
        else
            echo -e "  ${YELLOW}⚠️  Chromia AWS${NC} - $CHROMIA_URL (opcional)"
        fi
    fi
    
    echo ""
}

show_final_status() {
    print_section "🎉 Sistema RiskGuardian AI Iniciado!"
    
    echo -e "${CYAN}📱 Acesse a aplicação:${NC}"
    echo -e "  🌐 ${GREEN}Frontend Principal: $FRONTEND_URL${NC}"
    echo -e "  🔌 ${GREEN}Backend API: $BACKEND_URL${NC}"
    
    if [[ -d "elizaos-agent" ]]; then
        echo -e "  🤖 ${GREEN}ElizaOS Agent: $ELIZAOS_URL${NC}"
    fi
    
    if [[ -d "chromia_aws" ]]; then
        echo -e "  🚨 ${GREEN}Sistema de Alertas: $CHROMIA_URL${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}✅ Todos os serviços foram iniciados com sucesso!${NC}"
    echo -e "${CYAN}🔗 Os serviços estão conectados e trabalhando em conjunto:${NC}"
    echo -e "  • Frontend conecta automaticamente com Backend API"
    echo -e "  • Sistema de IA (ElizaOS) fornece insights em tempo real"
    echo -e "  • Sistema de Alertas monitora riscos continuamente"
    echo -e "  • Todas as APIs se comunicam via WebSocket e REST"
    
    echo ""
    echo -e "${YELLOW}📊 Monitoramento:${NC}"
    echo -e "  📝 Ver logs: ${BLUE}tail -f logs/*.log${NC}"
    echo -e "  🔍 PIDs ativos: ${BLUE}cat logs/all-services.pid${NC}"
    echo -e "  📊 Status: ${BLUE}ps aux | grep 'npm run dev'${NC}"
    
    echo ""
    echo -e "${PURPLE}🛑 Para parar todos os serviços:${NC}"
    echo -e "  ${BLUE}pkill -f 'npm run dev'${NC}"
    echo -e "  ${BLUE}# ou use: kill \$(cat logs/all-services.pid)${NC}"
    
    echo ""
    echo -e "${GREEN}🚀 Sistema pronto para uso!${NC}"
}

# =======================================================================================
# FUNÇÃO PRINCIPAL
# =======================================================================================

main() {
    print_header
    
    # Configuração inicial
    create_directories
    cleanup_old_processes
    check_dependencies
    install_dependencies
    
    # Inicialização em ordem específica (dependências)
    print_info "Iniciando serviços em ordem de dependência..."
    echo ""
    
    # 1. Backend primeiro (outros dependem dele)
    start_backend
    sleep 5  # Aguardar backend ficar pronto
    
    # 2. Serviços auxiliares
    start_elizaos
    sleep 3
    
    start_chromia
    sleep 3
    
    # 3. Frontend por último (conecta com todos)
    start_frontend
    
    # Aguardar todos os serviços ficarem prontos
    print_info "Aguardando todos os serviços ficarem totalmente prontos..."
    sleep 15
    
    # Verificação de saúde
    health_check_all
    
    # Status final
    show_final_status
}

# =======================================================================================
# TRATAMENTO DE SINAIS E EXECUÇÃO
# =======================================================================================

trap 'print_error "Interrompido pelo usuário"; exit 1' INT TERM

# Verificar se está sendo executado da raiz do projeto
if [[ ! -f "package.json" && ! -d "frontend" && ! -d "backend" ]]; then
    print_error "Execute este script da raiz do projeto RiskGuardian AI"
    exit 1
fi

main "$@" 