#!/bin/bash

# ================================================================================
# 🚀 RISKGUARDIAN AI - SCRIPT DE INICIALIZAÇÃO COMPLETA
# ================================================================================
# 
# Este script inicializa todo o ecossistema RiskGuardian AI
# Suporta desenvolvimento local e produção
# 
# Uso:
#   ./start-riskguardian.sh [mode]
#
# Modos disponíveis:
#   dev        - Desenvolvimento local (padrão)
#   prod       - Produção (serviços externos)
#   docker     - Docker compose
#   test       - Modo de teste
#   blockchain - Apenas blockchain local
#
# ================================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
MODE=${1:-dev}
PROJECT_ROOT=$(pwd)
FRONTEND_PORT=3001
BACKEND_PORT=8001
BLOCKCHAIN_PORT=8545
ELIZAOS_PORT=3000
CHROMIA_PORT=3002

# Log file
LOG_FILE="$PROJECT_ROOT/riskguardian-startup.log"

# ================================================================================
# UTILITY FUNCTIONS
# ================================================================================

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    echo "[ERROR] $1" >> "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
    echo "[WARNING] $1" >> "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
    echo "[INFO] $1" >> "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
    echo "[SUCCESS] $1" >> "$LOG_FILE"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if port is free
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 1
    else
        return 0
    fi
}

# Kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -t -i:$port 2>/dev/null)
    if [ -n "$pid" ]; then
        log "Killing process on port $port (PID: $pid)"
        kill -9 $pid 2>/dev/null || true
        sleep 2
    fi
}

# Wait for service to be ready
wait_for_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1

    log "Waiting for $name to be ready at $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            success "$name is ready!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    error "$name failed to start after $max_attempts attempts"
    return 1
}

# ================================================================================
# SYSTEM CHECKS
# ================================================================================

check_prerequisites() {
    log "🔍 Checking system prerequisites..."
    
    local missing=()
    
    # Required commands
    local required_commands=("node" "npm" "git")
    
    if [ "$MODE" = "dev" ] || [ "$MODE" = "blockchain" ]; then
        required_commands+=("npx")
    fi
    
    if [ "$MODE" = "docker" ]; then
        required_commands+=("docker" "docker-compose")
    fi
    
    for cmd in "${required_commands[@]}"; do
        if ! command_exists "$cmd"; then
            missing+=("$cmd")
        fi
    done
    
    if [ ${#missing[@]} -ne 0 ]; then
        error "Missing required commands: ${missing[*]}"
        error "Please install them before continuing"
        exit 1
    fi
    
    # Check Node.js version
    local node_version=$(node --version | cut -d'v' -f2)
    local major_version=$(echo $node_version | cut -d'.' -f1)
    
    if [ "$major_version" -lt 18 ]; then
        error "Node.js version 18+ required. Current: $node_version"
        exit 1
    fi
    
    success "All prerequisites met!"
}

check_project_structure() {
    log "📁 Checking project structure..."
    
    local required_dirs=("frontend" "backend")
    local missing=()
    
    for dir in "${required_dirs[@]}"; do
        if [ ! -d "$PROJECT_ROOT/$dir" ]; then
            missing+=("$dir")
        fi
    done
    
    if [ ${#missing[@]} -ne 0 ]; then
        error "Missing required directories: ${missing[*]}"
        exit 1
    fi
    
    # Check package.json files
    if [ ! -f "$PROJECT_ROOT/frontend/package.json" ]; then
        error "frontend/package.json not found"
        exit 1
    fi
    
    if [ ! -f "$PROJECT_ROOT/backend/package.json" ]; then
        error "backend/package.json not found"
        exit 1
    fi
    
    success "Project structure is valid!"
}

# ================================================================================
# CLEANUP FUNCTIONS
# ================================================================================

cleanup_ports() {
    log "🧹 Cleaning up ports..."
    
    local ports=($FRONTEND_PORT $BACKEND_PORT $BLOCKCHAIN_PORT $ELIZAOS_PORT $CHROMIA_PORT)
    
    for port in "${ports[@]}"; do
        kill_port $port
    done
    
    success "Ports cleaned up!"
}

cleanup_processes() {
    log "🧹 Cleaning up processes..."
    
    # Kill common development processes
    pkill -f "next.*dev" 2>/dev/null || true
    pkill -f "node.*server" 2>/dev/null || true
    pkill -f "anvil" 2>/dev/null || true
    pkill -f "hardhat.*node" 2>/dev/null || true
    
    success "Processes cleaned up!"
}

# ================================================================================
# INSTALLATION FUNCTIONS
# ================================================================================

install_dependencies() {
    log "📦 Installing dependencies..."
    
    # Frontend dependencies
    if [ -d "$PROJECT_ROOT/frontend" ]; then
        log "Installing frontend dependencies..."
        cd "$PROJECT_ROOT/frontend"
        npm install --silent
        success "Frontend dependencies installed!"
    fi
    
    # Backend dependencies
    if [ -d "$PROJECT_ROOT/backend" ]; then
        log "Installing backend dependencies..."
        cd "$PROJECT_ROOT/backend"
        npm install --silent
        success "Backend dependencies installed!"
    fi
    
    # ElizaOS dependencies (if exists)
    if [ -d "$PROJECT_ROOT/elizaos-agent" ]; then
        log "Installing ElizaOS dependencies..."
        cd "$PROJECT_ROOT/elizaos-agent"
        npm install --silent 2>/dev/null || warning "ElizaOS dependencies failed (optional)"
    fi
    
    cd "$PROJECT_ROOT"
    success "All dependencies installed!"
}

# ================================================================================
# SERVICE START FUNCTIONS
# ================================================================================

start_blockchain() {
    if [ "$MODE" != "dev" ] && [ "$MODE" != "blockchain" ]; then
        return 0
    fi
    
    log "⛓️  Starting local blockchain..."
    
    if ! check_port $BLOCKCHAIN_PORT; then
        kill_port $BLOCKCHAIN_PORT
    fi
    
    cd "$PROJECT_ROOT"
    
    # Try Anvil first (Foundry)
    if command_exists "anvil"; then
        log "Starting Anvil (Foundry)..."
        anvil --port $BLOCKCHAIN_PORT --host 0.0.0.0 &
        echo $! > .anvil.pid
    # Fallback to Hardhat
    elif [ -f "hardhat.config.ts" ] || [ -f "hardhat.config.js" ]; then
        log "Starting Hardhat network..."
        npx hardhat node --port $BLOCKCHAIN_PORT --hostname 0.0.0.0 &
        echo $! > .hardhat.pid
    else
        warning "No blockchain configuration found, skipping..."
        return 0
    fi
    
    # Wait for blockchain to be ready
    sleep 5
    
    if check_port $BLOCKCHAIN_PORT; then
        error "Blockchain failed to start on port $BLOCKCHAIN_PORT"
        return 1
    fi
    
    success "Blockchain started on port $BLOCKCHAIN_PORT!"
}

start_backend() {
    log "🔧 Starting backend server..."
    
    if ! check_port $BACKEND_PORT; then
        kill_port $BACKEND_PORT
    fi
    
    cd "$PROJECT_ROOT/backend"
    
    # Check if we have a production server
    if [ -f "simple-server.js" ]; then
        log "Starting production backend (simple-server.js)..."
        PORT=$BACKEND_PORT node simple-server.js &
        echo $! > .backend.pid
    elif [ -f "server-fixed.js" ]; then
        log "Starting backend (server-fixed.js)..."
        PORT=$BACKEND_PORT node server-fixed.js &
        echo $! > .backend.pid
    else
        log "Starting development backend..."
        PORT=$BACKEND_PORT npm run dev &
        echo $! > .backend.pid
    fi
    
    cd "$PROJECT_ROOT"
    
    # Wait for backend to be ready
    wait_for_service "http://localhost:$BACKEND_PORT/health" "Backend"
}

start_frontend() {
    log "🎨 Starting frontend server..."
    
    if ! check_port $FRONTEND_PORT; then
        kill_port $FRONTEND_PORT
    fi
    
    cd "$PROJECT_ROOT/frontend"
    
    if [ "$MODE" = "prod" ]; then
        log "Building and starting production frontend..."
        npm run build
        PORT=$FRONTEND_PORT npm start &
        echo $! > .frontend.pid
    else
        log "Starting development frontend..."
        PORT=$FRONTEND_PORT npm run dev &
        echo $! > .frontend.pid
    fi
    
    cd "$PROJECT_ROOT"
    
    # Wait for frontend to be ready
    wait_for_service "http://localhost:$FRONTEND_PORT" "Frontend"
}

start_elizaos() {
    if [ ! -d "$PROJECT_ROOT/elizaos-agent" ]; then
        info "ElizaOS agent not found, skipping..."
        return 0
    fi
    
    log "🤖 Starting ElizaOS agent..."
    
    if ! check_port $ELIZAOS_PORT; then
        kill_port $ELIZAOS_PORT
    fi
    
    cd "$PROJECT_ROOT/elizaos-agent"
    
    PORT=$ELIZAOS_PORT npm run dev &
    echo $! > .elizaos.pid
    
    cd "$PROJECT_ROOT"
    
    # Wait for ElizaOS to be ready
    wait_for_service "http://localhost:$ELIZAOS_PORT/health" "ElizaOS" || warning "ElizaOS failed to start (optional)"
}

start_chromia() {
    if [ ! -d "$PROJECT_ROOT/chromia" ] && [ ! -d "$PROJECT_ROOT/chromia_aws" ]; then
        info "Chromia services not found, skipping..."
        return 0
    fi
    
    log "🔗 Starting Chromia services..."
    
    if ! check_port $CHROMIA_PORT; then
        kill_port $CHROMIA_PORT
    fi
    
    # Try chromia_aws first
    if [ -d "$PROJECT_ROOT/chromia_aws" ]; then
        cd "$PROJECT_ROOT/chromia_aws"
        PORT=$CHROMIA_PORT npm run dev &
        echo $! > .chromia.pid
    elif [ -d "$PROJECT_ROOT/chromia" ]; then
        cd "$PROJECT_ROOT/chromia"
        PORT=$CHROMIA_PORT npm start &
        echo $! > .chromia.pid
    fi
    
    cd "$PROJECT_ROOT"
    
    # Wait for Chromia to be ready
    wait_for_service "http://localhost:$CHROMIA_PORT/health" "Chromia" || warning "Chromia failed to start (optional)"
}

# ================================================================================
# MAIN EXECUTION
# ================================================================================

show_banner() {
    echo -e "${PURPLE}"
    echo "════════════════════════════════════════════════════════════════════════"
    echo "║                     🛡️  RISKGUARDIAN AI                              ║"
    echo "║                 Automated DeFi Risk Management                        ║"
    echo "════════════════════════════════════════════════════════════════════════"
    echo -e "${NC}"
    echo -e "${CYAN}Mode: ${YELLOW}$MODE${NC}"
    echo -e "${CYAN}Project Root: ${YELLOW}$PROJECT_ROOT${NC}"
    echo -e "${CYAN}Log File: ${YELLOW}$LOG_FILE${NC}"
    echo ""
}

show_status() {
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}║                        �� RISKGUARDIAN AI STARTED                      ║${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${CYAN}📊 Services Status:${NC}"
    echo -e "  Frontend:  ${GREEN}http://localhost:$FRONTEND_PORT${NC}"
    echo -e "  Backend:   ${GREEN}http://localhost:$BACKEND_PORT${NC}"
    
    if [ "$MODE" = "dev" ] || [ "$MODE" = "blockchain" ]; then
        echo -e "  Blockchain: ${GREEN}http://localhost:$BLOCKCHAIN_PORT${NC}"
    fi
    
    if [ -d "$PROJECT_ROOT/elizaos-agent" ]; then
        echo -e "  ElizaOS:   ${GREEN}http://localhost:$ELIZAOS_PORT${NC}"
    fi
    
    if [ -d "$PROJECT_ROOT/chromia" ] || [ -d "$PROJECT_ROOT/chromia_aws" ]; then
        echo -e "  Chromia:   ${GREEN}http://localhost:$CHROMIA_PORT${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}📝 Commands:${NC}"
    echo -e "  Stop all:  ${YELLOW}./stop-riskguardian.sh${NC}"
    echo -e "  Logs:      ${YELLOW}tail -f $LOG_FILE${NC}"
    echo -e "  Status:    ${YELLOW}./status-riskguardian.sh${NC}"
    echo ""
    echo -e "${GREEN}🚀 RiskGuardian AI is ready for action!${NC}"
    echo ""
}

main() {
    # Initialize log
    echo "RiskGuardian AI Startup Log - $(date)" > "$LOG_FILE"
    
    show_banner
    
    log "🚀 Starting RiskGuardian AI in $MODE mode..."
    
    # System checks
    check_prerequisites
    check_project_structure
    
    # Cleanup
    cleanup_ports
    cleanup_processes
    
    # Handle different modes
    case $MODE in
        "prod")
            install_dependencies
            start_backend
            start_frontend
            start_elizaos
            start_chromia
            ;;
        "dev")
            install_dependencies
            start_blockchain
            start_backend
            start_frontend
            start_elizaos
            start_chromia
            ;;
        "blockchain")
            start_blockchain
            ;;
        "test")
            install_dependencies
            log "🧪 Test mode - dependencies installed"
            ;;
        *)
            error "Unknown mode: $MODE"
            echo "Available modes: dev, prod, blockchain, test"
            exit 1
            ;;
    esac
    
    show_status
    
    # Keep script running
    if [ "$MODE" != "test" ]; then
        log "Press Ctrl+C to stop all services"
        trap 'log "Shutting down..."; exit 0' INT
        while true; do
            sleep 1
        done
    fi
}

# Execute main function
main "$@"
 