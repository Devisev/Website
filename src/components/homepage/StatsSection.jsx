import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HeartPulse, Star, Globe, Users } from 'lucide-react';

const AnimatedStat = ({ value, label, icon }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
      
      let start = 0;
      const end = parseFloat(value);
      if (start === end) return;

      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setDisplayValue(start.toFixed(value.includes('.') ? 1 : 0));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, controls, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <p className="text-4xl md:text-5xl font-bold brand-primary">{displayValue}{value.includes('+') ? '+' : ''}</p>
      <p className="text-lg text-gray-600 mt-2">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      value: '500+',
      label: 'Services Delivered',
      icon: <HeartPulse className="w-8 h-8 brand-primary" />,
    },
    {
      value: '4.8',
      label: 'Customer Rating',
      icon: <Star className="w-8 h-8 brand-primary" />,
    },
    {
      value: '10+',
      label: 'Cities Served',
      icon: <Globe className="w-8 h-8 brand-primary" />,
    },
    {
      value: '100+',
      label: 'Happy Families',
      icon: <Users className="w-8 h-8 brand-primary" />,
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} value={stat.value} label={stat.label} icon={stat.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;