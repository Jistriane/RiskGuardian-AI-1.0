# 🚀 RiskGuardian AI - Inicialização Completa de Todos os Serviços

## 📋 Visão Geral

Este documento explica como inicializar todos os serviços do RiskGuardian AI de forma automática e orquestrada. O sistema foi projetado para que **todos os serviços se conectem automaticamente** quando iniciados juntos.

## 🏗️ Arquitetura do Sistema

### Serviços Principais:
- **🌐 Frontend (Next.js)** - Porta 3001 - Interface web principal
- **🔌 Backend API (Node.js/TypeScript)** - Porta 8001 - API REST e WebSocket
- **🤖 ElizaOS Agent** - Porta 3000 - Sistema de IA para insights
- **🚨 Chromia AWS** - Porta 3002 - Sistema de alertas e monitoramento

### Como os Serviços se Conectam:
```
Frontend (3001) ←→ Backend API (8001)
     ↓                    ↓
ElizaOS Agent (3000) ←→ Chromia AWS (3002)
```

## 🚀 Inicialização Rápida

### 1. Script de Inicialização Completa

```bash
# Iniciar todos os serviços automaticamente
./start-all-services.sh
```

Este script:
- ✅ Verifica dependências (Node.js, npm)
- ✅ Instala dependências faltantes
- ✅ Limpa processos antigos
- ✅ Inicia serviços na ordem correta (dependências)
- ✅ Aguarda todos ficarem prontos
- ✅ Verifica conectividade entre serviços
- ✅ Exibe status final com URLs

### 2. Verificar Status

```bash
# Verificar se todos os serviços estão rodando
./check-services-status.sh
```

### 3. Parar Todos os Serviços

```bash
# Parar todos os serviços de forma segura
./stop-all-services.sh
```

## 📊 URLs dos Serviços

Após a inicialização completa, acesse:

- **🌐 Frontend Principal:** http://localhost:3001
- **🔌 Backend API:** http://localhost:8001
- **🤖 ElizaOS Agent:** http://localhost:3000
- **🚨 Sistema de Alertas:** http://localhost:3002

## 🔗 Conectividade Automática

### Como Funciona a Integração:

1. **Frontend ↔ Backend:**
   - Frontend conecta automaticamente via `api.service.ts`
   - WebSocket para dados em tempo real
   - REST API para operações CRUD

2. **Backend ↔ ElizaOS:**
   - Backend consulta ElizaOS para insights de IA
   - Dados de portfolio são analisados automaticamente
   - Recomendações aparecem no dashboard

3. **Backend ↔ Chromia:**
   - Sistema de alertas monitora métricas de risco
   - Notificações em tempo real
   - Integração com sistema de seguros DeFi

4. **Frontend ↔ Todos:**
   - Dashboard unificado com dados de todos os serviços
   - Atualizações em tempo real via WebSocket
   - Interface responsiva e multilíngue

## 🛠️ Resolução de Problemas

### Porta Ocupada
```bash
# Liberar porta específica
sudo lsof -ti:3001 | xargs sudo kill -9

# Ou usar o script de parada
./stop-all-services.sh
```

### Serviço Não Responde
```bash
# Verificar logs
tail -f logs/frontend.log
tail -f logs/backend.log
tail -f logs/elizaos.log
tail -f logs/chromia.log
```

### Reinstalar Dependências
```bash
# Backend
cd backend && rm -rf node_modules && npm install

# Frontend  
cd frontend && rm -rf node_modules && npm install

# ElizaOS
cd elizaos-agent && rm -rf node_modules && npm install

# Chromia
cd chromia_aws && rm -rf node_modules && npm install --legacy-peer-deps
```

## 📋 Comandos Úteis

### Monitoramento
```bash
# Ver todos os processos npm
ps aux | grep "npm run dev"

# Ver portas ocupadas
lsof -i :3001,:3000,:3002,:8001

# Monitorar logs em tempo real
tail -f logs/*.log

# Ver PIDs dos serviços
cat logs/all-services.pid
```

### Desenvolvimento
```bash
# Iniciar apenas um serviço
cd frontend && npm run dev
cd backend && npm run dev
cd elizaos-agent && npm run dev
cd chromia_aws && npm run dev

# Build de produção
cd frontend && npm run build
cd backend && npm run build
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente
Certifique-se de ter os arquivos `.env` configurados:

- `backend/.env` - Configurações do backend
- `frontend/.env.local` - Configurações do frontend  
- `elizaos-agent/.env` - Chaves de API da IA
- `chromia_aws/.env` - Configurações do sistema de alertas

### Portas Customizadas
Para alterar portas, edite os arquivos:
- `frontend/package.json` - Script "dev"
- `backend/src/index.ts` - Configuração do servidor
- Scripts de inicialização

## 🎯 Fluxo de Inicialização

```
1. Limpeza de processos antigos
2. Verificação de dependências
3. Instalação/verificação de módulos
4. Inicialização do Backend (primeiro - outros dependem)
5. Inicialização do ElizaOS Agent
6. Inicialização do Chromia AWS  
7. Inicialização do Frontend (último - conecta com todos)
8. Verificação de conectividade
9. Status final
```

## ✅ Verificação de Sucesso

O sistema está funcionando corretamente quando:

- ✅ Todos os serviços respondem nas suas URLs
- ✅ Frontend carrega sem erros
- ✅ Dashboard exibe dados em tempo real
- ✅ Métricas de risco são atualizadas
- ✅ Insights de IA são gerados
- ✅ Sistema de alertas está ativo
- ✅ Troca de idioma funciona
- ✅ Conexão com carteira Web3 funciona

## 🚨 Suporte

Se encontrar problemas:

1. Execute `./check-services-status.sh` para diagnóstico
2. Verifique logs em `logs/`
3. Pare todos os serviços: `./stop-all-services.sh`
4. Inicie novamente: `./start-all-services.sh`
5. Verifique se as portas estão livres
6. Confirme que as dependências estão instaladas

---

**🎉 Sistema RiskGuardian AI - Pronto para Uso!**

Após seguir este guia, você terá um sistema DeFi completo com:
- Interface web moderna e responsiva
- API backend robusta
- Sistema de IA para análise de riscos  
- Monitoramento e alertas em tempo real
- Integração completa entre todos os componentes 