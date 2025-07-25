import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle, ArrowLeft, Calendar, Package, User, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sendLeadEmail } from '@/lib/leadEmail';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    const savedBooking = localStorage.getItem('currentBooking');
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    } else {
      toast({
        title: "No booking found",
        description: "Please complete your booking first.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = (method) => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Save to booking history
      const existingBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');

      const offlineMethods = ['delivery', 'first_day'];
      const completedBooking = {
        ...bookingData,
        status: 'confirmed',
        paymentStatus: offlineMethods.includes(method) ? 'pending' : 'paid',
        paymentDate: new Date().toISOString(),
        paymentMethod: method
      };
      
      existingBookings.push(completedBooking);
      localStorage.setItem('bookingHistory', JSON.stringify(existingBookings));
      localStorage.removeItem('currentBooking');

      // Send booking details to Jaydev for fulfillment
      sendLeadEmail(completedBooking);

      setIsProcessing(false);
      
      toast({
        title: "Payment Successful!",
        description: `Your ${bookingData.type} has been confirmed. You will receive a confirmation call shortly.`
      });

      // Redirect to home page after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 3000);
  };

  const handlePayClick = () => {
    setShowPaymentOptions(true);
  };

  const handleRazorpayIntegration = () => {
    toast({
      title: "🚧 Razorpay Integration Required",
      description: "To enable live payments, please provide your Razorpay API keys in your next prompt! 🚀"
    });
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your booking details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Payment - Neha Home Healthcare</title>
        <meta name="description" content="Secure payment for healthcare services and equipment rental. Pay safely with Razorpay." />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Secure Payment</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete your payment securely with Razorpay
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {bookingData.type === 'service' ? (
                        <Calendar className="w-5 h-5" />
                      ) : (
                        <Package className="w-5 h-5" />
                      )}
                      {bookingData.type === 'service' ? 'Service Booking' : 'Equipment Rental'} Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bookingData.type === 'service' ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">{bookingData.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{bookingData.duration} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{bookingData.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{bookingData.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Patient:</span>
                          <span className="font-medium">{bookingData.patientName}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Equipment:</span>
                          <span className="font-medium">{bookingData.equipment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Period:</span>
                          <span className="font-medium">{bookingData.rentalPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{bookingData.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span className="font-medium">{bookingData.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-medium">{bookingData.customerName}</span>
                        </div>
                        {bookingData.rentalCost && (
                          <>
                            <hr />
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rental Cost:</span>
                              <span className="font-medium">₹{bookingData.rentalCost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Security Deposit:</span>
                              <span className="font-medium">₹{bookingData.depositCost}</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{bookingData.phone}</span>
                    </div>
                    {bookingData.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Email:</span>
                        <span>{bookingData.email}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <span className="text-sm">{bookingData.address}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-green-600">₹{bookingData.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Includes all taxes and fees
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="w-5 h-5" />
                        <span className="text-sm">Secured by Razorpay</span>
                      </div>

                      <Button
                        onClick={handlePayClick}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing Payment...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Pay ₹{bookingData.price}
                          </div>
                        )}
                      </Button>

                      {showPaymentOptions && (
                        <div className="space-y-2">
                          <Button onClick={() => handlePayment('card')} className="w-full">
                            Pay with Card
                          </Button>
                          <Button onClick={() => handlePayment('upi')} className="w-full">
                            Pay with UPI
                          </Button>
                          {bookingData.type === 'service' ? (
                            <Button onClick={() => handlePayment('first_day')} className="w-full">
                              Pay on First Day
                            </Button>
                          ) : (
                            <Button onClick={() => handlePayment('delivery')} className="w-full">
                              Pay on Delivery
                            </Button>
                          )}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        onClick={handleRazorpayIntegration}
                        className="w-full"
                      >
                        Setup Live Razorpay Integration
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="w-full"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>PCI DSS compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Secure payment gateway</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>No card details stored</span>
                      </div>
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

export default PaymentPage;
