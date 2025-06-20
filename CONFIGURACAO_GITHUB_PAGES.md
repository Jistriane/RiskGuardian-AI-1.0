# 🚀 Configuração GitHub Pages - RiskGuardian AI

## 🎯 Configurações que você deve fazer no GitHub

### 1. **Ativar GitHub Pages**
1. Vá para o seu repositório no GitHub: `https://github.com/Jistriane/RiskGuardian-AI-1.0`
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - ✅ **Deploy from a branch**
   - ✅ **Branch: main**
   - ✅ **Folder: / (root)**

### 2. **Ativar GitHub Actions**
1. Ainda em **Settings**
2. Clique em **Actions** > **General**
3. Em **Actions permissions**, selecione:
   - ✅ **Allow all actions and reusable workflows**
4. Em **Workflow permissions**, selecione:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

### 3. **Link do seu site será:**
```
https://jistriane.github.io/RiskGuardian-AI-1.0/
```

---

## 🔧 O que foi configurado automaticamente

### ✅ **Arquivos criados/modificados:**

1. **`.github/workflows/github-pages.yml`**
   - Workflow automático para build e deploy
   - Constrói o Next.js e envia para GitHub Pages
   - Executa automaticamente a cada push

2. **`frontend/next.config.js`**
   - Configuração para exportação estática
   - BasePath correto: `/RiskGuardian-AI-1.0`
   - Otimizações para GitHub Pages

3. **`frontend/src/hooks/useBasePath.ts`**
   - Hook para gerenciar URLs dinâmicas
   - Detecta automaticamente ambiente GitHub Pages

4. **`frontend/src/app/404.tsx`**
   - Página 404 customizada com design do projeto

5. **`frontend/public/.nojekyll`**
   - Desabilita Jekyll (necessário para Next.js)

6. **`frontend/build-github-pages.sh`**
   - Script para build local (opcional)

7. **`frontend/src/hooks/useRealTimeData.ts`**
   - Atualizado com dados de demonstração
   - Compatível com exportação estática

---

## 🚀 Como funciona

### **Deploy Automático:**
1. Você faz `git push` para a branch `main`
2. GitHub Actions executa automaticamente
3. Faz build do Next.js com configurações do GitHub Pages
4. Deploy automático para `https://jistriane.github.io/RiskGuardian-AI-1.0/`

### **Sistema mantido 100%:**
- ✅ Todas as páginas funcionais
- ✅ Sistema bilíngue
- ✅ Componentes UI
- ✅ Hooks e stores
- ✅ Design e navegação

---

## 📋 Checklist de configuração

Após fazer as configurações acima:

- [ ] **Settings > Pages** configurado
- [ ] **Settings > Actions** habilitado  
- [ ] **Workflow executou** (verifique em Actions)
- [ ] **Site acessível** em `https://jistriane.github.io/RiskGuardian-AI-1.0/`

---

## 🔍 Como verificar se funcionou

1. **Verifique Actions:**
   - Vá em **Actions** no repositório
   - Deve ter um workflow "Deploy RiskGuardian AI to GitHub Pages"
   - Status deve estar verde ✅

2. **Acesse o site:**
   ```
   https://jistriane.github.io/RiskGuardian-AI-1.0/
   ```

3. **Teste as páginas:**
   - Dashboard: `/`
   - Portfolio: `/portfolio/`
   - Risk Analysis: `/risk-analysis/`
   - Todas as outras páginas

---

## 🎉 Pronto!

Seu projeto estará funcionando exatamente como configurado, apenas hospedado no GitHub Pages com URL pública!

**🔗 Link final:** `https://jistriane.github.io/RiskGuardian-AI-1.0/` 