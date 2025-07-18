import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Compassionate Care,
            <br />
            <span className="gradient-text">Right at Your Home.</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Neha Home Healthcare brings professional medical services and equipment to your doorstep, ensuring comfort and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-6">
              <Link to="/booking">Book a Service</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-6 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white">
              <Link to="/rental">Rent Equipment</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block"
        >
          <img  alt="A friendly nurse smiling" className="rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1680730044679-182d18b1305d" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;