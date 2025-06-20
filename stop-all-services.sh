#!/bin/bash

# =======================================================================================
# 🛑 RISKGUARDIAN AI - PARAR TODOS OS SERVIÇOS
# =======================================================================================
# 
# Script para parar todos os serviços do RiskGuardian AI de forma segura
# - Para processos por PID
# - Libera portas ocupadas
# - Limpa arquivos temporários
#
# Uso: ./stop-all-services.sh
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

print_header() {
    clear
    echo -e "${RED}"
    echo "=================================================================="
    echo "🛑 RISKGUARDIAN AI - PARANDO TODOS OS SERVIÇOS"
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

stop_by_pids() {
    print_section "Parando Serviços por PID"
    
    if [[ ! -f "$PID_FILE" ]]; then
        print_warning "Arquivo de PIDs não encontrado"
        return 0
    fi
    
    local stopped_count=0
    
    while read -r pid; do
        if [[ -n "$pid" ]] && [[ "$pid" =~ ^[0-9]+$ ]]; then
            if kill -0 "$pid" 2>/dev/null; then
                print_info "Parando processo PID: $pid"
                kill -TERM "$pid" 2>/dev/null || true
                sleep 2
                if kill -0 "$pid" 2>/dev/null; then
                    kill -9 "$pid" 2>/dev/null || true
                fi
                stopped_count=$((stopped_count + 1))
                print_success "Processo $pid parado"
            fi
        fi
    done < "$PID_FILE"
    
    rm -f "$PID_FILE"
    print_success "$stopped_count processos parados"
    echo ""
}

stop_by_process_name() {
    print_section "Parando Processos por Nome"
    
    print_info "Procurando processos 'npm run dev'..."
    pkill -f "npm run dev" 2>/dev/null || true
    sleep 2
    print_success "Processos npm parados"
    echo ""
}

free_ports() {
    print_section "Liberando Portas Ocupadas"
    
    local ports=(3000 3001 3002 8001)
    
    for port in "${ports[@]}"; do
        local pid=$(lsof -ti:$port 2>/dev/null || true)
        if [[ -n "$pid" ]]; then
            print_info "Liberando porta $port (PID: $pid)"
            kill -9 "$pid" 2>/dev/null || true
            print_success "Porta $port liberada"
        else
            print_info "Porta $port: Já livre"
        fi
    done
    
    echo ""
}

cleanup_files() {
    print_section "Limpeza de Arquivos Temporários"
    
    # Limpar logs antigos (manter apenas os 5 mais recentes)
    if [[ -d "$LOG_DIR" ]]; then
        print_info "Limpando logs antigos..."
        find "$LOG_DIR" -name "*.log" -type f -mtime +7 -delete 2>/dev/null || true
        print_success "Logs antigos removidos"
    fi
    
    # Limpar cache do Next.js
    if [[ -d "frontend/.next" ]]; then
        print_info "Limpando cache do Next.js..."
        rm -rf frontend/.next/cache/* 2>/dev/null || true
        print_success "Cache do Next.js limpo"
    fi
    
    # Limpar arquivos .pid antigos
    find . -name "*.pid" -type f -delete 2>/dev/null || true
    
    print_success "Limpeza concluída"
    echo ""
}

check_remaining_processes() {
    print_section "Verificação Final"
    
    print_info "Verificando se ainda há processos rodando..."
    
    # Verificar portas
    local ports=(3000 3001 3002 8001)
    local active_ports=()
    
    for port in "${ports[@]}"; do
        if lsof -i :$port > /dev/null 2>&1; then
            active_ports+=($port)
        fi
    done
    
    if [[ ${#active_ports[@]} -gt 0 ]]; then
        print_warning "Ainda há portas ocupadas: ${active_ports[*]}"
        print_info "Execute novamente se necessário"
    else
        print_success "Todas as portas estão livres"
    fi
    
    # Verificar processos npm
    local npm_processes=$(pgrep -f "npm run dev" 2>/dev/null | wc -l)
    if [[ $npm_processes -gt 0 ]]; then
        print_warning "$npm_processes processos 'npm run dev' ainda ativos"
    else
        print_success "Nenhum processo npm ativo"
    fi
    
    echo ""
}

show_final_status() {
    print_section "🎉 Todos os Serviços Parados!"
    
    echo -e "${GREEN}✅ Operação concluída com sucesso!${NC}"
    echo -e "${CYAN}📋 Resumo:${NC}"
    echo -e "  • Processos do RiskGuardian AI parados"
    echo -e "  • Portas liberadas (3000, 3001, 3002, 8001)"
    echo -e "  • Arquivos temporários limpos"
    echo -e "  • Sistema pronto para nova inicialização"
    
    echo ""
    echo -e "${BLUE}🚀 Para iniciar novamente:${NC}"
    echo -e "  ${GREEN}./start-all-services.sh${NC}"
    
    echo ""
    echo -e "${YELLOW}📊 Verificar status:${NC}"
    echo -e "  ${BLUE}ps aux | grep 'npm run dev'${NC}"
    echo -e "  ${BLUE}lsof -i :3001${NC}"
    
    echo ""
}

main() {
    print_header
    
    print_info "Iniciando processo de parada de todos os serviços..."
    echo ""
    
    stop_by_pids
    stop_by_process_name
    free_ports
    
    print_info "Aguardando finalização completa..."
    sleep 3
    
    cleanup_files
    
    check_remaining_processes
    
    show_final_status
}

# Tratamento de sinais
trap 'print_error "Interrompido pelo usuário"; exit 1' INT TERM

# Verificar se está na raiz do projeto
if [[ ! -d "frontend" && ! -d "backend" ]]; then
    print_error "Execute este script da raiz do projeto RiskGuardian AI"
    exit 1
fi

main "$@" 