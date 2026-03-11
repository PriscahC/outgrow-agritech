import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Sprout, Heart, ShoppingCart, FileText, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const BuyerLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { path: '/buyer/dashboard', icon: Home, label: 'Home' },
    { path: '/buyer/browse', icon: Sprout, label: 'Browse Farms' },
    { path: '/buyer/watchlist', icon: Heart, label: 'Watchlist' },
    { path: '/buyer/procurement', icon: ShoppingCart, label: 'Procurement' },
    { path: '/buyer/quality-reports', icon: FileText, label: 'Quality Reports' },
    { path: '/buyer/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="bg-primary text-primary-foreground border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/buyer/dashboard" className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-secondary" />
            <div>
              <h1 className="text-xl font-serif font-bold">Outgrow</h1>
              <p className="text-xs text-primary-foreground/80">Buyer Portal</p>
            </div>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-2 pt-8">
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
              </div>
            </SheetContent>
          </Sheet>
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-30">
        <div className="grid grid-cols-6 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  asChild
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  size="sm"
                  className="flex flex-col h-auto py-2 px-1 gap-1"
                >
                  <span>
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{item.label.split(' ')[0]}</span>
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BuyerLayout;
