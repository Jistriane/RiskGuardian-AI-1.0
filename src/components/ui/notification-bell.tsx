'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function NotificationBell() {
  const [hasNotifications, setHasNotifications] = useState(true)
  const [notificationCount] = useState(3)

  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-4 w-4" />
      {hasNotifications && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )}
      <span className="sr-only">Notificações</span>
    </Button>
  )
} 