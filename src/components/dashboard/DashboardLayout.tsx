import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, LayoutDashboard, Map, Sprout, Bot, ShoppingCart, Wallet, FileText, User, LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Farm Map', path: '/farm-map', icon: Map },
  { name: 'Crop Monitor', path: '/crop-monitor', icon: Sprout },
  { name: 'AI Advisor', path: '/ai-advisor', icon: Bot },
  { name: 'Market Access', path: '/market-access', icon: ShoppingCart },
  { name: 'Finance', path: '/finance', icon: Wallet },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Profile', path: '/profile', icon: User },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const getCountryFlag = (country: string | null) => {
    const flags: Record<string, string> = {
      'Kenya': '🇰🇪',
      'Uganda': '🇺🇬',
      'Nigeria': '🇳🇬',
      'Ghana': '🇬🇭',
      'Malawi': '🇲🇼',
    };
    return flags[country || ''] || '🌍';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b bg-primary text-primary-foreground h-16 flex items-center px-4 md:px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary-foreground/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-primary text-primary-foreground p-0 w-64">
                <div className="p-6 border-b border-primary-foreground/10">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-serif text-xl font-bold">O</div>
                    <span className="text-xl font-serif font-bold">Outgrow</span>
                  </div>
                </div>
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isActive
                            ? 'bg-secondary text-secondary-foreground font-semibold'
                            : 'hover:bg-primary-foreground/10'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/20 w-full text-left transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-serif text-lg font-bold">O</div>
              <span className="text-lg font-serif font-bold">Outgrow</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-2xl">{getCountryFlag((profile?.country as string | null) || null)}</span>
              <span className="font-medium">{(profile?.full_name || profile?.email || 'Farmer') as string}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => console.log('Notifications clicked')}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-secondary-foreground text-xs">
                3
              </Badge>
            </Button>
            <Avatar className="h-9 w-9 border-2 border-secondary">
              <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                {(((profile?.full_name as string)?.[0] || (profile?.email as string)?.[0] || 'F') as string).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r bg-card flex-col">
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-3 border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
