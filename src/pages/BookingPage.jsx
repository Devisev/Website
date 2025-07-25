import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/healthcareData';
import { sendLeadEmail } from '@/lib/leadEmail';

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    patientName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    medicalHistory: '',
    specialRequirements: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    const selectedService = servicesData.find(s => s.id === formData.service);
    if (selectedService) {
      return selectedService.price;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = ['service', 'date', 'time', 'patientName', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}.`,
        variant: "destructive"
      });
      return;
    }

    const bookingData = {
      ...formData,
      price: calculatePrice(),
      type: 'service',
      bookingId: `BK${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingData));

    sendLeadEmail({
      ...bookingData,
      name: formData.patientName
    });
    
    toast({
      title: "Booking Details Saved!",
      description: "Redirecting to payment page..."
    });

    setTimeout(() => {
      navigate('/payment');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Book Healthcare Service - Neha Home Healthcare</title>
        <meta name="description" content="Book professional healthcare services at home. Easy online booking with secure payment options." />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Book Healthcare Service</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule professional healthcare services at your convenience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Service Details
                    </CardTitle>
                    <CardDescription>
                      Please provide your service requirements and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Type *</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {servicesData.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title} - ₹{service.price}{service.priceUnit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Preferred Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="time">Preferred Time *</Label>
                          <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Patient Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="patientName">Patient Name *</Label>
                            <Input
                              id="patientName"
                              value={formData.patientName}
                              onChange={(e) => handleInputChange('patientName', e.target.value)}
                              placeholder="Enter patient name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              value={formData.age}
                              onChange={(e) => handleInputChange('age', e.target.value)}
                              placeholder="Enter age"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+91 98765 43210"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="patient@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Enter complete address with landmark"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medicalHistory">Medical History</Label>
                          <Textarea
                            id="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                            placeholder="Brief medical history or current conditions"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialRequirements">Special Requirements</Label>
                          <Textarea
                            id="specialRequirements"
                            value={formData.specialRequirements}
                            onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                            placeholder="Any special requirements or instructions"
                            rows={3}
                          />
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Proceed to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.service ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Service:</span>
                          <span className="text-sm font-medium">
                            {servicesData.find(s => s.id === formData.service)?.title}
                          </span>
                        </div>
                        
                        {formData.date && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Date:</span>
                            <span className="text-sm font-medium">{formData.date}</span>
                          </div>
                        )}

                        {formData.time && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Time:</span>
                            <span className="text-sm font-medium">{formData.time}</span>
                          </div>
                        )}

                        <hr className="my-4" />
                        
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total Amount:</span>
                          <span className="brand-primary">₹{calculatePrice()}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Select a service to see pricing details
                      </p>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">What's Included:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Professional healthcare provider</li>
                        <li>• All necessary medical equipment</li>
                        <li>• Post-service consultation</li>
                        <li>• 24/7 emergency support</li>
                      </ul>
                    </div>
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

export default BookingPage;
