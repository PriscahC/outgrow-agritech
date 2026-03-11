import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Sprout, 
  Radio, 
  Users, 
  ShoppingBag, 
  Leaf, 
  TrendingUp, 
  Settings, 
  User,
  Menu,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface AdminLayoutProps {
  children?: React.ReactNode;
  role?: 'admin' | 'field_agent';
}

const AdminLayout = ({ children, role = 'admin' }: AdminLayoutProps) => {
  const location = useLocation();

  const adminNavItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Operations Dashboard' },
    { path: '/admin/onboarding', icon: Sprout, label: 'Farm Onboarding' },
    { path: '/admin/devices', icon: Radio, label: 'Device Management' },
    { path: '/admin/farmers', icon: Users, label: 'Farmer Accounts' },
    { path: '/admin/buyers', icon: ShoppingBag, label: 'Buyer Accounts' },
    { path: '/admin/extension', icon: Leaf, label: 'Extension Services' },
    { path: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const fieldAgentNavItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'My Region Dashboard' },
    { path: '/admin/onboarding', icon: Sprout, label: 'Farm Onboarding' },
    { path: '/admin/devices', icon: Radio, label: 'Device Management' },
    { path: '/admin/extension', icon: Leaf, label: 'Extension Services' },
    { path: '/admin/profile', icon: User, label: 'My Profile' },
  ];

  const navItems = role === 'admin' ? adminNavItems : fieldAgentNavItems;
  const userName = role === 'admin' ? 'Sarah Mwangi' : 'David Ouma';
  const userRole = role === 'admin' ? 'Head of Operations' : 'Field Agent';
  const userInitials = role === 'admin' ? 'SM' : 'DO';

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top Header */}
      <header className="bg-primary text-primary-foreground border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8 text-secondary" />
            <div>
              <h1 className="text-xl font-serif font-bold">Outgrow Admin</h1>
              <p className="text-xs text-primary-foreground/80">Internal Operations Portal</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-primary-foreground/80">{userRole}</p>
            </div>
            <Avatar className="h-10 w-10 bg-secondary text-secondary-foreground">
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-2 pt-8">
                  <div className="mb-4 pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 bg-secondary text-secondary-foreground">
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{userName}</p>
                        <Badge variant="outline" className="text-xs">{userRole}</Badge>
                      </div>
                    </div>
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} to={item.path}>
                        <Button
                          asChild
                          variant={isActive(item.path) ? 'default' : 'ghost'}
                          className="w-full justify-start gap-3"
                        >
                          <span>
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </span>
                        </Button>
                      </Link>
                    );
                  })}
                  <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 mt-4" onClick={() => console.log('Logout')}>
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-card border-r">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    asChild
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3"
                  >
                    <span>
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </span>
                  </Button>
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t">
              <Button variant="ghost" className="w-full justify-start gap-3 text-red-500" onClick={() => console.log('Logout')}>
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
