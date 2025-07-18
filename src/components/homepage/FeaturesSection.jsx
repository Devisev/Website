import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Clock, HeartPulse } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <UserCheck className="w-8 h-8 brand-primary" />,
      title: 'Licensed Professionals',
      description: 'Our team consists of certified and experienced healthcare providers.',
    },
    {
      icon: <Clock className="w-8 h-8 brand-primary" />,
      title: '24/7 Availability',
      description: 'We offer round-the-clock services for emergencies and support.',
    },
    {
      icon: <HeartPulse className="w-8 h-8 brand-primary" />,
      title: 'Personalized Care Plans',
      description: 'We tailor our services to meet the unique needs of each patient.',
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">Why Choose Neha Healthcare?</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Your health is our priority. We are committed to providing the best care.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;