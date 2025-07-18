import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/#services', label: 'Services' },
    { path: '/#equipment', label: 'Equipment' },
    { path: '/booking', label: 'Book Now' },
  ];
  
  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.substring(2);
      const element = document.getElementById(elementId);
      if(location.pathname !== '/') {
        window.location.href = `/${path.substring(1)}`;
      }
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };
  
  const navigate = (path) => {
    window.location.href = path;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 brand-gradient-bg rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-800">Neha Healthcare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                className={`text-gray-600 hover:brand-primary transition-colors font-medium ${
                  (location.pathname + location.hash) === item.path || (location.pathname === item.path && item.path === '/')
                    ? 'brand-primary'
                    : ''
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button variant="outline" className="brand-primary border-[hsl(var(--primary))] hover:brand-bg hover:text-white">
              <Phone className="w-4 h-4 mr-2" />
              +91 98765 43210
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                  className={`text-lg text-gray-700 hover:brand-primary transition-colors font-medium p-2 rounded-md ${
                    (location.pathname + location.hash) === item.path || (location.pathname === item.path && item.path === '/')
                      ? 'brand-primary bg-blue-50'
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="outline" className="brand-primary border-[hsl(var(--primary))] hover:brand-bg hover:text-white w-fit mt-2">
                <Phone className="w-4 h-4 mr-2" />
                +91 98765 43210
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;