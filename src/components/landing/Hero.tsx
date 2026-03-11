import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 550 },
  { name: 'Sun', value: 700 },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-4">
              <Badge variant="outline" className="border-secondary bg-secondary/10 px-3 py-1 text-sm font-semibold rounded-full w-fit text-[#d39e17]">
                Africa's #1 Agri-Tech Network
              </Badge>
              <h1 className="text-4xl font-serif font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                From Soil to Sale — <br />
                <span className="text-secondary italic">Africa's Smartest</span> <br />
                Farm Network
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Empowering smallholder farmers across Kenya, Uganda, Nigeria, Ghana, and Malawi with real-time data, premium markets, and sustainable growth.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 h-14 rounded-full shadow-lg"
                onClick={() => window.location.href = '/signup'}
              >
                Join as Farmer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5 text-lg px-8 h-14 rounded-full"
                onClick={() => window.location.href = '/buyer/browse'}
              >
                Browse Farms
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 12}`} alt="User avatar" />
                  </div>
                ))}
              </div>
              <span>Trusted by 4,800+ farmers</span>
            </div>
          </div>
          <div className="relative lg:ml-auto animate-in fade-in slide-in-from-right duration-1000">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-3xl opacity-50 overflow-hidden">
               <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_51662448-e889-486e-8998-f5eb4c5c61a7.jpg" alt="Aerial Farm View" className="w-full h-full object-cover opacity-10" />
            </div>
            
            <Card className="w-full max-w-md mx-auto shadow-2xl border-border/50 backdrop-blur-sm bg-card/90 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              <CardHeader className="bg-primary/5 border-b pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-serif text-primary">Farm Dashboard</CardTitle>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Live Status</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Crop Health Score</span>
                    <span className="text-sm font-bold text-primary">88%</span>
                  </div>
                  <Progress value={88} className="h-2 bg-muted [&>div]:bg-secondary" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Moisture</p>
                    <p className="text-lg font-bold text-primary">42%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Temp</p>
                    <p className="text-lg font-bold text-primary">24°C</p>
                  </div>
                </div>

                <div className="h-[150px] w-full mt-2">
                   <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--secondary))" strokeWidth={3} dot={false} />
                    </LineChart>
                   </ResponsiveContainer>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs text-center text-muted-foreground italic">
                    "AI Prediction: Harvest expected in 14 days"
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -bottom-6 -right-6 hidden md:block w-32 h-32 bg-accent rounded-full border-8 border-background p-4 shadow-xl flex items-center justify-center text-center animate-bounce duration-3000">
                <p className="text-[10px] font-bold leading-tight text-[#d39e17]">
                    ESTIMATED <br />
                    <span className="text-lg">KSh 2M</span> <br />
                    REVENUE
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
