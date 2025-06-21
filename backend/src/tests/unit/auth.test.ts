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
import { AuthController } from '../../controllers/auth.controller';
import { Request, Response } from 'express';

// Mock do serviço
jest.mock('../../services/auth.service');

describe('🔐 Auth Controller', () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController();
    
    mockRequest = {
      body: {},
      headers: {},
      ip: '127.0.0.1'
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis()
    };
  });

  describe('🚀 Login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      // Arrange
      const loginData = { email: 'test@test.com', password: 'validPassword' };
      const expectedUser = { 
        id: '1', 
        email: 'test@test.com', 
        walletAddress: '0x123...' 
      };
      const expectedToken = 'jwt.token.here';

      mockRequest.body = loginData;
      mockAuthService.login = jest.fn().mockResolvedValue({
        user: expectedUser,
        token: expectedToken
      });

      // Act
      await authController.login(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(
        loginData.email, 
        loginData.password,
        mockRequest.ip
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        user: expectedUser,
        token: expectedToken
      });
    });

    it('deve retornar erro com credenciais inválidas', async () => {
      // Arrange
      const loginData = { email: 'test@test.com', password: 'wrongPassword' };
      mockRequest.body = loginData;
      mockAuthService.login = jest.fn().mockRejectedValue(
        new Error('Credenciais inválidas')
      );

      // Act
      await authController.login(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Credenciais inválidas'
      });
    });

    it('deve validar campos obrigatórios', async () => {
      // Arrange
      mockRequest.body = { email: 'test@test.com' }; // sem password

      // Act
      await authController.login(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    });
  });

  describe('👤 Register', () => {
    it('deve registrar usuário com dados válidos', async () => {
      // Arrange
      const registerData = {
        email: 'test@test.com',
        password: 'strongPassword123',
        walletAddress: '0x1234567890abcdef'
      };
      const expectedUser = { id: '1', ...registerData };

      mockRequest.body = registerData;
      mockAuthService.register = jest.fn().mockResolvedValue(expectedUser);

      // Act
      await authController.register(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.register).toHaveBeenCalledWith(registerData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        user: expectedUser
      });
    });

    it('deve rejeitar email duplicado', async () => {
      // Arrange
      const registerData = {
        email: 'existing@test.com',
        password: 'password123',
        walletAddress: '0x123...'
      };

      mockRequest.body = registerData;
      mockAuthService.register = jest.fn().mockRejectedValue(
        new Error('Email já está em uso')
      );

      // Act
      await authController.register(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email já está em uso'
      });
    });
  });

  describe('🔒 Logout', () => {
    it('deve fazer logout e limpar cookies', async () => {
      // Arrange
      mockRequest.headers = { authorization: 'Bearer validtoken' };

      // Act
      await authController.logout(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('token');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    });
  });

  describe('✅ Validate Token', () => {
    it('deve validar token válido', async () => {
      // Arrange
      const validToken = 'Bearer validtoken';
      const expectedUser = { id: '1', email: 'test@test.com' };

      mockRequest.headers = { authorization: validToken };
      mockAuthService.validateToken = jest.fn().mockResolvedValue(expectedUser);

      // Act
      await authController.validateToken(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockAuthService.validateToken).toHaveBeenCalledWith('validtoken');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        user: expectedUser
      });
    });

    it('deve rejeitar token inválido', async () => {
      // Arrange
      mockRequest.headers = { authorization: 'Bearer invalidtoken' };
      mockAuthService.validateToken = jest.fn().mockRejectedValue(
        new Error('Token inválido')
      );

      // Act
      await authController.validateToken(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token inválido'
      });
    });
  });
});

describe('🔐 Auth Service', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('🔑 Password Hashing', () => {
    it('deve fazer hash da senha corretamente', async () => {
      // Arrange
      const password = 'myPassword123';

      // Act
      const hashedPassword = await authService.hashPassword(password);

      // Assert
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(50);
    });

    it('deve verificar senha corretamente', async () => {
      // Arrange
      const password = 'myPassword123';
      const hashedPassword = await authService.hashPassword(password);

      // Act
      const isValid = await authService.comparePassword(password, hashedPassword);

      // Assert
      expect(isValid).toBe(true);
    });

    it('deve rejeitar senha incorreta', async () => {
      // Arrange
      const password = 'myPassword123';
      const wrongPassword = 'wrongPassword';
      const hashedPassword = await authService.hashPassword(password);

      // Act
      const isValid = await authService.comparePassword(wrongPassword, hashedPassword);

      // Assert
      expect(isValid).toBe(false);
    });
  });

  describe('🎟️ JWT Tokens', () => {
    it('deve gerar token JWT válido', () => {
      // Arrange
      const userId = '123';
      const email = 'test@test.com';

      // Act
      const token = authService.generateToken(userId, email);

      // Assert
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT tem 3 partes
    });

    it('deve validar token JWT corretamente', () => {
      // Arrange
      const userId = '123';
      const email = 'test@test.com';
      const token = authService.generateToken(userId, email);

      // Act
      const decoded = authService.verifyToken(token);

      // Assert
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(userId);
      expect(decoded.email).toBe(email);
    });

    it('deve rejeitar token inválido', () => {
      // Arrange
      const invalidToken = 'invalid.jwt.token';

      // Act & Assert
      expect(() => {
        authService.verifyToken(invalidToken);
      }).toThrow();
    });
  });

  describe('🛡️ Security Validations', () => {
    it('deve validar formato de email', () => {
      // Act & Assert
      expect(authService.isValidEmail('test@test.com')).toBe(true);
      expect(authService.isValidEmail('invalid-email')).toBe(false);
      expect(authService.isValidEmail('')).toBe(false);
    });

    it('deve validar força da senha', () => {
      // Act & Assert
      expect(authService.isStrongPassword('StrongPass123!')).toBe(true);
      expect(authService.isStrongPassword('weak')).toBe(false);
      expect(authService.isStrongPassword('12345678')).toBe(false);
      expect(authService.isStrongPassword('onlyletters')).toBe(false);
    });

    it('deve validar endereço de wallet', () => {
      // Act & Assert
      expect(authService.isValidWalletAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe(true);
      expect(authService.isValidWalletAddress('invalid-address')).toBe(false);
      expect(authService.isValidWalletAddress('')).toBe(false);
    });
  });
}); 