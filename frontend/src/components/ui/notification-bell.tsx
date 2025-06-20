'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotificationBell() {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-[1.2rem] w-[1.2rem]" />
      <span className="absolute -top-1 -right-1 h-3 w-3 bg-error rounded-full text-[10px] text-white flex items-center justify-center">
        3
      </span>
      <span className="sr-only">Notificações</span>
    </Button>
  );
} 