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

echo "🌟 RiskGuardian AI - Production Dashboard"
echo "========================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Function to check service status
check_service() {
    local service=$1
    local port=$2
    local name=$3
    
    if curl -s -f "http://localhost:$port/health" > /dev/null 2>&1 || \
       curl -s -f "http://localhost:$port" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $name${NC}"
    else
        echo -e "${RED}❌ $name${NC}"
    fi
}

# Function to check SSL certificate
check_ssl() {
    if [ -f "ssl/certificates/riskguardian.crt" ] && [ -f "ssl/private/riskguardian.key" ]; then
        local expiry=$(openssl x509 -in ssl/certificates/riskguardian.crt -noout -enddate | cut -d= -f2)
        echo -e "${GREEN}✅ SSL Certificate (expires: $expiry)${NC}"
    else
        echo -e "${RED}❌ SSL Certificate${NC}"
    fi
}

# Function to check GitHub Actions
check_github_actions() {
    if [ -f ".github/workflows/ci-cd.yml" ]; then
        echo -e "${GREEN}✅ CI/CD Pipeline${NC}"
    else
        echo -e "${RED}❌ CI/CD Pipeline${NC}"
    fi
}

# Function to check monitoring stack
check_monitoring() {
    if [ -f "monitoring/docker-compose.monitoring.yml" ]; then
        echo -e "${GREEN}✅ Monitoring Stack${NC}"
    else
        echo -e "${RED}❌ Monitoring Stack${NC}"
    fi
}

# Function to run tests
run_tests() {
    local component=$1
    echo -e "${BLUE}🧪 Testing $component...${NC}"
    
    case $component in
        "backend")
            cd backend && npm test --silent 2>/dev/null | grep -E "(PASS|FAIL|Tests:|Suites:)"
            ;;
        "frontend")
            cd frontend && npm test --watchAll=false --silent 2>/dev/null | grep -E "(PASS|FAIL|Tests:|Suites:)"
            ;;
        *)
            echo "Unknown component"
            ;;
    esac
    cd ..
}

echo ""
echo -e "${CYAN}🔍 SYSTEM STATUS${NC}"
echo "=================="

# Check core services
echo -e "${YELLOW}Core Services:${NC}"
check_service "frontend" "3000" "Frontend (Next.js)"
check_service "backend" "8001" "Backend API"
check_service "elizaos" "3001" "ElizaOS Agent"

# Check databases
echo ""
echo -e "${YELLOW}Databases:${NC}"
if systemctl is-active --quiet postgresql; then
    echo -e "${GREEN}✅ PostgreSQL${NC}"
else
    echo -e "${RED}❌ PostgreSQL${NC}"
fi

if systemctl is-active --quiet redis-server; then
    echo -e "${GREEN}✅ Redis${NC}"
else
    echo -e "${RED}❌ Redis${NC}"
fi

# Check blockchain contracts
echo ""
echo -e "${YELLOW}Blockchain:${NC}"
if [ -f "deployed-hedge-contracts.json" ]; then
    local contracts=$(cat deployed-hedge-contracts.json | jq -r 'keys | length' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ Smart Contracts ($contracts deployed)${NC}"
else
    echo -e "${RED}❌ Smart Contracts${NC}"
fi

echo ""
echo -e "${CYAN}🔒 SECURITY & SSL${NC}"
echo "===================="
check_ssl

# Check security middleware
if grep -q "security.middleware" backend/src/routes/index.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Security Middleware${NC}"
else
    echo -e "${RED}❌ Security Middleware${NC}"
fi

# Check rate limiting
if grep -q "rate.*limit" backend/src/middleware/* 2>/dev/null; then
    echo -e "${GREEN}✅ Rate Limiting${NC}"
else
    echo -e "${RED}❌ Rate Limiting${NC}"
fi

echo ""
echo -e "${CYAN}🚀 CI/CD & DEPLOYMENT${NC}"
echo "======================="
check_github_actions

# Check Docker setup
if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✅ Docker Compose${NC}"
else
    echo -e "${RED}❌ Docker Compose${NC}"
fi

# Check environment files
env_files=(".env-dev" ".env-homolog" ".env-prod")
for env in "${env_files[@]}"; do
    if [ -f "$env" ]; then
        echo -e "${GREEN}✅ $env${NC}"
    else
        echo -e "${YELLOW}⚠️  $env (not found)${NC}"
    fi
done

echo ""
echo -e "${CYAN}📊 MONITORING & ANALYTICS${NC}"
echo "============================"
check_monitoring

# Check Prometheus config
if [ -f "monitoring/prometheus/prometheus.yml" ]; then
    echo -e "${GREEN}✅ Prometheus Config${NC}"
else
    echo -e "${RED}❌ Prometheus Config${NC}"
fi

# Check Grafana dashboards
if [ -d "monitoring/grafana/dashboards" ]; then
    echo -e "${GREEN}✅ Grafana Dashboards${NC}"
else
    echo -e "${RED}❌ Grafana Dashboards${NC}"
fi

# Check alert rules
if [ -f "monitoring/prometheus/rules/riskguardian-alerts.yml" ]; then
    echo -e "${GREEN}✅ Alert Rules${NC}"
else
    echo -e "${RED}❌ Alert Rules${NC}"
fi

echo ""
echo -e "${CYAN}🧪 TESTING INFRASTRUCTURE${NC}"
echo "============================"

# Check test configurations
if [ -f "backend/jest.config.js" ]; then
    echo -e "${GREEN}✅ Backend Testing (Jest)${NC}"
else
    echo -e "${RED}❌ Backend Testing${NC}"
fi

if [ -f "frontend/cypress.config.ts" ]; then
    echo -e "${GREEN}✅ Frontend E2E (Cypress)${NC}"
else
    echo -e "${RED}❌ Frontend E2E${NC}"
fi

# Check test coverage
if [ -d "backend/coverage" ] || [ -d "frontend/coverage" ]; then
    echo -e "${GREEN}✅ Coverage Reports${NC}"
else
    echo -e "${YELLOW}⚠️  Coverage Reports (run tests first)${NC}"
fi

echo ""
echo -e "${CYAN}📈 PERFORMANCE METRICS${NC}"
echo "======================="

# API Response Time
if curl -s -f "http://localhost:8001/health" > /dev/null 2>&1; then
    local response_time=$(curl -o /dev/null -s -w "%{time_total}" http://localhost:8001/health)
    echo -e "${GREEN}✅ API Response Time: ${response_time}s${NC}"
else
    echo -e "${RED}❌ API not responding${NC}"
fi

# Memory usage
local memory=$(free -m | awk 'NR==2{printf "%.1f%%", $3*100/$2}')
echo -e "${GREEN}📊 Memory Usage: $memory${NC}"

# Disk usage
local disk=$(df -h . | awk 'NR==2{print $5}')
echo -e "${GREEN}💾 Disk Usage: $disk${NC}"

echo ""
echo -e "${CYAN}🔧 PRODUCTION READINESS${NC}"
echo "========================="

# Calculate readiness score
readiness_score=0
total_checks=20

# Core services (4 points)
curl -s -f "http://localhost:3000" > /dev/null 2>&1 && ((readiness_score++))
curl -s -f "http://localhost:8001/health" > /dev/null 2>&1 && ((readiness_score++))
systemctl is-active --quiet postgresql && ((readiness_score++))
systemctl is-active --quiet redis-server && ((readiness_score++))

# Security (4 points)
[ -f "ssl/certificates/riskguardian.crt" ] && ((readiness_score++))
grep -q "security.middleware" backend/src/routes/index.ts 2>/dev/null && ((readiness_score++))
grep -q "rate.*limit" backend/src/middleware/* 2>/dev/null && ((readiness_score++))
[ -f ".env-prod" ] && ((readiness_score++))

# CI/CD (3 points)
[ -f ".github/workflows/ci-cd.yml" ] && ((readiness_score++))
[ -f "docker-compose.yml" ] && ((readiness_score++))
[ -f "Dockerfile" ] && ((readiness_score++))

# Monitoring (4 points)
[ -f "monitoring/docker-compose.monitoring.yml" ] && ((readiness_score++))
[ -f "monitoring/prometheus/prometheus.yml" ] && ((readiness_score++))
[ -f "monitoring/prometheus/rules/riskguardian-alerts.yml" ] && ((readiness_score++))
[ -d "monitoring/grafana" ] && ((readiness_score++))

# Testing (3 points)
[ -f "backend/jest.config.js" ] && ((readiness_score++))
[ -f "frontend/cypress.config.ts" ] && ((readiness_score++))
[ -f "scripts/setup-testing.sh" ] && ((readiness_score++))

# Blockchain (2 points)
[ -f "deployed-hedge-contracts.json" ] && ((readiness_score++))
[ -f "hardhat.config.ts" ] && ((readiness_score++))

# Calculate percentage
readiness_percentage=$((readiness_score * 100 / total_checks))

echo -e "${BLUE}📊 Production Readiness Score: $readiness_score/$total_checks ($readiness_percentage%)${NC}"

if [ $readiness_percentage -ge 90 ]; then
    echo -e "${GREEN}🚀 READY FOR PRODUCTION!${NC}"
elif [ $readiness_percentage -ge 70 ]; then
    echo -e "${YELLOW}⚠️  ALMOST READY (minor issues to fix)${NC}"
else
    echo -e "${RED}❌ NOT READY (major issues to address)${NC}"
fi

echo ""
echo -e "${CYAN}🔗 USEFUL LINKS${NC}"
echo "==============="
echo -e "${BLUE}Application:${NC}"
echo "  🌐 Frontend:     http://localhost:3000"
echo "  🔧 Backend API:  http://localhost:8001"
echo "  🤖 ElizaOS:      http://localhost:3001"
echo ""
echo -e "${BLUE}Monitoring:${NC}"
echo "  📊 Prometheus:   http://localhost:9090"
echo "  📈 Grafana:      http://localhost:3030 (admin/riskguardian2024)"
echo "  🚨 AlertManager: http://localhost:9093"
echo ""
echo -e "${BLUE}Development:${NC}"
echo "  📋 API Docs:     http://localhost:8001/api-docs"
echo "  🧪 Test Results: ./coverage/merged/html/index.html"

echo ""
echo -e "${CYAN}⚡ QUICK COMMANDS${NC}"
echo "=================="
echo -e "${YELLOW}Development:${NC}"
echo "  ./scripts/start-dev.sh           # Start development"
echo "  ./scripts/test-integration.sh    # Run all tests"
echo "  ./scripts/status-dashboard.sh    # Current status"
echo ""
echo -e "${YELLOW}Production:${NC}"
echo "  docker-compose up -d              # Start production"
echo "  docker-compose -f monitoring/docker-compose.monitoring.yml up -d  # Start monitoring"
echo "  ./scripts/setup-ssl.sh           # Setup SSL certificates"
echo ""
echo -e "${YELLOW}Testing:${NC}"
echo "  ./scripts/setup-testing.sh       # Setup test environment"
echo "  ./scripts/run-integration-tests.sh  # Run integration tests"
echo "  ./scripts/generate-coverage-report.sh  # Generate coverage"

echo ""
echo -e "${GREEN}✨ RiskGuardian AI Production Dashboard Complete!${NC}" 