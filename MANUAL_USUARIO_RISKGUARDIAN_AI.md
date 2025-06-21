# 📖 Manual do Usuário - RiskGuardian AI

**Sistema Avançado de Proteção DeFi**

---

## 📋 Índice

1. [Introdução](#introdução)
2. [Primeiros Passos](#primeiros-passos)
3. [Interface Principal](#interface-principal)
4. [Dashboard](#dashboard)
5. [Gestão de Portfolio](#gestão-de-portfolio)
6. [Análise de Riscos](#análise-de-riscos)
7. [Automação e Hedge](#automação-e-hedge)
8. [Monitoramento](#monitoramento)
9. [Configurações](#configurações)
10. [Solução de Problemas](#solução-de-problemas)

---

## 🚀 Introdução

O **RiskGuardian AI** é um sistema completo de gestão de riscos para portfolios DeFi que utiliza inteligência artificial e automação blockchain para proteger seus investimentos em criptomoedas.

### Principais Funcionalidades:
- 🛡️ **Proteção Automatizada**: Stop-loss e hedging inteligente
- 📊 **Análise de Riscos**: Monitoramento em tempo real
- 🤖 **IA Avançada**: Insights e recomendações personalizadas
- 🔗 **Multi-Chain**: Suporte para múltiplas blockchains
- 📱 **Interface Moderna**: Dashboard intuitivo e responsivo

---

## 🏁 Primeiros Passos

### 1. Acesso ao Sistema

Para acessar o **RiskGuardian AI**, você pode:

- **Acesso Local**: `http://localhost:3001` (desenvolvimento)
- **Deploy na Vercel**: Seguir instruções em `DEPLOY_VERCEL_GUIDE.md`
- **Deploy no Railway**: Seguir instruções em `DEPLOY_BACKEND_GUIDE.md`

**Requisitos:**
- Navegador moderno (Chrome, Firefox, Safari)
- Extensão MetaMask instalada
- Conexão com a internet estável

### 2. Conectando sua Carteira

![Conectar Wallet](docs/images/manual/02-conectar-wallet.png)

> **Explicação da Imagem:**
> 
> Esta tela demonstra o **processo de conexão da carteira MetaMask** ao RiskGuardian AI. A análise detalhada dos elementos:
> 
> **1. Dashboard em Segundo Plano**:
> - Interface principal do RiskGuardian AI ainda visível
> - **Métricas atualizadas** mostrando dados positivos:
>   - **Valor Total do Portfólio**: $0.00 com 4 ativos
>   - **Score de Risco**: 25/100 (Baixo risco)
>   - **Variação ETH 24h**: +4.94% (agora em verde, indicando alta)
> - **Mercado em alta**: ETH $2,091.34 (+5.88%), BTC $43,131.78 (+9.92%), USDC $1.0069 (+9.42%)
> 
> **2. Modal MetaMask (Direita)**:
> - **Header "MetaMask"** com logo característico da raposa
> - **Ícone "L"** representando localhost/ambiente local
> - **Texto de conexão**: "Connect this website with MetaMask. Mais informações"
> - **Duas abas disponíveis**:
>   - **"Accounts"** (selecionada)
>   - **"Permissões"**
> 
> **3. Informações da Conta**:
> - **Account 1** selecionado com ícone colorido
> - **Endereço**: 0xFE362...66F8A (formato abreviado)
> - **Saldo**: $0.00 USD
> - **ETH**: 0 ETH disponível
> - **Link "Edit accounts"** para gerenciar contas
> 
> **4. Botões de Ação (Inferior)**:
> - **Botão "Cancelar"** (escuro) - para cancelar a conexão
> - **Botão "Conectar"** (roxo/violeta) - para confirmar a conexão
> 
> **5. Mudanças no Dashboard**:
> - **Mercado em tendência positiva** (todos os valores em verde)
> - **Gráfico ETH** mostrando barras azuis com variação temporal
> - **Interface responsiva** mantendo funcionalidade durante conexão
> 
> **Como usar esta funcionalidade**:
> - **Clique "Connect Wallet"** no dashboard para abrir este modal
> - **Verifique a conta** MetaMask que será conectada
> - **Confirme o endereço** da carteira (0xFE362...66F8A)
> - **Clique "Conectar"** para autorizar a conexão
> - **Use "Cancelar"** se quiser abortar o processo
> - **Acesse "Edit accounts"** para trocar de conta se necessário
> 
> **Segurança**:
> - ✅ Conexão segura via MetaMask oficial
> - ✅ Ambiente localhost para desenvolvimento/teste
> - ✅ Permissões controladas pelo usuário
> - ✅ Possibilidade de cancelar a qualquer momento

### 3. Primeira Configuração

![Configuração Inicial](docs/images/manual/03-configuracao-inicial.png)

> **Explicação da Imagem:**
> 
> Esta tela mostra o **Dashboard após a conexão bem-sucedida da wallet**, representando o estado inicial configurado do sistema. A análise detalhada dos elementos:
> 
> **1. Header com Wallet Conectada (Topo Direito)**:
> - **Seletor de idioma**: "🇧🇷 Português" mantido
> - **Informações da wallet conectada**:
>   - **Endereço**: 0xFE...6F8A (formato abreviado)
>   - **Saldo**: 0 ETH
>   - **Rede**: Ethereum (ícone ETH visível)
> - **Dropdown da wallet** expandido mostrando:
>   - **Conta principal**: 0xFE...6F8A com 0 ETH
>   - **Opção de rede**: Ethereum selecionado
> 
> **2. Cards de Status Inicial**:
> - **Valor Total do Portfólio** (azul): $0.00 com 4 ativos
> - **Score de Risco** (verde): 25/100 (Baixo risco - configuração segura inicial)
> - **Variação ETH 24h** (laranja): +0.19% (estabilidade inicial)
> - **Automações Ativas** (roxo): 3 ativas (2 hedge, 1 rebalanceamento pré-configurados)
> 
> **3. Mercado em Tempo Real - Estado Atual**:
> - **ETH**: $2,065.44 (-0.76%) Vol: $810.88M
> - **BTC**: $46,878.86 (-4.85%) Vol: $702.04M
> - **USDC**: $0.9636 (+1.15%) Vol: $928.52M
> - **LINK**: $15.69 (-2.79%) Vol: $229.32M
> - **Indicadores mistos** (vermelhos e verdes) mostrando mercado volátil
> 
> **4. Gráfico ETH - Monitoramento Ativo**:
> - **Timestamp atualizado**: "Última atualização: 03:06:04"
> - **Gráfico de barras** mostrando histórico de preços
> - **Monitoramento contínuo** após conexão da wallet
> 
> **5. Configurações Automáticas Ativadas**:
> - **Sistema de risco**: Score 25/100 (configuração conservadora)
> - **Automações pré-definidas**: 3 estratégias já ativas
> - **Monitoramento**: Dados em tempo real funcionando
> - **Interface responsiva**: Todos os elementos funcionais
> 
> **Estado Pós-Configuração**:
> - ✅ **Wallet conectada** com sucesso (0xFE...6F8A)
> - ✅ **Rede Ethereum** selecionada e ativa
> - ✅ **Sistema de risco** configurado (baixo risco)
> - ✅ **Automações** pré-configuradas e ativas
> - ✅ **Monitoramento** em tempo real funcionando
> - ✅ **Interface** totalmente funcional
> 
> **Próximos Passos Sugeridos**:
> - **Adicionar ativos** ao portfólio (atualmente $0.00)
> - **Configurar estratégias** personalizadas de hedge
> - **Ajustar tolerância** de risco conforme necessário
> - **Explorar funcionalidades** do menu lateral
> - **Monitorar mercado** através dos dados em tempo real
> 
> **Configuração Inicial Completa**:
> Este estado representa uma configuração inicial segura e funcional, pronta para o usuário começar a operar com proteção automatizada ativada.

---

## 🏠 Interface Principal

### Layout Geral

![Interface Completa](docs/images/manual/04-interface-completa.png)

> **Explicação da Imagem:**
> 
> Esta captura mostra a **interface completa do RiskGuardian AI** em sua forma expandida, revelando todas as funcionalidades principais em uma visão panorâmica. A análise detalhada dos elementos:
> 
> **1. Header Superior**:
> - **Logo RiskGuardian AI** (canto esquerdo superior)
> - **Seletor de idioma** "🇧🇷 Português" (centro-direita)
> - **Informações da wallet** conectada no canto direito
> 
> **2. Menu Lateral Esquerdo (Completo)**:
> - **Dashboard** (ativo) - Visão geral do sistema
> - **Trading** - Operações de negociação
> - **Portfolio** - Gestão de ativos
> - **Empréstimos** - Funcionalidades DeFi de lending
> - **Análise de Risco** - Métricas avançadas de risco
> - **Automação** - Estratégias automatizadas
> - **Seguros** - Proteção de ativos
> - **ElizaOS IA** - Assistente de IA integrado
> - **Monitoramento** - Acompanhamento em tempo real
> - **Configurações** - Ajustes do sistema
> 
> **3. Seção Principal - Cards de Métricas**:
> - **4 cards principais** com cores distintas (azul, verde, laranja, roxo)
> - **Dados em tempo real** de portfolio e mercado
> - **Indicadores visuais** de performance e status
> 
> **4. Mercado em Tempo Real**:
> - **Badge "LIVE"** indicando dados atualizados
> - **4 criptomoedas principais**: ETH, BTC, USDC, LINK
> - **Preços e variações** em tempo real
> - **Volumes de negociação** para cada ativo
> 
> **5. Gráfico de Preços - ETH**:
> - **Gráfico de barras interativo** mostrando histórico
> - **Eixo temporal** com datas específicas
> - **Última atualização** com timestamp preciso
> 
> **6. Visão Geral do Portfólio**:
> - **Seção dedicada** para análise de ativos
> - **Interface preparada** para adicionar investimentos
> - **Visualização centralizada** de holdings
> 
> **7. Histórico de Preços**:
> - **Tabela detalhada** com dados históricos
> - **Múltiplas colunas** de informações
> - **Dados organizados** cronologicamente
> 
> **8. Análise de IA (Insights de IA)**:
> - **Seção colorida** com recomendações inteligentes
> - **Múltiplos cards informativos** com diferentes cores:
>   - **Verde**: Recomendações positivas
>   - **Amarelo**: Alertas e avisos
>   - **Vermelho**: Riscos identificados
>   - **Azul**: Informações neutras
> - **Sistema de IA** fornecendo insights automáticos
> 
> **9. Monitoramento de Eventos**:
> - **Lista de eventos** em tempo real
> - **Diferentes tipos de alertas** com códigos de cor
> - **Timestamps** para cada evento
> - **Sistema de notificações** ativo
> 
> **10. Configurações Rápidas**:
> - **Barra de progresso** para configurações
> - **Botão de ação** para aplicar mudanças
> - **Interface intuitiva** para ajustes rápidos
> 
> **11. Status do Sistema**:
> - **Indicadores de saúde** do sistema
> - **Métricas de performance** em tempo real
> - **Status de conectividade** com blockchains
> 
> **Características da Interface**:
> - ✅ **Design responsivo** adaptável a diferentes telas
> - ✅ **Tema escuro** para melhor experiência visual
> - ✅ **Organização modular** com seções bem definidas
> - ✅ **Cores intuitivas** para diferentes tipos de informação
> - ✅ **Dados em tempo real** em todas as seções
> - ✅ **Navegação fluida** entre funcionalidades
> - ✅ **Interface multilíngue** (português configurado)
> 
> **Como navegar na interface**:
> - **Use o menu lateral** para acessar diferentes seções
> - **Monitore os cards superiores** para métricas principais
> - **Acompanhe o mercado** na seção de tempo real
> - **Analise gráficos** para tendências de preços
> - **Observe insights de IA** para recomendações
> - **Verifique eventos** para atualizações importantes
> - **Ajuste configurações** conforme necessário

### Menu de Navegação

![Menu Navegação](docs/images/manual/05-menu-navegacao.png)

> **Explicação da Imagem:**
> 
> Esta captura mostra o **menu lateral de navegação expandido** do RiskGuardian AI, revelando todas as funcionalidades principais organizadas de forma hierárquica e intuitiva. A análise detalhada dos elementos:
> 
> **1. Header do Menu**:
> - **Logo RiskGuardian AI** com ícone de escudo azul
> - **Nome da plataforma** em fonte clara e legível
> - **Design minimalista** em tema escuro profissional
> 
> **2. Itens de Navegação Principal (10 opções)**:
> 
> **📊 Dashboard** (Primeiro item)
> - **Ícone**: Gráfico de barras colorido (azul/vermelho)
> - **Função**: Visão geral do sistema e métricas principais
> - **Status**: Item principal de entrada
> 
> **📈 Trading** 
> - **Ícone**: Gráfico de linha com tendência
> - **Função**: Operações de compra/venda de criptomoedas
> - **Recursos**: Execução de trades e análise técnica
> 
> **💼 Portfolio**
> - **Ícone**: Pasta/maleta marrom
> - **Função**: Gestão e visualização de ativos
> - **Recursos**: Acompanhamento de investimentos e performance
> 
> **💰 Empréstimos**
> - **Ícone**: Moedas douradas empilhadas
> - **Função**: Funcionalidades DeFi de lending e borrowing
> - **Recursos**: Empréstimos descentralizados e yield farming
> 
> **⚠️ Análise de Risco**
> - **Ícone**: Triângulo de alerta amarelo
> - **Função**: Métricas avançadas de análise de risco
> - **Recursos**: VaR, volatilidade, correlações, stress testing
> 
> **🤖 Automação**
> - **Ícone**: Engrenagem/robô cinza
> - **Função**: Estratégias automatizadas de trading e proteção
> - **Recursos**: Stop-loss, take-profit, rebalanceamento automático
> 
> **🛡️ Seguros**
> - **Ícone**: Escudo de proteção azul
> - **Função**: Produtos de seguro para ativos DeFi
> - **Recursos**: Cobertura contra hacks, bugs de smart contracts
> 
> **🧠 ElizaOS IA**
> - **Ícone**: Cérebro/IA em rosa
> - **Função**: Assistente de inteligência artificial
> - **Recursos**: Insights, recomendações, análise preditiva
> 
> **📊 Monitoramento**
> - **Ícone**: Gráfico de monitoramento
> - **Função**: Acompanhamento em tempo real de métricas
> - **Recursos**: Alertas, notificações, logs de sistema
> 
> **⚙️ Configurações**
> - **Ícone**: Engrenagem azul
> - **Função**: Ajustes e personalizações do sistema
> - **Recursos**: Preferências, APIs, segurança, notificações
> 
> **3. Características do Design**:
> - **Ícones intuitivos** para cada funcionalidade
> - **Cores distintivas** para fácil identificação
> - **Tipografia clara** e legível
> - **Espaçamento adequado** entre itens
> - **Tema escuro** para reduzir fadiga visual
> - **Layout vertical** otimizado para navegação
> 
> **4. Organização Hierárquica**:
> - **Funcionalidades principais** no topo (Dashboard, Trading)
> - **Gestão de ativos** no centro (Portfolio, Empréstimos)
> - **Análise e proteção** (Risco, Automação, Seguros)
> - **Ferramentas avançadas** (IA, Monitoramento)
> - **Configurações** na base do menu
> 
> **5. Padrões de UX/UI**:
> - **Ícones universais** fáceis de reconhecer
> - **Agrupamento lógico** de funcionalidades relacionadas
> - **Navegação intuitiva** seguindo convenções web
> - **Feedback visual** claro para cada opção
> 
> **Como usar o menu**:
> - **Clique em qualquer item** para navegar para a seção
> - **Observe os ícones** para identificação rápida
> - **Use a hierarquia** para encontrar funcionalidades relacionadas
> - **Dashboard** sempre disponível como ponto de partida
> - **Configurações** para personalizar a experiência
> 
> **Fluxo de navegação recomendado**:
> 1. **Dashboard** → Visão geral inicial
> 2. **Portfolio** → Adicionar/gerenciar ativos
> 3. **Análise de Risco** → Avaliar exposição
> 4. **Automação** → Configurar proteções
> 5. **Monitoramento** → Acompanhar performance
> 
> Este menu representa o **hub central** de todas as funcionalidades do RiskGuardian AI, proporcionando acesso rápido e organizado a cada ferramenta de gestão de risco DeFi.

---

## 📊 Dashboard

### Visão Geral do Dashboard

![Dashboard Principal](docs/images/manual/06-dashboard-principal.png)

> **Explicação da Imagem:**
> 
> Esta tela mostra o **Dashboard Principal do RiskGuardian AI** com uma interface moderna e intuitiva em tema escuro. A análise detalhada dos elementos:
> 
> **1. Header Superior (Topo)**:
> - **Logo RiskGuardian AI** (canto esquerdo) com ícone de escudo azul
> - **Seletor de idioma** "🇧🇷 Português" (centro-direita)
> - **Botão "Connect Wallet"** (canto direito) em verde turquesa para conectar carteira
> 
> **2. Menu Lateral Esquerdo**:
> - **Dashboard** (ativo/selecionado) com ícone de gráfico
> - **Trading** com ícone de negociação
> - **Portfolio** com ícone de pasta
> - **Empréstimos** com ícone de moedas
> - **Análise de Risco** com ícone de alerta amarelo
> - **Automação** com ícone de engrenagem
> - **Seguros** com ícone de escudo
> - **ElizaOS IA** com ícone de robô/IA
> - **Monitoramento** com ícone de gráfico
> - **Configurações** com ícone de engrenagem
> 
> **3. Cards de Métricas Principais (4 cards coloridos)**:
> - **Valor Total do Portfólio** (azul): $0.00 com 4 ativos
> - **Score de Risco** (verde): 25/100 (Baixo risco)
> - **Variação ETH 24h** (laranja): -3.58% US$ NaN
> - **Automações Ativas** (roxo): 3 ativas (2 hedge, 1 rebalanceamento)
> 
> **4. Seção "Mercado em Tempo Real"**:
> - **Badge "LIVE"** azul indicando dados em tempo real
> - **4 cards de criptomoedas** com preços atualizados:
>   - **ETH**: $1,966.09 (-5.33%) Vol: $751.73M
>   - **BTC**: $42,934.46 (-6.71%) Vol: $711.66M  
>   - **USDC**: $0.9501 (-4.41%) Vol: $895.53M
>   - **LINK**: $15.74 (-1.08%) Vol: $275.84M
> - Todos com **indicadores vermelhos** mostrando queda nos preços
> 
> **5. Gráfico de Preços - ETH (Inferior)**:
> - **Gráfico de barras azuis** mostrando variação de preços do ETH
> - **Timestamp**: "Última atualização: 03:03:44"
> - **Eixo temporal** com datas de 04/02 a 15/03
> - **Indicadores**: Preço Atual, Máxima 24h, Mínima 24h, Volume 24h
> 
> **Como usar esta tela**:
> - **Navegue** pelos cards para ver métricas detalhadas
> - **Monitore** os preços em tempo real na seção de mercado
> - **Analise** as tendências no gráfico de ETH
> - **Use o menu lateral** para acessar outras funcionalidades
> - **Conecte sua wallet** usando o botão verde no topo
> - **Acompanhe** o score de risco e automações ativas

### Métricas de Performance

![Métricas Performance](docs/images/manual/07-metricas-performance.png)

> **Explicação da Imagem:**
> 
> Esta tela apresenta um **dashboard avançado de métricas e performance** dividido em três seções principais que fornecem uma visão completa do status do sistema. A análise detalhada dos elementos:
> 
> **1. Visão Geral do Portfólio (Esquerda)**:
> - **Status**: "Carteira Não Conectada"
> - **Ícone**: Carteira digital em cinza (indicando desconexão)
> - **Mensagem**: "Conecte sua carteira para ver seu portfólio em tempo real"
> - **Botão de ação**: "Use o botão 'Connect Wallet' no menu lateral" (azul)
> - **Função**: Ponto de entrada para conectar wallet e começar monitoramento
> 
> **2. Métricas de Risco (Centro)**:
> **Última Atualização**: 03:12
> 
> **🟢 Volatilidade**: 54%
> - **Status**: Baixa (verde)
> - **Descrição**: "Volatilidade do portfólio nas últimas 24h"
> - **Interpretação**: Nível aceitável de oscilação de preços
> 
> **🟢 Correlação**: 71%
> - **Status**: Estável (verde)  
> - **Descrição**: "Correlação entre ativos do portfólio"
> - **Interpretação**: Alta correlação entre ativos (diversificação limitada)
> 
> **🟡 VaR (1 dia)**: 16%
> - **Status**: Alta (amarelo/laranja)
> - **Descrição**: "Value at Risk para 1 dia (95% confiança)"
> - **Interpretação**: Possível perda máxima de 16% em um dia
> 
> **🟡 Sharpe Ratio**: 1.05
> - **Status**: Estável (amarelo)
> - **Descrição**: "Relação risco-retorno ajustada"
> - **Interpretação**: Retorno ligeiramente superior ao risco assumido
> 
> **🔵 Status Geral**: 
> - **Avaliação**: "Portfólio com risco moderado"
> - **Monitoramento**: "Monitoramento ativo das métricas em tempo real"
> 
> **3. Status da Automação (Direita)**:
> **Última Atualização**: 03:12
> 
> **🛡️ Stop Loss ETH**: ✅ Ativo
> - **Proteção**: "Proteção contra queda > 5%"
> - **Última Execução**: 02:55
> - **Próxima**: 03:57
> 
> **⚖️ Rebalanceamento**: ✅ Ativo
> - **Função**: "Rebalancear portfólio semanalmente"
> - **Última Execução**: 17:31
> - **Próxima**: 03:12
> 
> **⚠️ Alerta Volatilidade**: ✅ Ativo
> - **Trigger**: "Alertar se volatilidade > 50%"
> - **Última Execução**: 02:47
> 
> **🏛️ Seguro DeFi**: ✅ Ativo
> - **Cobertura**: "Cobertura automática para protocolos"
> - **Última Execução**: 02:29
> 
> **✅ Sistema Operacional**:
> - **Status**: "4 de 4 regras ativas"
> - **Monitoramento**: "Monitoramento em tempo real ativo"
> 
> **4. Códigos de Cores e Status**:
> - **🟢 Verde**: Métricas normais/favoráveis
> - **🟡 Amarelo**: Atenção/moderado
> - **🔵 Azul**: Informações neutras/status
> - **✅ Check Verde**: Sistemas ativos e funcionando
> 
> **5. Timestamps e Atualizações**:
> - **Última Atualização Geral**: 03:12
> - **Execuções recentes**: Entre 02:29 e 17:31
> - **Próximas execuções**: Programadas para 03:12 e 03:57
> - **Monitoramento**: Contínuo e em tempo real
> 
> **Interpretação das Métricas**:
> 
> **Risco do Portfólio**:
> - **Volatilidade 54%**: Aceitável para crypto
> - **Correlação 71%**: Alta (considerar diversificação)
> - **VaR 16%**: Risco significativo (monitorar)
> - **Sharpe 1.05**: Performance adequada
> 
> **Status da Proteção**:
> - **4/4 automações ativas**: Sistema totalmente operacional
> - **Execuções regulares**: Proteção contínua
> - **Monitoramento ativo**: Resposta automática a mudanças
> 
> **Como usar estas métricas**:
> - **Monitore VaR**: Se > 20%, considere reduzir exposição
> - **Observe correlação**: Se > 80%, diversifique mais
> - **Acompanhe Sharpe**: Meta > 1.0 para boa performance
> - **Verifique automações**: Todas devem estar ativas
> - **Conecte wallet**: Para dados reais do seu portfólio

### Alertas e Notificações

O sistema oferece um **sistema robusto de alertas** integrado ao dashboard:

**Tipos de Alertas:**
- 🔴 **Críticos**: Requerem ação imediata (ex: Oracle Price Deviation)
- 🟡 **Avisos**: Monitoramento necessário (ex: High Portfolio Volatility)
- 🔵 **Informativos**: Confirmações de execução (ex: Successful Hedge Execution)

**Configurações de Notificação:**
- **Push Notifications**: Alertas em tempo real no navegador
- **Alertas de Preço**: Quando limites são atingidos
- **Alertas de Risco**: Mudanças significativas no portfolio
- **Atualizações do Sistema**: Manutenções e updates

**Ações Disponíveis:**
- **[Reconhecer]**: Marcar como visto
- **[Resolver]**: Marcar como resolvido
- **Filtros**: Críticos, Ativos, Não Resolvidos

---

## 💼 Gestão de Portfolio

### Visão Geral do Portfolio

![Gestão Portfolio](docs/images/manual/08-gestao-portfolio.png)

> **Explicação da Imagem:**
> 
> Esta tela apresenta a **interface completa de gestão de portfolio** com dados reais de um portfólio ativo, mostrando informações detalhadas sobre ativos, performance e alocação. Análise completa dos elementos:
> 
> **1. Cabeçalho Superior**:
> - **Idioma**: Português (bandeira do Brasil) 🇧🇷
> - **Wallet Conectada**: 0xFE...6F8A (endereço truncado)
> - **Saldo ETH**: 0 ETH (mostrado no botão azul)
> - **Timestamp**: 03:14:49 (última atualização)
> - **Botão Atualizar**: ↻ para refresh manual dos dados
> 
> **2. Cards de Métricas Principais**:
> 
> **💰 Valor Total**: $39,292.65
> - **Ícone**: Símbolo de dólar ($)
> - **Significado**: Valor total do portfólio em USD
> - **Status**: Portfólio de tamanho médio ativo
> 
> **📈 Mudança 24h**: $490.92 ↗️
> - **Ícone**: Percentual (%)
> - **Status**: POSITIVO (verde)
> - **Significado**: Ganho de $490.92 nas últimas 24 horas
> - **Trend**: Seta para cima indicando crescimento
> 
> **🎯 Total de Ativos**: 3
> - **Ícone**: Relógio/Timer
> - **Significado**: Portfólio diversificado em 3 criptomoedas
> - **Estratégia**: Diversificação básica mas focada
> 
> **📊 Performance**: 1.25%
> - **Ícone**: Gráfico de barras
> - **Status**: POSITIVO (verde)
> - **Significado**: Retorno de 1.25% no período
> - **Interpretação**: Performance sólida e consistente
> 
> **3. Tabela Detalhada de Ativos**:
> 
> **🟡 Bitcoin (BTC)**:
> - **Símbolo**: B (círculo amarelo)
> - **Saldo**: 0.500000 BTC
> - **Preço Atual**: $46,345.64
> - **Valor Total**: $23,172.82
> - **Mudança 24h**: -$56.72 (VERMELHO - queda)
> - **Alocação**: 58.97% (barra verde - maior parte do portfólio)
> - **Status**: Ativo principal com leve correção
> 
> **🔵 Ethereum (ETH)**:
> - **Símbolo**: E (círculo azul)
> - **Saldo**: 2.000000 ETH
> - **Preço Atual**: $3,065.42
> - **Valor Total**: $6,130.85
> - **Mudança 24h**: -$69.60 (VERMELHO - queda)
> - **Alocação**: 15.60% (barra verde - segunda posição)
> - **Status**: Posição secundária em correção
> 
> **🟢 USD Coin (USDC)**:
> - **Símbolo**: U (círculo verde)
> - **Saldo**: 10000.00 USDC
> - **Preço Atual**: $1.00 (stablecoin)
> - **Valor Total**: $9,988.99
> - **Mudança 24h**: +$0.69 (VERDE - estável)
> - **Alocação**: 25.42% (barra verde - reserva estável)
> - **Status**: Posição defensiva/liquidez
> 
> **4. Análise da Alocação**:
> - **BTC Dominante**: 58.97% (estratégia Bitcoin-heavy)
> - **ETH Moderado**: 15.60% (exposição a smart contracts)
> - **USDC Defensivo**: 25.42% (proteção e liquidez)
> - **Total**: 100% alocado (sem cash fora)
> 
> **5. Indicadores de Performance**:
> 
> **Performance Geral**:
> - **Valor Total**: $39,292.65
> - **Ganho 24h**: +$490.92 (+1.25%)
> - **Tendência**: Crescimento apesar de correções individuais
> 
> **Status dos Ativos**:
> - **BTC/ETH**: Em correção (-$56.72 e -$69.60)
> - **USDC**: Estável (+$0.69)
> - **Resultado Líquido**: Positivo devido ao tamanho das posições
> 
> **6. Códigos de Cores**:
> - **🟢 Verde**: Ganhos, alocações, performance positiva
> - **🔴 Vermelho**: Perdas nas últimas 24h
> - **🟡 Amarelo**: Bitcoin (cor característica)
> - **🔵 Azul**: Ethereum (cor característica)
> - **Barras Verdes**: Todas as alocações (independente da performance)
> 
> **7. Funcionalidades da Interface**:
> - **Atualização em Tempo Real**: Timestamp 03:14:49
> - **Botão Refresh**: Para atualização manual
> - **Dados Precisos**: Até 6 casas decimais para crypto
> - **Valores USD**: Conversão automática para moeda fiat
> - **Percentuais**: Cálculo automático de alocação
> 
> **8. Interpretação Estratégica**:
> 
> **Estratégia Atual**:
> - **60% BTC**: Aposta no "ouro digital"
> - **16% ETH**: Exposição a DeFi/smart contracts
> - **25% USDC**: Proteção contra volatilidade
> 
> **Pontos Fortes**:
> - **Diversificação básica**: 3 ativos diferentes
> - **Reserva em stablecoin**: 25% de proteção
> - **Performance positiva**: +1.25% mesmo com correções
> 
> **Sugestões de Otimização**:
> - **Considerar rebalanceamento**: Se BTC > 60%
> - **Monitorar correlação**: BTC/ETH tendem a se mover juntos
> - **Avaliar mais stablecoins**: Para maior estabilidade
> 
> **Como usar esta tela**:
> - **Monitore alocações**: Mantenha dentro da estratégia
> - **Observe mudanças 24h**: Para timing de rebalanceamento
> - **Use botão atualizar**: Para dados mais recentes
> - **Analise performance**: Meta de crescimento consistente

### Adicionando Ativos

Para adicionar novos ativos ao seu portfolio:

**Processo de Adição:**
1. **Conecte sua Wallet**: Use o botão "Connect Wallet"
2. **Detecção Automática**: O sistema detecta automaticamente os ativos na sua carteira
3. **Atualização em Tempo Real**: Valores e preços são atualizados automaticamente
4. **Suporte Multi-Token**: ETH, BTC, USDC, LINK, AAVE e outros ERC-20

**Funcionalidades:**
- **Detecção Automática**: Não precisa adicionar manualmente
- **Preços em Tempo Real**: Atualizações via oráculos Chainlink
- **Cálculo Automático**: Valores totais e percentuais de alocação
- **Histórico**: Acompanhamento de mudanças ao longo do tempo

### Análise de Distribuição

O sistema oferece **análise automática da distribuição** do portfolio:

**Métricas de Distribuição:**
- **Alocação por Ativo**: Percentual de cada token no portfolio
- **Concentração de Risco**: Identificação de over-allocation
- **Diversificação**: Score de diversificação baseado em correlações
- **Recomendações**: Sugestões de rebalanceamento da IA

**Indicadores Visuais:**
- **Barras de Progresso**: Visualização clara da alocação
- **Códigos de Cores**: Verde (saudável), Amarelo (atenção), Vermelho (risco)
- **Valores Precisos**: Até 6 casas decimais para máxima precisão

---

## ⚠️ Análise de Riscos

### Dashboard de Riscos

![Dashboard Riscos](docs/images/manual/09-dashboard-riscos.png)

> **Explicação da Imagem:**
> 
> Esta tela apresenta o **Dashboard de Análise de Riscos** - uma das funcionalidades mais avançadas do RiskGuardian AI, fornecendo análise completa e recomendações inteligentes baseadas em métricas financeiras sofisticadas. Análise detalhada:
> 
> **1. Cabeçalho e Status Geral**:
> - **Título**: "Análise de Risco"
> - **Timestamp**: 03:20:07 (atualização automática)
> - **Idioma**: Português 🇧🇷
> - **Wallet**: 0xFE...6F8A conectada (0 ETH)
> - **Botão Atualizar**: ↻ para refresh manual
> 
> **2. Indicador de Risco Principal**:
> 
> **🟢 Status: BAIXO**
> - **Classificação**: Risco Baixo (verde)
> - **Base**: "Baseado na volatilidade atual de 8.88%"
> - **Significado**: Portfolio com perfil conservador
> - **Ícone**: Escudo verde (proteção ativa)
> - **Referência**: "Valor do Portfolio" (canto superior direito)
> 
> **3. Métricas de Risco Detalhadas**:
> 
> **📊 Volatilidade: 8.88%**
> - **Status**: Anualizada (baixa)
> - **Ícone**: Gráfico de linha ondulada
> - **Interpretação**: Oscilação muito baixa para crypto
> - **Cor**: Branco (neutro/informativo)
> 
> **🔴 VaR (95%): -$368.69**
> - **Significado**: Value at Risk com 95% de confiança
> - **Interpretação**: Máxima perda esperada de $368.69
> - **Status**: Vermelho (atenção para perda potencial)
> - **Ícone**: Gráfico descendente
> - **Percentual**: Baseado em 95% de confiança estatística
> 
> **🟡 Sharpe Ratio: 0.71**
> - **Significado**: Retorno/Risco ajustado
> - **Status**: Moderado (amarelo)
> - **Interpretação**: Retorno razoável para o risco assumido
> - **Ícone**: Gráfico de barras
> - **Meta**: Idealmente > 1.0 para boa performance
> 
> **📈 Beta: 1.88**
> - **Significado**: Correlação com mercado
> - **Interpretação**: 88% mais volátil que o mercado
> - **Status**: Alto (requer atenção)
> - **Ícone**: Gráfico de tendência
> - **Implicação**: Portfolio mais agressivo que média
> 
> **4. Exposição por Ativo**:
> 
> **🟡 Bitcoin (BTC): 60.37%**
> - **Valor**: $24,532.34
> - **Classificação**: Risco Alto (vermelho)
> - **Concentração**: Dominante no portfolio
> - **Implicação**: Maior exposição ao risco BTC
> 
> **🔵 Ethereum (ETH): 14.78%**
> - **Valor**: $6,007.19
> - **Classificação**: Risco Baixo (verde)
> - **Posição**: Secundária equilibrada
> - **Status**: Contribuição moderada ao risco
> 
> **🟢 USDC: 24.84%**
> - **Valor**: $10,094.10
> - **Classificação**: Risco Baixo (verde)
> - **Função**: Estabilizador do portfolio
> - **Benefício**: Reduz volatilidade geral
> 
> **5. Métricas de Performance**:
> 
> **📉 Max Drawdown: -10.07%**
> - **Significado**: Maior queda histórica
> - **Status**: Vermelho (atenção)
> - **Interpretação**: Perda máxima já experimentada
> 
> **📈 Mudança 24h: +$81.90**
> - **Status**: Positivo (verde)
> - **Tendência**: Crescimento recente
> - **Momentum**: Favorável no curto prazo
> 
> **📊 Performance %: 0.20%**
> - **Status**: Positivo (verde)
> - **Interpretação**: Retorno modesto mas consistente
> - **Período**: Não especificado (provavelmente diário)
> 
> **🎯 Diversificação: 3 ativos**
> - **Status**: Básica mas focada
> - **Estratégia**: Concentrada em principais cryptos
> - **Oportunidade**: Pode ser expandida
> 
> **6. Recomendações de Risco**:
> 
> **⚠️ Alerta: "Baixo Sharpe Ratio"**
> - **Diagnóstico**: "O retorno ajustado ao risco pode ser melhorado"
> - **Cor**: Amarelo (atenção)
> - **Ação Sugerida**: Otimizar relação risco/retorno
> - **Prioridade**: Moderada
> 
> **7. Interpretação das Cores**:
> - **🟢 Verde**: Métricas favoráveis, baixo risco
> - **🟡 Amarelo**: Atenção, pode ser otimizado
> - **🔴 Vermelho**: Alerta, requer ação
> - **⚪ Branco**: Informativo, neutro
> 
> **8. Análise Estratégica**:
> 
> **Pontos Fortes**:
> - **Volatilidade baixa**: 8.88% é excelente para crypto
> - **VaR controlado**: -$368.69 é aceitável para o tamanho
> - **Diversificação**: 25% em stablecoin oferece proteção
> - **Performance positiva**: Crescimento consistente
> 
> **Pontos de Atenção**:
> - **Concentração BTC**: 60% pode ser excessivo
> - **Beta alto**: 1.88 indica alta correlação com mercado
> - **Sharpe baixo**: 0.71 pode ser melhorado
> - **Max Drawdown**: -10.07% requer monitoramento
> 
> **Recomendações**:
> - **Rebalancear**: Reduzir exposição BTC para ~50%
> - **Diversificar**: Adicionar mais ativos descorrelacionados
> - **Monitorar Beta**: Acompanhar correlação com mercado
> - **Otimizar Sharpe**: Buscar melhor relação risco/retorno
> 
> **Como usar este dashboard**:
> - **Monitore o status geral**: Verde = OK, Amarelo = Atenção
> - **Acompanhe VaR**: Se > $500, considere reduzir exposição
> - **Observe Sharpe**: Meta > 1.0 para boa performance
> - **Verifique concentração**: Evite > 50% em um ativo
> - **Siga recomendações**: Implemente sugestões da IA

### Métricas de Volatilidade

O sistema calcula **volatilidade avançada** usando múltiplas metodologias:

**Tipos de Volatilidade:**
- **Histórica**: Baseada em dados de preços passados
- **Implícita**: Derivada de opções e derivativos
- **GARCH**: Modelos de volatilidade condicional
- **Realizada**: Volatilidade intraday de alta frequência

**Métricas Disponíveis:**
- **Volatilidade Anualizada**: Padrão de mercado (ex: 8.88%)
- **Rolling Volatility**: Janelas móveis de 30/60/90 dias
- **Volatilidade por Ativo**: Individual para cada token
- **Bandas de Bollinger**: Canais de volatilidade dinâmicos

**Interpretação:**
- **< 20%**: Baixa volatilidade (conservador)
- **20-50%**: Moderada (equilibrado)
- **> 50%**: Alta volatilidade (agressivo)

### Correlações de Mercado

**Análise de Correlação Automática** entre ativos do portfolio:

**Matriz de Correlações:**
- **Valores -1 a +1**: Força e direção da correlação
- **Heat Map Visual**: Cores representando intensidade
- **Correlação Dinâmica**: Atualização em tempo real
- **Período Customizável**: 7, 30, 90, 365 dias

**Interpretação dos Valores:**
- **+0.8 a +1.0**: Correlação muito forte (mesmo movimento)
- **+0.5 a +0.8**: Correlação moderada
- **-0.5 a +0.5**: Correlação fraca/neutra
- **-1.0 a -0.5**: Correlação negativa (movimentos opostos)

**Benefícios para Diversificação:**
- **Identificar Redundâncias**: Ativos muito correlacionados
- **Otimizar Alocação**: Balancear correlações
- **Reduzir Risco**: Diversificação efetiva

---

## 🤖 Automação e Hedge

### Configuração de Stop-Loss

**Sistema Avançado de Stop-Loss Automático:**

**Tipos de Stop-Loss:**
- **Percentual**: Baseado em % de queda (ex: -5%, -10%)
- **Valor Absoluto**: Baseado em preço específico (ex: ETH < $2000)
- **Trailing Stop**: Acompanha a alta e protege ganhos
- **ATR Stop**: Baseado em Average True Range (volatilidade)

**Configurações Disponíveis:**
- **Limite de Perda**: 5% (padrão), customizável
- **Valor Máximo**: $1000 por execução (configurável)
- **Delay de Execução**: Evita whipsaws com delay de 30s
- **Gas Optimization**: Otimização automática de taxas

**Ativação:**
- **Automática**: Ativa ao conectar wallet
- **Por Ativo**: Configuração individual por token
- **Horário**: 24/7 ou horário específico
- **Condições**: Múltiplas condições lógicas

### Estratégias de Hedge

**Hedge Inteligente Multi-Estratégia:**

**Tipos de Hedge:**
- **Delta Neutral**: Hedge completo via derivativos
- **Pair Trading**: Long/Short em ativos correlacionados
- **Options Collar**: Proteção via puts e calls
- **Futures Hedge**: Contratos futuros para proteção

**Configuração Automática:**
- **Auto Hedge**: Ativação automática quando risco > limite
- **Hedge Ratio**: Percentual do portfolio a ser protegido
- **Rebalanceamento**: Ajuste dinâmico das posições
- **Cross-Chain**: Hedge em múltiplas blockchains

**Parâmetros:**
- **Trigger**: Volatilidade > 50% ou perda > 5%
- **Tamanho**: 50-100% do portfolio
- **Duração**: Temporário ou permanente
- **Custo**: Otimização de fees e slippage

### Automação Ativa

**Central de Controle das Automações:**

**Estratégias Ativas:**
- **Stop Loss ETH**: ✅ Proteção contra queda > 5%
- **Rebalanceamento**: ✅ Semanal com desvio > 10%
- **Alerta Volatilidade**: ✅ Trigger em 50%+
- **Seguro DeFi**: ✅ Cobertura automática

**Monitoramento:**
- **Status em Tempo Real**: Verde (ativo), Vermelho (erro)
- **Última Execução**: Timestamps precisos
- **Próxima Execução**: Cronograma automático
- **Performance**: Métricas de sucesso/falha

**Logs de Execução:**
- **Histórico Completo**: Todas as execuções registradas
- **Detalhes**: Preços, quantidades, fees, resultados
- **Análise**: Performance das estratégias
- **Alertas**: Notificações de execução e erros

---

## 📈 Monitoramento

### Monitoramento em Tempo Real

![Monitoramento Sistema](docs/images/manual/11-monitoramento.png)

> **Explicação da Imagem:**
> 
> Esta tela apresenta o **Dashboard de Monitoramento Completo** do RiskGuardian AI, oferecendo visão abrangente do sistema, alertas e performance em tempo real. Interface organizada em quatro seções principais:
> 
> **1. Cabeçalho e Controles**:
> - **Título**: "Monitoramento"
> - **Subtítulo**: "Monitore métricas e alertas em tempo real"
> - **Botão Auto-Refresh**: ✅ Ativo (atualização automática)
> - **Configurar**: ⚙️ Acesso às configurações
> - **Função**: Central de monitoramento operacional
> 
> **2. Cards de Status Principais**:
> 
> **🟢 Sistema Saudável**: 3
> - **Status**: Verde (excelente)
> - **Valor**: 3 sistemas operacionais
> - **Ícone**: Check verde (tudo funcionando)
> - **Significado**: Infraestrutura estável
> 
> **🔴 Alertas Críticos**: 1
> - **Status**: Vermelho (atenção urgente)
> - **Valor**: 1 alerta crítico ativo
> - **Ícone**: Triângulo de alerta
> - **Significado**: Requer ação imediata
> 
> **🟡 Avisos**: 3
> - **Status**: Amarelo (atenção moderada)
> - **Valor**: 3 avisos ativos
> - **Ícone**: Ponto de exclamação
> - **Significado**: Monitoramento necessário
> 
> **🔵 Uptime**: 99.97%
> - **Status**: Azul (excelente)
> - **Valor**: 99.97% de disponibilidade
> - **Ícone**: Seta para cima
> - **Significado**: Sistema altamente confiável
> 
> **3. Métricas do Sistema**:
> 
> **📊 Uptime**: 100.5%
> - **Status**: Verde (operacional)
> - **Valor**: Acima de 100% (excelente)
> - **Descrição**: "Última Semana"
> - **Interpretação**: Sistema super estável
> 
> **⏱️ Response Time**: 34ms
> - **Status**: Verde (rápido)
> - **Valor**: 34 milissegundos
> - **Descrição**: "Média Atual"
> - **Interpretação**: Resposta muito rápida
> 
> **✅ Transaction Success**: 99.7%
> - **Status**: Verde (excelente)
> - **Valor**: 99.7% de sucesso
> - **Descrição**: "Taxa de Sucesso"
> - **Interpretação**: Quase todas transações OK
> 
> **⚠️ Gas Efficiency**: 80.8%
> - **Status**: Amarelo (bom, pode melhorar)
> - **Valor**: 80.8% de eficiência
> - **Descrição**: "Otimização Gas"
> - **Interpretação**: Boa, mas otimizável
> 
> **4. Gráfico de Performance**:
> - **Tipo**: Linha temporal contínua
> - **Cor**: Verde (performance positiva)
> - **Período**: Últimas horas/dias
> - **Tendência**: Estável e consistente
> - **Escala**: 0-100% de performance
> - **Padrão**: Linha verde constante próxima ao topo
> 
> **5. Alertas e Notificações**:
> 
> **Filtros Disponíveis**:
> - **Todos**: Visão completa
> - **Críticos**: Apenas urgentes
> - **Ativos**: Somente ativos
> - **Não Resolvidos**: Pendentes de ação
> 
> **🟡 Novo Evento do Sistema**:
> - **Descrição**: "Um novo evento foi detectado pelo sistema de monitoramento"
> - **Fonte**: System Monitor
> - **Timestamp**: 21/04/2025, 09:24:57
> - **Ações**: [Reconhecer] [Resolver]
> 
> **🟡 Gas Price Spike Detected**:
> - **Descrição**: "Gas price aumentou para 150 Gwei, 400% acima da média"
> - **Fonte**: Gas Tracker
> - **Timestamp**: 21/04/2025, 09:23:45
> - **Ações**: [Reconhecer] [Resolver]
> 
> **🔴 Oracle Price Deviation**:
> - **Descrição**: "Chainlink ETH/USD está 1% diferente do preço de mercado"
> - **Fonte**: Price Oracle
> - **Timestamp**: 21/04/2025, 09:14:02
> - **Status**: ⚠️ Prioridade alta
> - **Ações**: [Resolver]
> 
> **🔵 Successful Hedge Execution**:
> - **Descrição**: "Hedge automático executado com sucesso para posição ETH"
> - **Fonte**: Automation Engine
> - **Timestamp**: 21/04/2025, 09:09:32
> - **Status**: ✅ Resolvido
> - **Ações**: [Resolvido]
> 
> **🟡 High Portfolio Volatility**:
> - **Descrição**: "Volatilidade do portfólio aumentou para 85%, acima do limite de 50%"
> - **Fonte**: Risk Monitor
> - **Timestamp**: 21/04/2025, 09:04:18
> - **Ações**: [Reconhecer] [Resolver]
> 
> **6. Status dos Serviços**:
> 
> **Linha Superior**:
> - **🟢 Blockchain RPC**: Operacional (34ms)
> - **🟢 Price Oracles**: Operacional (13ms)
> - **🟢 Automation Engine**: Operacional (8ms)
> 
> **Linha Inferior**:
> - **🟡 Risk Calculator**: Degradado (340ms)
> - **🟢 Alert System**: Operacional (67ms)
> - **🟢 Database**: Operacional (23ms)
> 
> **7. Interpretação dos Status**:
> - **🟢 Verde**: Serviço operacional (< 100ms)
> - **🟡 Amarelo**: Degradado (100-500ms)
> - **🔴 Vermelho**: Indisponível (> 500ms)
> - **Tempos**: Latência em milissegundos
> 
> **8. Análise Operacional**:
> 
> **Pontos Fortes**:
> - **Uptime**: 99.97% é excelente
> - **Response Time**: 34ms é muito rápido
> - **Transaction Success**: 99.7% é ótimo
> - **Maioria dos serviços**: Operacionais
> 
> **Pontos de Atenção**:
> - **1 Alerta Crítico**: Oracle Price Deviation
> - **3 Avisos**: Requerem monitoramento
> - **Risk Calculator**: Degradado (340ms)
> - **Gas Efficiency**: 80.8% pode melhorar
> 
> **Ações Recomendadas**:
> - **Resolver Oracle Deviation**: Prioridade alta
> - **Otimizar Gas Usage**: Para melhor eficiência
> - **Investigar Risk Calculator**: Performance degradada
> - **Monitorar Volatility**: Acima do limite
> 
> **9. Como Usar Este Dashboard**:
> 
> **Monitoramento Diário**:
> - **Verifique cards principais**: Verde = OK
> - **Observe alertas críticos**: Vermelho = Urgente
> - **Acompanhe uptime**: Meta > 99%
> - **Monitore response time**: Meta < 100ms
> 
> **Gestão de Alertas**:
> - **Priorize vermelhos**: Ação imediata
> - **Reconheça amarelos**: Para não perder
> - **Resolva quando possível**: Manter sistema limpo
> - **Use filtros**: Para focar no importante
> 
> **Análise de Performance**:
> - **Gráfico temporal**: Tendências de longo prazo
> - **Métricas numéricas**: Valores precisos atuais
> - **Status de serviços**: Saúde da infraestrutura
> - **Auto-refresh**: Para dados sempre atuais

### Histórico de Transações

**Sistema Completo de Rastreamento de Transações:**

**Informações Registradas:**
- **Hash da Transação**: Link direto para block explorer
- **Timestamp**: Data e hora precisas (formato brasileiro)
- **Tipo**: Compra, Venda, Hedge, Rebalanceamento
- **Ativos**: Tokens envolvidos na transação
- **Valores**: Quantidades e preços em USD
- **Fees**: Gas fees e custos de transação
- **Status**: Confirmada, Pendente, Falhada

**Filtros Disponíveis:**
- **Por Período**: Última semana, mês, trimestre, ano
- **Por Ativo**: ETH, BTC, USDC, LINK, etc.
- **Por Tipo**: Todas, Compras, Vendas, Automações
- **Por Status**: Todas, Confirmadas, Pendentes

**Funcionalidades:**
- **Export CSV**: Download completo dos dados
- **Paginação**: Navegação eficiente em grandes volumes
- **Busca**: Localização por hash ou valor
- **Detalhes**: Expandir para informações completas

### Relatórios de Performance

**Análise Avançada de Performance do Portfolio:**

**Tipos de Relatórios:**
- **Performance Geral**: ROI, Sharpe Ratio, Alpha, Beta
- **Análise de Risco**: VaR, CVaR, Maximum Drawdown
- **Comparação**: Benchmark vs Portfolio
- **Atribuição**: Performance por ativo e estratégia

**Períodos de Análise:**
- **Diário**: Análise intraday detalhada
- **Semanal**: Tendências de curto prazo
- **Mensal**: Performance mensal comparativa
- **Anual**: Análise de longo prazo
- **Customizado**: Período específico definido pelo usuário

**Métricas Incluídas:**
- **Retorno Total**: Absoluto e percentual
- **Volatilidade**: Anualizada e rolling
- **Correlações**: Entre ativos e com mercado
- **Ratios**: Sharpe, Sortino, Calmar, Information

**Opções de Export:**
- **PDF**: Relatório formatado profissional
- **Excel**: Dados para análise personalizada
- **CSV**: Dados brutos para processamento
- **JSON**: Integração com outras ferramentas

---

## ⚙️ Configurações

![Configurações Sistema](docs/images/manual/12-configuracoes.png)

> **Explicação da Imagem:**
> 
> Esta tela apresenta o **painel completo de Configurações** do RiskGuardian AI, oferecendo controle total sobre notificações, segurança, trading automático, aparência e dados do sistema. Interface organizada em cinco seções principais:
> 
> **1. Cabeçalho**:
> - **Título**: "⚙️ Configurações"
> - **Subtítulo**: "Personalize sua experiência no RiskGuardian AI"
> - **Função**: Central de personalização do sistema
> - **Design**: Interface limpa e organizada
> 
> **2. 🔔 Notificações**:
> 
> **Alertas de Preço**: ✅ ATIVO
> - **Descrição**: "Receba alertas quando preços atingirem seus limites"
> - **Função**: Notificações de movimentos de preço
> - **Status**: Habilitado (toggle azul)
> 
> **Alertas de Risco**: ✅ ATIVO
> - **Descrição**: "Alertas sobre riscos no seu portfólio"
> - **Função**: Avisos sobre exposição e volatilidade
> - **Status**: Habilitado (toggle azul)
> 
> **Atualizações de Portfólio**: ❌ INATIVO
> - **Descrição**: "Notificações sobre mudanças no seu portfólio"
> - **Função**: Updates sobre alterações nos ativos
> - **Status**: Desabilitado (toggle cinza)
> 
> **Atualizações de Sistema**: ✅ ATIVO
> - **Descrição**: "Notificações sobre atualizações e manutenção"
> - **Função**: Avisos sobre sistema e updates
> - **Status**: Habilitado (toggle azul)
> 
> **Notificações por Email**: ❌ INATIVO
> - **Descrição**: "Receba notificações por e-mail"
> - **Função**: Backup de notificações via email
> - **Status**: Desabilitado (toggle cinza)
> 
> **Notificações Push**: ✅ ATIVO
> - **Descrição**: "Notificações push no seu dispositivo"
> - **Função**: Alertas instantâneos no browser/app
> - **Status**: Habilitado (toggle azul)
> 
> **3. 🔒 Segurança**:
> 
> **Autenticação de Dois Fatores**: ✅ ATIVO
> - **Descrição**: "Adicione uma camada extra de segurança"
> - **Função**: 2FA para proteção adicional
> - **Status**: Habilitado (toggle azul)
> 
> **Login Biométrico**: ✅ ATIVO
> - **Descrição**: "Use impressão digital ou face ID"
> - **Função**: Autenticação biométrica
> - **Status**: Habilitado (toggle azul)
> 
> **Logout Automático**: ✅ ATIVO
> - **Descrição**: "Logout automático por inatividade"
> - **Função**: Segurança por timeout
> - **Status**: Habilitado (toggle azul)
> 
> **Período de Sessão**: 30min
> - **Configuração**: Dropdown com opções de tempo
> - **Valor Atual**: 30 minutos selecionado
> - **Função**: Controle de duração da sessão
> - **Opções**: Provavelmente 15min, 30min, 1h, 2h, etc.
> 
> **4. 🤖 Trading Automático**:
> 
> **Auto Hedging**: ✅ ATIVO
> - **Descrição**: "Hedge automático das suas posições"
> - **Função**: Proteção automática contra perdas
> - **Status**: Habilitado (toggle azul)
> 
> **Stop Loss Automático**: ✅ ATIVO
> - **Descrição**: "Stop loss automático"
> - **Função**: Corte automático de perdas
> - **Status**: Habilitado (toggle azul)
> 
> **Rebalanceamento Automático**: ✅ ATIVO
> - **Descrição**: "Rebalanceamento automático do portfólio"
> - **Função**: Ajuste automático de alocações
> - **Status**: Habilitado (toggle azul)
> 
> **Otimização de Gas**: ✅ ATIVO
> - **Descrição**: "Otimize automaticamente as taxas de gas"
> - **Função**: Economia em taxas de transação
> - **Status**: Habilitado (toggle azul)
> 
> **Slippage Máximo**: 1%
> - **Configuração**: Dropdown com percentuais
> - **Valor Atual**: 1% selecionado
> - **Função**: Controle de slippage máximo aceito
> - **Opções**: Provavelmente 0.5%, 1%, 2%, 5%
> 
> **5. 🎨 Aparência e Display**:
> 
> **Modo Escuro**: ✅ ATIVO
> - **Descrição**: "Interface com tema escuro"
> - **Função**: Tema dark mode
> - **Status**: Habilitado (toggle azul)
> 
> **Sons do Sistema**: ✅ ATIVO
> - **Descrição**: "Ativar sons de notificação"
> - **Função**: Feedback sonoro
> - **Status**: Habilitado (toggle azul)
> 
> **Idioma**: Português (PT)
> - **Configuração**: Dropdown de idiomas
> - **Valor Atual**: Português selecionado
> - **Função**: Localização da interface
> - **Opções**: PT, EN, ES, etc.
> 
> **Moeda Padrão**: USD ($)
> - **Configuração**: Dropdown de moedas
> - **Valor Atual**: USD selecionado
> - **Função**: Moeda de referência
> - **Opções**: USD, EUR, BRL, etc.
> 
> **Formato de Data**: dd/mm/aaaa
> - **Configuração**: Dropdown de formatos
> - **Valor Atual**: Formato brasileiro
> - **Função**: Exibição de datas
> - **Opções**: DD/MM/YYYY, MM/DD/YYYY, etc.
> 
> **6. 🗄️ Contas & Dados**:
> 
> **Exportar Dados**: Botão disponível
> - **Função**: Download dos dados do usuário
> - **Formato**: Provavelmente CSV/JSON
> - **Uso**: Backup e análise externa
> 
> **Backup da Carteira**: Botão disponível
> - **Função**: Backup das configurações da wallet
> - **Segurança**: Dados criptografados
> - **Uso**: Recuperação de configurações
> 
> **Limpar Cache**: Botão disponível
> - **Função**: Limpeza de dados temporários
> - **Efeito**: Melhora performance
> - **Uso**: Resolução de problemas
> 
> **Barra de Progresso**: Vermelho (quase cheia)
> - **Indicador**: Uso de armazenamento
> - **Status**: Alto uso (vermelho)
> - **Ação**: Considerar limpeza
> 
> **7. Rodapé com Status**:
> - **Versão**: Não especificada
> - **Conectado**: Indicador de conexão
> - **Timestamp**: Última atualização
> - **Status**: Sistema operacional
> 
> **8. Análise das Configurações**:
> 
> **Configurações de Segurança Robustas**:
> - **2FA ativo**: Proteção adicional
> - **Biometria ativa**: Conveniência segura
> - **Logout automático**: Proteção por inatividade
> - **Sessão 30min**: Equilíbrio segurança/usabilidade
> 
> **Trading Automático Otimizado**:
> - **Todas estratégias ativas**: Proteção máxima
> - **Slippage 1%**: Configuração conservadora
> - **Gas otimizado**: Economia de custos
> - **Automação completa**: Hands-off trading
> 
> **Interface Personalizada**:
> - **Modo escuro**: Melhor para os olhos
> - **Português**: Localização completa
> - **USD**: Moeda padrão internacional
> - **Formato brasileiro**: dd/mm/aaaa
> 
> **Notificações Balanceadas**:
> - **Alertas críticos ativos**: Preço e risco
> - **Push notifications**: Tempo real
> - **Email desabilitado**: Evita spam
> - **Sistema updates**: Manter informado
> 
> **9. Recomendações de Configuração**:
> 
> **Para Iniciantes**:
> - **Mantenha 2FA**: Sempre ativo
> - **Ative email notifications**: Para backup
> - **Slippage 2-5%**: Mais tolerante
> - **Sessão 1h**: Mais conveniente
> 
> **Para Avançados**:
> - **Slippage 0.5-1%**: Máxima eficiência
> - **Sessão 15-30min**: Máxima segurança
> - **Todas automações**: Otimização total
> - **Monitore cache**: Limpeza regular
> 
> **Para Segurança Máxima**:
> - **Todos alertas ativos**: Monitoramento total
> - **Biometria + 2FA**: Dupla proteção
> - **Logout 15min**: Sessões curtas
> - **Backup regular**: Dados protegidos
> 
> **10. Como Usar Esta Interface**:
> 
> **Navegação**:
> - **Seções expandíveis**: Clique para abrir/fechar
> - **Toggles**: Azul = Ativo, Cinza = Inativo
> - **Dropdowns**: Múltiplas opções disponíveis
> - **Botões de ação**: Para operações específicas
> 
> **Configuração Recomendada**:
> - **Revise regularmente**: Ajuste conforme necessário
> - **Teste configurações**: Antes de usar em produção
> - **Backup antes de mudar**: Segurança primeiro
> - **Monitore impacto**: Observe efeitos das mudanças

---

## 💹 Interface de Trading

### Funcionalidades Avançadas de Negociação

![Interface de Trading Completa](docs/images/manual/13-interface-trading-completa.png)

#### **1. Cabeçalho e Navegação**
- **Título Principal**: "Trading" com subtítulo explicativo sobre funcionalidades
- **Botão Connect Wallet**: Localizado no canto superior direito para conexão da carteira
- **Status de Conectividade**: Indicador visual do estado da conexão

#### **2. Seletor de Pares de Trading**
- **5 Pares Disponíveis**: ETH/USDC, BTC/USDC, LINK/USDC, UNI/USDC, AAVE/USDC
- **Par Ativo**: ETH/USDC destacado em verde com variação +3.24%
- **Indicadores de Performance**: Cada par mostra variação percentual em tempo real
- **Ícones Visuais**: Cada criptomoeda tem seu ícone característico

#### **3. Gráfico de Preços em Tempo Real**
- **Preço Atual**: $2.9k para ETH/USDC
- **Variação**: +3.24% (indicador verde positivo)
- **Gráfico de Linha**: Movimento histórico de preços em azul
- **Volume**: $911,765,567 nas últimas atualizações
- **Timeframe**: Dados com timestamps detalhados

#### **4. Livro de Ordens (Order Book)**
- **Estrutura**: Dividido em vendas (vermelho) e compras (verde)
- **Níveis de Preço**: 8 níveis para cada lado
- **Preço Central**: $2.9k destacado no centro
- **Quantidades**: Precisão até 4 casas decimais
- **Atualização**: Dados em tempo real

#### **5. Painéis de Negociação**

**Painel de Compra (Verde):**
- Preço sugerido: $2349.82 (USDC)
- Campo de quantidade em ETH
- Cálculo automático do total em USDC
- Botão "Comprar ETH" em verde

**Painel de Venda (Vermelho):**
- Preço sugerido: $2351.18 (USDC)
- Campo de quantidade em ETH
- Cálculo automático do total em USDC
- Botão "Vender ETH" em vermelho

#### **6. Estatísticas de Mercado**
- **Máxima 24h**: $3.0k
- **Mínima 24h**: $2.7k
- **Volume 24h**: 1.3M ETH
- **Variação 24h**: +3.24% (verde indicando alta)

#### **7. Trades Recentes**
- **Tabela Completa**: 10 transações mais recentes
- **Colunas**: Preço (USDC), Quantidade (ETH), Horário, Tipo
- **Código de Cores**: Verde para compras, vermelho para vendas
- **Precisão**: Preços com 2 casas decimais, quantidades com 4
- **Timestamps**: Horários em formato brasileiro

#### **8. Como Usar a Interface de Trading**

**Para Comprar:**
1. Selecione o par desejado (ex: ETH/USDC)
2. No painel verde "Comprar ETH":
   - Verifique o preço sugerido
   - Digite a quantidade desejada
   - Observe o total calculado automaticamente
3. Clique em "Comprar ETH"
4. Confirme a transação na sua wallet

**Para Vender:**
1. No painel vermelho "Vender ETH":
   - Verifique o preço sugerido
   - Digite a quantidade a vender
   - Observe o total que receberá
2. Clique em "Vender ETH"
3. Confirme a transação na sua wallet

**Análise do Mercado:**
- **Gráfico**: Observe tendências de preço
- **Order Book**: Veja níveis de suporte e resistência
- **Trades Recentes**: Analise atividade recente
- **Estatísticas**: Compare com máximas e mínimas

#### **9. Funcionalidades Avançadas**
- **Dados em Tempo Real**: Sistema totalmente funcional
- **Cálculos Automáticos**: Totais calculados dinamicamente
- **Validação Robusta**: Operações numéricas seguras
- **Interface Responsiva**: Adaptada para diferentes dispositivos
- **Tema Profissional**: Design escuro moderno e intuitivo

#### **10. Aspectos de Segurança**
- **Validação de Entrada**: Todos os campos numéricos são validados
- **Prevenção de Erros**: Sistema robusto contra falhas de tipo
- **Cálculos Seguros**: Operações matemáticas com verificação
- **Feedback Visual**: Indicadores claros de estado e ações

---

## 🛡️ Sistema de Seguros DeFi

### Proteção Inteligente para Ativos Digitais

![Seguros DeFi](docs/images/manual/15-seguros-defi.png)

#### **1. Visão Geral das Métricas**
- **Cobertura Total**: $75.000 com 2 apólices ativas
- **Prêmio Mensal**: $375 com próximo pagamento em 15 dias
- **Claims Ativos**: 1 sinistro de $2.500 em análise

#### **2. Apólices Ativas**

**Smart Contract Risk ($50.000)**
- Prêmio mensal: $250 (0.5% ao mês)
- Período: 14/01/2024 a 14/07/2024
- Status: ✅ Garantia Automática ativa
- Proteção contra bugs e exploits em contratos

**Price Protection ($25.000)**
- Prêmio mensal: $125 (0.3% ao mês)
- Período: 31/01/2024 a 31/07/2024
- Status: ✅ Ativo
- Proteção contra quedas bruscas de preço

**Exchange Hack ($100.000)**
- Prêmio mensal: $500 (0.2% ao mês)
- Período: 30/11/2023 a 31/05/2024
- Status: ⏳ Expirado
- Cobertura contra hacks de exchanges

#### **3. Tipos de Seguro Disponíveis**

**Smart Contract Risk (0.5% ao mês)**
- Protege contra bugs e exploits em contratos inteligentes
- Cobertura para falhas de código e vulnerabilidades
- Processamento automático de claims

**Proteção de Preço (0.3% ao mês)**
- Protege contra quedas bruscas de preço dos ativos
- Cobertura para volatilidade extrema
- Acionamento automático por oráculos

**Exchange Hack (0.2% ao mês)**
- Cobertura em caso de hack ou falência de exchanges
- Proteção para ativos mantidos em exchanges
- Verificação automática de incidentes

**Liquidation Protection (0.4% ao mês)**
- Protege contra liquidação forçada em posições alavancadas
- Cobertura para posições de DeFi e margin trading
- Monitoramento contínuo de health factor

#### **4. Histórico de Sinistros**

**Claim #1 - Processado**
- Valor: $5.000
- Data: 15/03/2024
- Tipo: Smart contract exploit compensation
- Status: 🟢 Pago

**Claim #2 - Em Análise**
- Valor: $2.500
- Data: 31/03/2024
- Tipo: Price protection claim
- Status: 🟡 Pendente

#### **5. Avaliação de Risco Inteligente**

**Análise Atual do Portfolio:**
- ✅ **Baixo Risco de Smart Contract**: Protocolos auditados e com histórico sólido
- ⚠️ **Exposição Moderada à Volatilidade**: Posições concentradas em ativos voláteis
- 🔵 **Cobertura Adequada**: Seguro atual cobre 75% do portfolio

**Recomendações da IA:**
- 🔴 **Aumentar Proteção de Preço**: Considere aumentar para $40k (posições atuais)
- 🟡 **Otimizar Prêmios**: Diversifique portfolio para reduzir custos em 15%
- 🔵 **Renovação Automática**: Ative renovação automática para evitar lapsos

#### **6. Como Contratar um Seguro**

**Passo a Passo:**
1. **Selecione o Tipo**: Escolha o tipo de proteção desejado
2. **Defina a Cobertura**: Determine o valor a ser protegido
3. **Revise os Termos**: Analise taxa, período e condições
4. **Conecte a Wallet**: Confirme com sua carteira digital
5. **Pague o Prêmio**: Efetue o pagamento do primeiro mês
6. **Ativação**: Proteção ativa imediatamente

**Processo de Claim:**
1. **Detecção Automática**: Sistema identifica eventos cobertos
2. **Verificação**: Oráculos confirmam as condições
3. **Processamento**: IA analisa e processa o claim
4. **Pagamento**: Valor depositado automaticamente na wallet

#### **7. Funcionalidades Avançadas**
- **Renovação Automática**: Proteção contínua sem interrupções
- **Claims Automáticos**: Processamento via smart contracts
- **Oráculos Múltiplos**: Dados de preço de fontes confiáveis
- **IA Integrada**: Análise de risco personalizada
- **Transparência Total**: Histórico completo na blockchain

#### **8. Aspectos de Segurança**
- **Contratos Auditados**: Todos os seguros baseados em código verificado
- **Fundos Segregados**: Reservas mantidas em contratos separados
- **Governança Descentralizada**: Decisões tomadas pela comunidade
- **Sem Intermediários**: Pagamentos diretos via blockchain

---

## 🧠 ElizaOS IA - Assistente Inteligente

### Interface Principal da IA

![Interface ElizaOS IA](docs/images/manual/16-elizaos-ai.png)

A interface da **ElizaOS IA** representa o coração inteligente do RiskGuardian, oferecendo análise avançada e recomendações personalizadas através de inteligência artificial conversacional.

#### **Componentes Principais da Interface**

**Painel de Chat Central:**
- **Chat com ElizaOS AI**: Interface conversacional principal com mensagem de boas-vindas "Olá! Sou a ElizaOS AI. Como posso ajudar com sua análise de risco hoje?"
- **Status Online**: Indicador verde confirmando conectividade ativa com ElizaOS v2.1
- **Timestamp**: Registro preciso das interações (03:48:24)

**Painéis de Análise em Tempo Real:**

1. **Análise de Mercado (aiInsights.marketAnalysis):**
   - Bitcoin: +2.4% (tendência positiva)
   - Ethereum: +1.8% (tendência positiva)
   - DeFi TVL: -0.5% (leve declínio)

2. **Avaliação de Risco (aiInsights.riskAssessment):**
   - Portfolio Risk: Classificado como "Moderado"
   - Volatilidade: 18.5% (nível controlado)
   - Diversificação: "Boa" (status verde)

3. **Recomendações Inteligentes (aiInsights.recommendations):**
   - **Rebalanceamento**: "Reduzir exposição BTC em 5%" (ícone azul)
   - **Oportunidade**: "Yield farming USDC/ETH" (ícone verde)
   - **Alerta**: "Alta correlação entre ativos" (ícone amarelo)

#### **Funcionalidades de Comando Rápido**

A interface oferece quatro botões de acesso rápido:
- **Analisar risco do portfolio**: Avaliação completa instantânea
- **Sugerir rebalanceamento**: Otimização automática de alocação
- **Oportunidades de yield**: Identificação de estratégias rentáveis
- **Análise de mercado**: Insights sobre tendências atuais

#### **Sistema de Interação**

**Campo de Entrada Inteligente:**
- Placeholder: "Digite sua pergunta sobre análise de risco..."
- Processamento de linguagem natural em português
- Botão de envio com design responsivo (verde)

#### **Casos de Uso Práticos**

**Para Análise de Risco:**
- Consultar avaliação atual do portfolio
- Solicitar análise detalhada de volatilidade
- Verificar adequação da diversificação
- Obter recomendações de segurança personalizadas

**Para Estratégias de Trading:**
- Solicitar análise técnica de ativos específicos
- Pedir sugestões de rebalanceamento otimizado
- Identificar oportunidades emergentes de mercado
- Avaliar correlações entre diferentes ativos

**Para Educação Financeira:**
- Fazer perguntas sobre conceitos DeFi
- Aprender sobre métricas de risco avançadas
- Entender estratégias de investimento
- Obter explicações contextualizadas

#### **Benefícios da Integração ElizaOS**

**Automação Inteligente:**
- Análise contínua 24/7 do portfolio
- Alertas proativos baseados em risco
- Recomendações personalizadas em tempo real
- Otimização automática de estratégias

**Tomada de Decisão Aprimorada:**
- Insights fundamentados em dados de mercado
- Análise de múltiplos fatores simultaneamente
- Recomendações baseadas em algoritmos avançados
- Redução significativa de riscos humanos

A ElizaOS IA transforma a gestão de risco de reativa para proativa, oferecendo insights valiosos que permitem decisões mais informadas e estratégicas no mercado DeFi.

---

## 🛠️ Solução de Problemas

### Problemas Comuns

#### 1. Conexão com a Wallet

**Problemas Comuns e Soluções:**

**❌ MetaMask não detectada:**
- Instale a extensão MetaMask
- Ative a extensão no navegador
- Recarregue a página após instalação

**❌ Wallet não conecta:**
- Desbloqueie a MetaMask
- Verifique se está na rede Ethereum
- Limpe cache e cookies do navegador
- Tente desconectar e reconectar

**❌ Rede incorreta:**
- Troque para Ethereum Mainnet
- Adicione redes customizadas se necessário
- Verifique RPC endpoints

#### 2. Transações Pendentes

**Gerenciamento de Transações:**

**🟡 Transação Pendente:**
- **Aguarde**: Transações podem levar 1-30 minutos
- **Verifique Gas**: Gas fee muito baixo pode causar atraso
- **Block Explorer**: Use Etherscan para acompanhar status
- **Hash da Transação**: Copie para rastreamento

**🔴 Transação Travada:**
- **Acelerar**: Aumente o gas fee na MetaMask
- **Cancelar**: Envie transação com mesmo nonce e gas maior
- **Aguardar**: Transações antigas eventualmente expiram

**⚡ Otimização:**
- Use gas fee recomendado pelo sistema
- Evite horários de pico (fins de semana)
- Configure gas limit adequado

#### 3. Dados não Carregando

**Problemas de Conectividade:**

**🌐 Erro de Rede:**
- Verifique conexão com internet
- Teste outros sites para confirmar conectividade
- Troque de DNS (8.8.8.8 ou 1.1.1.1)

**🔄 Cache Corrompido:**
- Limpe cache do navegador (Ctrl+Shift+Del)
- Desabilite extensões conflitantes
- Tente modo anônimo/privado

**⚙️ Problemas do Sistema:**
- Recarregue a página (F5 ou Ctrl+R)
- Feche e reabra o navegador
- Verifique se há atualizações do navegador

**🔧 Soluções Avançadas:**
- Desabilite bloqueadores de anúncio temporariamente
- Verifique configurações de firewall
- Teste em navegador diferente

---

## 📞 Suporte e Contato

### Canais de Suporte

- **📧 Email:** jistriane@live.com
- **💼 LinkedIn:** [linkedin.com/in/jibso](https://www.linkedin.com/in/jibso)
- **🐦 Twitter:** [@jistriane](https://twitter.com/jistriane)
- **💬 Discord:** jistriane

### Recursos Adicionais

- **📚 Documentação Técnica:** `DOCUMENTACAO_COMPLETA_RISKGUARDIAN_AI.md`
- **🔧 Guia de Deploy:** `DEPLOY_BACKEND_GUIDE.md`
- **🚀 Scripts do Sistema:** `SCRIPTS_SISTEMA.md`

---

## 📝 Notas de Versão

**Versão:** 1.0.0  
**Data:** Janeiro 2025  
**Autor:** Jistriane (jistriane@live.com)

### Funcionalidades desta Versão:
- ✅ Dashboard completo com métricas em tempo real
- ✅ Sistema de automação com stop-loss e hedge
- ✅ Análise de riscos com IA
- ✅ Suporte multi-chain
- ✅ Interface responsiva e moderna

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

**Disclaimer:** Este software é fornecido "como está" e não constitui aconselhamento financeiro. Use por sua própria conta e risco.

---

**© 2025 RiskGuardian AI - Desenvolvido por Jistriane**  
**GitHub:** https://github.com/Jistriane/RiskGuardian-AI-1.0
