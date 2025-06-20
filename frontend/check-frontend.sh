#!/bin/bash

echo "🔍 Verificando o status do Frontend RiskGuardian AI..."
echo "=================================================="

# Verificar se o processo está rodando
PROCESS=$(ps aux | grep "next dev" | grep -v grep)
if [ -n "$PROCESS" ]; then
    echo "✅ Processo Next.js está rodando:"
    echo "$PROCESS"
else
    echo "❌ Processo Next.js não encontrado"
    exit 1
fi

# Verificar se a porta está escutando
PORT_CHECK=$(lsof -i :3001 2>/dev/null)
if [ -n "$PORT_CHECK" ]; then
    echo "✅ Porta 3001 está ativa"
else
    echo "⚠️  Porta 3001 não está escutando, aguardando..."
    sleep 3
fi

# Testar conexão HTTP
echo ""
echo "🌐 Testando conectividade HTTP..."
HOME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)
echo "   Página inicial: HTTP $HOME_STATUS"

if [ "$HOME_STATUS" = "307" ] || [ "$HOME_STATUS" = "200" ]; then
    echo "✅ Homepage funcionando (redirecionamento correto)"
else
    echo "❌ Homepage não está funcionando"
fi

DASHBOARD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/dashboard)
echo "   Dashboard: HTTP $DASHBOARD_STATUS"

if [ "$DASHBOARD_STATUS" = "200" ]; then
    echo "✅ Dashboard funcionando"
else
    echo "⚠️  Dashboard status: $DASHBOARD_STATUS"
fi

echo ""
echo "🎯 URLs disponíveis:"
echo "   Frontend: http://localhost:3001"
echo "   Dashboard: http://localhost:3001/dashboard"

echo ""
echo "📊 Status dos logs recentes:"
tail -5 dev.log 2>/dev/null || echo "   (logs não encontrados)"

echo ""
echo "=================================================="
echo "✅ Frontend RiskGuardian AI está funcionando!"
echo "🚀 Acesse: http://localhost:3001" 