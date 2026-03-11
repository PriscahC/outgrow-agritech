import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Outgrow changed my life. I used to sell to brokers at whatever price they offered. Now, I see real market data on my phone and sell directly to buyers in Nairobi.",
    author: "Samuel Oketch",
    region: "Kericho, Kenya",
    crop: "Arabica Coffee"
  },
  {
    quote: "The soil sensors helped me realize I was over-fertilizing. My costs dropped by 30%, and my maize yield is the best it's been in 10 years.",
    author: "Grace Amadi",
    region: "Enugu, Nigeria",
    crop: "Maize & Cassava"
  },
  {
    quote: "Accessing a bank loan was always impossible until Outgrow. They used my farm data to verify my harvest, and I got the capital I needed for irrigation.",
    author: "Malick Banda",
    region: "Lilongwe, Malawi",
    crop: "Tobacco & Groundnuts"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-secondary/5 -skew-x-12 z-0" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary md:text-5xl">Stories from the Soil</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">
            Hear from the farmers who are transforming their futures with Outgrow.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <Card key={index} className="bg-card border-none shadow-xl hover:-translate-y-2 transition-transform duration-500 rounded-3xl overflow-hidden p-4">
              <CardContent className="space-y-6 pt-6 flex flex-col h-full">
                <Quote className="h-10 w-10 text-secondary opacity-30 rotate-180" />
                <p className="text-lg font-serif italic text-primary flex-1 leading-relaxed">"{t.quote}"</p>
                <div className="pt-6 border-t border-muted flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl font-serif">
                     {t.author[0]}
                   </div>
                   <div>
                     <p className="font-bold text-primary leading-tight">{t.author}</p>
                     <p className="text-xs text-muted-foreground">{t.region}</p>
                     <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1">{t.crop}</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
