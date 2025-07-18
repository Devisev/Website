import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import BookingPage from '@/pages/BookingPage';
import RentalPage from '@/pages/RentalPage';
import PaymentPage from '@/pages/PaymentPage';
import QuickCheckout from '@/pages/QuickCheckout';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Helmet>
          <title>Neha Home Healthcare Service - Professional Healthcare at Home</title>
          <meta name="description" content="Professional home healthcare services with online booking, medical equipment rental, and secure payment options. Quality care delivered to your doorstep." />
        </Helmet>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/quick-checkout" element={<QuickCheckout />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;