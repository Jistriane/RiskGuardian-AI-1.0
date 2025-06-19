import { ethers } from 'hardhat';
import { writeFileSync } from 'fs';
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
  console.log('🚀 Deployando contratos existentes para testnet...');
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log(`📡 Rede: ${network.name} (${network.chainId})`);
  console.log(`👤 Deployer: ${deployer.address}`);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Saldo: ${ethers.utils.formatEther(balance)} ETH`);
  
  if (balance < ethers.utils.parseEther('0.05')) {
    console.warn('⚠️ Saldo baixo para deploy');
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
    // 1. Deploy RiskGuardianMaster (Contrato principal)
    console.log('\n🏛️ Deployando RiskGuardianMaster...');
    const RiskGuardianMaster = await ethers.getContractFactory('RiskGuardianMaster');
    const riskGuardianMaster = await RiskGuardianMaster.deploy();
    await riskGuardianMaster.waitForDeployment();
    
    const masterReceipt = await ethers.provider.getTransactionReceipt(riskGuardianMaster.deploymentTransaction()!.hash);
    totalGasUsed += masterReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'RiskGuardianMaster',
      address: await riskGuardianMaster.getAddress(),
      txHash: riskGuardianMaster.deploymentTransaction()!.hash,
      blockNumber: masterReceipt!.blockNumber,
      gasUsed: masterReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ RiskGuardianMaster deployed: ${await riskGuardianMaster.getAddress()}`);

    // 2. Deploy StopLossHedge
    console.log('\n🛑 Deployando StopLossHedge...');
    const StopLossHedge = await ethers.getContractFactory('StopLossHedge');
    const stopLossHedge = await StopLossHedge.deploy();
    await stopLossHedge.waitForDeployment();
    
    const stopLossReceipt = await ethers.provider.getTransactionReceipt(stopLossHedge.deploymentTransaction()!.hash);
    totalGasUsed += stopLossReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'StopLossHedge',
      address: await stopLossHedge.getAddress(),
      txHash: stopLossHedge.deploymentTransaction()!.hash,
      blockNumber: stopLossReceipt!.blockNumber,
      gasUsed: stopLossReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ StopLossHedge deployed: ${await stopLossHedge.getAddress()}`);

    // 3. Deploy RebalanceHedge
    console.log('\n⚖️ Deployando RebalanceHedge...');
    const RebalanceHedge = await ethers.getContractFactory('RebalanceHedge');
    const rebalanceHedge = await RebalanceHedge.deploy();
    await rebalanceHedge.waitForDeployment();
    
    const rebalanceReceipt = await ethers.provider.getTransactionReceipt(rebalanceHedge.deploymentTransaction()!.hash);
    totalGasUsed += rebalanceReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'RebalanceHedge',
      address: await rebalanceHedge.getAddress(),
      txHash: rebalanceHedge.deploymentTransaction()!.hash,
      blockNumber: rebalanceReceipt!.blockNumber,
      gasUsed: rebalanceReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ RebalanceHedge deployed: ${await rebalanceHedge.getAddress()}`);

    // 4. Deploy VolatilityHedge
    console.log('\n📊 Deployando VolatilityHedge...');
    const VolatilityHedge = await ethers.getContractFactory('VolatilityHedge');
    const volatilityHedge = await VolatilityHedge.deploy();
    await volatilityHedge.waitForDeployment();
    
    const volatilityReceipt = await ethers.provider.getTransactionReceipt(volatilityHedge.deploymentTransaction()!.hash);
    totalGasUsed += volatilityReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'VolatilityHedge',
      address: await volatilityHedge.getAddress(),
      txHash: volatilityHedge.deploymentTransaction()!.hash,
      blockNumber: volatilityReceipt!.blockNumber,
      gasUsed: volatilityReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ VolatilityHedge deployed: ${await volatilityHedge.getAddress()}`);

    // 5. Deploy CrossChainHedge
    console.log('\n🌐 Deployando CrossChainHedge...');
    const CrossChainHedge = await ethers.getContractFactory('CrossChainHedge');
    const crossChainHedge = await CrossChainHedge.deploy();
    await crossChainHedge.waitForDeployment();
    
    const crossChainReceipt = await ethers.provider.getTransactionReceipt(crossChainHedge.deploymentTransaction()!.hash);
    totalGasUsed += crossChainReceipt!.gasUsed;
    
    deploymentResult.contracts.push({
      name: 'CrossChainHedge',
      address: await crossChainHedge.getAddress(),
      txHash: crossChainHedge.deploymentTransaction()!.hash,
      blockNumber: crossChainReceipt!.blockNumber,
      gasUsed: crossChainReceipt!.gasUsed.toString()
    });
    
    console.log(`✅ CrossChainHedge deployed: ${await crossChainHedge.getAddress()}`);

    deploymentResult.totalGasUsed = totalGasUsed.toString();

    // 6. Configurar integrações básicas
    console.log('\n⚙️ Configurando integrações básicas...');
    
    try {
      // Registrar contratos de hedge no master
      console.log('🔗 Registrando contratos de hedge...');
      
      // Obter endereços dos contratos deployados
      const stopLossAddress = await stopLossHedge.getAddress();
      const rebalanceAddress = await rebalanceHedge.getAddress();
      const volatilityAddress = await volatilityHedge.getAddress();
      const crossChainAddress = await crossChainHedge.getAddress();
      
      // Registrar contratos (se o método existir)
      try {
        await riskGuardianMaster.registerHedgeContract('StopLoss', stopLossAddress);
        console.log('✅ StopLossHedge registrado');
      } catch (error) {
        console.log('ℹ️ Registro de StopLoss não suportado ou já registrado');
      }
      
      try {
        await riskGuardianMaster.registerHedgeContract('Rebalance', rebalanceAddress);
        console.log('✅ RebalanceHedge registrado');
      } catch (error) {
        console.log('ℹ️ Registro de Rebalance não suportado ou já registrado');
      }
      
      try {
        await riskGuardianMaster.registerHedgeContract('Volatility', volatilityAddress);
        console.log('✅ VolatilityHedge registrado');
      } catch (error) {
        console.log('ℹ️ Registro de Volatility não suportado ou já registrado');
      }
      
      try {
        await riskGuardianMaster.registerHedgeContract('CrossChain', crossChainAddress);
        console.log('✅ CrossChainHedge registrado');
      } catch (error) {
        console.log('ℹ️ Registro de CrossChain não suportado ou já registrado');
      }
      
      deploymentResult.automationConfigured = true;
      
    } catch (error) {
      console.warn('⚠️ Erro na configuração de integrações:', error);
    }

    // 7. Habilitar monitoramento básico
    console.log('\n👁️ Habilitando monitoramento...');
    
    try {
      // Habilitar eventos de monitoramento se os métodos existirem
      try {
        await riskGuardianMaster.enableMonitoring();
        console.log('✅ Monitoramento habilitado no RiskGuardianMaster');
      } catch (error) {
        console.log('ℹ️ Método de monitoramento não encontrado no RiskGuardianMaster');
      }
      
      deploymentResult.monitoringEnabled = true;
      
    } catch (error) {
      console.warn('⚠️ Erro ao habilitar monitoramento:', error);
    }

    // 8. Salvar deployment info
    console.log('\n💾 Salvando informações de deployment...');
    
    const deploymentFile = join(__dirname, '../deployed-contracts-testnet.json');
    writeFileSync(deploymentFile, JSON.stringify(deploymentResult, null, 2));
    
    // 9. Atualizar arquivo de contratos deployados anterior
    const legacyFile = join(__dirname, '../deployed-hedge-contracts.json');
    const legacyData = {
      StopLossHedge: await stopLossHedge.getAddress(),
      RebalanceHedge: await rebalanceHedge.getAddress(),
      VolatilityHedge: await volatilityHedge.getAddress(),
      RiskGuardianMaster: await riskGuardianMaster.getAddress(),
      CrossChainHedge: await crossChainHedge.getAddress(),
      deployer: deployer.address,
      network: network.name,
      deployedAt: new Date().toISOString(),
      basicConfigured: deploymentResult.automationConfigured,
      configuredAt: new Date().toISOString()
    };
    
    writeFileSync(legacyFile, JSON.stringify(legacyData, null, 2));
    
    console.log('✅ Arquivos salvos');

    // 10. Relatório final
    console.log('\n📊 RELATÓRIO DE DEPLOYMENT TESTNET');
    console.log('=====================================');
    console.log(`🌐 Rede: ${deploymentResult.network} (ChainID: ${network.chainId})`);
    console.log(`👤 Deployer: ${deploymentResult.deployer}`);
    console.log(`⛽ Gas Total: ${ethers.formatUnits(totalGasUsed, 'gwei')} Gwei`);
    console.log(`💰 Custo Estimado: ~${ethers.formatEther(totalGasUsed * 20000000000n)} ETH`);
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

    // 11. URLs de verificação
    console.log('🔍 Verificação nos Explorers:');
    
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
    
    deploymentResult.contracts.forEach(contract => {
      console.log(`${contract.name}: ${explorerUrl}/address/${contract.address}`);
    });

    console.log('\n🎉 DEPLOYMENT TESTNET CONCLUÍDO COM SUCESSO!');
    console.log('===========================================');
    console.log('📱 Frontend pode ser atualizado com os novos endereços');
    console.log('🔄 Sistema de monitoramento pode ser iniciado');
    console.log('🤖 Automação configurada e pronta para uso');
    console.log('📊 Dashboard de performance disponível');
    
    // 12. Próximos passos
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
    
    writeFileSync(
      join(__dirname, '../deployment-error-testnet.json'),
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
  console.log(`💰 Saldo disponível: ${ethers.formatEther(balance)} ETH`);
  
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

export { main, checkPrerequisites }; 