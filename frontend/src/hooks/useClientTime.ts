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

'use client';

import { useState, useEffect } from 'react';

export function useClientTime() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTime = (dateString: string, locale: string = 'pt-BR') => {
    if (!isClient) {
      return '--:--:--';
    }
    return new Date(dateString).toLocaleTimeString(locale);
  };

  const formatDate = (dateString: string, locale: string = 'pt-BR') => {
    if (!isClient) {
      return '--/--/----';
    }
    return new Date(dateString).toLocaleDateString(locale);
  };

  const formatDateTime = (dateString: string, locale: string = 'pt-BR') => {
    if (!isClient) {
      return '--/--/---- --:--:--';
    }
    return new Date(dateString).toLocaleString(locale);
  };

  return {
    isClient,
    formatTime,
    formatDate,
    formatDateTime
  };
} 