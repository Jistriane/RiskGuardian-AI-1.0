#!/bin/bash

echo "🚀 Iniciando build para GitHub Pages..."

# Definir variáveis de ambiente para GitHub Pages
export GITHUB_PAGES=true
export SKIP_TYPE_CHECK=true
export NODE_ENV=production

# Limpar builds anteriores
echo "🧹 Limpando builds anteriores..."
rm -rf out
rm -rf .next

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Fazer build do Next.js
echo "🔨 Fazendo build do Next.js..."
npm run build

# Verificar se o build foi bem-sucedido
if [ -d "out" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos gerados em: ./out"
    echo "📊 Tamanho do build:"
    du -sh out
    
    # Verificar arquivos principais
    echo "📋 Arquivos principais:"
    ls -la out/
    
    echo ""
    echo "🎉 Pronto para deploy no GitHub Pages!"
    echo "📌 Configure no GitHub: Settings > Pages > Deploy from branch > docs folder"
else
    echo "❌ Erro no build!"
    exit 1
fi 