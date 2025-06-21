/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Componente para indicar a fonte dos dados
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Database } from 'lucide-react';

interface DataSourceIndicatorProps {
  type: 'real' | 'simulated' | 'calculated';
  label?: string;
  description?: string;
}

export function DataSourceIndicator({ 
  type, 
  label, 
  description 
}: DataSourceIndicatorProps) {
  const getConfig = () => {
    switch (type) {
      case 'real':
        return {
          icon: CheckCircle,
          color: 'bg-green-600/20 text-green-400 border-green-600/30',
          text: label || 'Dados Reais',
          desc: description || 'Dados obtidos diretamente da blockchain'
        };
      case 'simulated':
        return {
          icon: AlertTriangle,
          color: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
          text: label || 'Simulado',
          desc: description || 'Dados simulados para demonstração'
        };
      case 'calculated':
        return {
          icon: Database,
          color: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
          text: label || 'Calculado',
          desc: description || 'Calculado a partir de dados reais'
        };
      default:
        return {
          icon: Database,
          color: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
          text: 'Desconhecido',
          desc: 'Fonte de dados não identificada'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className={`${config.color} flex items-center gap-1 text-xs`}
      >
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
      {description && (
        <span className="text-xs text-gray-400 hidden sm:inline">
          {config.desc}
        </span>
      )}
    </div>
  );
} 