// SPDX-License-Identifier: MIT
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

pragma solidity ^0.8.0;

interface IAutomationRegistry {
    function registerUpkeep(
        struct {
            string name;
            bytes encryptedEmail;
            address upkeepContract;
            uint32 gasLimit;
            address adminAddress;
            uint8 triggerType;
            bytes checkData;
            bytes triggerConfig;
            bytes offchainConfig;
            uint96 amount;
        } calldata params
    ) external returns (uint256);
}
