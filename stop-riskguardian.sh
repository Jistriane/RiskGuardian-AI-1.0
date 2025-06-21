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
# 🛑 RISKGUARDIAN AI - SCRIPT DE PARADA
# ================================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_ROOT=$(pwd)
FRONTEND_PORT=3000
BACKEND_PORT=3001
BLOCKCHAIN_PORT=8545
ELIZAOS_PORT=3002
CHROMIA_PORT=3003

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

kill_port() {
    local port=$1
    local service_name=$2
    local pid=$(lsof -t -i:$port 2>/dev/null)
    
    if [ -n "$pid" ]; then
        log "Stopping $service_name on port $port (PID: $pid)..."
        kill -9 $pid 2>/dev/null || true
        sleep 1
        success "$service_name stopped!"
    else
        log "$service_name not running on port $port"
    fi
}

kill_by_pidfile() {
    local pidfile=$1
    local service_name=$2
    
    if [ -f "$pidfile" ]; then
        local pid=$(cat "$pidfile")
        if kill -0 "$pid" 2>/dev/null; then
            log "Stopping $service_name (PID: $pid)..."
            kill -9 "$pid" 2>/dev/null || true
            sleep 1
            success "$service_name stopped!"
        fi
        rm -f "$pidfile"
    fi
}

echo -e "${BLUE}"
echo "════════════════════════════════════════════════════════════════════════"
echo "║                    🛑 STOPPING RISKGUARDIAN AI                        ║"
echo "════════════════════════════════════════════════════════════════════════"
echo -e "${NC}"

log "🛑 Stopping all RiskGuardian AI services..."

# Stop by PID files first
kill_by_pidfile ".frontend.pid" "Frontend"
kill_by_pidfile ".backend.pid" "Backend"
kill_by_pidfile ".elizaos.pid" "ElizaOS"
kill_by_pidfile ".chromia.pid" "Chromia"
kill_by_pidfile ".anvil.pid" "Anvil"
kill_by_pidfile ".hardhat.pid" "Hardhat"

# Stop by ports
kill_port $FRONTEND_PORT "Frontend"
kill_port $BACKEND_PORT "Backend"
kill_port $BLOCKCHAIN_PORT "Blockchain"
kill_port $ELIZAOS_PORT "ElizaOS"
kill_port $CHROMIA_PORT "Chromia"

# Kill known processes
log "🧹 Cleaning up remaining processes..."
pkill -f "next.*dev" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
pkill -f "simple-server" 2>/dev/null || true
pkill -f "server-fixed" 2>/dev/null || true
pkill -f "anvil" 2>/dev/null || true
pkill -f "hardhat.*node" 2>/dev/null || true

# Clean up PID files
rm -f .*.pid 2>/dev/null

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}║                    ✅ RISKGUARDIAN AI STOPPED                          ║${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════════════${NC}"
echo ""
success "All services have been stopped!"
echo ""
