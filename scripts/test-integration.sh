#!/bin/bash

echo "🧪 Executando Testes de Integração - RiskGuardian AI"

# Colors for better visualization
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test and report result
run_test() {
    local test_name=$1
    local test_command=$2
    local expected_result=${3:-0}
    
    echo -e "\n${BLUE}🧪 Testando: $test_name${NC}"
    
    if eval "$test_command" > /dev/null 2>&1; then
        if [ $? -eq $expected_result ]; then
            echo -e "${GREEN}✅ PASSOU: $test_name${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo -e "${RED}❌ FALHOU: $test_name${NC}"
            TESTS_FAILED=$((TESTS_FAILED + 1))
        fi
    else
        echo -e "${RED}❌ FALHOU: $test_name (erro de execução)${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Function to test API endpoint
test_api_endpoint() {
    local endpoint=$1
    local description=$2
    local expected_status=${3:-200}
    
    echo -e "\n${BLUE}🌐 Testando API: $description${NC}"
    
    response=$(curl -s -w "%{http_code}" -o /tmp/api_response "$endpoint" 2>/dev/null)
    status_code=$response
    
    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASSOU: $description (Status: $status_code)${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FALHOU: $description (Status: $status_code, Esperado: $expected_status)${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Function to test WebSocket connection
test_websocket() {
    local ws_url=$1
    local description=$2
    
    echo -e "\n${BLUE}🔌 Testando WebSocket: $description${NC}"
    
    # Simple WebSocket test using curl (limited but functional)
    if timeout 5 bash -c "exec 3<>/dev/tcp/localhost/3001 && echo -e 'GET /ws HTTP/1.1\r\nHost: localhost:3001\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n\r\n' >&3 && read -t 2 <&3" 2>/dev/null; then
        echo -e "${GREEN}✅ PASSOU: $description${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FALHOU: $description${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

echo -e "${YELLOW}🚀 Iniciando testes de integração...${NC}"

# Test 1: Service Health Checks
echo -e "\n${YELLOW}═══ TESTES DE CONECTIVIDADE ═══${NC}"

test_api_endpoint "http://localhost:3000" "Frontend Next.js" 200
test_api_endpoint "http://localhost:3001/health" "ElizaOS Agent Health" 200
test_api_endpoint "http://localhost:8001" "Backend API" 200
test_api_endpoint "http://localhost:8001/health" "Backend Health Check" 200

# Test 2: API Endpoints
echo -e "\n${YELLOW}═══ TESTES DE API ═══${NC}"

test_api_endpoint "http://localhost:8001/api/auth/status" "Auth Status Endpoint" 200
test_api_endpoint "http://localhost:8001/api/portfolio" "Portfolio Endpoint" 401 # Should require auth
test_api_endpoint "http://localhost:8001/api/monitoring" "Monitoring Endpoint" 401 # Should require auth
test_api_endpoint "http://localhost:8001/api/registry" "Registry Endpoint" 401 # Should require auth

# Test 3: Contract Integration Tests
echo -e "\n${YELLOW}═══ TESTES DE CONTRATOS ═══${NC}"

# Test if deployed contracts are accessible
if [ -f "deployed-hedge-contracts.json" ]; then
    echo -e "${BLUE}📋 Verificando contratos deployed...${NC}"
    
    # Read contract addresses
    if command -v jq > /dev/null; then
        contract_count=$(jq 'keys | length' deployed-hedge-contracts.json 2>/dev/null || echo "0")
        if [ "$contract_count" -gt "0" ]; then
            echo -e "${GREEN}✅ PASSOU: Contratos encontrados ($contract_count)${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo -e "${RED}❌ FALHOU: Nenhum contrato encontrado${NC}"
            TESTS_FAILED=$((TESTS_FAILED + 1))
        fi
    else
        echo -e "${YELLOW}⚠️  jq não encontrado, pulando teste de contratos${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Arquivo de contratos não encontrado${NC}"
fi

# Test 4: Database Connectivity (if available)
echo -e "\n${YELLOW}═══ TESTES DE BANCO DE DADOS ═══${NC}"

run_test "PostgreSQL Connection" "pg_isready -h localhost -p 5432" 0
run_test "Redis Connection" "redis-cli -h localhost -p 6379 ping | grep PONG" 0

# Test 5: Environment Variables
echo -e "\n${YELLOW}═══ TESTES DE CONFIGURAÇÃO ═══${NC}"

# Check if essential environment variables are set
check_env_var() {
    local var_name=$1
    if [ ! -z "${!var_name}" ]; then
        echo -e "${GREEN}✅ PASSOU: Variável $var_name definida${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FALHOU: Variável $var_name não definida${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Load environment variables
if [ -f ".env" ]; then
    source .env
    check_env_var "NODE_ENV"
    check_env_var "PORT"
    check_env_var "DATABASE_URL"
else
    echo -e "${RED}❌ FALHOU: Arquivo .env não encontrado${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 6: WebSocket Connections
echo -e "\n${YELLOW}═══ TESTES DE WEBSOCKET ═══${NC}"

test_websocket "ws://localhost:3001/ws" "ElizaOS WebSocket"

# Test 7: Security Headers
echo -e "\n${YELLOW}═══ TESTES DE SEGURANÇA ═══${NC}"

echo -e "${BLUE}🔒 Verificando cabeçalhos de segurança...${NC}"

# Test CORS headers
cors_test=$(curl -s -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: Content-Type" -X OPTIONS http://localhost:8001 -w "%{http_code}" -o /dev/null)

if [ "$cors_test" = "200" ] || [ "$cors_test" = "204" ]; then
    echo -e "${GREEN}✅ PASSOU: CORS configurado${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FALHOU: CORS não configurado corretamente${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test rate limiting (basic test)
echo -e "${BLUE}🚥 Testando rate limiting...${NC}"
rate_limit_test=0
for i in {1..10}; do
    response=$(curl -s -w "%{http_code}" -o /dev/null http://localhost:8001)
    if [ "$response" = "429" ]; then
        rate_limit_test=1
        break
    fi
    sleep 0.1
done

if [ $rate_limit_test -eq 1 ]; then
    echo -e "${GREEN}✅ PASSOU: Rate limiting ativo${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Rate limiting não detectado (pode ser configurado muito alto)${NC}"
fi

# Test 8: Performance Tests
echo -e "\n${YELLOW}═══ TESTES DE PERFORMANCE ═══${NC}"

echo -e "${BLUE}⚡ Testando tempo de resposta...${NC}"

# Test API response time
api_time=$(curl -w "%{time_total}" -s -o /dev/null http://localhost:8001)
api_time_ms=$(echo "$api_time * 1000" | bc -l 2>/dev/null || echo "1000")

if [ "$(echo "$api_time_ms < 2000" | bc -l 2>/dev/null || echo "0")" = "1" ]; then
    echo -e "${GREEN}✅ PASSOU: API responde em ${api_time_ms}ms${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FALHOU: API muito lenta (${api_time_ms}ms)${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Cleanup
rm -f /tmp/api_response

# Test Results Summary
echo -e "\n${YELLOW}═══ RESUMO DOS TESTES ═══${NC}"
echo -e "${GREEN}✅ Testes Passaram: $TESTS_PASSED${NC}"
echo -e "${RED}❌ Testes Falharam: $TESTS_FAILED${NC}"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=1; $TESTS_PASSED * 100 / $TOTAL_TESTS" | bc -l 2>/dev/null || echo "0")
    echo -e "${BLUE}📊 Taxa de Sucesso: ${SUCCESS_RATE}%${NC}"
fi

# Overall result
if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TODOS OS TESTES PASSARAM!${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  ALGUNS TESTES FALHARAM. Verifique a configuração.${NC}"
    exit 1
fi 