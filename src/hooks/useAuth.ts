'use client'

import { useCallback } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { useAuthStore } from '@/stores/auth.store'
import toast from 'react-hot-toast'

export function useAuth() {
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    login: storeLogin,
    logout: storeLogout,
    getNonce,
    loadProfile,
    clearError
  } = useAuthStore()

  const login = useCallback(async () => {
    if (!address || !isConnected) {
      toast.error('Conecte sua carteira primeiro')
      return false
    }

    try {
      // 1. Obter nonce do servidor
      const message = await getNonce(address)

      // 2. Assinar mensagem com a carteira
      const signature = await signMessageAsync({ message })

      // 3. Fazer login com a assinatura
      const success = await storeLogin(address, signature, message)

      if (success) {
        // 4. Carregar perfil do usuário
        await loadProfile()
      }

      return success

    } catch (error: any) {
      console.error('❌ Erro no login:', error)
      
      if (error.message?.includes('User rejected')) {
        toast.error('Assinatura cancelada pelo usuário')
      } else {
        toast.error('Erro ao fazer login. Tente novamente.')
      }
      
      return false
    }
  }, [address, isConnected, signMessageAsync, getNonce, storeLogin, loadProfile])

  const logout = useCallback(async () => {
    await storeLogout()
  }, [storeLogout])

  // Estado derivado
  const isWalletConnected = isConnected && !!address
  const canLogin = isWalletConnected && !isAuthenticated && !isLoading
  const needsWalletConnection = !isWalletConnected

  return {
    // Estado
    isAuthenticated,
    isLoading,
    user,
    error,
    isWalletConnected,
    canLogin,
    needsWalletConnection,
    address,

    // Ações
    login,
    logout,
    clearError,
    loadProfile
  }
} 