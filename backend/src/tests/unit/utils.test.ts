import { describe, it, expect } from '@jest/globals';

describe('🔧 Utility Functions', () => {
  describe('📧 Email Validation', () => {
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email) && !email.includes('..');
    };

    it('deve validar emails corretos', () => {
      const validEmails = [
        'test@test.com',
        'user.name@example.org',
        'admin+tag@domain.co.uk'
      ];

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
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
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('🔒 Password Validation', () => {
    const isStrongPassword = (password: string): boolean => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      return password.length >= minLength && 
             hasUpperCase && 
             hasLowerCase && 
             hasNumbers && 
             hasSpecialChar;
    };

    it('deve validar senhas fortes', () => {
      const strongPasswords = [
        'StrongPass123!',
        'MySecureP@ssw0rd',
        'Complex1tyR3qu1r3d!'
      ];

      strongPasswords.forEach(password => {
        expect(isStrongPassword(password)).toBe(true);
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
        expect(isStrongPassword(password)).toBe(false);
      });
    });
  });

  describe('🏦 Wallet Address Validation', () => {
    const isValidWalletAddress = (address: string): boolean => {
      // Ethereum address validation
      const ethRegex = /^0x[a-fA-F0-9]{40}$/;
      return ethRegex.test(address);
    };

    it('deve validar endereços Ethereum válidos', () => {
      const validAddresses = [
        '0x1234567890abcdef1234567890abcdef12345678',
        '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',
        '0x0000000000000000000000000000000000000000'
      ];

      validAddresses.forEach(address => {
        expect(isValidWalletAddress(address)).toBe(true);
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
        expect(isValidWalletAddress(address)).toBe(false);
      });
    });
  });

  describe('🧮 Number Utilities', () => {
    const formatCurrency = (amount: number, decimals: number = 2): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(amount);
    };

    it('deve formatar valores monetários corretamente', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
      expect(formatCurrency(0.1234, 4)).toBe('$0.1234');
    });

    const calculatePercentage = (current: number, previous: number): number => {
      if (previous === 0) return 0;
      return ((current - previous) / previous) * 100;
    };

    it('deve calcular percentuais corretamente', () => {
      expect(calculatePercentage(110, 100)).toBe(10);
      expect(calculatePercentage(90, 100)).toBe(-10);
      expect(calculatePercentage(100, 0)).toBe(0);
    });
  });

  describe('📅 Date Utilities', () => {
    const isRecentDate = (date: Date, daysAgo: number = 7): boolean => {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= daysAgo;
    };

    it('deve verificar se data é recente', () => {
      const today = new Date();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const lastWeek = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);

      expect(isRecentDate(today)).toBe(true);
      expect(isRecentDate(yesterday)).toBe(true);
      expect(isRecentDate(lastWeek)).toBe(false);
    });
  });

  describe('🛡️ Security Utilities', () => {
    const sanitizeInput = (input: string): string => {
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>]/g, '')
        .trim();
    };

    it('deve sanitizar entrada maliciosa', () => {
      const maliciousInput = '<script>alert("xss")</script>Hello World';
      const sanitized = sanitizeInput(maliciousInput);
      
      expect(sanitized).toBe('Hello World');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert');
    });

    const generateRandomId = (length: number = 8): string => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    it('deve gerar IDs aleatórios únicos', () => {
      const id1 = generateRandomId();
      const id2 = generateRandomId();
      
      expect(id1).toHaveLength(8);
      expect(id2).toHaveLength(8);
      expect(id1).not.toBe(id2);
    });
  });
}); 