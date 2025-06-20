#!/bin/bash

echo "🚀 Instalando e configurando RiskGuardian Frontend..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Criar variáveis de ambiente se não existir
if [ ! -f .env.local ]; then
  echo "🔧 Criando arquivo .env.local..."
  cat > .env.local << EOL
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001

# Wallet Connect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=riskguardian-wallet-connect

# Chain Configuration (Testnet)
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CHAIN_NAME=Sepolia

# Environment
NODE_ENV=development
EOL
fi

# Criar estrutura de pastas se não existir
echo "📁 Criando estrutura de pastas..."
mkdir -p src/components/dashboard
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/wallet
mkdir -p src/hooks
mkdir -p src/stores
mkdir -p src/types
mkdir -p src/services
mkdir -p public/images

echo "✅ Frontend configurado com sucesso!"
echo ""
echo "🔧 Para executar o projeto:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "🌐 O projeto estará disponível em: http://localhost:3000" 