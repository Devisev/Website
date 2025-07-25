import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { equipmentData } from '@/data/healthcareData';
import { sendLeadEmail } from '@/lib/leadEmail';

const RentalPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    equipment: '',
    rentalPeriod: '1-month',
    startDate: '',
    quantity: '1',
    customerName: '',
    phone: '',
    email: '',
    address: '',
    deliveryInstructions: ''
  });

  const rentalPeriods = [
    { value: '1-day', label: '1 Day' },
    { value: '1-week', label: '1 Week' },
    { value: '1-month', label: '1 Month' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    const selectedEquipment = equipmentData.find(e => e.id === formData.equipment);
    const quantity = parseInt(formData.quantity) || 1;
    
    if (selectedEquipment) {
      const rentalCost = selectedEquipment.price * quantity;
      const depositCost = selectedEquipment.deposit * quantity;
      return { rental: rentalCost, deposit: depositCost, total: rentalCost + depositCost };
    }
    return { rental: 0, deposit: 0, total: 0 };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = ['equipment', 'rentalPeriod', 'startDate', 'customerName', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}.`,
        variant: "destructive"
      });
      return;
    }

    const pricing = calculatePrice();
    const rentalData = {
      ...formData,
      price: pricing.total,
      rentalCost: pricing.rental,
      depositCost: pricing.deposit,
      type: 'rental',
      rentalId: `RN${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('currentBooking', JSON.stringify(rentalData));

    sendLeadEmail({
      ...rentalData,
      name: formData.customerName
    });
    
    toast({
      title: "Rental Details Saved!",
      description: "Redirecting to payment page..."
    });

    setTimeout(() => {
      navigate('/payment');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Rent Medical Equipment - Neha Home Healthcare</title>
        <meta name="description" content="Rent medical equipment online with home delivery. Quality medical devices with affordable rental rates." />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Rent Medical Equipment</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quality medical equipment delivered to your doorstep with flexible rental periods
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Equipment Rental Details
                    </CardTitle>
                    <CardDescription>
                      Select your equipment and provide delivery information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="equipment">Equipment Type *</Label>
                          <Select value={formData.equipment} onValueChange={(value) => handleInputChange('equipment', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select equipment" />
                            </SelectTrigger>
                            <SelectContent>
                              {equipmentData.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.title} - ₹{item.price}{item.priceUnit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rentalPeriod">Rental Period *</Label>
                          <Select value={formData.rentalPeriod} onValueChange={(value) => handleInputChange('rentalPeriod', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              {rentalPeriods.map((period) => (
                                <SelectItem key={period.value} value={period.value}>
                                  {period.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date *</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity *</Label>
                          <Select value={formData.quantity} onValueChange={(value) => handleInputChange('quantity', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Customer Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerName">Full Name *</Label>
                            <Input
                              id="customerName"
                              value={formData.customerName}
                              onChange={(e) => handleInputChange('customerName', e.target.value)}
                              placeholder="Enter your full name"
                            />
                          </div>

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
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@example.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Delivery Address *</Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="Enter complete delivery address with landmark"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
                          <Textarea
                            id="deliveryInstructions"
                            value={formData.deliveryInstructions}
                            onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                            placeholder="Any special delivery instructions or preferred time"
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
                    <CardTitle>Rental Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.equipment ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Equipment:</span>
                          <span className="text-sm font-medium">
                            {equipmentData.find(e => e.id === formData.equipment)?.title}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Period:</span>
                          <span className="text-sm font-medium">
                            {rentalPeriods.find(p => p.value === formData.rentalPeriod)?.label}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <span className="text-sm font-medium">{formData.quantity}</span>
                        </div>

                        <hr className="my-4" />
                        
                        {(() => {
                          const pricing = calculatePrice();
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Rental Cost:</span>
                                <span className="text-sm font-medium">₹{pricing.rental}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Security Deposit:</span>
                                <span className="text-sm font-medium">₹{pricing.deposit}</span>
                              </div>
                              <div className="flex justify-between text-lg font-semibold">
                                <span>Total Amount:</span>
                                <span className="brand-primary">₹{pricing.total}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Select equipment to see pricing details
                      </p>
                    )}

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Rental Benefits:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Free home delivery & pickup</li>
                        <li>• Sanitized equipment</li>
                        <li>• 24/7 technical support</li>
                        <li>• Flexible rental periods</li>
                        <li>• Full deposit refund on return</li>
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

export default RentalPage;
