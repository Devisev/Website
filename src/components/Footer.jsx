import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const services = [
    'Home Nursing',
    'Home ICU Setup',
    'Physiotherapy',
    'Care Taker',
    'Baby Care',
    'Medical Equipment Rental',
  ];

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 brand-gradient-bg rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Neha Healthcare</span>
            </div>
            <p className="text-gray-300">
              Professional home healthcare services with compassionate care delivered to your doorstep.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-lg font-semibold">Contact Info</span>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 brand-primary" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 brand-primary" />
                <span className="text-gray-300">info@nehahealthcare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 brand-primary" />
                <span className="text-gray-300">Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-lg font-semibold">Services</span>
            <div className="space-y-2 text-gray-300">
              {services.map((service, index) => (
                <p key={index}>{service}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-lg font-semibold">Operating Hours</span>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 brand-primary" />
                <span className="text-gray-300">24/7 Emergency</span>
              </div>
              <p className="text-gray-300">Mon-Fri: 8:00 AM - 8:00 PM</p>
              <p className="text-gray-300">Sat-Sun: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Neha Home Healthcare Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;