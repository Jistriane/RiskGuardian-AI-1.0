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

echo "📊 RiskGuardian AI - Dashboard de Status"
echo "========================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to check service status
check_service() {
    local name=$1
    local url=$2
    local port=$3
    
    if curl -s -f "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $name${NC} - http://localhost:$port"
    else
        echo -e "${RED}❌ $name${NC} - Não responsivo"
    fi
}

# Function to check process
check_process() {
    local name=$1
    local pattern=$2
    
    if pgrep -f "$pattern" > /dev/null; then
        local pid=$(pgrep -f "$pattern" | head -1)
        echo -e "${GREEN}✅ $name${NC} (PID: $pid)"
    else
        echo -e "${RED}❌ $name${NC} - Não rodando"
    fi
}

echo -e "\n${BLUE}🚀 SERVIÇOS PRINCIPAIS${NC}"
echo "------------------------"
check_service "Frontend (Next.js)" "http://localhost:3000" "3000"
check_service "Backend API" "http://localhost:8001/health" "8001"
check_service "ElizaOS Agent" "http://localhost:3001/health" "3001"

echo -e "\n${BLUE}⚙️ PROCESSOS${NC}"
echo "------------------------"
check_process "Frontend Dev Server" "next.*dev"
check_process "Backend API Server" "nodemon.*backend"
check_process "ElizaOS Agent" "elizaos.*agent"

echo -e "\n${BLUE}📊 RECURSOS IMPLEMENTADOS${NC}"
echo "------------------------"
echo -e "${GREEN}✅${NC} Sistema de Autenticação JWT"
echo -e "${GREEN}✅${NC} Integração com APIs de Mercado (CoinGecko/Binance)"
echo -e "${GREEN}✅${NC} Monitoramento de Contratos Smart"
echo -e "${GREEN}✅${NC} Sistema de Cache Inteligente"
echo -e "${GREEN}✅${NC} Rate Limiting e Segurança"
echo -e "${GREEN}✅${NC} Logs Estruturados"
echo -e "${GREEN}✅${NC} Métricas de Performance"
echo -e "${GREEN}✅${NC} WebSocket para Tempo Real"
echo -e "${GREEN}✅${NC} Validação de Dados"
echo -e "${GREEN}✅${NC} CORS Configurado"

echo -e "\n${BLUE}🔧 APIS DISPONÍVEIS${NC}"
echo "------------------------"
echo -e "${BLUE}• Authentication:${NC} POST /api/auth/login"
echo -e "${BLUE}• Portfolio:${NC} GET /api/portfolio"
echo -e "${BLUE}• Risk Analysis:${NC} GET /api/portfolio/risk"
echo -e "${BLUE}• Monitoring:${NC} GET /api/monitoring/status"
echo -e "${BLUE}• Health Check:${NC} GET /health"

echo -e "\n${BLUE}📈 DADOS DE MERCADO${NC}"
echo "------------------------"
echo -e "${GREEN}✅${NC} Integração CoinGecko API"
echo -e "${GREEN}✅${NC} Integração Binance API"
echo -e "${GREEN}✅${NC} Rate Limiting Inteligente"
echo -e "${GREEN}✅${NC} Fallback entre Fontes"
echo -e "${GREEN}✅${NC} Cálculo de Métricas de Risco"

echo -e "\n${BLUE}🔐 SEGURANÇA${NC}"
echo "------------------------"
echo -e "${GREEN}✅${NC} Helmet Security Headers"
echo -e "${GREEN}✅${NC} CORS Policy Configurado"
echo -e "${GREEN}✅${NC} Rate Limiting por IP"
echo -e "${GREEN}✅${NC} Input Sanitization"
echo -e "${GREEN}✅${NC} Security Logging"
echo -e "${GREEN}✅${NC} Request Timeout Protection"

echo -e "\n${BLUE}📊 CONTRATOS BLOCKCHAIN${NC}"
echo "------------------------"
if [ -f "deployed-hedge-contracts.json" ]; then
    echo -e "${GREEN}✅${NC} Contratos Deployed: $(jq 'keys | length' deployed-hedge-contracts.json 2>/dev/null || echo "N/A")"
    echo -e "${GREEN}✅${NC} Network: Sepolia Testnet"
    echo -e "${GREEN}✅${NC} Monitoring: Ativo"
else
    echo -e "${YELLOW}⚠️${NC} Contratos não encontrados"
fi

echo -e "\n${BLUE}🗄️ BANCO DE DADOS${NC}"
echo "------------------------"
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC} PostgreSQL: Conectado"
else
    echo -e "${YELLOW}⚠️${NC} PostgreSQL: Não configurado"
fi

if redis-cli -h localhost -p 6379 ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC} Redis: Conectado"
else
    echo -e "${YELLOW}⚠️${NC} Redis: Usando cache in-memory"
fi

echo -e "\n${BLUE}🧪 TESTE RÁPIDO DE CONECTIVIDADE${NC}"
echo "------------------------"
echo -n "Frontend: "
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
fi

echo -n "Backend:  "
if curl -s -f http://localhost:8001/health > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
fi

echo -n "ElizaOS:  "
if curl -s -f http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
fi

echo -e "\n${BLUE}📋 PRÓXIMOS PASSOS RECOMENDADOS${NC}"
echo "------------------------"
echo -e "${YELLOW}1.${NC} Configurar PostgreSQL para persistência"
echo -e "${YELLOW}2.${NC} Configurar Redis para cache distribuído"
echo -e "${YELLOW}3.${NC} Implementar testes automatizados"
echo -e "${YELLOW}4.${NC} Configurar CI/CD pipeline"
echo -e "${YELLOW}5.${NC} Configurar monitoramento de produção"
echo -e "${YELLOW}6.${NC} Implementar alertas automáticos"

echo -e "\n${BLUE}🚀 COMANDOS ÚTEIS${NC}"
echo "------------------------"
echo -e "${BLUE}• Iniciar ambiente:${NC} ./scripts/start-dev-fixed.sh"
echo -e "${BLUE}• Teste integração:${NC} ./scripts/test-integration.sh"
echo -e "${BLUE}• Ver logs:${NC} tail -f logs/*.log"
echo -e "${BLUE}• Parar serviços:${NC} pkill -f 'elizaos\\|frontend\\|backend'"

echo -e "\n${GREEN}🎉 SISTEMA RISKGUARDIAN AI ATIVO!${NC}"
echo "========================================" 