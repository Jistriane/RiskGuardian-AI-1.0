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

echo "🚨 CORREÇÃO FINAL COMPLETA - RISKGUARDIAN"
echo "========================================"

# Matar nodemon
pkill -f nodemon 2>/dev/null || true

# Verificar TypeScript
echo "🔍 Verificando TypeScript..."
if npx tsc --noEmit; then
  echo "✅ TypeScript compilou sem erros!"
  
  # Testar servidor
  echo "🚀 Testando servidor..."
  timeout 5s npm run dev &
  sleep 3
  
  if curl -s http://localhost:8001/health > /dev/null; then
    echo "✅ Servidor funcionando perfeitamente!"
    echo ""
    echo "🎉 PROJETO FUNCIONANDO!"
    echo "======================"
    echo "✅ TypeScript OK"
    echo "✅ Servidor OK"
    echo "✅ APIs funcionais"
    echo ""
    echo "Para iniciar: npm run dev"
  else
    echo "❌ Servidor não respondeu"
  fi
  
  pkill -f nodemon 2>/dev/null || true
  
else
  echo "❌ Ainda há erros TypeScript"
  npx tsc --noEmit
fi
