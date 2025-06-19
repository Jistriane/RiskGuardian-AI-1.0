#!/bin/bash

# Script para corrigir dependências do Chromia AWS
# Remove conflitos de ethers.js e hardhat

echo "🔧 Corrigindo dependências do Chromia AWS..."

cd chromia_aws

# Remover node_modules e package-lock.json
echo "📦 Limpando dependências antigas..."
rm -rf node_modules package-lock.json

# Atualizar package.json para usar versões compatíveis
echo "📝 Atualizando package.json..."

# Backup do package.json original
cp package.json package.json.backup

# Criar novo package.json sem dependências conflitantes
cat > package.json << 'EOF'
{
  "name": "chromia-aws",
  "version": "1.0.0",
  "description": "Chromia AWS Integration Service",
  "main": "src/index.ts",
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.14.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "@types/node": "^20.8.0",
    "@types/express": "^4.17.20",
    "@types/ws": "^8.5.8",
    "@types/cors": "^2.8.15",
    "typescript": "^5.2.2",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.6"
  }
}
EOF

echo "✅ package.json atualizado"

# Instalar dependências sem conflitos
echo "📦 Instalando dependências corrigidas..."
npm install

echo "✅ Dependências do Chromia AWS corrigidas!"
echo "🔙 Retornando ao diretório principal..."
cd .. 