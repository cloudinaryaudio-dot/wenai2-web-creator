import React from 'react';
import { Header } from './component/Header';
import { HeroSection } from './component/HeroSection';
import { FeaturesSection } from './component/FeaturesSection';
import { TemplatesSection } from './component/TemplatesSection';
import { GallerySection } from './component/GallerySection';
import { TestimonialsSection } from './component/TestimonialsSection';
import { PricingSection } from './component/PricingSection';
import { ContactSection } from './component/ContactSection';
import { Footer } from './component/Footer';

/**
 * Index Component - Main landing page
 * 
 * Renders the complete landing page with sections:
 * - Header: Navigation and branding
 * - HeroSection: Main call-to-action with value proposition
 * - FeaturesSection: Key features and benefits
 * - TemplatesSection: Available wedding invitation templates
 * - TestimonialsSection: User testimonials and social proof
 * - PricingSection: Pricing tiers and plans
 * - ContactSection: Contact form or support information
 * - Footer: Copyright, links, and additional info
 */
const Index = ( ) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <Header />

      {/* Main content */}
      <main className="w-full">
        
        {/* Hero section with main CTA */}
        <HeroSection />

        {/* Key features highlight */}
        <FeaturesSection /> 

        {/* Available templates showcase */}
        <TemplatesSection id="templates" />

        {/* Gallery section - Currently disabled, uncomment when ready */}
        {/* <GallerySection /> */}

        {/* Customer testimonials and reviews */}
        <TestimonialsSection />

        {/* Pricing plans and tiers */}
        <section id="pricing">  
          <PricingSection  />
        </section>

        {/* Contact form or support CTA */}
        <ContactSection />
      </main>

      {/* Footer with links and copyright */}
      <Footer />
    </div>
  );
};

export default Index;
