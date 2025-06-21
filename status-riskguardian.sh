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

# ================================================================================
# 📊 RISKGUARDIAN AI - SCRIPT DE STATUS
# ================================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
PROJECT_ROOT=$(pwd)
FRONTEND_PORT=3000
BACKEND_PORT=3001
BLOCKCHAIN_PORT=8545
ELIZAOS_PORT=3002
CHROMIA_PORT=3003

check_service() {
    local port=$1
    local name=$2
    local url="http://localhost:$port"
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        if curl -s "$url" >/dev/null 2>&1; then
            echo -e "  $name: ${GREEN}✅ Running${NC} (Port $port)"
            return 0
        else
            echo -e "  $name: ${YELLOW}⚠️  Port occupied but not responding${NC} (Port $port)"
            return 1
        fi
    else
        echo -e "  $name: ${RED}❌ Stopped${NC} (Port $port)"
        return 1
    fi
}

check_health_endpoint() {
    local url=$1
    local name=$2
    
    local response=$(curl -s -w "%{http_code}" "$url" 2>/dev/null)
    local http_code="${response: -3}"
    local body="${response%???}"
    
    if [ "$http_code" = "200" ]; then
        echo -e "    Health: ${GREEN}✅ OK${NC}"
        if [ -n "$body" ] && [ "$body" != "OK" ]; then
            echo -e "    Response: ${CYAN}$body${NC}"
        fi
    else
        echo -e "    Health: ${RED}❌ Error ($http_code)${NC}"
    fi
}

show_system_info() {
    echo -e "${CYAN}�� System Information:${NC}"
    echo -e "  OS: $(uname -s) $(uname -r)"
    echo -e "  Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
    echo -e "  npm: $(npm --version 2>/dev/null || echo 'Not installed')"
    echo -e "  Memory: $(free -h | awk '/^Mem:/ {print $3 "/" $2}' 2>/dev/null || echo 'N/A')"
    echo -e "  Disk: $(df -h . | awk 'NR==2 {print $3 "/" $2 " (" $5 " used)"}' 2>/dev/null || echo 'N/A')"
    echo ""
}

show_logs_info() {
    echo -e "${CYAN}📝 Logs & PIDs:${NC}"
    
    # Check for log file
    if [ -f "riskguardian-startup.log" ]; then
        local log_size=$(du -h riskguardian-startup.log | cut -f1)
        echo -e "  Startup Log: ${GREEN}✅ Available${NC} ($log_size)"
        echo -e "    Last 3 lines:"
        tail -n 3 riskguardian-startup.log | sed 's/^/      /'
    else
        echo -e "  Startup Log: ${YELLOW}⚠️  Not found${NC}"
    fi
    
    echo ""
    
    # Check PID files
    local pid_files=(.frontend.pid .backend.pid .elizaos.pid .chromia.pid .anvil.pid .hardhat.pid)
    echo -e "  Process IDs:"
    
    local found_pids=false
    for pidfile in "${pid_files[@]}"; do
        if [ -f "$pidfile" ]; then
            local pid=$(cat "$pidfile" 2>/dev/null)
            local service_name=$(echo "$pidfile" | sed 's/^\.//' | sed 's/\.pid$//')
            
            if kill -0 "$pid" 2>/dev/null; then
                echo -e "    $service_name: ${GREEN}$pid (running)${NC}"
            else
                echo -e "    $service_name: ${RED}$pid (dead)${NC}"
            fi
            found_pids=true
        fi
    done
    
    if [ "$found_pids" = false ]; then
        echo -e "    ${YELLOW}No PID files found${NC}"
    fi
    
    echo ""
}

show_network_info() {
    echo -e "${CYAN}🌐 Network Status:${NC}"
    
    # Check if any RiskGuardian ports are in use
    local ports=($FRONTEND_PORT $BACKEND_PORT $BLOCKCHAIN_PORT $ELIZAOS_PORT $CHROMIA_PORT)
    local ports_in_use=()
    
    for port in "${ports[@]}"; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            ports_in_use+=($port)
        fi
    done
    
    if [ ${#ports_in_use[@]} -gt 0 ]; then
        echo -e "  Ports in use: ${GREEN}${ports_in_use[*]}${NC}"
    else
        echo -e "  Ports in use: ${YELLOW}None${NC}"
    fi
    
    # Check production URLs
    echo -e "  Production URLs:"
    echo -e "    Frontend: ${BLUE}https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app${NC}"
    echo -e "    Backend:  ${BLUE}https://riskguardian-backend.onrender.com${NC}"
    
    echo ""
}

echo -e "${PURPLE}"
echo "════════════════════════════════════════════════════════════════════════"
echo "║                    📊 RISKGUARDIAN AI STATUS                          ║"
echo "════════════════════════════════════════════════════════════════════════"
echo -e "${NC}"

show_system_info

echo -e "${CYAN}🚀 Services Status:${NC}"

# Check core services
check_service $FRONTEND_PORT "Frontend (Next.js)"
if lsof -Pi :$FRONTEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_health_endpoint "http://localhost:$FRONTEND_PORT" "Frontend"
fi

echo ""

check_service $BACKEND_PORT "Backend (Node.js)"
if lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_health_endpoint "http://localhost:$BACKEND_PORT/health" "Backend"
fi

echo ""

# Check optional services
check_service $BLOCKCHAIN_PORT "Blockchain (Local)"
echo ""

if [ -d "elizaos-agent" ]; then
    check_service $ELIZAOS_PORT "ElizaOS Agent"
    if lsof -Pi :$ELIZAOS_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        check_health_endpoint "http://localhost:$ELIZAOS_PORT/health" "ElizaOS"
    fi
    echo ""
fi

if [ -d "chromia" ] || [ -d "chromia_aws" ]; then
    check_service $CHROMIA_PORT "Chromia Services"
    if lsof -Pi :$CHROMIA_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        check_health_endpoint "http://localhost:$CHROMIA_PORT/health" "Chromia"
    fi
    echo ""
fi

show_network_info
show_logs_info

echo -e "${CYAN}📋 Quick Commands:${NC}"
echo -e "  Start:     ${YELLOW}./start-riskguardian.sh [mode]${NC}"
echo -e "  Stop:      ${YELLOW}./stop-riskguardian.sh${NC}"
echo -e "  Logs:      ${YELLOW}tail -f riskguardian-startup.log${NC}"
echo -e "  Frontend:  ${YELLOW}cd frontend && npm run dev${NC}"
echo -e "  Backend:   ${YELLOW}cd backend && npm run dev${NC}"
echo ""

# Overall status
running_services=0
total_services=2  # Frontend + Backend are core

if lsof -Pi :$FRONTEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    ((running_services++))
fi

if lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    ((running_services++))
fi

if [ $running_services -eq $total_services ]; then
    echo -e "${GREEN}🎉 RiskGuardian AI is fully operational!${NC}"
elif [ $running_services -gt 0 ]; then
    echo -e "${YELLOW}⚠️  RiskGuardian AI is partially running ($running_services/$total_services services)${NC}"
else
    echo -e "${RED}❌ RiskGuardian AI is stopped${NC}"
fi

echo ""
