import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1584516156952-b4fab9b06939', alt: 'Nurse checking patient vitals at home' },
    { src: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88', alt: 'Physiotherapist working with a senior patient' },
    { src: 'https://images.unsplash.com/photo-1626306434801-a2d03e3f0943', alt: 'Caregiver talking with an elderly woman' },
    { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', alt: 'Doctor reviewing medical chart on a tablet' },
    { src: 'https://images.unsplash.com/photo-1530026405182-2823df39d31d', alt: 'Patient using a wheelchair with assistance' },
    { src: 'https://images.unsplash.com/photo-1612073689016-13c6be8c6373', alt: 'Close-up of medical equipment' },
    { src: 'https://images.unsplash.com/photo-1581092916349-af1843134293', alt: 'Healthcare worker preparing medication' },
    { src: 'https://images.unsplash.com/photo-1550831107-1553da8c8464', alt: 'Patient receiving home care service' },
  ];

  const [visibleImages, setVisibleImages] = useState(4);

  const showMoreImages = () => {
    setVisibleImages(prev => prev + 4);
  };

  return (
    <section id="gallery" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Our Work in Action</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            A glimpse into the compassionate care we provide to our patients.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {galleryImages.slice(0, visibleImages).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-105" />
            </motion.div>
          ))}
        </div>
        {visibleImages < galleryImages.length && (
          <div className="text-center mt-12">
            <Button size="lg" onClick={showMoreImages}>
              <Camera className="w-5 h-5 mr-2" />
              Show More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;