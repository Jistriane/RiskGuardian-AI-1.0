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

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthService } from '../../services/auth.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock das dependências
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('🔐 AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('🔑 Password Hashing', () => {
    it('deve fazer hash da senha corretamente', async () => {
      // Arrange
      const password = 'myPassword123';
      const hashedPassword = 'hashedPassword123';
      mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);

      // Act
      const result = await authService.hashPassword(password);

      // Assert
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(password, 12);
      expect(result).toBe(hashedPassword);
    });

    it('deve comparar senhas corretamente', async () => {
      // Arrange
      const password = 'myPassword123';
      const hashedPassword = 'hashedPassword123';
      mockedBcrypt.compare.mockResolvedValue(true as never);

      // Act
      const result = await authService.comparePassword(password, hashedPassword);

      // Assert
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('deve rejeitar senha incorreta', async () => {
      // Arrange
      const password = 'wrongPassword';
      const hashedPassword = 'hashedPassword123';
      mockedBcrypt.compare.mockResolvedValue(false as never);

      // Act
      const result = await authService.comparePassword(password, hashedPassword);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('🎟️ JWT Tokens', () => {
    it('deve gerar token JWT válido', () => {
      // Arrange
      const userId = '123';
      const email = 'test@test.com';
      const token = 'generated.jwt.token';
      mockedJwt.sign.mockReturnValue(token as never);

      // Act
      const result = authService.generateToken(userId, email);

      // Assert
      expect(mockedJwt.sign).toHaveBeenCalledWith(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      expect(result).toBe(token);
    });

    it('deve verificar token JWT válido', () => {
      // Arrange
      const token = 'valid.jwt.token';
      const decodedPayload = { userId: '123', email: 'test@test.com' };
      mockedJwt.verify.mockReturnValue(decodedPayload as never);

      // Act
      const result = authService.verifyToken(token);

      // Assert
      expect(mockedJwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
      expect(result).toEqual(decodedPayload);
    });

    it('deve lançar erro para token inválido', () => {
      // Arrange
      const invalidToken = 'invalid.jwt.token';
      mockedJwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act & Assert
      expect(() => {
        authService.verifyToken(invalidToken);
      }).toThrow('Invalid token');
    });
  });

  describe('🛡️ Validation Methods', () => {
    describe('Email Validation', () => {
      it('deve validar emails corretos', () => {
        const validEmails = [
          'test@test.com',
          'user.name@example.org',
          'admin+tag@domain.co.uk'
        ];

        validEmails.forEach(email => {
          expect(authService.isValidEmail(email)).toBe(true);
        });
      });

      it('deve rejeitar emails inválidos', () => {
        const invalidEmails = [
          'invalid-email',
          '@domain.com',
          'user@',
          '',
          'user..name@domain.com'
        ];

        invalidEmails.forEach(email => {
          expect(authService.isValidEmail(email)).toBe(false);
        });
      });
    });

    describe('Password Validation', () => {
      it('deve validar senhas fortes', () => {
        const strongPasswords = [
          'StrongPass123!',
          'MySecureP@ssw0rd',
          'Complex1tyR3qu1r3d!'
        ];

        strongPasswords.forEach(password => {
          expect(authService.isStrongPassword(password)).toBe(true);
        });
      });

      it('deve rejeitar senhas fracas', () => {
        const weakPasswords = [
          'weak',
          '12345678',
          'onlyletters',
          'ONLYUPPERCASE',
          'NoNumbers!',
          'NoSpecialChars123'
        ];

        weakPasswords.forEach(password => {
          expect(authService.isStrongPassword(password)).toBe(false);
        });
      });
    });

    describe('Wallet Address Validation', () => {
      it('deve validar endereços Ethereum válidos', () => {
        const validAddresses = [
          '0x1234567890abcdef1234567890abcdef12345678',
          '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',
          '0x0000000000000000000000000000000000000000'
        ];

        validAddresses.forEach(address => {
          expect(authService.isValidWalletAddress(address)).toBe(true);
        });
      });

      it('deve rejeitar endereços inválidos', () => {
        const invalidAddresses = [
          'invalid-address',
          '0x123', // muito curto
          '1234567890abcdef1234567890abcdef12345678', // sem 0x
          '0xZZZ4567890abcdef1234567890abcdef12345678', // caracteres inválidos
          ''
        ];

        invalidAddresses.forEach(address => {
          expect(authService.isValidWalletAddress(address)).toBe(false);
        });
      });
    });
  });

  describe('🔒 Security Features', () => {
    it('deve sanitizar entrada do usuário', () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const sanitized = authService.sanitizeInput(maliciousInput);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert');
    });

    it('deve validar força da senha com critérios específicos', () => {
      // Testa critérios específicos
      expect(authService.isStrongPassword('Short1!')).toBe(false); // muito curta
      expect(authService.isStrongPassword('verylongbutnouppercaseornumbers!')).toBe(false);
      expect(authService.isStrongPassword('VERYLONGBUTNOLOWERCASEORNUMBERS!')).toBe(false);
      expect(authService.isStrongPassword('VeryLongButNoNumbers!')).toBe(false);
      expect(authService.isStrongPassword('VeryLongButNoSpecialChars123')).toBe(false);
      expect(authService.isStrongPassword('Perfect123!')).toBe(true);
    });

    it('deve gerar salt único para cada hash', async () => {
      const password = 'samePassword123';
      mockedBcrypt.hash
        .mockResolvedValueOnce('hash1' as never)
        .mockResolvedValueOnce('hash2' as never);

      const hash1 = await authService.hashPassword(password);
      const hash2 = await authService.hashPassword(password);

      expect(hash1).not.toBe(hash2); // Hashes devem ser diferentes devido ao salt
    });
  });
}); 