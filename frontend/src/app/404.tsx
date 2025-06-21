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

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center bg-white/10 backdrop-blur-lg border-white/20">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-300 mb-6">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Voltar ao Dashboard
            </Button>
          </Link>
          
          <Link href="/portfolio">
            <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
              Ver Portfolio
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
} 