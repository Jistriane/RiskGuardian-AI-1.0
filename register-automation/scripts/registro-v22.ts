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

import { ethers } from "hardhat"; const REGISTRY_ABI = ["function registerUpkeep(address target, bytes calldata checkData, address admin, uint96 amount, uint8 source) external returns (uint256 id)"]; async function main() { try { const [signer] = await ethers.getSigners(); console.log("�� Conta:", signer.address); const REGISTRY = "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad"; const UPKEEP = "0xd54233246a07bfbe21cb7561a52ef8a9cfc14a6b"; const LINK_AMOUNT = ethers.parseEther("0.1"); const registry = new ethers.Contract(REGISTRY, REGISTRY_ABI, signer); console.log("⏳ Registrando Upkeep..."); const tx = await registry.registerUpkeep(UPKEEP, "0x", signer.address, LINK_AMOUNT, 0, { gasLimit: 1000000 }); console.log("📤 TX Hash:", tx.hash); const receipt = await tx.wait(); console.log("✅ Upkeep registrado! Bloco:", receipt.blockNumber); } catch (error) { console.error("❌ Erro:", error.message || error); process.exit(1); } } main();
