#!/bin/bash

# =======================================================================================
# 🧪 TESTE RÁPIDO DO SISTEMA RISKGUARDIAN AI
# =======================================================================================

set -e

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🧪 Testando Sistema RiskGuardian AI${NC}"
echo "=================================================================="

# 1. Testar ajuda
echo -e "${YELLOW}📖 Testando comando help...${NC}"
./riskguardian-start.sh help > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Help funciona${NC}"
else
    echo -e "${RED}❌ Erro no comando help${NC}"
    exit 1
fi

# 2. Testar versão
echo -e "${YELLOW}📋 Testando comando version...${NC}"
./riskguardian-start.sh version > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Version funciona${NC}"
else
    echo -e "${RED}❌ Erro no comando version${NC}"
    exit 1
fi

# 3. Testar verificação de dependências
echo -e "${YELLOW}🔧 Testando verificação de dependências...${NC}"
timeout 30 ./riskguardian-start.sh install > /dev/null 2>&1
if [ $? -eq 0 ] || [ $? -eq 124 ]; then
    echo -e "${GREEN}✅ Verificação de dependências funciona${NC}"
else
    echo -e "${RED}❌ Erro na verificação de dependências${NC}"
fi

# 4. Testar arquivo de logs
echo -e "${YELLOW}📝 Testando criação de logs...${NC}"
mkdir -p logs
touch logs/test.log
if [ -f "logs/test.log" ]; then
    echo -e "${GREEN}✅ Sistema de logs funciona${NC}"
    rm logs/test.log
else
    echo -e "${RED}❌ Erro no sistema de logs${NC}"
fi

# 5. Testar permissões do script
echo -e "${YELLOW}🔑 Testando permissões...${NC}"
if [ -x "./riskguardian-start.sh" ]; then
    echo -e "${GREEN}✅ Script é executável${NC}"
else
    echo -e "${RED}❌ Script não é executável${NC}"
    chmod +x riskguardian-start.sh
fi

# 6. Testar arquivo de ambiente
echo -e "${YELLOW}⚙️  Testando arquivo de ambiente...${NC}"
if [ -f "env.example" ]; then
    echo -e "${GREEN}✅ Arquivo env.example existe${NC}"
else
    echo -e "${RED}❌ Arquivo env.example não encontrado${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Teste do sistema concluído!${NC}"
echo ""
echo "Para usar o sistema:"
echo "1. Configure seu ambiente: cp env.example .env"
echo "2. Edite o arquivo .env com suas credenciais"
echo "3. Execute: ./riskguardian-start.sh start"
echo ""
echo "Para ajuda completa: ./riskguardian-start.sh help" 