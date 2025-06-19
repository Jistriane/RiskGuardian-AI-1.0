#!/bin/bash

echo "🚀 Starting RiskGuardian AI Development Environment"

# Colors for better visualization
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando. Inicie o Docker primeiro.${NC}"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Arquivo .env não encontrado. Execute ./scripts/setup.sh primeiro${NC}"
    exit 1
fi

# Check for ContainerConfig errors by validating docker-compose config
echo -e "${YELLOW}🔧 Validando configuração do Docker Compose...${NC}"
if ! docker-compose config > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro na configuração do Docker Compose.${NC}"
    echo -e "${YELLOW}💡 Execute ./scripts/docker-reset.sh para corrigir problemas${NC}"
    exit 1
fi

# Check for corrupted containers/images
echo -e "${YELLOW}🔍 Verificando integridade do ambiente Docker...${NC}"
corrupted_containers=$(docker ps -a --filter "status=exited" --filter "label=com.docker.compose.project=riskguardian-ai" --format "{{.Names}}" 2>/dev/null | head -5)

if [ ! -z "$corrupted_containers" ]; then
    echo -e "${YELLOW}⚠️  Containers com problemas detectados:${NC}"
    echo "$corrupted_containers"
    echo -e "${YELLOW}🔄 Removendo containers problemáticos...${NC}"
    docker-compose down --remove-orphans > /dev/null 2>&1
    echo -e "${GREEN}✅ Limpeza realizada${NC}"
fi

# Ensure required directories exist
echo -e "${YELLOW}📁 Verificando diretórios necessários...${NC}"
mkdir -p ./backend/logs ./frontend/logs ./elizaos-agent/logs ./chromia/logs ./contracts/cache ./contracts/out
chmod 755 ./backend/logs ./frontend/logs ./elizaos-agent/logs ./chromia/logs ./contracts/cache ./contracts/out

# Start core services with better error handling
echo -e "\n${YELLOW}🐳 Iniciando containers...${NC}"

# Try to start containers, but handle ContainerConfig errors gracefully
if ! docker-compose up -d 2>&1 | tee /tmp/docker-start.log; then
    if grep -q "ContainerConfig" /tmp/docker-start.log; then
        echo -e "${RED}❌ Erro ContainerConfig detectado!${NC}"
        echo -e "${YELLOW}🔧 Aplicando correção automática...${NC}"
        
        # Force cleanup and retry
        docker-compose down --remove-orphans --volumes > /dev/null 2>&1
        docker system prune -f > /dev/null 2>&1
        
        echo -e "${YELLOW}🔄 Tentando novamente com rebuild...${NC}"
        if ! docker-compose up -d --build; then
            echo -e "${RED}❌ Falha persistente. Execute: ./scripts/docker-reset.sh${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ Erro desconhecido na inicialização do Docker${NC}"
        exit 1
    fi
fi

# Clean up temporary log file
rm -f /tmp/docker-start.log

# Smart health check instead of fixed sleep
echo -e "\n${YELLOW}⏳ Aguardando serviços ficarem saudáveis...${NC}"
timeout=120
healthy_services=0
attempt=0

while [ $timeout -gt 0 ]; do
    attempt=$((attempt+1))
    
    # Count healthy services (those with health checks)
    healthy_services=$(docker-compose ps --filter "health=healthy" --format "{{.Name}}" 2>/dev/null | wc -l)
    
    # Check if core services are up (even if not all have health checks)
    total_running=$(docker-compose ps --filter "status=running" --format "{{.Name}}" | wc -l)
    
    # Check for any unhealthy services
    unhealthy_services=$(docker-compose ps --filter "health=unhealthy" --format "{{.Name}}" 2>/dev/null)
    
    if [ ! -z "$unhealthy_services" ]; then
        echo -e "${RED}❌ Serviços não saudáveis detectados:${NC}"
        echo "$unhealthy_services"
        echo -e "${YELLOW}🔧 Execute: docker-compose logs [service-name] para debug${NC}"
        break
    fi
    
    if [ $healthy_services -ge 3 ] && [ $total_running -ge 6 ]; then
        echo -e "${GREEN}✅ Serviços inicializando com sucesso!${NC}"
        break
    fi
    
    if [ $((attempt % 15)) -eq 0 ]; then
        echo -e "${YELLOW}   Ainda aguardando... (alguns serviços demoram mais para iniciar)${NC}"
        echo -e "   Rodando: $total_running, Saudáveis: $healthy_services"
    fi
    
    sleep 2
    timeout=$((timeout-2))
done

# Show container status
echo -e "\n${YELLOW}📊 Status dos containers:${NC}"
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

# Test critical services connectivity
echo -e "\n${YELLOW}🔍 Testando conectividade dos serviços...${NC}"

# Test Anvil (critical blockchain service)
echo -n "   Anvil Blockchain: "
if curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' \
  http://localhost:8545 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

# Test Frontend
echo -n "   Frontend: "
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

# Test Backend
echo -n "   Backend API: "
if curl -s -f http://localhost:8001 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

# Test Chromia Mock
echo -n "   Chromia Mock: "
if curl -s -f http://localhost:7740/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Responsivo${NC}"
else
    echo -e "${YELLOW}⚠️  Ainda inicializando${NC}"
fi

# Check for problems and suggest solutions
echo ""
unhealthy=$(docker-compose ps --filter "health=unhealthy" --format "{{.Name}}" 2>/dev/null)
if [ ! -z "$unhealthy" ]; then
    echo -e "${YELLOW}⚠️  Serviços não saudáveis:${NC}"
    echo "$unhealthy"
    echo -e "   Execute ${YELLOW}docker-compose logs [service-name]${NC} para debug"
    echo -e "   Se persistir, execute: ${YELLOW}./scripts/docker-reset.sh${NC}"
    echo ""
fi

echo -e "${GREEN}✅ Ambiente de desenvolvimento iniciado!${NC}"
echo ""
echo -e "${BLUE}🌐 Pontos de acesso:${NC}"
echo "  Frontend:     http://localhost:3000"
echo "  Backend API:  http://localhost:8001" 
echo "  ElizaOS:      http://localhost:3001/health"
echo "  Chromia:      http://localhost:7740"
echo "  Anvil RPC:    http://localhost:8545"
echo "  PostgreSQL:   localhost:5432"
echo "  Redis:        localhost:6379"
echo ""
echo -e "${BLUE}🛠️ Comandos úteis:${NC}"
echo "  Ver logs:       docker-compose logs -f [service-name]"
echo "  Reiniciar:      docker-compose restart [service-name]"
echo "  Parar tudo:     ./scripts/stop.sh"
echo "  Status:         docker-compose ps"
echo "  Reset completo: ./scripts/docker-reset.sh"
echo ""

# Optional: Show logs
read -p "Mostrar logs em tempo real? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${YELLOW}📝 Iniciando logs em tempo real (Ctrl+C para parar):${NC}"
    sleep 1
    docker-compose logs -f
fi