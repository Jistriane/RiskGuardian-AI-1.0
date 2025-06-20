# 🚀 Scripts de Sistema - RiskGuardian AI

Este documento descreve os scripts de automação para gerenciar todo o ecossistema RiskGuardian AI.

## 📋 Scripts Disponíveis

### 1. `start-riskguardian.sh` - Inicialização Completa

Script principal que inicializa todo o sistema RiskGuardian AI com diferentes modos de operação.

#### Uso:
```bash
./start-riskguardian.sh [mode]
```

#### Modos Disponíveis:

**🔧 dev (padrão)**
- Desenvolvimento local completo
- Inicia blockchain local (Anvil/Hardhat)
- Backend em modo desenvolvimento
- Frontend em modo desenvolvimento
- Todos os serviços opcionais

```bash
./start-riskguardian.sh dev
# ou simplesmente
./start-riskguardian.sh
```

**🚀 prod**
- Modo produção
- Backend otimizado
- Frontend buildado
- Sem blockchain local

```bash
./start-riskguardian.sh prod
```

**⛓️ blockchain**
- Apenas blockchain local
- Para testes de contratos

```bash
./start-riskguardian.sh blockchain
```

**🧪 test**
- Instala dependências
- Não inicia serviços
- Para preparação de testes

```bash
./start-riskguardian.sh test
```

#### Recursos do Script:

- ✅ **Verificação de pré-requisitos** (Node.js 18+, npm, git)
- ✅ **Limpeza de portas** em uso
- ✅ **Instalação automática** de dependências
- ✅ **Detecção inteligente** de serviços disponíveis
- ✅ **Logs detalhados** em `riskguardian-startup.log`
- ✅ **Verificação de saúde** dos serviços
- ✅ **Interface colorida** com status em tempo real

#### Portas Utilizadas:
- **Frontend**: 3000
- **Backend**: 3001
- **Blockchain**: 8545
- **ElizaOS**: 3002
- **Chromia**: 3003

---

### 2. `stop-riskguardian.sh` - Parada Completa

Para todos os serviços RiskGuardian AI de forma segura.

#### Uso:
```bash
./stop-riskguardian.sh
```

#### Funcionalidades:

- 🛑 **Para serviços por PID** (mais seguro)
- 🛑 **Para serviços por porta** (fallback)
- 🧹 **Limpa processos** residuais
- 🗂️ **Remove arquivos PID** temporários
- 📊 **Status visual** da parada

---

### 3. `status-riskguardian.sh` - Monitor de Status

Verifica o status completo de todos os serviços e sistema.

#### Uso:
```bash
./status-riskguardian.sh
```

#### Informações Exibidas:

**💻 Sistema:**
- Informações do OS
- Versões Node.js/npm
- Uso de memória e disco

**🚀 Serviços:**
- Status de cada porta
- Health checks automáticos
- Códigos de resposta HTTP

**🌐 Rede:**
- Portas em uso
- URLs de produção
- Conectividade

**📝 Logs:**
- Arquivo de startup
- PIDs ativos
- Histórico de logs

---

## 🛠️ Exemplos de Uso

### Início Rápido para Desenvolvimento:
```bash
# Clone o projeto
git clone <repo-url>
cd riskguardian-ai

# Inicie tudo em modo desenvolvimento
./start-riskguardian.sh dev

# Aguarde a mensagem de sucesso
# Acesse: http://localhost:3000
```

### Workflow Completo:
```bash
# 1. Verificar status atual
./status-riskguardian.sh

# 2. Parar tudo se necessário
./stop-riskguardian.sh

# 3. Iniciar em modo desenvolvimento
./start-riskguardian.sh dev

# 4. Monitorar logs
tail -f riskguardian-startup.log

# 5. Verificar status
./status-riskguardian.sh

# 6. Parar quando terminar
./stop-riskguardian.sh
```

### Apenas Blockchain para Testes:
```bash
# Iniciar apenas blockchain local
./start-riskguardian.sh blockchain

# Usar em outro terminal para deploy de contratos
cd contracts
npx hardhat run scripts/deploy.ts --network localhost
```

### Modo Produção:
```bash
# Preparar para produção
./start-riskguardian.sh prod

# Sistema estará disponível em:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

---

## 🔧 Personalização

### Modificar Portas:

Edite as variáveis no início de cada script:

```bash
# start-riskguardian.sh
FRONTEND_PORT=3000
BACKEND_PORT=3001
BLOCKCHAIN_PORT=8545
ELIZAOS_PORT=3002
CHROMIA_PORT=3003
```

### Adicionar Novos Serviços:

1. **No `start-riskguardian.sh`**:
   - Adicione função `start_meuservico()`
   - Adicione chamada no `main()`
   - Adicione porta no `show_status()`

2. **No `stop-riskguardian.sh`**:
   - Adicione porta no array `ports`
   - Adicione limpeza específica se necessário

3. **No `status-riskguardian.sh`**:
   - Adicione verificação com `check_service()`

---

## 📊 Logs e Monitoramento

### Arquivo de Log Principal:
```bash
# Visualizar logs em tempo real
tail -f riskguardian-startup.log

# Buscar erros
grep -i error riskguardian-startup.log

# Últimas 50 linhas
tail -n 50 riskguardian-startup.log
```

### Logs de Serviços Individuais:
```bash
# Frontend (Next.js)
cd frontend
npm run dev 2>&1 | tee frontend.log

# Backend
cd backend
npm run dev 2>&1 | tee backend.log
```

### Monitoramento de Processos:
```bash
# Ver todos os processos Node.js
ps aux | grep node

# Ver processos por porta
lsof -i :3000
lsof -i :3001
```

---

## 🚨 Solução de Problemas

### Porta já em uso:
```bash
# Identificar processo
lsof -i :3000

# Matar processo específico
kill -9 <PID>

# Ou usar o script de parada
./stop-riskguardian.sh
```

### Dependências não instaladas:
```bash
# Instalar manualmente
cd frontend && npm install
cd ../backend && npm install

# Ou usar modo test
./start-riskguardian.sh test
```

### Problemas de permissão:
```bash
# Tornar scripts executáveis
chmod +x *.sh

# Verificar permissões
ls -la *.sh
```

### Logs de erro:
```bash
# Verificar logs do sistema
./status-riskguardian.sh

# Ver logs detalhados
cat riskguardian-startup.log

# Reiniciar com logs verbosos
DEBUG=1 ./start-riskguardian.sh dev
```

---

## 🔄 Atualizações e Manutenção

### Atualizar Dependências:
```bash
# Parar sistema
./stop-riskguardian.sh

# Atualizar
cd frontend && npm update
cd ../backend && npm update

# Reiniciar
./start-riskguardian.sh dev
```

### Backup de Configurações:
```bash
# Criar backup dos scripts
tar -czf riskguardian-scripts-backup.tar.gz *.sh *.md

# Restaurar se necessário
tar -xzf riskguardian-scripts-backup.tar.gz
```

---

## 📞 Suporte

Para problemas com os scripts:

1. **Verificar logs**: `cat riskguardian-startup.log`
2. **Verificar status**: `./status-riskguardian.sh`
3. **Tentar reiniciar**: `./stop-riskguardian.sh && ./start-riskguardian.sh`
4. **Verificar dependências**: Node.js 18+, npm, git

---

## 🔗 URLs Importantes

### Desenvolvimento Local:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Blockchain**: http://localhost:8545

### Produção:
- **Frontend**: https://riskguardian-7ewwn3tg2-jistrianes-projects.vercel.app
- **Backend**: https://riskguardian-backend.onrender.com

---

*Scripts criados para facilitar o desenvolvimento e operação do RiskGuardian AI* 🛡️ 