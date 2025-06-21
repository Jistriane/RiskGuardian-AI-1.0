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
    const REGISTRY = "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad";
    const LINK = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

    const [signer] = await ethers.getSigners();
    console.log("📝 Conta:", signer.address);

    const link = await ethers.getContractAt("IERC20", LINK);
    
    console.log("⚡ Aprovando LINK...");
    
    // Configuração super agressiva de gás para garantir
    const tx = await link.approve(
      REGISTRY, 
      ethers.parseEther("1000"), // Aprovando muito mais para garantir
      {
        gasLimit: 1000000,
        maxFeePerGas: ethers.parseUnits("100", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
        nonce: await signer.getNonce() // Forçando nonce específico
      }
    );

    console.log("📤 TX Hash:", tx.hash);
    await tx.wait();
    console.log("✅ APROVADO!");

  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
}

main(); 