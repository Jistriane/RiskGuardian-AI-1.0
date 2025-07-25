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

import { ethers } from "hardhat"; const REGISTRY_ABI = ["function registerUpkeep(address target, uint32 gasLimit, address admin, bytes checkData, bytes offchainConfig, uint96 amount) external returns (uint256 id)"]; async function main() { try { const [signer] = await ethers.getSigners(); console.log("📝 Conta:", signer.address); const REGISTRY = "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad"; const UPKEEP = "0xd54233246a07bfbe21cb7561a52ef8a9cfc14a6b"; const LINK_AMOUNT = ethers.parseEther("0.01"); const registry = new ethers.Contract(REGISTRY, REGISTRY_ABI, signer); console.log("⏳ Registrando Upkeep..."); const tx = await registry.registerUpkeep(UPKEEP, 500000, signer.address, "0x", "0x", LINK_AMOUNT, { gasLimit: 2000000, maxFeePerGas: ethers.parseUnits("50", "gwei"), maxPriorityFeePerGas: ethers.parseUnits("2", "gwei") }); console.log("📤 TX Hash:", tx.hash); const receipt = await tx.wait(); console.log("✅ Upkeep registrado! Bloco:", receipt.blockNumber); } catch (error) { console.error("❌ Erro:", error.message || error); process.exit(1); } } main();
