'use client';

import { useState, useEffect } from 'react';

interface ExpertiseLevel {
  level: string;
  title: string;
  description: string;
  experience: string;
  pricing: {
    basePrice: number;
    urgentSurcharge: number;
  };
  features: string[];
  estimatedDelivery: string;
  icon: string;
}

interface ExpertiseLevelStepProps {
  selectedLevel?: string;
  urgencyLevel?: 'standard' | 'urgent' | 'emergency';
  onUpdate: (level: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

// Base expertise level configurations (pricing will be loaded from API)
const BASE_EXPERTISE_LEVELS = [
  {
    level: 'junior',
    apiLevel: 'JUNIOR',
    title: 'Junior Professional',
    description: 'Early career medical professionals with specialized training',
    experience: '2-5 years of practice',
    features: [
      'Board-certified specialist',
      'Current medical literature review',
      'Detailed written opinion',
      'Follow-up clarifications'
    ],
    estimatedDelivery: '5-7 business days',
    icon: '🩺'
  },
  {
    level: 'senior',
    apiLevel: 'SENIOR',
    title: 'Senior Professional',
    description: 'Experienced specialists with extensive clinical practice',
    experience: '8-15 years of practice',
    features: [
      'Fellowship-trained specialist',
      'Extensive clinical experience',
      'Comprehensive case analysis',
      'Treatment recommendation options',
      'Follow-up consultations available'
    ],
    estimatedDelivery: '3-5 business days',
    icon: '👨‍⚕️'
  },
  {
    level: 'expert',
    apiLevel: 'EXPERT',
    title: 'Expert Professional',
    description: 'Leading specialists with academic and research credentials',
    experience: '15+ years of practice',
    features: [
      'Academic medical center affiliation',
      'Published research in specialty area',
      'Complex case expertise',
      'Innovative treatment insights',
      'Direct communication option',
      'Multidisciplinary team consultation'
    ],
    estimatedDelivery: '2-3 business days',
    icon: '🎖️'
  },
  {
    level: 'distinguished',
    apiLevel: 'DISTINGUISHED',
    title: 'Distinguished Professional',
    description: 'Internationally recognized experts and thought leaders',
    experience: '20+ years, international recognition',
    features: [
      'International recognition',
      'Department head or chief status',
      'Pioneering treatment approaches',
      'Rare condition expertise',
      'Priority review process',
      'Video consultation included',
      'Second expert review included'
    ],
    estimatedDelivery: '1-2 business days',
    icon: '🏆'
  }
];

export default function ExpertiseLevelStep({
  selectedLevel,
  urgencyLevel = 'standard',
  onUpdate,
  onNext,
  onPrev
}: ExpertiseLevelStepProps) {
  const [currentSelection, setCurrentSelection] = useState(selectedLevel || '');
  const [pricingData, setPricingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load pricing data from payment service
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4007/api/v1/pricing?currency=USD&jurisdiction=US');
        
        if (!response.ok) {
          throw new Error('Failed to load pricing data');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setPricingData(data.data);
        } else {
          throw new Error(data.error || 'Failed to load pricing');
        }
      } catch (error) {
        console.error('Error loading pricing:', error);
        setError('Failed to load pricing information');
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const handleLevelSelect = (level: string) => {
    setCurrentSelection(level);
    onUpdate(level);
  };

  const calculatePrice = (level: string) => {
    if (!pricingData?.pricing) return 0;
    
    // Map frontend levels to API levels
    const levelMap: Record<string, string> = {
      'junior': 'JUNIOR',
      'senior': 'SENIOR', 
      'expert': 'EXPERT',
      'distinguished': 'DISTINGUISHED'
    };
    
    const apiLevel = levelMap[level];
    const pricing = pricingData.pricing[apiLevel];
    
    if (!pricing) return 0;
    
    let basePrice = pricing.basePrice;
    
    // Apply urgency multipliers (same as payment service)
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
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Loading Expertise Levels...
          </h2>
          <div className="animate-pulse">
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Select Professional Expertise Level
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Showing fallback pricing. Please refresh to try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Select Professional Expertise Level
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Choose the level of medical expertise for your second opinion
        </p>
        {urgencyLevel !== 'standard' && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {urgencyLevel === 'urgent' ? 'Urgent' : 'Emergency'} processing requested - expedited delivery
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {BASE_EXPERTISE_LEVELS.map((expertise) => {
          const isSelected = currentSelection === expertise.level;
          const totalPrice = calculatePrice(expertise.level);
          
          return (
            <div
              key={expertise.level}
              className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleLevelSelect(expertise.level)}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{expertise.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{expertise.title}</h3>
                    <p className="text-sm text-gray-600">{expertise.experience}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(totalPrice)}
                    </div>
                    {urgencyLevel !== 'standard' && (
                      <div className="text-xs text-gray-500">
                        Base: {formatPrice(calculatePrice(expertise.level) / (urgencyLevel === 'urgent' ? 1.5 : urgencyLevel === 'emergency' ? 2.0 : 1.0))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{expertise.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">What's Included:</h4>
                  <ul className="space-y-1">
                    {expertise.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivery time */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{expertise.estimatedDelivery}</span>
                  </div>
                  {urgencyLevel !== 'standard' && (
                    <span className="text-orange-600 font-medium">
                      Expedited delivery
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing explanation */}
      {urgencyLevel !== 'standard' && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-1">
                {urgencyLevel === 'urgent' ? 'Urgent' : 'Emergency'} Processing
              </h4>
              <p className="text-sm text-amber-700">
                {urgencyLevel === 'urgent' 
                  ? 'Urgent cases are prioritized with faster professional assignment and review.'
                  : 'Emergency cases receive immediate attention with same-day professional assignment when possible.'
                } Additional surcharge applies to compensate professionals for expedited service.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!currentSelection}
          className={`inline-flex items-center px-6 py-2 text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            currentSelection
              ? 'text-white bg-blue-600 hover:bg-blue-700'
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
          }`}
        >
          Continue
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Help section */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Need help choosing?</h4>
        <p className="text-sm text-gray-700 mb-2">
          Consider the complexity of your case and your desired level of expertise:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Junior:</strong> Common conditions, standard diagnoses</li>
          <li>• <strong>Senior:</strong> Complex cases, treatment planning</li>
          <li>• <strong>Expert:</strong> Rare conditions, research-backed insights</li>
          <li>• <strong>Distinguished:</strong> Exceptionally complex or rare cases</li>
        </ul>
      </div>
    </div>
  );
}