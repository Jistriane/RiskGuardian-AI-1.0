# 🛠️ RiskGuardian AI - System Scripts Documentation

## 📋 Overview

This document provides complete information about all system scripts available in RiskGuardian AI for initialization, management, and monitoring of services.

## 🚀 Main Scripts

### 1. setup-riskguardian.sh
**Purpose**: Initial system setup
**Usage**: `./setup-riskguardian.sh`

**What it does:**
- Installs all necessary dependencies
- Configures environment files
- Initializes databases (PostgreSQL/Redis)
- Prepares blockchain environment
- Configures AI services

**Example:**
```bash
#!/bin/bash
echo "🚀 Setting up RiskGuardian AI..."

# Install dependencies
npm install

# Configure databases
./scripts/setup-database.sh

# Initialize blockchain
./scripts/setup-blockchain.sh

echo "✅ Setup completed!"
```

### 2. start-riskguardian.sh
**Purpose**: Complete system initialization
**Usage**: `./start-riskguardian.sh [mode]`

**Available Modes:**
- `dev` - Complete development (default)
- `prod` - Production mode
- `blockchain` - Local blockchain only
- `test` - Installation testing only

**What it does:**
- Starts all services in the correct order
- Monitors service health
- Generates startup logs
- Provides access URLs

**Example:**
```bash
#!/bin/bash
MODE=${1:-dev}

echo "🚀 Starting RiskGuardian AI in $MODE mode..."

case $MODE in
  "dev")
    # Start all development services
    ;;
  "prod")
    # Start production services
    ;;
  "blockchain")
    # Start only blockchain
    ;;
  "test")
    # Test installation
    ;;
esac
```

### 3. stop-riskguardian.sh
**Purpose**: Safe system shutdown
**Usage**: `./stop-riskguardian.sh`

**What it does:**
- Gracefully stops all services
- Saves current state
- Cleans temporary files
- Generates shutdown report

**Example:**
```bash
#!/bin/bash
echo "🛑 Stopping RiskGuardian AI..."

# Stop services gracefully
pkill -f "npm run dev"
pkill -f "hardhat node"

echo "✅ All services stopped safely"
```

### 4. status-riskguardian.sh
**Purpose**: System status monitoring
**Usage**: `./status-riskguardian.sh`

**What it shows:**
- Service status (running/stopped)
- Port usage
- Resource consumption
- Health checks

**Example:**
```bash
#!/bin/bash
echo "📊 RiskGuardian AI System Status"
echo "================================="

# Check each service
check_service "Frontend" 3001
check_service "Backend" 8001
check_service "ElizaOS" 3000
check_service "PostgreSQL" 5432
check_service "Redis" 6379
check_service "Blockchain" 8545
```

## 📊 Service Management

### Service Ports:
- **Frontend (Next.js)**: 3001
- **Backend (Node.js)**: 8001
- **ElizaOS Agent**: 3000
- **PostgreSQL**: 5432
- **Redis**: 6379
- **Blockchain (Anvil)**: 8545

### Service Dependencies:
```
Frontend (3001) → Backend (8001) → Database (5432)
                     ↓
Backend (8001) → ElizaOS (3000) → AI Services
                     ↓
Backend (8001) → Blockchain (8545) → Smart Contracts
```

## 🔧 Utility Scripts

### Database Scripts:

**setup-database.sh**
```bash
#!/bin/bash
# Initialize PostgreSQL database
createdb riskguardian
psql -d riskguardian -f schema.sql

# Start Redis
redis-server --daemonize yes
```

**migrate-database.sh**
```bash
#!/bin/bash
# Run database migrations
cd backend
npx prisma migrate dev
npx prisma generate
```

### Blockchain Scripts:

**setup-blockchain.sh**
```bash
#!/bin/bash
# Start local blockchain
npx hardhat node --port 8545 &

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost
```

**deploy-contracts.sh**
```bash
#!/bin/bash
# Deploy smart contracts to different networks
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat run scripts/deploy.js --network mumbai
npx hardhat run scripts/deploy.js --network fuji
```

### Monitoring Scripts:

**health-check.sh**
```bash
#!/bin/bash
# Check service health
curl -f http://localhost:3001/api/health || exit 1
curl -f http://localhost:8001/api/health || exit 1
curl -f http://localhost:3000/health || exit 1
```

**log-monitor.sh**
```bash
#!/bin/bash
# Monitor all service logs
tail -f logs/frontend.log &
tail -f logs/backend.log &
tail -f logs/elizaos.log &
wait
```

## 📝 Configuration Files

### Environment Templates:

**backend/.env.example**
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/riskguardian"

# APIs
ALCHEMY_API_KEY="your_alchemy_key"
COINMARKETCAP_API_KEY="your_cmc_key"
COINGECKO_API_KEY="your_coingecko_key"

# JWT
JWT_SECRET="your_jwt_secret_here"

# Blockchain
PRIVATE_KEY="your_wallet_private_key"
ETHEREUM_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-key"
```

**frontend/.env.local.example**
```env
NEXT_PUBLIC_API_URL="http://localhost:8001"
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:8001"
NEXT_PUBLIC_ENVIRONMENT="development"
```

**elizaos-agent/.env.example**
```env
OPENAI_API_KEY="your_openai_key"
ANTHROPIC_API_KEY="your_anthropic_key"
ELIZAOS_PORT="3000"
```

## 🔍 Troubleshooting Scripts

### Common Problem Solutions:

**fix-ports.sh**
```bash
#!/bin/bash
# Kill processes on specific ports
lsof -ti:3001 | xargs kill -9
lsof -ti:8001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
lsof -ti:8545 | xargs kill -9
```

**clean-install.sh**
```bash
#!/bin/bash
# Clean installation
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf elizaos-agent/node_modules elizaos-agent/package-lock.json

# Reinstall dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../elizaos-agent && npm install
```

**reset-database.sh**
```bash
#!/bin/bash
# Reset database to initial state
dropdb riskguardian
createdb riskguardian
cd backend
npx prisma migrate reset --force
npx prisma generate
```

## 📊 Monitoring and Logs

### Log Files:
- `riskguardian-startup.log` - System initialization
- `logs/frontend.log` - Frontend service logs
- `logs/backend.log` - Backend service logs
- `logs/elizaos.log` - AI agent logs
- `logs/blockchain.log` - Blockchain logs

### Monitoring Commands:

**Real-time Status:**
```bash
# Watch system status
watch -n 5 './status-riskguardian.sh'

# Monitor resource usage
htop

# Check network connections
netstat -tulpn | grep -E ':(3001|8001|3000|5432|6379|8545)'
```

**Log Analysis:**
```bash
# View recent errors
tail -n 50 logs/backend.log | grep ERROR

# Monitor real-time logs
tail -f riskguardian-startup.log

# Search for specific patterns
grep -r "ERROR\|WARN" logs/
```

## 🚀 Deployment Scripts

### Production Deployment:

**deploy-production.sh**
```bash
#!/bin/bash
# Deploy to production environment
echo "🚀 Deploying RiskGuardian AI to production..."

# Build applications
cd frontend && npm run build
cd ../backend && npm run build

# Deploy to cloud provider
# (Railway, Vercel, AWS, etc.)
```

**backup-system.sh**
```bash
#!/bin/bash
# Create system backup
echo "💾 Creating system backup..."

# Backup database
pg_dump riskguardian > backup/db_$(date +%Y%m%d).sql

# Backup configuration files
tar -czf backup/config_$(date +%Y%m%d).tar.gz *.env*

# Backup smart contracts
tar -czf backup/contracts_$(date +%Y%m%d).tar.gz contracts/
```

## 📋 Usage Examples

### Complete Development Setup:
```bash
# 1. Initial setup
./setup-riskguardian.sh

# 2. Start development environment
./start-riskguardian.sh dev

# 3. Check status
./status-riskguardian.sh

# 4. Monitor logs
tail -f riskguardian-startup.log

# 5. Stop when done
./stop-riskguardian.sh
```

### Production Deployment:
```bash
# 1. Prepare production environment
./setup-riskguardian.sh

# 2. Deploy contracts to mainnet
./deploy-contracts.sh mainnet

# 3. Start production services
./start-riskguardian.sh prod

# 4. Monitor health
./health-check.sh
```

### Troubleshooting:
```bash
# 1. Check what's wrong
./status-riskguardian.sh

# 2. Fix port conflicts
./fix-ports.sh

# 3. Clean installation if needed
./clean-install.sh

# 4. Reset database if needed
./reset-database.sh

# 5. Restart system
./start-riskguardian.sh dev
```

## 🔧 Customization

### Adding New Scripts:

1. **Create Script File:**
```bash
touch custom-script.sh
chmod +x custom-script.sh
```

2. **Add to Main Script:**
```bash
# In start-riskguardian.sh
./custom-script.sh
```

3. **Document Usage:**
```bash
# Add to this documentation
```

### Environment Variables:

**Custom Configuration:**
```bash
# Add to .env files
CUSTOM_FEATURE_ENABLED=true
CUSTOM_API_ENDPOINT="https://api.custom.com"
```

**Script Integration:**
```bash
# Use in scripts
if [ "$CUSTOM_FEATURE_ENABLED" = "true" ]; then
    echo "Custom feature enabled"
fi
```

## 📞 Support

### For Script Issues:
1. Check script permissions: `ls -la *.sh`
2. Verify dependencies: `which node npm`
3. Check logs: `cat riskguardian-startup.log`
4. Run in debug mode: `bash -x script-name.sh`

### Common Solutions:
- **Permission denied**: `chmod +x script-name.sh`
- **Command not found**: Install missing dependencies
- **Port in use**: Run `./fix-ports.sh`
- **Database connection**: Check PostgreSQL status

---

**Last Updated**: January 2025
**Version**: 1.0
**Compatibility**: Linux, macOS, Windows (WSL) 