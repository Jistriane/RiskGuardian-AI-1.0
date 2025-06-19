import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from '../utils/logger';

// Rate limiting configurável por ambiente
export const createRateLimiter = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    windowMs,
    max,
    message: message || {
      error: 'Muitas requisições deste IP',
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}, Path: ${req.path}`);
      res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil(windowMs / 1000),
        timestamp: new Date().toISOString()
      });
    }
  });
};

// Rate limiters específicos
export const globalRateLimit = createRateLimiter(
  15 * 60 * 1000, // 15 minutos
  100, // máximo 100 requests por IP
  'Muitas requisições. Tente novamente em 15 minutos.'
);

export const authRateLimit = createRateLimiter(
  15 * 60 * 1000, // 15 minutos
  5, // máximo 5 tentativas de login por IP
  'Muitas tentativas de autenticação. Tente novamente em 15 minutos.'
);

export const apiRateLimit = createRateLimiter(
  1 * 60 * 1000, // 1 minuto
  30, // máximo 30 requests por minuto por IP
  'Muitas requisições à API. Tente novamente em 1 minuto.'
);

// Configuração CORS dinâmica
export const corsConfig = cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000', // Frontend local
      'http://localhost:3001', // ElizaOS local
      'https://localhost:3000', // Frontend HTTPS local
      'https://riskguardian.ai', // Produção (quando tiver)
    ];

    // Permitir requests sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Rate-Limit-Remaining'],
  maxAge: 86400 // 24 horas
});

// Configuração Helmet para segurança adicional
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.coingecko.com", "https://api.binance.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Middleware de log de segurança
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Log informações de segurança importantes
  const securityInfo = {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
    headers: {
      origin: req.get('Origin'),
      referer: req.get('Referer'),
      authorization: req.get('Authorization') ? '[PRESENT]' : '[ABSENT]'
    }
  };

  // Log requests suspeitos
  const suspiciousPatterns = [
    /sql/i,
    /script/i,
    /\.\./,
    /admin/i,
    /config/i,
    /password/i,
    /token/i
  ];

  const pathSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(req.path) || pattern.test(req.query.toString())
  );

  if (pathSuspicious) {
    logger.warn('Suspicious request detected', securityInfo);
  }

  // Log response time quando terminar
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
    
    logger[logLevel]('HTTP Request', {
      ...securityInfo,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};

// Middleware de validação de API Key (opcional)
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('X-API-Key');
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];

  // Se não há chaves configuradas, pular validação
  if (validApiKeys.length === 0) {
    return next();
  }

  if (!apiKey || !validApiKeys.includes(apiKey)) {
    logger.warn(`Invalid API key attempt from IP: ${req.ip}`);
    return res.status(401).json({
      error: 'Invalid or missing API key',
      timestamp: new Date().toISOString()
    });
  }

  next();
};

// Middleware de sanitização de input
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Sanitizar query parameters
  for (const key in req.query) {
    if (typeof req.query[key] === 'string') {
      req.query[key] = (req.query[key] as string)
        .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove scripts
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .trim();
    }
  }

  // Sanitizar body (se for objeto)
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }

  next();
};

// Função auxiliar para sanitizar objetos recursivamente
function sanitizeObject(obj: any): void {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key]
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}

// Middleware de timeout para requisições longas
export const requestTimeout = (timeoutMs: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        logger.warn(`Request timeout for ${req.method} ${req.path} from ${req.ip}`);
        res.status(408).json({
          error: 'Request timeout',
          timestamp: new Date().toISOString()
        });
      }
    }, timeoutMs);

    res.on('finish', () => {
      clearTimeout(timeout);
    });

    next();
  };
}; 