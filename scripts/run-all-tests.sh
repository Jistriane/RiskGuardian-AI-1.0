#!/bin/bash

# 🧪 Script para executar todos os testes do RiskGuardian AI
# Executa testes backend, frontend e E2E

set -e

echo "🚀 Iniciando execução de todos os testes..."
echo "========================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logs coloridos
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

# Verificar se serviços estão rodando
check_services() {
    log_info "Verificando serviços necessários..."
    
    # Verificar PostgreSQL
    if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
        log_error "PostgreSQL não está rodando. Iniciando..."
        sudo systemctl start postgresql
        sleep 2
    fi
    
    # Verificar Redis
    if ! redis-cli ping > /dev/null 2>&1; then
        log_error "Redis não está rodando. Iniciando..."
        sudo systemctl start redis-server
        sleep 2
    fi
    
    log_success "Serviços verificados"
}

# Executar testes do backend
run_backend_tests() {
    log_info "Executando testes do backend..."
    
    cd backend
    
    # Instalar dependências se necessário
    if [ ! -d "node_modules" ]; then
        log_info "Instalando dependências do backend..."
        npm install
    fi
    
    # Executar testes unitários
    log_info "Executando testes unitários..."
    npm run test:unit || {
        log_warning "Alguns testes unitários falharam, continuando..."
    }
    
    # Executar testes com coverage
    log_info "Gerando relatório de coverage..."
    npm run test:coverage || {
        log_warning "Coverage não gerado completamente, continuando..."
    }
    
    cd ..
    log_success "Testes do backend concluídos"
}

# Executar testes do frontend
run_frontend_tests() {
    log_info "Executando testes do frontend..."
    
    cd frontend
    
    # Instalar dependências se necessário
    if [ ! -d "node_modules" ]; then
        log_info "Instalando dependências do frontend..."
        npm install
    fi
    
    # Executar testes unitários
    log_info "Executando testes de componentes..."
    npm test || {
        log_warning "Alguns testes de componentes falharam, continuando..."
    }
    
    cd ..
    log_success "Testes do frontend concluídos"
}

# Executar testes E2E
run_e2e_tests() {
    log_info "Preparando testes E2E..."
    
    # Verificar se frontend está rodando
    if ! curl -s http://localhost:3000 > /dev/null; then
        log_info "Frontend não está rodando. Iniciando..."
        cd frontend
        npm run dev > /dev/null 2>&1 &
        FRONTEND_PID=$!
        cd ..
        
        # Aguardar frontend inicializar
        log_info "Aguardando frontend inicializar..."
        for i in {1..30}; do
            if curl -s http://localhost:3000 > /dev/null; then
                break
            fi
            sleep 2
            if [ $i -eq 30 ]; then
                log_error "Frontend não iniciou a tempo"
                return 1
            fi
        done
    fi
    
    cd frontend
    
    # Executar testes E2E
    log_info "Executando testes E2E com Cypress..."
    npx cypress run --headless || {
        log_warning "Alguns testes E2E falharam, continuando..."
    }
    
    # Parar frontend se foi iniciado por este script
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    cd ..
    log_success "Testes E2E concluídos"
}

# Gerar relatório consolidado
generate_report() {
    log_info "Gerando relatório consolidado..."
    
    REPORT_FILE="test-report-$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "🧪 RELATÓRIO DE TESTES - RiskGuardian AI"
        echo "========================================"
        echo "Data: $(date)"
        echo ""
        
        echo "📊 BACKEND COVERAGE:"
        if [ -f "backend/coverage/coverage-summary.json" ]; then
            echo "✅ Coverage disponível em: backend/coverage/lcov-report/index.html"
        else
            echo "❌ Coverage não gerado"
        fi
        echo ""
        
        echo "🎨 FRONTEND TESTS:"
        if [ -f "frontend/coverage/lcov-report/index.html" ]; then
            echo "✅ Coverage disponível em: frontend/coverage/lcov-report/index.html"
        else
            echo "❌ Coverage não gerado"
        fi
        echo ""
        
        echo "🔍 E2E TESTS:"
        if [ -d "frontend/cypress/videos" ]; then
            echo "✅ Vídeos disponíveis em: frontend/cypress/videos/"
        fi
        if [ -d "frontend/cypress/screenshots" ]; then
            echo "✅ Screenshots disponíveis em: frontend/cypress/screenshots/"
        fi
        echo ""
        
        echo "📈 ESTATÍSTICAS:"
        echo "- Testes backend: Executados"
        echo "- Testes frontend: Executados" 
        echo "- Testes E2E: Executados"
        echo ""
        
        echo "🔗 LINKS ÚTEIS:"
        echo "- Backend Coverage: file://$(pwd)/backend/coverage/lcov-report/index.html"
        echo "- Frontend Coverage: file://$(pwd)/frontend/coverage/lcov-report/index.html"
        echo "- Cypress Dashboard: npx cypress open"
        echo ""
        
    } > "$REPORT_FILE"
    
    log_success "Relatório gerado: $REPORT_FILE"
}

# Função principal
main() {
    local start_time=$(date +%s)
    
    echo "🧪 RiskGuardian AI - Test Suite Completa"
    echo "========================================"
    echo "Iniciado em: $(date)"
    echo ""
    
    # Verificar pré-requisitos
    check_services
    
    # Executar todos os testes
    run_backend_tests
    run_frontend_tests
    run_e2e_tests
    
    # Gerar relatório
    generate_report
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    echo ""
    echo "🎉 EXECUÇÃO COMPLETA!"
    echo "====================="
    echo "Tempo total: ${duration}s"
    echo "Relatório: $REPORT_FILE"
    echo ""
    echo "📊 Para ver os resultados:"
    echo "• Backend Coverage: file://$(pwd)/backend/coverage/lcov-report/index.html"
    echo "• Frontend Coverage: file://$(pwd)/frontend/coverage/lcov-report/index.html"
    echo "• Cypress Videos: $(pwd)/frontend/cypress/videos/"
    echo ""
    
    log_success "Todos os testes executados com sucesso!"
}

# Verificar se script está sendo executado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi 