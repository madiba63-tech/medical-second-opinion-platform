"use client";

import { useState } from "react";

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function PaymentSection({ formData, updateFormData, nextStep, prevStep }: Props) {
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock payment ID
      const paymentId = `txn_${Date.now()}${Math.floor(Math.random() * 1000)}`;
      
      updateFormData({ paymentId });
      nextStep();
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Payment</h2>
      <p className="text-gray-600 mb-6">
        Complete your payment to submit your second opinion request to our medical experts.
      </p>

      {/* Service Summary */}
      <div className="border rounded-lg p-6 bg-gray-50 mb-6">
        <h3 className="text-lg font-medium mb-4">Service Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Medical Second Opinion Consultation</span>
            <span className="font-medium">$299.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Expert physician review</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Written report with recommendations</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>3-5 business day turnaround</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>$299.00</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center">
              <span className="font-medium">Credit/Debit Card</span>
              <div className="ml-3 flex space-x-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">VISA</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">MC</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AMEX</span>
              </div>
            </div>
          </label>
          
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span className="font-medium">PayPal</span>
          </label>
        </div>
      </div>

      {/* Mock Payment Form */}
      {paymentMethod === "card" && (
        <div className="border rounded-lg p-6 mb-6">
          <h4 className="font-medium mb-4">Card Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={processing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={processing}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={processing}
              />
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="border-l-4 border-green-500 bg-green-50 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              <strong>Secure Payment:</strong> Your payment information is encrypted and processed securely. 
              We do not store your credit card details.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={processing}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 disabled:opacity-50 font-medium"
        >
          {processing ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </div>
          ) : (
            `Pay $299.00`
          )}
        </button>
      </div>
    </div>
  );
}

