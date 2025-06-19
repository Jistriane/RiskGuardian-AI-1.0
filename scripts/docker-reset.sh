#!/bin/bash

echo "🔄 RiskGuardian AI - Reset Completo do Docker"

# Colors for better visualization
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para executar comando com tratamento de erro
run_command() {
    echo -e "${YELLOW}$1${NC}"
    eval $2
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Sucesso${NC}"
    else
        echo -e "${YELLOW}⚠️  Comando executado (alguns erros são esperados)${NC}"
    fi
    echo ""
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando. Inicie o Docker primeiro.${NC}"
    exit 1
fi

echo -e "${BLUE}Esta operação irá:${NC}"
echo "  ⊢ Parar todos os containers"
echo "  ⊢ Remover containers órfãos"
echo "  ⊢ Remover imagens corrompidas"
echo "  ⊢ Limpar volumes problemáticos"
echo "  ⊢ Resetar configuração de rede"
echo ""

read -p "Continuar? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operação cancelada."
    exit 0
fi

echo ""

# 1. Stop all containers and remove orphans
run_command "🛑 Parando todos os containers..." "docker-compose down --remove-orphans --volumes"

# 2. Remove all stopped containers
run_command "🗑️  Removendo containers parados..." "docker container prune -f"

# 3. Remove project specific containers that might be corrupted
run_command "💥 Removendo containers do projeto..." "docker ps -a | grep riskguardian | awk '{print \$1}' | xargs docker rm -f 2>/dev/null || true"

# 4. Remove project specific images to force rebuild
run_command "🖼️  Removendo imagens do projeto..." "docker images | grep riskguardian | awk '{print \$3}' | xargs docker rmi -f 2>/dev/null || true"

# 5. Remove dangling images
run_command "🏷️  Removendo imagens órfãs..." "docker image prune -f"

# 6. Remove specific volumes that might be corrupted
echo -e "${YELLOW}📦 Removendo volumes específicos...${NC}"
volumes_to_remove=(
    "riskguardian-ai_postgres_data"
    "riskguardian-ai_chromia_data" 
    "riskguardian-ai_chromia_logs"
    "riskguardian-ai_redis_data"
    "riskguardian-ai_pgadmin_data"
    "riskguardian-ai_frontend_node_modules"
    "riskguardian-ai_backend_node_modules"
    "riskguardian-ai_elizaos_node_modules"
    "riskguardian-ai_contracts_cache"
    "riskguardian-ai_contracts_out"
)

for volume in "${volumes_to_remove[@]}"; do
    docker volume rm $volume 2>/dev/null && echo "  ✓ Removido: $volume" || echo "  - Volume não existe: $volume"
done
echo ""

# 7. Remove unused volumes
run_command "📂 Removendo volumes órfãos..." "docker volume prune -f"

# 8. Remove unused networks
run_command "🌐 Removendo redes não utilizadas..." "docker network prune -f"

# 9. Clean build cache
run_command "🧼 Limpando cache de build..." "docker builder prune -f"

# 10. Reset Docker Compose configuration
run_command "🔧 Validando configuração do Docker Compose..." "docker-compose config > /dev/null"

# 11. Create necessary directories with proper permissions
echo -e "${YELLOW}📁 Criando diretórios necessários...${NC}"
mkdir -p ./backend/logs
mkdir -p ./frontend/logs  
mkdir -p ./elizaos-agent/logs
mkdir -p ./chromia/logs
mkdir -p ./contracts/cache
mkdir -p ./contracts/out
chmod 755 ./backend/logs ./frontend/logs ./elizaos-agent/logs ./chromia/logs ./contracts/cache ./contracts/out
echo -e "${GREEN}✅ Diretórios criados${NC}"
echo ""

# 12. Fix potential permission issues
echo -e "${YELLOW}🔐 Corrigindo permissões...${NC}"
# Fix node_modules permissions if they exist
find . -name "node_modules" -type d -exec chmod 755 {} \; 2>/dev/null || true
echo -e "${GREEN}✅ Permissões corrigidas${NC}"
echo ""

echo -e "${GREEN}🎉 Reset completo finalizado com sucesso!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos passos:${NC}"
echo "  1. Execute: ${YELLOW}./scripts/start-dev.sh${NC}"
echo "  2. Aguarde o build das imagens (primeira execução demora mais)"
echo "  3. Verifique os logs se houver problemas: ${YELLOW}docker-compose logs -f${NC}"
echo ""
echo -e "${BLUE}ℹ️  Dicas:${NC}"
echo "  • A primeira inicialização após reset demora mais (build de imagens)"
echo "  • Se continuar com problemas, verifique se há espaço em disco suficiente"
echo "  • Para logs detalhados: ${YELLOW}docker-compose up --build${NC}" 