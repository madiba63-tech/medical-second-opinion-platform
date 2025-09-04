'use client';

import { useState, useEffect } from 'react';

interface PaymentStepProps {
  tempId: string;
  expertiseLevel?: string;
  urgencyLevel?: 'standard' | 'urgent' | 'emergency';
  onNext: () => void;
  onPrev: () => void;
}

export default function PaymentStep({ tempId, expertiseLevel, urgencyLevel = 'standard', onNext, onPrev }: PaymentStepProps) {
  const [processing, setProcessing] = useState(false);
  const [pricingData, setPricingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load pricing data from payment service
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4007/api/v1/pricing?currency=USD&jurisdiction=US');
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setPricingData(data.data);
          }
        }
      } catch (error) {
        console.error('Error loading pricing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  // Calculate pricing based on selected expertise level
  const calculatePrice = (level: string | undefined) => {
    if (!level || !pricingData?.pricing) return 299; // fallback price
    
    // Map frontend levels to API levels
    const levelMap: Record<string, string> = {
      'junior': 'JUNIOR',
      'senior': 'SENIOR', 
      'expert': 'EXPERT',
      'distinguished': 'DISTINGUISHED'
    };
    
    const apiLevel = levelMap[level];
    const pricing = pricingData.pricing[apiLevel];
    
    if (!pricing) return 299; // fallback price
    
    let basePrice = pricing.basePrice;
    
    // Apply urgency multipliers
    if (urgencyLevel === 'urgent') {
      basePrice = basePrice * 1.5;
    } else if (urgencyLevel === 'emergency') {
      basePrice = basePrice * 2.0;
    }
    
    return Math.round(basePrice);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: pricingData?.currency || 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getLevelTitle = (level: string | undefined) => {
    const levelTitles: Record<string, string> = {
      'junior': 'Junior Professional',
      'senior': 'Senior Professional',
      'expert': 'Expert Professional',
      'distinguished': 'Distinguished Professional'
    };
    return levelTitles[level || ''] || 'Professional Review';
  };

  const basePrice = calculatePrice(expertiseLevel);
  const aiAnalysis = Math.round(basePrice * 0.3); // 30% of base price for AI analysis
  const processingFee = 25; // Fixed processing fee
  const totalPrice = basePrice + aiAnalysis + processingFee;

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onNext();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">
          Complete your payment to submit your case for review.
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Review Summary</h3>
        
        {expertiseLevel && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">Selected Expertise Level</p>
                <p className="text-blue-700">{getLevelTitle(expertiseLevel)}</p>
              </div>
              {urgencyLevel !== 'standard' && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  {urgencyLevel === 'urgent' ? 'Urgent (1.5x)' : 'Emergency (2x)'}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">{getLevelTitle(expertiseLevel)} Review</span>
            <span className="font-medium">{loading ? 'Loading...' : formatPrice(basePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">AI Analysis & Processing</span>
            <span className="font-medium">{loading ? 'Loading...' : formatPrice(aiAnalysis)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-medium">{formatPrice(processingFee)}</span>
          </div>
          {urgencyLevel !== 'standard' && (
            <div className="border-t pt-2">
              <div className="text-xs text-gray-500 mb-2">
                {urgencyLevel === 'urgent' 
                  ? 'Urgent processing: 1.5x multiplier applied'
                  : 'Emergency processing: 2x multiplier applied'
                }
              </div>
            </div>
          )}
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{loading ? 'Loading...' : formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
        
        {/* Mock payment form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-900">Demo Mode</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This is a demonstration. In production, this would integrate with Stripe or another payment processor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-900">Secure Payment</h4>
            <p className="text-sm text-green-700 mt-1">
              Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Account Creation
        </button>
        <button
          onClick={handlePayment}
          disabled={processing}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            !processing
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {processing ? 'Processing Payment...' : `Pay ${loading ? 'Loading...' : formatPrice(totalPrice)}`}
        </button>
      </div>
    </div>
  );
}
