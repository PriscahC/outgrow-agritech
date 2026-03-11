import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ImpactStats } from '@/components/landing/ImpactStats';
import { ForFarmers } from '@/components/landing/ForFarmers';
import { Testimonials } from '@/components/landing/Testimonials';
import { ForBuyers } from '@/components/landing/ForBuyers';
import { AboutPartners } from '@/components/landing/AboutPartners';
import { SignUpForm } from '@/components/landing/SignUpForm';
import { Footer } from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ImpactStats />
        <ForFarmers />
        <Testimonials />
        <ForBuyers />
        <AboutPartners />
        <SignUpForm />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
