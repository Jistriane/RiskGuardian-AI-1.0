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

import { ethers, network } from "hardhat";

async function main() {
  // Endereços do CCIP Router e LINK token na Fuji testnet
  const FUJI_ROUTER = "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
  const FUJI_LINK = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
  
  console.log(`Deployando CrossChainHedge na rede ${network.name}...`);
  
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);
  
  const CrossChainHedge = await ethers.getContractFactory("CrossChainHedge");
  const hedge = await CrossChainHedge.deploy(FUJI_ROUTER, FUJI_LINK);
  
  await hedge.deployed();
  
  console.log(`CrossChainHedge deployado em: ${hedge.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 