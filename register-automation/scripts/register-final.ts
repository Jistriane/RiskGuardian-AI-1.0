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

import { ethers } from "hardhat";

async function main() {
  try {
    const [signer] = await ethers.getSigners();
    console.log("📝 Conta:", signer.address);

    const REGISTRY = "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad";
    const UPKEEP = "0xd54233246a07bfbe21cb7561a52ef8a9cfc14a6b";
    const LINK = ethers.parseEther("0.1");

    // Interface mínima necessária
    const abi = [
      "function registerUpkeep(address target, uint32 gasLimit, address admin, bytes checkData, bytes offchainConfig) external returns (uint256 id)"
    ];

    const registry = new ethers.Contract(REGISTRY, abi, signer);

    console.log("⏳ Registrando...");
    
    const tx = await registry.registerUpkeep(
      UPKEEP,           // target
      500000,           // gasLimit
      signer.address,   // admin
      "0x",             // checkData
      "0x",             // offchainConfig
      {
        gasLimit: 1000000
      }
    );

    console.log("📤 TX:", tx.hash);
    console.log("⌛ Aguardando confirmação...");
    
    const receipt = await tx.wait();
    console.log("✅ Registrado! Bloco:", receipt.blockNumber);
    
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

main(); 