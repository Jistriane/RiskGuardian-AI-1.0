#!/bin/bash

# =======================================================================================
# 🚀 RISKGUARDIAN AI - SISTEMA DE INICIALIZAÇÃO COMPLETO
# =======================================================================================
# 
# Sistema de gestão completo para o projeto RiskGuardian AI
# Inclui: Frontend, Backend, ElizaOS Agent, Chromia AWS, Blockchain e monitoramento
#
# Uso: ./riskguardian-start.sh [comando] [opções]
# =======================================================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
NC='\033[0m' # No Color

# Configurações
PROJECT_ROOT=$(pwd)
LOG_FILE="${PROJECT_ROOT}/logs/riskguardian-system.log"
PID_FILE="${PROJECT_ROOT}/logs/system.pid"

# URLs e portas dos serviços
FRONTEND_URL="http://localhost:3001"
BACKEND_URL="http://localhost:8001"
ELIZAOS_URL="http://localhost:3000"
CHROMIA_URL="http://localhost:3002"
POSTGRES_URL="http://localhost:5432"
REDIS_URL="http://localhost:6379"
ANVIL_URL="http://localhost:8545"
PGADMIN_URL="http://localhost:5050"

# =======================================================================================
# FUNÇÕES UTILITÁRIAS
# =======================================================================================

print_header() {
    echo -e "${CYAN}"
    echo "=================================================================="
    echo "🛡️  RISKGUARDIAN AI - SISTEMA DE GESTÃO COMPLETO"
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

log_message() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" >> "$LOG_FILE"
}

create_log_directory() {
    if [[ ! -d "${PROJECT_ROOT}/logs" ]]; then
        mkdir -p "${PROJECT_ROOT}/logs"
        print_info "Diretório de logs criado"
    fi
}

check_dependencies() {
    print_section "Verificando Dependências"
    
    local missing_deps=0
    
    # Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js não encontrado"
        missing_deps=$((missing_deps + 1))
    else
        local node_version=$(node --version)
        print_success "Node.js: $node_version"
    fi
    
    # npm
    if ! command -v npm &> /dev/null; then
        print_error "npm não encontrado"
        missing_deps=$((missing_deps + 1))
    else
        local npm_version=$(npm --version)
        print_success "npm: $npm_version"
    fi
    
    # Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker não encontrado"
        missing_deps=$((missing_deps + 1))
    else
        local docker_version=$(docker --version)
        print_success "Docker: $docker_version"
    fi
    
    # Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose não encontrado"
        missing_deps=$((missing_deps + 1))
    else
        local compose_version=$(docker-compose --version)
        print_success "Docker Compose: $compose_version"
    fi
    
    if [[ $missing_deps -gt 0 ]]; then
        print_error "Dependências obrigatórias não encontradas. Instale-as antes de continuar."
        exit 1
    fi
    
    echo ""
}

check_environment() {
    print_section "Verificando Configuração de Ambiente"
    
    # Verificar se os arquivos .env existem
    local env_files=(".env" "backend/.env" "frontend/.env.local" "elizaos-agent/.env" "chromia_aws/.env")
    
    for env_file in "${env_files[@]}"; do
        if [[ -f "$env_file" ]]; then
            print_success "Arquivo de ambiente: $env_file"
        else
            print_warning "Arquivo de ambiente não encontrado: $env_file"
        fi
    done
    
    # Verificar variáveis de ambiente críticas
    if [[ -z "$OPENAI_API_KEY" && -z "$ANTHROPIC_API_KEY" ]]; then
        print_warning "Nenhuma chave de API de IA configurada"
    fi
    
    if [[ -z "$ALCHEMY_API_KEY" ]]; then
        print_warning "Chave da API Alchemy não configurada"
    fi
    
    echo ""
}

# =======================================================================================
# FUNÇÕES DE GERENCIAMENTO DE SERVIÇOS
# =======================================================================================

install_dependencies() {
    print_section "Instalando Dependências"
    
    # Verificar se há package.json na raiz (estrutura antiga)
    if [[ -f "package.json" ]]; then
        print_info "Instalando dependências principais..."
        npm install --legacy-peer-deps 2>/dev/null || npm install --force
    else
        print_info "Estrutura modular detectada - instalando módulos individuais..."
    fi
    
    # Frontend
    if [[ -d "frontend" ]]; then
        print_info "Instalando dependências do Frontend..."
        cd frontend && npm install && cd ..
        print_success "Frontend - dependências instaladas"
    else
        print_warning "Diretório frontend não encontrado"
    fi
    
    # Backend
    if [[ -d "backend" ]]; then
        print_info "Instalando dependências do Backend..."
        cd backend && npm install && cd ..
        print_success "Backend - dependências instaladas"
    else
        print_warning "Diretório backend não encontrado"
    fi
    
    # ElizaOS Agent
    if [[ -d "elizaos-agent" ]]; then
        print_info "Instalando dependências do ElizaOS Agent..."
        cd elizaos-agent && npm install && cd ..
        print_success "ElizaOS Agent - dependências instaladas"
    else
        print_warning "Diretório elizaos-agent não encontrado"
    fi
    
    # Chromia AWS
    if [[ -d "chromia_aws" ]]; then
        print_info "Instalando dependências do Chromia AWS..."
        cd chromia_aws && npm install --legacy-peer-deps 2>/dev/null || (print_warning "Usando --force para resolver conflitos..." && npm install --force) && cd ..
        print_success "Chromia AWS - dependências instaladas"
    else
        print_warning "Diretório chromia_aws não encontrado"
    fi
    
    print_success "Instalação de dependências concluída!"
    echo ""
}

build_all() {
    print_section "Compilando Todos os Serviços"
    
    # Backend
    if [[ -d "backend" ]]; then
        print_info "Compilando Backend..."
        cd backend && npm run build 2>/dev/null || print_warning "Build do Backend falhou ou não configurado" && cd ..
    else
        print_warning "Diretório backend não encontrado"
    fi
    
    # Frontend
    if [[ -d "frontend" ]]; then
        print_info "Compilando Frontend..."
        cd frontend && npm run build 2>/dev/null || print_warning "Build do Frontend falhou ou não configurado" && cd ..
    else
        print_warning "Diretório frontend não encontrado"
    fi
    
    # ElizaOS Agent
    if [[ -d "elizaos-agent" ]]; then
        print_info "Compilando ElizaOS Agent..."
        cd elizaos-agent && npm run build 2>/dev/null || print_warning "Build do ElizaOS falhou ou não configurado" && cd ..
    else
        print_warning "Diretório elizaos-agent não encontrado"
    fi
    
    # Chromia AWS
    if [[ -d "chromia_aws" ]]; then
        print_info "Compilando Chromia AWS..."
        cd chromia_aws && npm run build 2>/dev/null || print_warning "Build do Chromia falhou ou não configurado" && cd ..
    else
        print_warning "Diretório chromia_aws não encontrado"
    fi
    
    print_success "Processo de build concluído!"
    echo ""
}

check_port_usage() {
    local port=$1
    local service=$2
    
    if lsof -i :$port > /dev/null 2>&1; then
        print_warning "Porta $port já está em uso (possivelmente $service já rodando)"
        print_info "Para liberar a porta: sudo lsof -ti:$port | xargs sudo kill -9"
        return 1
    fi
    return 0
}

start_infrastructure() {
    print_section "Iniciando Infraestrutura (Docker)"
    
    # Verificar portas em uso
    print_info "Verificando portas disponíveis..."
    check_port_usage 5432 "PostgreSQL"
    check_port_usage 6379 "Redis"
    check_port_usage 8545 "Anvil"
    
    print_info "Parando containers existentes..."
    docker-compose down -v 2>/dev/null || true
    
    # Aguardar um pouco para as portas serem liberadas
    sleep 3
    
    print_info "Iniciando serviços de infraestrutura..."
    if docker-compose up -d postgres redis anvil 2>/dev/null; then
        print_info "Aguardando serviços ficarem prontos..."
        sleep 15
        
        # Verificar se os serviços estão rodando
        if docker-compose ps | grep -q "postgres.*Up"; then
            print_success "PostgreSQL: Ativo"
        else
            print_error "PostgreSQL: Falha ao iniciar"
        fi
        
        if docker-compose ps | grep -q "redis.*Up"; then
            print_success "Redis: Ativo"
        else
            print_error "Redis: Falha ao iniciar"
        fi
        
        if docker-compose ps | grep -q "anvil.*Up"; then
            print_success "Anvil (Blockchain Local): Ativo"
        else
            print_error "Anvil: Falha ao iniciar"
        fi
    else
        print_error "Falha ao iniciar infraestrutura Docker"
        print_info "Tentando usar serviços locais existentes..."
    fi
    
    echo ""
}

start_backend() {
    print_section "Iniciando Backend API"
    
    if [[ ! -d "backend" ]]; then
        print_error "Diretório backend não encontrado"
        return 1
    fi
    
    cd backend
    
    # Verificar se package.json existe
    if [[ ! -f "package.json" ]]; then
        print_error "package.json não encontrado no backend"
        cd ..
        return 1
    fi
    
    # Aplicar migrações do banco de dados (se Prisma estiver configurado)
    if [[ -f "prisma/schema.prisma" ]]; then
        print_info "Aplicando migrações do banco de dados..."
        npx prisma migrate deploy 2>/dev/null || npx prisma db push 2>/dev/null || print_warning "Migrações não aplicadas (banco pode não estar disponível)"
    fi
    
    print_info "Iniciando servidor backend em modo desenvolvimento..."
    if npm run dev > ../logs/backend.log 2>&1 &
    then
        BACKEND_PID=$!
        echo $BACKEND_PID >> "$PID_FILE"
        print_success "Backend iniciado (PID: $BACKEND_PID)"
        print_info "URL: $BACKEND_URL"
        print_info "Logs: logs/backend.log"
    else
        print_error "Falha ao iniciar backend"
    fi
    
    cd ..
    echo ""
}

start_elizaos() {
    print_section "Iniciando ElizaOS Agent"
    
    cd elizaos-agent
    
    print_info "Iniciando agente de IA ElizaOS..."
    npm run dev &
    ELIZAOS_PID=$!
    echo $ELIZAOS_PID >> "$PID_FILE"
    
    cd ..
    
    print_success "ElizaOS Agent iniciado (PID: $ELIZAOS_PID)"
    print_info "URL: $ELIZAOS_URL"
    echo ""
}

start_chromia() {
    print_section "Iniciando Chromia AWS (Sistema de Alertas)"
    
    cd chromia_aws
    
    print_info "Iniciando sistema de alertas Chromia..."
    npm run dev &
    CHROMIA_PID=$!
    echo $CHROMIA_PID >> "$PID_FILE"
    
    cd ..
    
    print_success "Chromia AWS iniciado (PID: $CHROMIA_PID)"
    print_info "URL: $CHROMIA_URL"
    echo ""
}

start_frontend() {
    print_section "Iniciando Frontend"
    
    if [[ ! -d "frontend" ]]; then
        print_error "Diretório frontend não encontrado"
        return 1
    fi
    
    cd frontend
    
    # Verificar se package.json existe
    if [[ ! -f "package.json" ]]; then
        print_error "package.json não encontrado no frontend"
        cd ..
        return 1
    fi
    
    # Usar o script de inicialização que criamos
    if [[ -f "start-frontend.sh" ]]; then
        print_info "Usando script de inicialização do frontend..."
        chmod +x start-frontend.sh
        ./start-frontend.sh
        cd ..
        return 0
    fi
    
    print_info "Iniciando aplicação frontend..."
    if npm run dev > ../logs/frontend.log 2>&1 &
    then
        FRONTEND_PID=$!
        echo $FRONTEND_PID >> "$PID_FILE"
        print_success "Frontend iniciado (PID: $FRONTEND_PID)"
        print_info "URL: $FRONTEND_URL"
        print_info "Logs: logs/frontend.log"
    else
        print_error "Falha ao iniciar frontend"
    fi
    
    cd ..
    echo ""
}

# =======================================================================================
# FUNÇÕES DE BLOCKCHAIN
# =======================================================================================

deploy_contracts() {
    print_section "Deploy de Contratos Inteligentes"
    
    print_info "Compilando contratos..."
    npx hardhat compile
    
    print_info "Fazendo deploy no Anvil (local)..."
    npx hardhat run scripts/deploy-hedge-contracts.ts --network localhost
    
    print_success "Contratos deployados com sucesso!"
    echo ""
}

deploy_testnet() {
    print_section "Deploy na Testnet (Sepolia)"
    
    print_warning "Você tem certeza que deseja fazer deploy na Sepolia Testnet? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_info "Fazendo deploy na Sepolia..."
        npx hardhat run scripts/deploy-hedge-contracts.ts --network sepolia
        print_success "Deploy na testnet concluído!"
    else
        print_info "Deploy na testnet cancelado."
    fi
    
    echo ""
}

configure_contracts() {
    print_section "Configurando Contratos"
    
    print_info "Configurando contratos de hedge..."
    npx hardhat run scripts/configure-hedge-contracts.ts --network localhost
    
    print_success "Contratos configurados!"
    echo ""
}

register_automation() {
    print_section "Registrando Automação Chainlink"
    
    print_info "Aprovando LINK tokens..."
    npx hardhat run scripts/approve-link.ts --network sepolia
    
    print_info "Registrando upkeep..."
    npx hardhat run scripts/register-automation.ts --network sepolia
    
    print_success "Automação registrada!"
    echo ""
}

# =======================================================================================
# FUNÇÕES DE MONITORAMENTO
# =======================================================================================

show_status() {
    print_section "Status dos Serviços"
    
    # Verificar infraestrutura
    print_info "🔧 Infraestrutura:"
    
    if docker-compose ps | grep -q "postgres.*Up"; then
        echo -e "  ${GREEN}✅ PostgreSQL${NC} - $POSTGRES_URL"
    else
        echo -e "  ${RED}❌ PostgreSQL${NC} - Inativo"
    fi
    
    if docker-compose ps | grep -q "redis.*Up"; then
        echo -e "  ${GREEN}✅ Redis${NC} - $REDIS_URL"
    else
        echo -e "  ${RED}❌ Redis${NC} - Inativo"
    fi
    
    if docker-compose ps | grep -q "anvil.*Up"; then
        echo -e "  ${GREEN}✅ Anvil (Blockchain)${NC} - $ANVIL_URL"
    else
        echo -e "  ${RED}❌ Anvil${NC} - Inativo"
    fi
    
    echo ""
    print_info "🚀 Aplicações:"
    
    # Verificar serviços principais
    if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Frontend${NC} - $FRONTEND_URL"
    else
        echo -e "  ${RED}❌ Frontend${NC} - $FRONTEND_URL"
    fi
    
    if curl -s "$BACKEND_URL/api/health" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Backend API${NC} - $BACKEND_URL"
    else
        echo -e "  ${RED}❌ Backend API${NC} - $BACKEND_URL"
    fi
    
    if curl -s "$ELIZAOS_URL/health" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ ElizaOS Agent${NC} - $ELIZAOS_URL"
    else
        echo -e "  ${RED}❌ ElizaOS Agent${NC} - $ELIZAOS_URL"
    fi
    
    if curl -s "$CHROMIA_URL/health" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Chromia AWS${NC} - $CHROMIA_URL"
    else
        echo -e "  ${RED}❌ Chromia AWS${NC} - $CHROMIA_URL"
    fi
    
    echo ""
    print_info "📊 Ferramentas de Administração:"
    echo -e "  ${BLUE}🔗 PgAdmin${NC} - $PGADMIN_URL"
    echo ""
}

show_logs() {
    print_section "Logs do Sistema"
    
    if [[ -f "$LOG_FILE" ]]; then
        tail -n 50 "$LOG_FILE"
    else
        print_warning "Arquivo de log não encontrado"
    fi
    
    echo ""
}

monitor_realtime() {
    print_section "Monitor em Tempo Real"
    
    print_info "Monitorando serviços (Ctrl+C para sair)..."
    
    while true; do
        clear
        print_header
        show_status
        sleep 5
    done
}

# =======================================================================================
# FUNÇÕES DE LIMPEZA E MANUTENÇÃO
# =======================================================================================

free_ports() {
    print_section "Liberando Portas Ocupadas"
    
    local ports=(3000 3001 3002 3003 8001 5432 6379 8545)
    
    for port in "${ports[@]}"; do
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [[ -n "$pid" ]]; then
            print_info "Liberando porta $port (PID: $pid)..."
            kill -9 $pid 2>/dev/null || sudo kill -9 $pid 2>/dev/null
            print_success "Porta $port liberada"
        else
            print_info "Porta $port: Livre"
        fi
    done
    
    echo ""
}

stop_all() {
    print_section "Parando Todos os Serviços"
    
    # Parar aplicações Node.js
    if [[ -f "$PID_FILE" ]]; then
        print_info "Parando aplicações Node.js..."
        while read -r pid; do
            if kill -0 "$pid" 2>/dev/null; then
                kill "$pid"
                print_info "Processo $pid parado"
            fi
        done < "$PID_FILE"
        rm -f "$PID_FILE"
    fi
    
    # Parar containers Docker
    print_info "Parando containers Docker..."
    docker-compose down -v
    
    print_success "Todos os serviços foram parados!"
    echo ""
}

clean_all() {
    print_section "Limpeza Completa do Sistema"
    
    print_warning "Isso irá remover todos os dados locais. Continuar? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        # Parar tudo primeiro
        stop_all
        
        # Limpar node_modules
        print_info "Removendo node_modules..."
        find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
        
        # Limpar builds
        print_info "Removendo builds..."
        rm -rf frontend/.next
        rm -rf backend/dist
        rm -rf elizaos-agent/dist
        rm -rf chromia_aws/dist
        
        # Limpar cache
        print_info "Removendo cache..."
        rm -rf cache
        rm -rf .next
        
        # Limpar logs
        print_info "Removendo logs..."
        rm -rf logs/*
        
        # Limpar volumes Docker
        print_info "Removendo volumes Docker..."
        docker system prune -af --volumes
        
        print_success "Limpeza completa realizada!"
    else
        print_info "Limpeza cancelada."
    fi
    
    echo ""
}

reset_database() {
    print_section "Resetando Banco de Dados"
    
    print_warning "Isso irá apagar todos os dados do banco. Continuar? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        cd backend
        
        print_info "Resetando banco de dados..."
        npx prisma migrate reset --force
        
        print_info "Aplicando seeds..."
        npx prisma db seed 2>/dev/null || true
        
        cd ..
        
        print_success "Banco de dados resetado!"
    else
        print_info "Reset cancelado."
    fi
    
    echo ""
}

# =======================================================================================
# FUNÇÕES DE TESTE
# =======================================================================================

run_tests() {
    print_section "Executando Testes"
    
    # Testes do Backend
    print_info "Executando testes do Backend..."
    cd backend && npm test && cd ..
    
    # Testes dos contratos
    print_info "Executando testes de contratos..."
    npx hardhat test
    
    print_success "Todos os testes executados!"
    echo ""
}

run_integration_tests() {
    print_section "Executando Testes de Integração"
    
    print_info "Executando script de testes de integração..."
    ./scripts/test-integration.sh
    
    print_success "Testes de integração concluídos!"
    echo ""
}

# =======================================================================================
# FUNÇÃO DE AJUDA
# =======================================================================================

show_help() {
    print_header
    echo "Uso: ./riskguardian-start.sh [comando] [opções]"
    echo ""
    echo "📋 COMANDOS DISPONÍVEIS:"
    echo ""
    echo "🚀 INICIALIZAÇÃO:"
    echo "  start               - Inicia todo o sistema com Docker (completo)"
    echo "  start-local         - Inicia todo o sistema SEM Docker (recomendado)"
    echo "  quick-start         - Início rápido sem verificações"
    echo "  install             - Instala todas as dependências"
    echo "  setup               - Configuração inicial completa"
    echo ""
    echo "🔧 SERVIÇOS INDIVIDUAIS:"
    echo "  start-infra         - Inicia apenas infraestrutura (Docker)"
    echo "  start-backend       - Inicia apenas Backend API"
    echo "  start-frontend      - Inicia apenas Frontend"
    echo "  start-elizaos       - Inicia apenas ElizaOS Agent"
    echo "  start-chromia       - Inicia apenas Chromia AWS"
    echo ""
    echo "🔗 BLOCKCHAIN:"
    echo "  deploy              - Deploy contratos (local)"
    echo "  deploy-testnet      - Deploy contratos (Sepolia)"
    echo "  configure-contracts - Configura contratos deployados"
    echo "  register-automation - Registra automação Chainlink"
    echo ""
    echo "📊 MONITORAMENTO:"
    echo "  status              - Mostra status dos serviços (Docker)"
    echo "  status-local        - Mostra status dos serviços locais"
    echo "  logs                - Mostra logs do sistema"
    echo "  logs-local          - Mostra logs dos serviços locais"
    echo "  monitor             - Monitor em tempo real"
    echo ""
    echo "🧪 TESTES:"
    echo "  test                - Executa todos os testes"
    echo "  test-integration    - Executa testes de integração"
    echo ""
    echo "🧹 MANUTENÇÃO:"
    echo "  stop                - Para todos os serviços (Docker)"
    echo "  stop-local          - Para todos os serviços locais"
    echo "  restart             - Reinicia todo o sistema"
    echo "  restart-local       - Reinicia sistema local"
    echo "  clean               - Limpeza completa"
    echo "  reset-db            - Reseta banco de dados"
    echo "  build               - Compila todos os serviços"
    echo "  free-ports          - Libera portas ocupadas"
    echo ""
    echo "❓ AJUDA:"
    echo "  help                - Mostra esta ajuda"
    echo "  version             - Mostra versão do sistema"
    echo ""
}

show_version() {
    print_header
    echo "RiskGuardian AI System Manager v1.0.0"
    echo "Sistema de gestão completo para DeFi Risk Management"
    echo ""
    echo "Componentes:"
    echo "  Frontend:          Next.js 15 + React 19"
    echo "  Backend:           Node.js + Express + TypeScript"
    echo "  ElizaOS Agent:     IA Agent + WebSocket"
    echo "  Chromia AWS:       Sistema de Alertas"
    echo "  Blockchain:        Ethereum + Chainlink"
    echo "  Database:          PostgreSQL + Redis"
    echo ""
}

# =======================================================================================
# FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO COMPLETA
# =======================================================================================

start_all() {
    print_header
    log_message "Iniciando sistema RiskGuardian AI"
    
    # Verificações iniciais
    create_log_directory
    check_dependencies
    check_environment
    
    # Instalação e build
    install_dependencies
    build_all
    
    # Iniciar serviços
    start_infrastructure
    sleep 5
    start_backend
    sleep 3
    start_elizaos
    sleep 3
    start_chromia
    sleep 3
    start_frontend
    
    # Deploy local dos contratos
    deploy_contracts
    configure_contracts
    
    # Status final
    sleep 5
    show_status
    
    print_section "🎉 Sistema RiskGuardian AI Iniciado com Sucesso!"
    print_success "Acesse o dashboard em: $FRONTEND_URL"
    print_info "Use './riskguardian-start.sh status' para verificar os serviços"
    print_info "Use './riskguardian-start.sh help' para ver todos os comandos"
    
    log_message "Sistema iniciado com sucesso"
    echo ""
}

# =======================================================================================
# FUNÇÃO DE INICIALIZAÇÃO LOCAL (SEM DOCKER)
# =======================================================================================

start_local() {
    print_header
    log_message "Iniciando sistema RiskGuardian AI - MODO LOCAL (SEM DOCKER)"
    
    print_section "🚀 Inicialização Local Completa"
    
    # Verificações iniciais
    create_log_directory
    check_dependencies
    
    # Parar qualquer serviço existente
    print_info "Parando serviços existentes..."
    stop_all_local
    
    # Configurar ambiente local
    configure_local_environment
    
    # Instalar dependências se necessário
    print_info "Verificando dependências..."
    install_dependencies
    
    # Iniciar todos os serviços localmente
    print_section "🔧 Iniciando Serviços Locais"
    
    start_backend_local
    sleep 3
    start_frontend_local
    sleep 3
    start_elizaos_local
    sleep 3
    start_chromia_local
    
    # Aguardar inicialização
    print_info "Aguardando serviços inicializarem..."
    sleep 10
    
    # Verificar status final
    show_status_local
    
    print_section "🎉 Sistema RiskGuardian AI Iniciado Localmente!"
    print_success "🚀 Frontend: http://localhost:3000"
    print_success "🔧 Backend: http://localhost:8001"
    print_success "🤖 ElizaOS: http://localhost:3001"
    print_success "⚡ Chromia: http://localhost:3002"
    print_info ""
    print_info "📋 Comandos úteis:"
    print_info "  ./riskguardian-start.sh status-local  - Status dos serviços locais"
    print_info "  ./riskguardian-start.sh stop-local    - Parar todos os serviços locais"
    print_info "  ./riskguardian-start.sh logs-local    - Ver logs dos serviços"
    
    log_message "Sistema local iniciado com sucesso"
    echo ""
}

# =======================================================================================
# FUNÇÕES DE APOIO PARA MODO LOCAL
# =======================================================================================

configure_local_environment() {
    print_info "Configurando ambiente local..."
    
    # Configurar backend para SQLite local
    if [[ -f "backend/.env" ]]; then
        print_info "Configurando backend para modo local..."
        cd backend
        cp .env .env.backup-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
        sed -i 's|DATABASE_URL="postgresql://.*"|DATABASE_URL="file:./dev.db"|' .env
        sed -i 's/REDIS_ENABLED=true/REDIS_ENABLED=false/' .env
        sed -i 's/NODE_ENV=testnet/NODE_ENV=development/' .env
        cd ..
    fi
    
    print_success "Ambiente local configurado!"
}

stop_all_local() {
    print_info "Parando processos Node.js existentes..."
    
    # Parar containers Docker se existirem
    docker-compose down -v 2>/dev/null || true
    
    # Parar processos npm/node relacionados ao projeto
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "ts-node" 2>/dev/null || true
    pkill -f "nodemon" 2>/dev/null || true
    
    sleep 2
    print_success "Processos parados!"
}

start_backend_local() {
    print_info "Iniciando Backend (porta 8001)..."
    cd backend
    npm run dev > ../logs/backend-local.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID >> "$PID_FILE"
    cd ..
    print_success "Backend iniciado (PID: $BACKEND_PID)"
}

start_frontend_local() {
    print_info "Iniciando Frontend (porta 3000)..."
    # Limpar cache do Next.js
    sudo rm -rf .next 2>/dev/null || rm -rf .next 2>/dev/null || true
    npm run dev > logs/frontend-local.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID >> "$PID_FILE"
    print_success "Frontend iniciado (PID: $FRONTEND_PID)"
}

start_elizaos_local() {
    print_info "Iniciando ElizaOS Agent (porta 3001)..."
    cd elizaos-agent
    npm run dev > ../logs/elizaos-local.log 2>&1 &
    ELIZAOS_PID=$!
    echo $ELIZAOS_PID >> "$PID_FILE"
    cd ..
    print_success "ElizaOS Agent iniciado (PID: $ELIZAOS_PID)"
}

start_chromia_local() {
    print_info "Iniciando Chromia AWS (porta 3002)..."
    cd chromia_aws
    npm run dev > ../logs/chromia-local.log 2>&1 &
    CHROMIA_PID=$!
    echo $CHROMIA_PID >> "$PID_FILE"
    cd ..
    print_success "Chromia AWS iniciado (PID: $CHROMIA_PID)"
}

show_status_local() {
    print_section "Status dos Serviços Locais"
    
    print_info "🚀 Aplicações Locais:"
    
    # Verificar Frontend
    if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Frontend${NC} - $FRONTEND_URL"
    else
        echo -e "  ${RED}❌ Frontend${NC} - $FRONTEND_URL"
    fi
    
    # Verificar Backend
    if curl -s "$BACKEND_URL" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Backend API${NC} - $BACKEND_URL"
    else
        echo -e "  ${RED}❌ Backend API${NC} - $BACKEND_URL"
    fi
    
    # Verificar ElizaOS
    if curl -s "$ELIZAOS_URL" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ ElizaOS Agent${NC} - $ELIZAOS_URL"
    else
        echo -e "  ${RED}❌ ElizaOS Agent${NC} - $ELIZAOS_URL"
    fi
    
    # Verificar Chromia
    if curl -s "$CHROMIA_URL" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Chromia AWS${NC} - $CHROMIA_URL"
    else
        echo -e "  ${RED}❌ Chromia AWS${NC} - $CHROMIA_URL"
    fi
    
    echo ""
}

show_logs_local() {
    print_section "Logs dos Serviços Locais"
    
    echo "📋 Últimas 20 linhas de cada serviço:"
    echo ""
    
    if [[ -f "logs/backend-local.log" ]]; then
        echo "🔧 Backend:"
        tail -n 10 logs/backend-local.log
        echo ""
    fi
    
    if [[ -f "logs/frontend-local.log" ]]; then
        echo "🚀 Frontend:"
        tail -n 10 logs/frontend-local.log
        echo ""
    fi
    
    if [[ -f "logs/elizaos-local.log" ]]; then
        echo "🤖 ElizaOS:"
        tail -n 10 logs/elizaos-local.log
        echo ""
    fi
    
    if [[ -f "logs/chromia-local.log" ]]; then
        echo "⚡ Chromia:"
        tail -n 10 logs/chromia-local.log
        echo ""
    fi
}

quick_start() {
    print_header
    print_info "🚀 Início Rápido - Pulando verificações..."
    
    create_log_directory
    start_infrastructure
    sleep 3
    start_backend
    sleep 2
    start_elizaos
    sleep 2
    start_chromia
    sleep 2
    start_frontend
    
    sleep 3
    show_status
    
    print_success "Sistema iniciado rapidamente!"
    echo ""
}

restart_all() {
    print_section "♻️  Reiniciando Sistema"
    
    stop_all
    sleep 2
    start_all
}

# =======================================================================================
# PROCESSAMENTO DE COMANDOS
# =======================================================================================

case "${1:-help}" in
    "start")
        start_all
        ;;
    "start-local")
        start_local
        ;;
    "quick-start")
        quick_start
        ;;
    "install")
        create_log_directory
        check_dependencies
        install_dependencies
        ;;
    "setup")
        create_log_directory
        check_dependencies
        check_environment
        install_dependencies
        build_all
        ;;
    "start-infra")
        create_log_directory
        start_infrastructure
        ;;
    "start-backend")
        create_log_directory
        start_backend
        ;;
    "start-frontend")
        create_log_directory
        start_frontend
        ;;
    "start-elizaos")
        create_log_directory
        start_elizaos
        ;;
    "start-chromia")
        create_log_directory
        start_chromia
        ;;
    "deploy")
        deploy_contracts
        ;;
    "deploy-testnet")
        deploy_testnet
        ;;
    "configure-contracts")
        configure_contracts
        ;;
    "register-automation")
        register_automation
        ;;
    "status")
        show_status
        ;;
    "status-local")
        show_status_local
        ;;
    "logs")
        show_logs
        ;;
    "logs-local")
        show_logs_local
        ;;
    "monitor")
        monitor_realtime
        ;;
    "test")
        run_tests
        ;;
    "test-integration")
        run_integration_tests
        ;;
    "stop")
        stop_all
        ;;
    "stop-local")
        stop_all_local
        ;;
    "restart")
        restart_all
        ;;
    "restart-local")
        stop_all_local
        sleep 2
        start_local
        ;;
    "clean")
        clean_all
        ;;
    "reset-db")
        reset_database
        ;;
    "build")
        build_all
        ;;
    "free-ports")
        free_ports
        ;;
    "version")
        show_version
        ;;
    "help"|*)
        show_help
        ;;
esac 