/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Componente seguro para timestamps em alertas
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState, useEffect } from 'react';

interface AlertTimestampProps {
  timestamp: Date;
  className?: string;
}

export function AlertTimestamp({ timestamp, className = '' }: AlertTimestampProps) {
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFormattedTime(timestamp.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  }, [timestamp]);

  // Renderizar placeholder durante hidratação
  if (!mounted) {
    return <span className={className}>--/--/----, --:--:--</span>;
  }

  return <span className={className}>{formattedTime}</span>;
} 