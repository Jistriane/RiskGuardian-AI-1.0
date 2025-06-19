'use client'

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BarChart3,
  Shield,
  TrendingUp,
  Settings,
  Bell,
  Menu,
  Wallet,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { SystemStatus } from '@/components/dashboard/SystemStatus';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    href: '/',
  },
  {
    id: 'portfolio',
    label: 'Portfólio',
    icon: Wallet,
    href: '/portfolio',
  },
  {
    id: 'risk',
    label: 'Análise de Risco',
    icon: Shield,
    href: '/risk',
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    icon: Zap,
    href: '/ai',
  },
  {
    id: 'scenarios',
    label: 'Cenários',
    icon: Target,
    href: '/scenarios',
  },
  {
    id: 'monitoring',
    label: 'Monitoramento',
    icon: Activity,
    href: '/monitoring',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    href: '/analytics',
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RiskGuardian
            </h1>
            <p className="text-xs text-muted-foreground">AI Powered</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start space-x-3",
                isActive && "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
              )}
              onClick={() => {
                setActiveItem(item.id);
                setSidebarOpen(false);
              }}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-blue-600" : "text-muted-foreground"
              )} />
              <span className={cn(
                isActive ? "text-blue-700 font-medium" : "text-foreground"
              )}>
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Status do Sistema */}
      <div className="border-t p-4">
        <SystemStatus />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
      {/* Sidebar Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white/80 backdrop-blur-xl shadow-lg">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="md:pl-72">
        {/* Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white/80 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          {/* Search/Title area */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-gray-900">
                {sidebarItems.find(item => item.id === activeItem)?.label || 'Dashboard'}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Wallet Button */}
              <WalletButton />

              {/* Settings */}
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 