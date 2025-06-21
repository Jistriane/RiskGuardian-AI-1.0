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

echo "🚀 Starting RiskGuardian AI Development Environment"

# Colors for better visualization
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Set project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo -e "${BLUE}📂 Projeto em: $PROJECT_ROOT${NC}"

# Function to check if service is running on port
check_port() {
    local port=$1
    if lsof -i ":$port" > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Porta $port já está em uso${NC}"
        return 0
    fi
    return 1
}

# Function to start service with proper path checking
start_service() {
    local service_name=$1
    local service_path=$2
    local port=$3
    local start_command=$4
    
    echo -e "\n${YELLOW}🔧 Iniciando $service_name...${NC}"
    
    if [ ! -d "$service_path" ]; then
        echo -e "${RED}❌ Diretório $service_path não encontrado${NC}"
        return 1
    fi
    
    cd "$service_path"
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ package.json não encontrado em $service_path${NC}"
        return 1
    fi
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Instalando dependências em $service_name...${NC}"
        npm install --include=dev
    fi
    
    # Check if port is already in use
    if check_port $port; then
        echo -e "${YELLOW}⚠️  $service_name já está rodando na porta $port${NC}"
        cd "$PROJECT_ROOT"
        return 0
    fi
    
    # Start service in background
    echo -e "${GREEN}▶️  Iniciando $service_name na porta $port${NC}"
    nohup $start_command > "../logs/${service_name,,}.log" 2>&1 &
    local pid=$!
    echo $pid > "../logs/${service_name,,}.pid"
    
    # Brief wait to check if service started
    sleep 3
    if kill -0 $pid 2>/dev/null; then
        echo -e "${GREEN}✅ $service_name iniciado com sucesso (PID: $pid)${NC}"
    else
        echo -e "${RED}❌ Falha ao iniciar $service_name${NC}"
        cat "../logs/${service_name,,}.log"
    fi
    
    cd "$PROJECT_ROOT"
}

# Create logs directory
mkdir -p logs

# Stop any existing processes
echo -e "${YELLOW}🛑 Parando processos existentes...${NC}"
pkill -f "elizaos-agent" > /dev/null 2>&1
pkill -f "frontend.*3001" > /dev/null 2>&1
pkill -f "backend.*8001" > /dev/null 2>&1

# Wait a moment for processes to terminate
sleep 2

# Start services
start_service "ElizaOS-Agent" "./elizaos-agent" "3001" "npm run dev"
start_service "Frontend" "./frontend" "3000" "npm run dev"
start_service "Backend" "./backend" "8001" "npm run dev"

# Wait for services to stabilize
echo -e "\n${YELLOW}⏳ Aguardando serviços estabilizarem...${NC}"
sleep 10

# Check service health
echo -e "\n${YELLOW}🔍 Verificando status dos serviços...${NC}"

# Check ElizaOS (port 3001)
echo -n "   ElizaOS Agent: "
if curl -s -f http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

# Check Frontend (port 3000)  
echo -n "   Frontend: "
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

# Check Backend (port 8001)
echo -n "   Backend API: "
if curl -s -f http://localhost:8001 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

echo ""
echo -e "${GREEN}✅ Ambiente de desenvolvimento iniciado!${NC}"
echo ""
echo -e "${BLUE}🌐 Pontos de acesso:${NC}"
echo "  Frontend:     http://localhost:3000"
echo "  Backend API:  http://localhost:8001" 
echo "  ElizaOS:      http://localhost:3001/health"
echo ""
echo -e "${BLUE}🛠️ Comandos úteis:${NC}"
echo "  Ver logs:       tail -f logs/[service].log"
echo "  Parar tudo:     pkill -f 'elizaos-agent\\|frontend\\|backend'"
echo "  Status:         ps aux | grep -E '(elizaos|frontend|backend)'"
echo ""
echo -e "${BLUE}📂 Arquivos de log:${NC}"
echo "  ElizaOS:   logs/elizaos-agent.log"
echo "  Frontend:  logs/frontend.log"  
echo "  Backend:   logs/backend.log"
echo ""

# Show current running processes
echo -e "${YELLOW}📊 Processos ativos:${NC}"
ps aux | grep -E "(elizaos-agent|frontend|backend)" | grep -v grep | awk '{print "  " $2 " - " $11 " " $12}'

# Optional: Show logs
echo ""
read -p "Mostrar logs em tempo real? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${YELLOW}📝 Iniciando logs em tempo real (Ctrl+C para parar):${NC}"
    sleep 1
    tail -f logs/*.log
fi 