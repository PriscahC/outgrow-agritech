import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'For Farmers', href: '#farmers' },
  { name: 'For Buyers', href: '#buyers' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-bold">O</div>
          <span className="text-xl font-serif font-bold text-primary tracking-tight">Outgrow</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-secondary"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/5"
              onClick={() => window.location.href = '/buyer/browse'}
            >
              Browse Farms
            </Button>
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => window.location.href = '/signup'}
            >
              Join as Farmer
            </Button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-secondary"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/buyer/browse'}
                  >
                    Browse Farms
                  </Button>
                  <Button 
                    className="w-full bg-secondary text-secondary-foreground"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Join as Farmer
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
