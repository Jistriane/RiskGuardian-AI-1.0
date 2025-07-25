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

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    // Obtém o ID da subscrição do Chainlink das variáveis de ambiente
    const subscriptionId = process.env.CHAINLINK_SUBSCRIPTION_ID;
    if (!subscriptionId) {
        throw new Error('CHAINLINK_SUBSCRIPTION_ID não encontrado no arquivo .env');
    }

    console.log(`Deployando HedgeAutomation na rede ${hre.network.name}...`);
    console.log(`Usando Chainlink Subscription ID: ${subscriptionId}`);

    // Deploy HedgeAutomation
    const hedgeAutomation = await deploy('HedgeAutomation', {
        from: deployer,
        args: [subscriptionId],
        log: true,
        waitConfirmations: 1
    });

    console.log(`HedgeAutomation deployado em: ${hedgeAutomation.address}`);

    // Verifica o contrato no Etherscan
    if (process.env.ETHERSCAN_API_KEY) {
        console.log('Verificando contrato no Etherscan...');
        await hre.run('verify:verify', {
            address: hedgeAutomation.address,
            constructorArguments: [subscriptionId],
        });
    }
};

func.tags = ['HedgeAutomation'];
export default func; 