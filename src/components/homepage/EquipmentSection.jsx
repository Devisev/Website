import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { equipmentData } from '@/data/healthcareData';

const EquipmentSection = () => {
  const navigate = useNavigate();

  const handleQuickBook = (item, type) => {
    localStorage.setItem('quickCheckoutItem', JSON.stringify({ ...item, type }));
    toast({
      title: `${item.title} added!`,
      description: 'Redirecting to checkout...',
    });
    navigate('/quick-checkout');
  };

  return (
    <section id="equipment" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Medical Equipment for Rent</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality medical equipment available for your needs. Click to rent.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {equipmentData.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full flex flex-col overflow-hidden cursor-pointer" onClick={() => handleQuickBook(item, 'rental')}>
                <img  alt={item.image} className="w-full h-40 object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <CardHeader className="p-4">
                  <CardTitle className="text-lg md:text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-gray-50 p-3 md:p-4">
                  <p className="font-semibold text-base md:text-lg brand-primary">₹{item.price}<span className="text-xs md:text-sm font-normal text-gray-500">{item.priceUnit}</span></p>
                  <Button variant="ghost" size="sm" className="brand-primary hover:bg-blue-100 text-sm">
                    Rent Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;