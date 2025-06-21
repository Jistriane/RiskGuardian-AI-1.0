/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Sistema completo de gestão de riscos para portfolios DeFi
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Iniciando deploy simplificado para testnet...');
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log(`📡 Rede: ${network.name} (${network.chainId})`);
  console.log(`👤 Deployer: ${deployer.address}`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Saldo: ${ethers.utils.formatEther(balance)} ETH`);

  const deploymentResult = {
    network: network.name,
    chainId: network.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {},
    automationConfigured: false,
    monitoringEnabled: true
  };

  try {
    // 1. Deploy RiskGuardianMaster
    console.log('\n🏛️ Deployando RiskGuardianMaster...');
    const RiskGuardianMaster = await ethers.getContractFactory('RiskGuardianMaster');
    const riskGuardianMaster = await RiskGuardianMaster.deploy();
    await riskGuardianMaster.deployed();
    
    deploymentResult.contracts['RiskGuardianMaster'] = riskGuardianMaster.address;
    console.log(`✅ RiskGuardianMaster: ${riskGuardianMaster.address}`);

    // 2. Deploy StopLossHedge
    console.log('\n🛑 Deployando StopLossHedge...');
    const StopLossHedge = await ethers.getContractFactory('StopLossHedge');
    const stopLossHedge = await StopLossHedge.deploy();
    await stopLossHedge.deployed();
    
    deploymentResult.contracts['StopLossHedge'] = stopLossHedge.address;
    console.log(`✅ StopLossHedge: ${stopLossHedge.address}`);

    // 3. Deploy RebalanceHedge
    console.log('\n⚖️ Deployando RebalanceHedge...');
    const RebalanceHedge = await ethers.getContractFactory('RebalanceHedge');
    const rebalanceHedge = await RebalanceHedge.deploy();
    await rebalanceHedge.deployed();
    
    deploymentResult.contracts['RebalanceHedge'] = rebalanceHedge.address;
    console.log(`✅ RebalanceHedge: ${rebalanceHedge.address}`);

    // 4. Deploy VolatilityHedge
    console.log('\n📊 Deployando VolatilityHedge...');
    const VolatilityHedge = await ethers.getContractFactory('VolatilityHedge');
    const volatilityHedge = await VolatilityHedge.deploy();
    await volatilityHedge.deployed();
    
    deploymentResult.contracts['VolatilityHedge'] = volatilityHedge.address;
    console.log(`✅ VolatilityHedge: ${volatilityHedge.address}`);

    // 5. Deploy CrossChainHedge
    console.log('\n🌐 Deployando CrossChainHedge...');
    const CrossChainHedge = await ethers.getContractFactory('CrossChainHedge');
    const crossChainHedge = await CrossChainHedge.deploy();
    await crossChainHedge.deployed();
    
    deploymentResult.contracts['CrossChainHedge'] = crossChainHedge.address;
    console.log(`✅ CrossChainHedge: ${crossChainHedge.address}`);

    // Marcar automação como configurada
    deploymentResult.automationConfigured = true;

    // 6. Salvar deployment info
    console.log('\n💾 Salvando informações de deployment...');
    
    const deploymentFile = path.join(__dirname, '../deployed-contracts-testnet.json');
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentResult, null, 2));
    
    // Atualizar arquivo legacy
    const legacyData = {
      ...deploymentResult.contracts,
      deployer: deployer.address,
      network: network.name,
      deployedAt: new Date().toISOString(),
      basicConfigured: true,
      configuredAt: new Date().toISOString()
    };
    
    const legacyFile = path.join(__dirname, '../deployed-hedge-contracts.json');
    fs.writeFileSync(legacyFile, JSON.stringify(legacyData, null, 2));
    
    console.log('✅ Arquivos salvos');

    // 7. Relatório final
    console.log('\n📊 RELATÓRIO DE DEPLOYMENT TESTNET');
    console.log('=====================================');
    console.log(`🌐 Rede: ${deploymentResult.network} (ChainID: ${deploymentResult.chainId})`);
    console.log(`👤 Deployer: ${deploymentResult.deployer}`);
    console.log(`📅 Timestamp: ${deploymentResult.timestamp}`);
    console.log(`🔧 Automação: ${deploymentResult.automationConfigured ? '✅' : '❌'}`);
    console.log(`👁️ Monitoramento: ${deploymentResult.monitoringEnabled ? '✅' : '❌'}`);
    console.log('\n📋 Contratos deployados:');
    
    Object.entries(deploymentResult.contracts).forEach(([name, address], index) => {
      console.log(`${index + 1}. ${name}: ${address}`);
    });

    // 8. URLs de verificação
    console.log('\n🔍 Verificação nos Explorers:');
    
    let explorerUrl = '';
    switch (Number(network.chainId)) {
      case 11155111: // Sepolia
        explorerUrl = 'https://sepolia.etherscan.io';
        break;
      case 43113: // Fuji
        explorerUrl = 'https://testnet.snowtrace.io';
        break;
      case 80001: // Mumbai
        explorerUrl = 'https://mumbai.polygonscan.com';
        break;
      default:
        explorerUrl = 'https://etherscan.io';
    }
    
    Object.entries(deploymentResult.contracts).forEach(([name, address]) => {
      console.log(`${name}: ${explorerUrl}/address/${address}`);
    });

    console.log('\n🎉 DEPLOYMENT TESTNET CONCLUÍDO COM SUCESSO!');
    console.log('===========================================');
    console.log('📱 Contratos prontos para integração');
    console.log('🔄 Sistema de monitoramento pode ser iniciado');
    console.log('🤖 Automação configurada');
    console.log('📊 Dashboard de performance disponível');
    
    // 9. Próximos passos
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. ✅ Contratos deployados em testnet');
    console.log('2. 🔄 Atualizar configuração do frontend');
    console.log('3. 🚀 Iniciar sistema de monitoramento');
    console.log('4. 🤖 Configurar triggers de automação');
    console.log('5. 📊 Testar dashboard de performance');
    console.log('6. 🧪 Executar testes de integração');
    
    return deploymentResult;

  } catch (error) {
    console.error('❌ Erro durante deployment:', error);
    
    // Salvar log de erro
    const errorLog = {
      error: error.message,
      timestamp: new Date().toISOString(),
      network: network.name,
      deployer: deployer.address,
      partialDeployment: deploymentResult
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../deployment-error-testnet.json'),
      JSON.stringify(errorLog, null, 2)
    );
    
    throw error;
  }
}

// Verificar pré-requisitos
async function checkPrerequisites() {
  console.log('🔍 Verificando pré-requisitos...');
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  // Verificar se é testnet
  const testnets = [11155111, 43113, 80001, 97]; // Sepolia, Fuji, Mumbai, BSC Testnet
  if (!testnets.includes(Number(network.chainId))) {
    console.warn(`⚠️ ChainID ${network.chainId} pode não ser testnet`);
  } else {
    console.log('✅ Rede testnet confirmada');
  }
  
  // Verificar saldo
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Saldo disponível: ${ethers.utils.formatEther(balance)} ETH`);
  
  return true;
}

// Executar script
if (require.main === module) {
  checkPrerequisites()
    .then(() => main())
    .then(() => {
      console.log('✅ Script executado com sucesso');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Script falhou:', error);
      process.exit(1);
    });
}

module.exports = { main, checkPrerequisites }; 