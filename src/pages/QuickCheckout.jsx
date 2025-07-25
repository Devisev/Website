import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Package, User, Phone, MapPin, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import emailjs from 'emailjs-com';

const QuickCheckout = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedItem = localStorage.getItem('quickCheckoutItem');
    if (savedItem) {
      setItem(JSON.parse(savedItem));
    } else {
      toast({
        title: "No item selected",
        description: "Please select a service or equipment first.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendLeadEmail = (data) => {
    const templateParams = {
      to_email: 'jaydev0018@gmail.com',
      from_name: data.name,
      from_phone: data.phone,
      from_address: data.address,
      booking_type: data.type,
      item_name: data.type === 'service' ? data.service : data.equipment,
      booking_date: data.date,
      price: data.price,
      message_html: `
        <h2>New Lead from Website</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Item:</strong> ${data.type === 'service' ? data.service : data.equipment}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Total Price:</strong> ₹${data.price}</p>
      `
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
         console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
         console.log('FAILED...', err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = ['name', 'phone', 'address', 'date'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}.`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      type: item.type,
      price: item.type === 'service' ? item.price : item.price + item.deposit,
      ...formData,
    };
    
    if(item.type === 'service') {
      bookingData.service = item.title;
      bookingData.duration = '1';
    } else {
      bookingData.equipment = item.title;
      bookingData.rentalPeriod = '1-week';
      bookingData.quantity = '1';
      bookingData.rentalCost = item.price;
      bookingData.depositCost = item.deposit;
    }
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    sendLeadEmail(bookingData);

    toast({
      title: "Details Confirmed!",
      description: "Redirecting to final payment page...",
    });

    setTimeout(() => {
      navigate('/payment');
      setIsSubmitting(false);
    }, 1500);
  };

  if (!item) {
    return null;
  }

  return (
    <div className="min-h-screen soft-bg">
      <Helmet>
        <title>Quick Checkout - Neha Home Healthcare</title>
        <meta name="description" content="Complete your booking or rental quickly and securely." />
      </Helmet>
      <Header />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Quick Checkout</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Just a few more details to complete your {item.type} order.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 brand-primary" />
                    Your Details
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact and delivery information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea id="address" placeholder="Enter your complete address with landmark" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="date">{item.type === 'service' ? 'Preferred Date *' : 'Rental Start Date *'}</Label>
                      <Input id="date" type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Proceed to Payment
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" onClick={() => navigate('/')} className="w-full text-gray-600 hover:bg-gray-100">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Home
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.type === 'service' ? <Calendar className="w-5 h-5 brand-primary" /> : <Package className="w-5 h-5 brand-primary" />}
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                       <img  alt={item.title} className="w-24 h-24 object-cover rounded-lg" src="https://images.unsplash.com/photo-1652086939922-9582b3367e61" />
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.type === 'service' ? 'Service Booking' : 'Equipment Rental'}</p>
                      </div>
                    </div>
                    <hr/>
                    {item.type === 'service' ? (
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Price</span>
                        <span className="brand-primary">₹{item.price}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Rental Cost (1 week)</span>
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Deposit</span>
                          <span className="font-medium">₹{item.deposit}</span>
                        </div>
                         <hr/>
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total Payable</span>
                          <span className="brand-primary">₹{item.price + item.deposit}</span>
                        </div>
                         <p className="text-xs text-gray-500 text-center pt-2">Security deposit is fully refundable upon return of equipment in good condition.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuickCheckout;
