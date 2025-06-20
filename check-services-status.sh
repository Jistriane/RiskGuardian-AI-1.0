#!/bin/bash

# Script para verificar status dos serviços RiskGuardian AI

print_header() {
    clear
    echo -e "\033[0;36m=================================================================="
    echo "📊 RISKGUARDIAN AI - STATUS DOS SERVIÇOS"
    echo "==================================================================\033[0m"
}

check_service() {
    local url=$1
    local service_name=$2
    local port=$3
    
    echo -n "  $service_name: "
    
    if lsof -i :$port > /dev/null 2>&1; then
        if curl -s "$url" > /dev/null 2>&1; then
            echo -e "\033[0;32m✅ ATIVO\033[0m - $url"
        else
            echo -e "\033[0;33m🔄 INICIANDO\033[0m - Porta ocupada"
        fi
    else
        echo -e "\033[0;31m❌ INATIVO\033[0m - Porta $port livre"
    fi
}

main() {
    print_header
    
    echo -e "\033[0;35m📋 Status dos Serviços Web\033[0m"
    echo "=================================================================="
    
    check_service "http://localhost:3001" "Frontend (Next.js)" 3001
    check_service "http://localhost:8001" "Backend API" 8001
    check_service "http://localhost:3000" "ElizaOS Agent" 3000
    check_service "http://localhost:3002" "Chromia AWS" 3002
    
    echo ""
    echo -e "\033[0;35m📋 Comandos úteis:\033[0m"
    echo -e "  🚀 Iniciar todos: \033[0;32m./start-all-services.sh\033[0m"
    echo -e "  🛑 Parar todos: \033[0;31m./stop-all-services.sh\033[0m"
    echo -e "  📊 Ver status: \033[0;34m./check-services-status.sh\033[0m"
    echo -e "  📝 Ver logs: \033[0;34mtail -f logs/*.log\033[0m"
    
    echo ""
}

main "$@" 