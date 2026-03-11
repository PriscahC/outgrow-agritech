import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-20 overflow-hidden relative border-t border-primary-foreground/10">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-serif text-2xl font-bold">O</div>
              <span className="text-2xl font-serif font-bold text-background tracking-tight">Outgrow</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-[250px]">
              Africa's smartest farm network, connecting smallholder farmers with premium markets and data-driven insights.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-secondary transition-colors duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'For Farmers', 'For Buyers', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-secondary">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-primary-foreground/60">
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                <span>Valley View Office Park, <br /> Nairobi, Kenya</span>
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <span>contact@outgrow.ag</span>
              </li>
            </ul>
          </div>

          {/* Countries */}
          <div className="space-y-6">
             <h4 className="text-lg font-serif font-bold text-secondary">Operating Nations</h4>
             <div className="flex flex-col gap-4">
                {[
                  { name: "Kenya", flag: "🇰🇪" },
                  { name: "Uganda", flag: "🇺🇬" },
                  { name: "Nigeria", flag: "🇳🇬" },
                  { name: "Ghana", flag: "🇬🇭" },
                  { name: "Malawi", flag: "🇲🇼" }
                ].map((country) => (
                  <div key={country.name} className="flex items-center gap-3 bg-primary-foreground/5 p-2 rounded-xl group hover:bg-primary-foreground/10 transition-colors">
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-xs font-medium text-primary-foreground/80">{country.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-primary-foreground/40 font-medium">
            © 2026 Outgrow Ltd. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-primary-foreground/40 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
