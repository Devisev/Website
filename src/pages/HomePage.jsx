import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/homepage/HeroSection';
import StatsSection from '@/components/homepage/StatsSection';
import ServicesSection from '@/components/homepage/ServicesSection';
import EquipmentSection from '@/components/homepage/EquipmentSection';
import GallerySection from '@/components/homepage/GallerySection';
import FeaturesSection from '@/components/homepage/FeaturesSection';

const HomePage = () => {
  return (
    <div className="min-h-screen soft-bg">
      <Helmet>
        <title>Neha Home Healthcare - Compassionate Care at Home</title>
        <meta name="description" content="Affordable and professional home healthcare services. Book nursing, physiotherapy, and rent medical equipment online." />
      </Helmet>
      <Header />

      <main className="pt-16 md:pt-20">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <EquipmentSection />
        <GallerySection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;