import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, CheckCircle2, MessageSquare, Zap, ShieldCheck } from 'lucide-react';

const benefits = [
  { icon: <Zap className="h-5 w-5 text-secondary" />, text: "Direct Market Access — No Middlemen" },
  { icon: <MessageSquare className="h-5 w-5 text-secondary" />, text: "AI Pest & Disease Diagnosis" },
  { icon: <Smartphone className="h-5 w-5 text-secondary" />, text: "SMS Alerts for Weather & Prices" },
  { icon: <ShieldCheck className="h-5 w-5 text-secondary" />, text: "Capital Access & Equipment Loans" },
  { icon: <CheckCircle2 className="h-5 w-5 text-secondary" />, text: "Expert Extension Services" },
];

export const ForFarmers = () => {
  return (
    <section id="farmers" className="py-24 bg-background/50 border-t border-b overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-primary md:text-5xl leading-tight">Empowering Your Fields, <br /> Protecting Your Harvest</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                We provide the tools and connections you need to turn your farm into a thriving business, regardless of your farm's size.
              </p>
            </div>
            
            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-secondary/10 transition-colors">
                    {benefit.icon}
                  </div>
                  <span className="text-lg font-medium text-primary-foreground/90">{benefit.text}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 h-14 rounded-full shadow-lg"
              onClick={() => window.location.href = '/signup'}
            >
              Start Growing with Us
            </Button>
          </div>

          <div className="relative flex justify-center lg:justify-end group">
             {/* Farmer Image Background */}
             <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full overflow-hidden border-4 border-background shadow-xl z-0 hidden lg:block grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_562c5845-5399-4c2b-a1a1-b6def995e5f8.jpg" alt="Farmer" className="w-full h-full object-cover" />
             </div>

             {/* Phone Mockup */}
             <div className="relative w-72 h-[550px] bg-primary rounded-[3rem] p-4 shadow-2xl border-8 border-primary-foreground/5 transform rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-primary rounded-b-2xl z-10" />
                <div className="h-full w-full bg-background rounded-[2rem] overflow-hidden flex flex-col p-4">
                  <div className="flex items-center justify-between mb-8 opacity-40">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-primary/20" />
                      <div className="w-3 h-3 rounded-full bg-primary/20" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border">
                      <p className="font-bold mb-1 text-primary">Outgrow Support</p>
                      <p>Rainfall expected in 48 hours. Secure your drying crops.</p>
                      <p className="text-[8px] text-right mt-1 opacity-50">10:15 AM</p>
                    </div>

                    <div className="bg-secondary/10 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border border-secondary/20 shadow-sm animate-pulse">
                      <p className="font-bold mb-1 text-secondary">MARKET ALERT</p>
                      <p>Buyer ID #4421 is looking for 2 tons of Arabica Coffee. Quote: KSh 320/kg.</p>
                      <p className="text-[8px] text-right mt-1 opacity-50">11:02 AM</p>
                    </div>

                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none max-w-[85%] text-xs border">
                      <p className="font-bold mb-1 text-primary">Farm Health</p>
                      <p>Sensor #4 detected low nitrogen. Recommended: 50kg Urea/Acre.</p>
                      <p className="text-[8px] text-right mt-1 opacity-50">1:45 PM</p>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <div className="h-8 flex-1 bg-muted rounded-full p-2 text-[10px] text-muted-foreground flex items-center">Type a message...</div>
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-xs">↑</div>
                  </div>
                </div>
             </div>
             
             {/* Floating Elements */}
             <div className="absolute -left-12 bottom-12 bg-card p-4 rounded-2xl border shadow-xl max-w-[180px] animate-bounce duration-5000">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white">✓</div>
                   <p className="text-[10px] font-bold text-primary">YIELD INCREASE</p>
                </div>
                <p className="text-2xl font-serif font-bold text-secondary">+62%</p>
                <p className="text-[8px] text-muted-foreground">Compared to last season</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
