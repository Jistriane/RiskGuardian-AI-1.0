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

echo "🚀 Iniciando Frontend RiskGuardian AI..."
echo "========================================"

# FORÇAR IR PARA O DIRETÓRIO FRONTEND
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📁 Diretório atual: $(pwd)"
echo "📁 Conteúdo do diretório:"
ls -la

# Verificar se package.json existe AQUI
if [ ! -f "package.json" ]; then
    echo "❌ ERRO CRÍTICO: package.json não encontrado em $(pwd)!"
    echo "❌ Conteúdo do diretório:"
    ls -la
    exit 1
fi

echo "✅ package.json encontrado!"

# Limpar processos anteriores
echo "🧹 Limpando processos anteriores..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*3001" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
sleep 2

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar dependências!"
        exit 1
    fi
fi

# Limpar cache do Next.js
echo "🧹 Limpando cache do Next.js..."
rm -rf .next
npm cache clean --force 2>/dev/null || true

# Verificar porta 3001
echo "🔍 Verificando porta 3001..."
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Porta 3001 em uso. Liberando..."
    kill -9 $(lsof -t -i:3001) 2>/dev/null || true
    sleep 2
fi

echo "✅ Porta 3001 liberada!"

# Verificar se Next.js está disponível
echo "🔍 Verificando Next.js..."
if ! npx next --version >/dev/null 2>&1; then
    echo "❌ Next.js não encontrado! Reinstalando..."
    npm install next@latest
fi

echo "✅ Next.js disponível: $(npx next --version)"

# Iniciar servidor
echo "🌐 Iniciando servidor Next.js na porta 3001..."
echo "📋 Comando: npm run dev"
echo "📋 Diretório: $(pwd)"
echo "📋 Logs em: dev.log"

# Matar qualquer processo anterior
pkill -f "next dev" 2>/dev/null || true

# Iniciar em background e capturar PID
npm run dev > dev.log 2>&1 &
SERVER_PID=$!

echo "   PID do servidor: $SERVER_PID"
echo "   Salvando PID em: .server.pid"
echo $SERVER_PID > .server.pid

# Aguardar servidor iniciar com timeout
echo "⏳ Aguardando servidor inicializar..."
TIMEOUT=60
COUNT=0

while [ $COUNT -lt $TIMEOUT ]; do
    if curl -s http://localhost:3001 >/dev/null 2>&1; then
        echo "✅ Servidor respondendo!"
        break
    fi
    
    # Verificar se processo ainda está rodando
    if ! kill -0 $SERVER_PID 2>/dev/null; then
        echo "❌ Processo do servidor morreu!"
        echo "📋 Últimas linhas do log:"
        tail -10 dev.log
        exit 1
    fi
    
    COUNT=$((COUNT + 1))
    echo "   Tentativa $COUNT/$TIMEOUT..."
    sleep 1
done

if [ $COUNT -eq $TIMEOUT ]; then
    echo "❌ Timeout: Servidor não respondeu em $TIMEOUT segundos"
    echo "📋 Últimas linhas do log:"
    tail -20 dev.log
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Verificar status das páginas
echo ""
echo "🔍 Testando páginas..."
HOME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 2>/dev/null)
DASHBOARD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/dashboard 2>/dev/null)

echo "   Homepage: HTTP $HOME_STATUS"
echo "   Dashboard: HTTP $DASHBOARD_STATUS"

# Resultado final
echo ""
if [ "$HOME_STATUS" = "200" ] || [ "$HOME_STATUS" = "307" ] || [ "$HOME_STATUS" = "404" ]; then
    echo "🎉 SUCESSO! Frontend RiskGuardian AI está funcionando!"
    echo ""
    echo "🌐 URLs disponíveis:"
    echo "   Frontend: http://localhost:3001"
    echo "   Dashboard: http://localhost:3001/dashboard"
    echo ""
    echo "📋 Comandos úteis:"
    echo "   Ver logs: tail -f $(pwd)/dev.log"
    echo "   Parar servidor: kill \$(cat $(pwd)/.server.pid)"
    echo "   Ou: pkill -f 'next dev'"
    echo "   PID: $SERVER_PID"
    echo ""
    echo "✨ Servidor rodando em background no diretório: $(pwd)"
else
    echo "❌ Erro: Servidor não está respondendo corretamente"
    echo "📋 Verifique os logs em: $(pwd)/dev.log"
    echo "📋 PID do processo: $SERVER_PID"
    exit 1
fi 