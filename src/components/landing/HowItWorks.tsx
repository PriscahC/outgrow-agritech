import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Monitor, Globe } from 'lucide-react';

const steps = [
  {
    icon: <MapPin className="h-10 w-10 text-secondary" />,
    title: "1. We Visit Your Farm",
    description: "Drone surveillance and IoT sensor installation to understand your soil and crop needs.",
    details: "Using cutting-edge tech to map your fields and install local weather stations."
  },
  {
    icon: <Monitor className="h-10 w-10 text-secondary" />,
    title: "2. Monitor in Real Time",
    description: "Access your dashboard via SMS or our app with alerts on pests, water, and growth.",
    details: "Get actionable advice on fertilization, irrigation, and pest management in real-time."
  },
  {
    icon: <Globe className="h-10 w-10 text-secondary" />,
    title: "3. Connect to Markets",
    description: "Direct connection to global buyers and low-interest bank loans for expansion.",
    details: "Eliminate middlemen and secure fair pricing with transparent logistics."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary md:text-5xl">Simple, Smarter Farming</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
            Outgrow brings the power of data and technology directly to your fields.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-card border shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full group-hover:bg-secondary/10 transition-colors" />
              <CardHeader className="space-y-4 pb-4">
                <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <CardTitle className="text-2xl font-serif text-primary tracking-tight">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                <div className="pt-4 border-t border-muted">
                    <p className="text-xs font-medium text-primary/70 uppercase tracking-widest">{step.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
