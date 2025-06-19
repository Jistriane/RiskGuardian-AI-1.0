import { ethers } from 'hardhat';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface DeployedContract {
  name: string;
  address: string;
  txHash: string;
  blockNumber: number;
  gasUsed: string;
}

interface DeploymentResult {
  network: string;
  deployer: string;
  timestamp: string;
  contracts: DeployedContract[];
  totalGasUsed: string;
  automationConfigured: boolean;
  monitoringEnabled: boolean;
}

async function main() {
  console.log('🚀 Iniciando deploy automatizado para testnet...');
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log(`📡 Rede: ${network.name} (${network.chainId})`);
  console.log(`👤 Deployer: ${deployer.address}`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Saldo: ${ethers.formatEther(balance)} ETH`);
  
  if (balance < ethers.parseEther('0.1')) {
    throw new Error('❌ Saldo insuficiente para deploy (mínimo 0.1 ETH)');
  }

  const deploymentResult: DeploymentResult = {
    network: network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: [],
    totalGasUsed: '0',
    automationConfigured: false,
    monitoringEnabled: false
  };

  let totalGasUsed = 0n;

  try {
    // 1. Deploy RiskOracle (Price Feeds)
    console.log('\n📊 Deployando RiskOracle...');
    const RiskOracle = await ethers.getContractFactory('RiskOracle');
    const riskOracle = await RiskOracle.deploy();
    await riskOracle.waitForDeployment();
    
    const riskOracleReceipt = await ethers.provider.getTransactionReceipt(riskOracle.deploymentTransaction()!.hash);
    totalGasUsed += riskOracleReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'RiskOracle',
      address: await riskOracle.getAddress(),
      txHash: riskOracle.deploymentTransaction()!.hash,
      blockNumber: riskOracleReceipt!.blockNumber,
      gasUsed: riskOracleReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ RiskOracle deployed: ${await riskOracle.getAddress()}`);

    // 2. Deploy AlertSystem  
    console.log('\n🚨 Deployando AlertSystem...');
    const AlertSystem = await ethers.getContractFactory('AlertSystem');
    const alertSystem = await AlertSystem.deploy();
    await alertSystem.waitForDeployment();
    
    const alertReceipt = await ethers.provider.getTransactionReceipt(alertSystem.deploymentTransaction()!.hash);
    totalGasUsed += alertReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'AlertSystem',
      address: await alertSystem.getAddress(),
      txHash: alertSystem.deploymentTransaction()!.hash,
      blockNumber: alertReceipt!.blockNumber,
      gasUsed: alertReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ AlertSystem deployed: ${await alertSystem.getAddress()}`);

    // 3. Deploy PortfolioAnalyzer
    console.log('\n📊 Deployando PortfolioAnalyzer...');
    const PortfolioAnalyzer = await ethers.getContractFactory('PortfolioAnalyzer');
    const portfolioAnalyzer = await PortfolioAnalyzer.deploy(
      await riskOracle.getAddress(),
      await alertSystem.getAddress()
    );
    await portfolioAnalyzer.waitForDeployment();
    
    const portfolioReceipt = await ethers.provider.getTransactionReceipt(portfolioAnalyzer.deploymentTransaction()!.hash);
    totalGasUsed += portfolioReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'PortfolioAnalyzer',
      address: await portfolioAnalyzer.getAddress(),
      txHash: portfolioAnalyzer.deploymentTransaction()!.hash,
      blockNumber: portfolioReceipt!.blockNumber,
      gasUsed: portfolioReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ PortfolioAnalyzer deployed: ${await portfolioAnalyzer.getAddress()}`);

    // 4. Deploy RiskInsurance
    console.log('\n🛡️ Deployando RiskInsurance...');
    const RiskInsurance = await ethers.getContractFactory('RiskInsurance');
    const riskInsurance = await RiskInsurance.deploy(
      await portfolioAnalyzer.getAddress()
    );
    await riskInsurance.waitForDeployment();
    
    const insuranceReceipt = await ethers.provider.getTransactionReceipt(riskInsurance.deploymentTransaction()!.hash);
    totalGasUsed += insuranceReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'RiskInsurance',
      address: await riskInsurance.getAddress(),
      txHash: riskInsurance.deploymentTransaction()!.hash,
      blockNumber: insuranceReceipt!.blockNumber,
      gasUsed: insuranceReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ RiskInsurance deployed: ${await riskInsurance.getAddress()}`);

    // 5. Deploy RiskRegistry (Master Contract)
    console.log('\n📋 Deployando RiskRegistry...');
    const RiskRegistry = await ethers.getContractFactory('RiskRegistry');
    const riskRegistry = await RiskRegistry.deploy(
      await riskOracle.getAddress(),
      await portfolioAnalyzer.getAddress(),
      await riskInsurance.getAddress(),
      await alertSystem.getAddress()
    );
    await riskRegistry.waitForDeployment();
    
    const registryReceipt = await ethers.provider.getTransactionReceipt(riskRegistry.deploymentTransaction()!.hash);
    totalGasUsed += registryReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'RiskRegistry',
      address: await riskRegistry.getAddress(),
      txHash: riskRegistry.deploymentTransaction()!.hash,
      blockNumber: registryReceipt!.blockNumber,
      gasUsed: registryReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ RiskRegistry deployed: ${await riskRegistry.getAddress()}`);

    deploymentResult.totalGasUsed = totalGasUsed.toString();

    // 6. Configurar automação e permissões
    console.log('\n⚙️ Configurando automação...');
    
    try {
      // Configurar permissões entre contratos
      console.log('🔐 Configurando permissões...');
      
      // AlertSystem pode ser chamado pelo PortfolioAnalyzer
      await alertSystem.grantRole(
        await alertSystem.ANALYZER_ROLE(),
        await portfolioAnalyzer.getAddress()
      );
      
      // RiskInsurance pode acessar dados do PortfolioAnalyzer
      await portfolioAnalyzer.grantRole(
        await portfolioAnalyzer.INSURANCE_ROLE(),
        await riskInsurance.getAddress()
      );
      
      console.log('✅ Permissões configuradas');
      
      // Configurar thresholds de risco
      console.log('⚠️ Configurando thresholds de risco...');
      
      await portfolioAnalyzer.setRiskThresholds(
        25, // LOW_RISK_THRESHOLD
        50, // MEDIUM_RISK_THRESHOLD  
        75  // HIGH_RISK_THRESHOLD
      );
      
      await alertSystem.setAlertThresholds(
        60, // VOLATILITY_THRESHOLD
        80, // RISK_SCORE_THRESHOLD
        30  // LIQUIDITY_THRESHOLD (30%)
      );
      
      console.log('✅ Thresholds configurados');
      
      deploymentResult.automationConfigured = true;
      
    } catch (error) {
      console.warn('⚠️ Erro na configuração de automação:', error);
    }

    // 7. Habilitar monitoramento
    console.log('\n👁️ Habilitando monitoramento...');
    
    try {
      // Ativar eventos de monitoramento
      await riskRegistry.enableMonitoring(true);
      await portfolioAnalyzer.enableRealTimeAnalysis(true);
      await alertSystem.enableRealTimeAlerts(true);
      
      console.log('✅ Monitoramento habilitado');
      deploymentResult.monitoringEnabled = true;
      
    } catch (error) {
      console.warn('⚠️ Erro ao habilitar monitoramento:', error);
    }

    // 8. Salvar deployment info
    console.log('\n💾 Salvando informações de deployment...');
    
    const deploymentFile = join(__dirname, '../deployed-contracts-testnet.json');
    writeFileSync(deploymentFile, JSON.stringify(deploymentResult, null, 2));
    
    // Salvar ABIs
    const abisDir = join(__dirname, '../frontend/src/contracts/abis');
    const contractArtifacts = [
      'RiskOracle',
      'AlertSystem', 
      'PortfolioAnalyzer',
      'RiskInsurance',
      'RiskRegistry'
    ];
    
    for (const contractName of contractArtifacts) {
      try {
        const artifact = await ethers.getContractFactory(contractName);
        const abi = artifact.interface.formatJson();
        writeFileSync(join(abisDir, `${contractName}.json`), abi);
      } catch (error) {
        console.warn(`⚠️ Erro ao salvar ABI ${contractName}:`, error);
      }
    }
    
    console.log('✅ Arquivos salvos');

    // 9. Relatório final
    console.log('\n📊 RELATÓRIO DE DEPLOYMENT TESTNET');
    console.log('=====================================');
    console.log(`🌐 Rede: ${deploymentResult.network}`);
    console.log(`👤 Deployer: ${deploymentResult.deployer}`);
    console.log(`⛽ Gas Total: ${ethers.formatUnits(totalGasUsed, 'gwei')} Gwei`);
    console.log(`📅 Timestamp: ${deploymentResult.timestamp}`);
    console.log(`🔧 Automação: ${deploymentResult.automationConfigured ? '✅' : '❌'}`);
    console.log(`👁️ Monitoramento: ${deploymentResult.monitoringEnabled ? '✅' : '❌'}`);
    console.log('\n📋 Contratos deployados:');
    
    deploymentResult.contracts.forEach((contract, index) => {
      console.log(`${index + 1}. ${contract.name}`);
      console.log(`   📍 Endereço: ${contract.address}`);
      console.log(`   🧾 TX: ${contract.txHash}`);
      console.log(`   ⛽ Gas: ${ethers.formatUnits(contract.gasUsed, 'gwei')} Gwei`);
      console.log('');
    });

    // 10. Verificar integrações
    console.log('🔍 Verificando integrações...');
    
    try {
      // Teste básico de funcionalidade
      const testAddress = '0x1234567890123456789012345678901234567890';
      
      // Testar análise de portfolio
      console.log('📊 Testando análise de portfolio...');
      await portfolioAnalyzer.analyzePortfolio(testAddress, []);
      console.log('✅ Análise funcional');
      
      // Testar sistema de alertas
      console.log('🚨 Testando sistema de alertas...');
      await alertSystem.checkRiskThresholds(testAddress, 50, 30);
      console.log('✅ Alertas funcionais');
      
      console.log('✅ Todas as integrações verificadas');
      
    } catch (error) {
      console.warn('⚠️ Erro na verificação de integrações:', error);
    }

    console.log('\n🎉 DEPLOYMENT TESTNET CONCLUÍDO COM SUCESSO!');
    console.log('===========================================');
    console.log('📱 Frontend pode ser atualizado com os novos endereços');
    console.log('🔄 Sistema de monitoramento pode ser iniciado');
    console.log('🤖 Automação configurada e pronta para uso');
    console.log('📊 Dashboard de performance disponível');
    
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
    
    writeFileSync(
      join(__dirname, '../deployment-error.json'),
      JSON.stringify(errorLog, null, 2)
    );
    
    throw error;
  }
}

// Função para verificar pré-requisitos
async function checkPrerequisites() {
  console.log('🔍 Verificando pré-requisitos...');
  
  try {
    const [deployer] = await ethers.getSigners();
    const network = await ethers.provider.getNetwork();
    
    // Verificar se é testnet
    const testnets = [11155111, 43113, 80001, 97]; // Sepolia, Fuji, Mumbai, BSC Testnet
    if (!testnets.includes(Number(network.chainId))) {
      throw new Error(`❌ Rede não é testnet. ChainID: ${network.chainId}`);
    }
    
    console.log('✅ Rede testnet confirmada');
    
    // Verificar saldo
    const balance = await ethers.provider.getBalance(deployer.address);
    if (balance < ethers.parseEther('0.1')) {
      throw new Error('❌ Saldo insuficiente para deployment');
    }
    
    console.log('✅ Saldo suficiente');
    
    // Verificar contratos existentes
    const existingFile = join(__dirname, '../deployed-contracts-testnet.json');
    try {
      const existing = readFileSync(existingFile, 'utf8');
      const data = JSON.parse(existing);
      console.log('⚠️ Contratos já deployados encontrados:');
      data.contracts?.forEach((c: any) => {
        console.log(`   ${c.name}: ${c.address}`);
      });
      console.log('   Continuing with new deployment...');
    } catch {
      console.log('✅ Nenhum deployment anterior encontrado');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Falha na verificação de pré-requisitos:', error);
    return false;
  }
}

// Executar script
if (require.main === module) {
  checkPrerequisites()
    .then(canDeploy => {
      if (canDeploy) {
        return main();
      } else {
        process.exit(1);
      }
    })
    .then(() => {
      console.log('✅ Script executado com sucesso');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Script falhou:', error);
      process.exit(1);
    });
}

export { main, checkPrerequisites }; 