import React from 'react';

const stats = [
  { value: "4,800+", label: "Farms" },
  { value: "5", label: "Countries" },
  { value: "62%", label: "Yield Improvement" },
  { value: "KSh 2.1B", label: "Revenue Facilitated" },
];

export const ImpactStats = () => {
  return (
    <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-2xl" />
      </div>
      <div className="container px-4 md:px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4 group">
              <div className="text-4xl font-serif font-bold text-secondary sm:text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70 opacity-80 group-hover:opacity-100 transition-opacity">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
