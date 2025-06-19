'use client'

import { create } from 'zustand'
import { WSConnectionStatus, ElizaOSWSMessage, ChromiaAlert } from '@/types/api'
import webSocketService from '@/services/websocket.service'

interface WebSocketStore {
  // Status de conexão
  elizaosStatus: WSConnectionStatus
  chromiaStatus: WSConnectionStatus
  
  // Dados recebidos
  elizaosMessages: ElizaOSWSMessage[]
  chromiaAlerts: ChromiaAlert[]
  
  // Loading states
  isConnecting: boolean
  
  // Actions
  connect: () => void
  disconnect: () => void
  retryConnection: () => void
  sendElizaOSMessage: (message: Omit<ElizaOSWSMessage, 'timestamp'>) => boolean
  clearMessages: () => void
  
  // Status setters (called by service)
  setElizaOSStatus: (status: WSConnectionStatus) => void
  setChromiaStatus: (status: WSConnectionStatus) => void
  addElizaOSMessage: (message: ElizaOSWSMessage) => void
  addChromiaAlert: (alert: ChromiaAlert) => void
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  // Initial state
  elizaosStatus: { connected: false, connecting: false, reconnectAttempts: 0 },
  chromiaStatus: { connected: false, connecting: false, reconnectAttempts: 0 },
  elizaosMessages: [],
  chromiaAlerts: [],
  isConnecting: false,

  // Actions
  connect: () => {
    set({ isConnecting: true })
    
    // Setup status change listener
    webSocketService.onStatusChange((service, status) => {
      if (service === 'elizaos') {
        get().setElizaOSStatus(status)
        console.log('🤖 ElizaOS:', status.connected ? 'Conectado' : 
                   status.connecting ? 'Conectando...' : 'Desconectado')
      } else if (service === 'chromia') {
        get().setChromiaStatus(status)
        console.log('⚡ Chromia:', status.connected ? 'Conectado' : 
                   status.connecting ? 'Conectando...' : 'Desconectado')
      }
    })

    // Setup message handlers
    webSocketService.onElizaOSEvent('analysis_result', (message) => {
      get().addElizaOSMessage(message)
    })

    webSocketService.onElizaOSEvent('history_result', (message) => {
      get().addElizaOSMessage(message)
    })

    webSocketService.onElizaOSEvent('error', (message) => {
      get().addElizaOSMessage(message)
    })

    // Setup alert handlers
    webSocketService.onChromiaEvent('risk_alert', (alert) => {
      get().addChromiaAlert(alert)
    })

    webSocketService.onChromiaEvent('price_alert', (alert) => {
      get().addChromiaAlert(alert)
    })

    webSocketService.onChromiaEvent('anomaly_detected', (alert) => {
      get().addChromiaAlert(alert)
    })

    // Initialize connections
    webSocketService.initializeConnections()
    
    set({ isConnecting: false })
  },

  disconnect: () => {
    webSocketService.disconnect()
    set({
      elizaosStatus: { connected: false, connecting: false, reconnectAttempts: 0 },
      chromiaStatus: { connected: false, connecting: false, reconnectAttempts: 0 },
      isConnecting: false
    })
  },

  retryConnection: () => {
    set({ isConnecting: true })
    webSocketService.retryConnections()
    setTimeout(() => set({ isConnecting: false }), 2000)
  },

  sendElizaOSMessage: (message) => {
    return webSocketService.sendElizaOSMessage(message)
  },

  clearMessages: () => {
    set({ elizaosMessages: [], chromiaAlerts: [] })
  },

  // Status setters
  setElizaOSStatus: (status) => {
    set({ elizaosStatus: status })
  },

  setChromiaStatus: (status) => {
    set({ chromiaStatus: status })
  },

  addElizaOSMessage: (message) => {
    set((state) => ({
      elizaosMessages: [...state.elizaosMessages, message].slice(-50) // Keep last 50 messages
    }))
  },

  addChromiaAlert: (alert) => {
    set((state) => ({
      chromiaAlerts: [...state.chromiaAlerts, alert].slice(-20) // Keep last 20 alerts
    }))
  }
}))

// Helper hooks for specific data
export const useElizaOSStatus = () => useWebSocketStore(state => state.elizaosStatus)
export const useChromiaStatus = () => useWebSocketStore(state => state.chromiaStatus)
export const useElizaOSMessages = () => useWebSocketStore(state => state.elizaosMessages)
export const useChromiaAlerts = () => useWebSocketStore(state => state.chromiaAlerts)

export const useWebSocketConnection = () => {
  const store = useWebSocketStore()
  return {
    isElizaOSConnected: store.elizaosStatus.connected,
    isChromiaConnected: store.chromiaStatus.connected,
    isAnyConnected: store.elizaosStatus.connected || store.chromiaStatus.connected,
    isConnecting: store.isConnecting,
    connect: store.connect,
    disconnect: store.disconnect,
    retry: store.retryConnection
  }
} 