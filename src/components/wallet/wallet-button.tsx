'use client'

import { Button } from '@/components/ui/button'

export function WalletButton() {
  return (
    <Button 
      variant="outline" 
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700"
    >
      Connect Wallet
    </Button>
  )
} 