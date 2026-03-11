import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Award, HeartHandshake } from 'lucide-react';

const partners = [
  { name: 'National Bank', logo: 'placeholder-bank-1.jpg' },
  { name: 'Agri-NGO', logo: 'placeholder-ngo-1.jpg' },
  { name: 'Global Finance', logo: 'placeholder-bank-2.jpg' },
];

export const AboutPartners = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-12">
             <div className="space-y-6">
               <h2 className="text-3xl font-serif font-bold text-primary md:text-5xl leading-tight">Our Mission: <br /> Building Africa's Future Soil</h2>
               <p className="max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">{"Founded in 2026 by Pan African innovators, Outgrow is committed to eliminating the barriers that smallholder farmers face. We believe that technology, when applied with local context, can solve the food security challenges of today and tomorrow."}</p>
             </div>

             <div className="grid gap-6 sm:grid-cols-3">
               <div className="space-y-2">
                 <Globe className="h-8 w-8 text-secondary mb-2" />
                 <h4 className="font-bold text-primary">5 Countries</h4>
                 <p className="text-xs text-muted-foreground">Pan-African operations across Kenya, Uganda, Nigeria, Ghana, and Malawi.</p>
               </div>
               <div className="space-y-2">
                 <Award className="h-8 w-8 text-secondary mb-2" />
                 <h4 className="font-bold text-primary">Verified</h4>
                 <p className="text-xs text-muted-foreground">ISO certified data processes ensuring traceability for all exports.</p>
               </div>
               <div className="space-y-2">
                 <HeartHandshake className="h-8 w-8 text-secondary mb-2" />
                 <h4 className="font-bold text-primary">Impact</h4>
                 <p className="text-xs text-muted-foreground">62% average income increase for farmers on our platform.</p>
               </div>
             </div>

             <div className="pt-10 border-t">
               <p className="text-sm font-bold text-primary uppercase tracking-widest mb-6 opacity-60">Trusted Partners</p>
               <div className="flex flex-wrap gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                  {partners.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-secondary/20 transition-colors">P</div>
                      <span className="font-bold text-xl font-serif">{p.name}</span>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
             <div className="relative w-full max-w-[500px] aspect-square rounded-full bg-secondary/5 flex items-center justify-center border-dashed border-2 border-secondary/20 animate-spin-slow duration-20000">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full shadow-lg" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-lg" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-lg" />
             </div>
             
             {/* Map Placeholder */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] opacity-20 pointer-events-none group">
               <svg viewBox="0 0 100 100" fill="currentColor" className="w-full text-primary group-hover:scale-110 transition-transform duration-1000">
                 <path d="M45,20 Q50,15 55,20 T60,30 T55,40 T45,45 T35,40 T30,30 T45,20" />
                 <path d="M65,50 Q70,45 75,50 T80,60 T75,70 T65,75 T55,70 T50,60 T65,50" />
                 <circle cx="48" cy="25" r="2" fill="var(--secondary)" />
                 <circle cx="70" cy="55" r="2" fill="var(--secondary)" />
                 <circle cx="35" cy="45" r="2" fill="var(--secondary)" />
                 <circle cx="60" cy="35" r="2" fill="var(--secondary)" />
                 <circle cx="50" cy="70" r="2" fill="var(--secondary)" />
               </svg>
             </div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-6 rounded-3xl border shadow-2xl text-center max-w-[200px]">
                <p className="text-3xl font-serif font-bold text-primary">5+</p>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Nations Connected</p>
                <div className="flex gap-1 justify-center mt-3">
                  {["🇰🇪", "🇺🇬", "🇳🇬", "🇬🇭", "🇲🇼"].map(f => <span key={f} className="text-lg">{f}</span>)}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
