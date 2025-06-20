'use client'

import { useEffect, useState } from 'react'

/**
 * Hook para gerenciar basePath dinamicamente
 * Retorna o basePath correto dependendo do ambiente
 */
export function useBasePath() {
  const [basePath, setBasePath] = useState('')

  useEffect(() => {
    // Detecta se está no GitHub Pages
    const isGitHubPages = 
      typeof window !== 'undefined' && 
      (window.location.hostname.includes('github.io') || 
       window.location.pathname.includes('/RiskGuardian-AI-1.0'))

    setBasePath(isGitHubPages ? '/RiskGuardian-AI-1.0' : '')
  }, [])

  return basePath
}

/**
 * Função utilitária para construir URLs com basePath
 */
export function withBasePath(path: string): string {
  if (typeof window === 'undefined') return path
  
  const isGitHubPages = 
    window.location.hostname.includes('github.io') || 
    window.location.pathname.includes('/RiskGuardian-AI-1.0')
    
  const basePath = isGitHubPages ? '/RiskGuardian-AI-1.0' : ''
  
  // Remove leading slash from path if basePath exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`
} 