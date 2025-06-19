#!/bin/bash

# 🚀 RiskGuardian AI - Frontend Start Script
# Automatiza o processo de configuração e execução do frontend

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_VERSION="18.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
            print_success "Node.js version $NODE_VERSION is compatible"
        else
            print_error "Node.js version $NODE_VERSION is too old. Required: $REQUIRED_VERSION+"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
        exit 1
    fi
}

# Function to check if ports are available
check_ports() {
    local ports=(3000 8001 3003 3002)
    local unavailable_ports=()
    
    for port in "${ports[@]}"; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
            unavailable_ports+=($port)
        fi
    done
    
    if [ ${#unavailable_ports[@]} -gt 0 ]; then
        print_warning "The following ports are in use: ${unavailable_ports[*]}"
        print_warning "You may need to stop services using these ports"
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ ! -f package.json ]; then
        print_error "package.json not found. Make sure you're in the correct directory."
        exit 1
    fi
    
    # Check if node_modules exists and is not empty
    if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
        npm install
        print_success "Dependencies installed successfully"
    else
        print_status "Dependencies already installed. Checking for updates..."
        npm ci
        print_success "Dependencies verified"
    fi
}

# Function to setup environment
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        if [ -f env.example ]; then
            cp env.example .env.local
            print_success "Created .env.local from env.example"
            print_warning "Please edit .env.local with your actual configuration values"
            print_warning "Especially NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID from https://cloud.walletconnect.com"
        else
            print_warning ".env.local not found and no env.example available"
            print_warning "You may need to create .env.local manually"
        fi
    else
        print_success "Environment file .env.local already exists"
    fi
}

# Function to check backend services
check_backend_services() {
    print_status "Checking backend services..."
    
    local services=(
        "http://localhost:8001;Backend API"
        "http://localhost:3003;ElizaOS Agent"
        "http://localhost:3002;Chromia Alerts"
    )
    
    local available_services=0
    local total_services=${#services[@]}
    
    for service in "${services[@]}"; do
        IFS=';' read -r url name <<< "$service"
        
        if curl -s --max-time 5 "$url" >/dev/null 2>&1; then
            print_success "$name is running at $url"
            ((available_services++))
        else
            print_warning "$name is not responding at $url"
        fi
    done
    
    if [ $available_services -eq 0 ]; then
        print_error "No backend services are running!"
        print_error "Please start the backend services before running the frontend:"
        print_error "  - Backend API: http://localhost:8001"
        print_error "  - ElizaOS Agent: http://localhost:3003"
        print_error "  - Chromia Alerts: http://localhost:3002"
        
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    elif [ $available_services -lt $total_services ]; then
        print_warning "Some backend services are not running. Frontend may have limited functionality."
    else
        print_success "All backend services are running!"
    fi
}

# Function to run type check
run_type_check() {
    print_status "Running TypeScript type check..."
    
    if npm run type-check >/dev/null 2>&1; then
        print_success "TypeScript types are valid"
    else
        print_warning "TypeScript type check failed. Running anyway..."
    fi
}

# Function to start development server
start_dev_server() {
    print_status "Starting Next.js development server..."
    print_status "Frontend will be available at: http://localhost:3000"
    print_status "Press Ctrl+C to stop the server"
    
    # Start the development server
    npm run dev
}

# Function to show help
show_help() {
    echo "🚀 RiskGuardian AI - Frontend Start Script"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  start, dev        Start development server (default)"
    echo "  build             Build for production"
    echo "  preview           Build and start production server"
    echo "  install           Install dependencies only"
    echo "  setup             Setup environment only"
    echo "  check             Check system requirements"
    echo "  clean             Clean build files and dependencies"
    echo "  help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                Start development server"
    echo "  $0 build          Build for production"
    echo "  $0 clean          Clean and reinstall everything"
}

# Function to build for production
build_production() {
    print_status "Building for production..."
    
    npm run build
    print_success "Production build completed!"
    print_status "To start production server, run: npm start"
}

# Function to preview production build
preview_production() {
    print_status "Building and starting production server..."
    
    npm run build
    print_success "Production build completed!"
    print_status "Starting production server at http://localhost:3000"
    
    npm start
}

# Function to clean everything
clean_all() {
    print_status "Cleaning build files and dependencies..."
    
    # Remove build files
    rm -rf .next
    rm -rf out
    rm -rf node_modules
    rm -f package-lock.json
    
    print_success "Cleaned successfully!"
    print_status "Run '$0 install' to reinstall dependencies"
}

# Function to check system requirements
check_system() {
    print_status "Checking system requirements..."
    
    # Check Node.js
    check_node_version
    
    # Check npm
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm version $NPM_VERSION is available"
    else
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check Git
    if command_exists git; then
        GIT_VERSION=$(git --version | cut -d' ' -f3)
        print_success "Git version $GIT_VERSION is available"
    else
        print_warning "Git is not installed (optional)"
    fi
    
    # Check available disk space
    AVAILABLE_SPACE=$(df . | awk 'NR==2 {print $4}')
    if [ "$AVAILABLE_SPACE" -lt 1048576 ]; then  # Less than 1GB in KB
        print_warning "Low disk space available. Consider freeing up some space."
    else
        print_success "Sufficient disk space available"
    fi
    
    # Check ports
    check_ports
    
    print_success "System requirements check completed!"
}

# Main execution
main() {
    echo "🚀 RiskGuardian AI - Frontend Setup & Start"
    echo "=========================================="
    
    case "${1:-start}" in
        "start"|"dev"|"")
            check_node_version
            check_ports
            install_dependencies
            setup_environment
            check_backend_services
            run_type_check
            start_dev_server
            ;;
        "build")
            check_node_version
            install_dependencies
            run_type_check
            build_production
            ;;
        "preview")
            check_node_version
            install_dependencies
            run_type_check
            preview_production
            ;;
        "install")
            check_node_version
            install_dependencies
            ;;
        "setup")
            setup_environment
            ;;
        "check")
            check_system
            ;;
        "clean")
            clean_all
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 