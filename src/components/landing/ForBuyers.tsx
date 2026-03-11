import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MousePointer2, PackageCheck } from 'lucide-react';

const buyersSteps = [
  { icon: <MousePointer2 className="h-8 w-8 text-secondary" />, title: "Browse Farms", description: "Filter by crop, location, and harvest quality." },
  { icon: <ShoppingCart className="h-8 w-8 text-secondary" />, title: "Connect", description: "Negotiate pricing directly with verified farmers." },
  { icon: <PackageCheck className="h-8 w-8 text-secondary" />, title: "Procure", description: "Secure, tracked logistics from farm to warehouse." },
];

const farmProfiles = [
  {
    crop: "Coffee (Arabica)",
    location: "Kericho, Kenya",
    harvest: "May 2026",
    quality: "Grade AA",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d74f707c-9e53-4b31-83b8-53a2c86eb025.jpg"
  },
  {
    crop: "Maize (White)",
    location: "Enugu, Nigeria",
    harvest: "June 2026",
    quality: "Premium",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d798a50c-c414-4868-8720-cf19cc1fa1dc.jpg"
  },
  {
    crop: "Tobacco",
    location: "Lilongwe, Malawi",
    harvest: "August 2026",
    quality: "Grade 1",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_e8e76f70-6830-4ef2-9f83-b50ae3d6c636.jpg"
  }
];

export const ForBuyers = () => {
  return (
    <section id="buyers" className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-20">
          <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-1 text-sm font-semibold rounded-full w-fit mx-auto">For Global Buyers</Badge>
          <h2 className="text-3xl font-serif font-bold text-background md:text-5xl">Transparent Procurement, Verified Quality</h2>
          <p className="max-w-[700px] mx-auto text-primary-foreground/70 md:text-lg">
            Our data-driven platform ensures you get exactly what you pay for, with full traceability back to the soil.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 relative px-4">
           {/* Connection Line */}
           <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-secondary/20 z-0" />
           {buyersSteps.map((step, index) => (
             <div key={index} className="relative z-10 space-y-4 bg-primary/20 backdrop-blur-sm p-6 rounded-3xl border border-primary-foreground/10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto border border-primary-foreground/5 shadow-inner group hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-secondary tracking-tight">{step.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{step.description}</p>
             </div>
           ))}
        </div>

        {/* Profiles */}
        <div className="grid gap-8 md:grid-cols-3">
          {farmProfiles.map((profile, index) => (
            <Card key={index} className="bg-card border-none shadow-2xl overflow-hidden group hover:scale-105 transition-all duration-500">
              <div className="h-48 relative overflow-hidden">
                <img src={profile.image} alt={profile.crop} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-secondary-foreground border-none font-bold uppercase tracking-widest text-[10px]">{profile.quality}</Badge>
                </div>
              </div>
              <CardContent className="space-y-4 pt-6 text-primary">
                 <div className="flex flex-col gap-1">
                   <h4 className="text-2xl font-serif font-bold tracking-tight">{profile.crop}</h4>
                   <p className="text-sm text-muted-foreground flex items-center gap-1 opacity-80 italic">
                     <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                     {profile.location}
                   </p>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-muted">
                    <div className="text-xs">
                       <p className="text-muted-foreground uppercase tracking-widest mb-1 opacity-60">Estimated Harvest</p>
                       <p className="font-bold text-primary">{profile.harvest}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary uppercase text-[10px] tracking-widest">Pre-Order →</Badge>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
