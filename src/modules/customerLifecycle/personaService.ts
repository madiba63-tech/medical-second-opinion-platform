import { CustomerRepository } from '../repository/customerRepository';
import { CaseRepository } from '../repository/caseRepository';

export interface CustomerPersona {
  type: 'informed_advocator' | 'cautious_researcher' | 'tech_savvy_optimizer';
  confidence: number;
  characteristics: string[];
  preferredExperience: PersonaExperience;
}

export interface PersonaExperience {
  communicationStyle: 'detailed' | 'simplified' | 'technical';
  supportLevel: 'self_service' | 'guided' | 'high_touch';
  informationDepth: 'basic' | 'comprehensive' | 'expert_level';
  decisionSpeed: 'quick' | 'deliberate' | 'research_heavy';
  trustFactors: string[];
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria;
  customerCount: number;
  averageLifetimeValue: number;
  conversionRate: number;
}

export interface SegmentCriteria {
  ageRange?: { min: number; max: number };
  genderPreference?: string;
  incomeLevel?: 'low' | 'medium' | 'high';
  educationLevel?: 'high_school' | 'college' | 'graduate';
  healthConditionType?: string[];
  digitalLiteracy?: 'low' | 'medium' | 'high';
  engagementLevel?: 'low' | 'medium' | 'high';
  pricesensitivity?: 'low' | 'medium' | 'high';
}

export class PersonaService {
  private customerRepository: CustomerRepository;
  private caseRepository: CaseRepository;
  private personaDefinitions: Map<string, PersonaExperience>;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.caseRepository = new CaseRepository();
    this.personaDefinitions = new Map();
    this.initializePersonaDefinitions();
  }

  private initializePersonaDefinitions() {
    // Informed Advocator - Sarah, 45, Marketing Manager
    this.personaDefinitions.set('informed_advocator', {
      communicationStyle: 'detailed',
      supportLevel: 'guided',
      informationDepth: 'comprehensive',
      decisionSpeed: 'deliberate',
      trustFactors: [
        'Professional credentials',
        'Patient testimonials',
        'Transparent processes',
        'Multi-channel communication',
        'Educational resources'
      ]
    });

    // Cautious Researcher - Robert, 58, Small Business Owner
    this.personaDefinitions.set('cautious_researcher', {
      communicationStyle: 'simplified',
      supportLevel: 'high_touch',
      informationDepth: 'basic',
      decisionSpeed: 'research_heavy',
      trustFactors: [
        'Human support availability',
        'Clear cost breakdown',
        'Step-by-step guidance',
        'Personal testimonials',
        'Phone support options'
      ]
    });

    // Tech-Savvy Optimizer - Michael, 38, Software Engineer
    this.personaDefinitions.set('tech_savvy_optimizer', {
      communicationStyle: 'technical',
      supportLevel: 'self_service',
      informationDepth: 'expert_level',
      decisionSpeed: 'quick',
      trustFactors: [
        'AI transparency',
        'Real-time updates',
        'Advanced analytics',
        'Integration capabilities',
        'Performance metrics'
      ]
    });
  }

  /**
   * Analyze customer behavior and assign persona
   */
  async analyzeCustomerPersona(customerId: string): Promise<CustomerPersona> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const cases = await this.caseRepository.findAll({ customerId });
    const customerAge = this.calculateAge(customer.dateOfBirth);
    
    // Scoring system for persona detection
    const scores = {
      informed_advocator: 0,
      cautious_researcher: 0,
      tech_savvy_optimizer: 0
    };

    // Age-based scoring
    if (customerAge >= 35 && customerAge <= 50) {
      scores.informed_advocator += 30;
    } else if (customerAge >= 50) {
      scores.cautious_researcher += 30;
    } else if (customerAge >= 25 && customerAge <= 45) {
      scores.tech_savvy_optimizer += 25;
    }

    // Email domain analysis (tech-savvy indicators)
    const emailDomain = customer.email.split('@')[1];
    const techDomains = ['gmail.com', 'outlook.com', 'protonmail.com'];
    const corporateDomains = ['company.com', 'corp.com']; // Would expand this list
    
    if (techDomains.includes(emailDomain)) {
      scores.tech_savvy_optimizer += 15;
    }

    // Communication preference analysis
    if (customer.smsNotifications && customer.emailNotifications) {
      scores.informed_advocator += 20;
    } else if (customer.emailNotifications && !customer.smsNotifications) {
      scores.cautious_researcher += 15;
    }

    // Case complexity and frequency analysis
    if (cases.total > 2) {
      scores.informed_advocator += 25;
    } else if (cases.total === 1) {
      scores.cautious_researcher += 20;
    }

    // Engagement timing analysis (would need more data in real implementation)
    // For now, using phone number presence as proxy for accessibility preference
    if (customer.phone) {
      scores.cautious_researcher += 15;
    } else {
      scores.tech_savvy_optimizer += 10;
    }

    // Determine dominant persona
    const maxScore = Math.max(...Object.values(scores));
    const dominantPersona = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as keyof typeof scores;
    
    const confidence = maxScore / 100; // Convert to percentage
    
    const characteristics = this.getPersonaCharacteristics(dominantPersona, customer, cases);

    return {
      type: dominantPersona,
      confidence: Math.min(confidence, 1.0),
      characteristics,
      preferredExperience: this.personaDefinitions.get(dominantPersona)!
    };
  }

  /**
   * Get persona-specific characteristics
   */
  private getPersonaCharacteristics(
    persona: string,
    customer: any,
    cases: any
  ): string[] {
    const baseCharacteristics: Record<string, string[]> = {
      informed_advocator: [
        'Research-oriented healthcare decisions',
        'Values expert validation',
        'Active in health management',
        'Seeks comprehensive information',
        'Willing to invest in quality care'
      ],
      cautious_researcher: [
        'Prefers human interaction',
        'Needs reassurance and guidance',
        'Values clear, simple communication',
        'Price-conscious but quality-focused',
        'Relies on testimonials and reviews'
      ],
      tech_savvy_optimizer: [
        'Expects modern digital experiences',
        'Values efficiency and automation',
        'Interested in cutting-edge solutions',
        'Prefers self-service options',
        'Data-driven decision making'
      ]
    };

    const characteristics = [...baseCharacteristics[persona]];
    
    // Add customer-specific characteristics
    if (cases.total > 1) {
      characteristics.push('Repeat platform user');
    }
    
    if (customer.phone && customer.smsNotifications) {
      characteristics.push('Multi-channel communication preference');
    }

    return characteristics;
  }

  /**
   * Create customer segments based on personas and behavior
   */
  async createCustomerSegments(): Promise<CustomerSegment[]> {
    const allCustomers = await this.customerRepository.findAll({}, 1, 1000);
    const segments: CustomerSegment[] = [];

    // High-Value Advocates
    segments.push({
      id: 'high_value_advocates',
      name: 'High-Value Advocates',
      description: 'Informed customers with multiple cases and high engagement',
      criteria: {
        engagementLevel: 'high',
        priceSensitivity: 'low',
        digitalLiteracy: 'high'
      },
      customerCount: 0,
      averageLifetimeValue: 0,
      conversionRate: 0
    });

    // Price-Sensitive Researchers
    segments.push({
      id: 'price_sensitive_researchers',
      name: 'Price-Sensitive Researchers',
      description: 'Cautious customers who need guidance and value-focused messaging',
      criteria: {
        ageRange: { min: 45, max: 70 },
        priceSensitivity: 'high',
        supportLevel: 'high_touch',
        digitalLiteracy: 'medium'
      },
      customerCount: 0,
      averageLifetimeValue: 0,
      conversionRate: 0
    });

    // Tech-Forward Early Adopters
    segments.push({
      id: 'tech_forward_adopters',
      name: 'Tech-Forward Early Adopters',
      description: 'Tech-savvy customers interested in AI and cutting-edge features',
      criteria: {
        ageRange: { min: 25, max: 45 },
        digitalLiteracy: 'high',
        decisionSpeed: 'quick',
        engagementLevel: 'high'
      },
      customerCount: 0,
      averageLifetimeValue: 0,
      conversionRate: 0
    });

    // Calculate segment metrics (simplified for demo)
    for (const segment of segments) {
      segment.customerCount = Math.floor(allCustomers.total * 0.3); // Mock data
      segment.averageLifetimeValue = Math.floor(Math.random() * 2000) + 500;
      segment.conversionRate = Math.floor(Math.random() * 30) + 10;
    }

    return segments;
  }

  /**
   * Get personalized experience recommendations
   */
  getPersonalizedExperienceRecommendations(persona: CustomerPersona): {
    uiPreferences: any;
    contentStrategy: any;
    communicationPlan: any;
    supportStrategy: any;
  } {
    const experience = persona.preferredExperience;

    return {
      uiPreferences: {
        complexity: experience.informationDepth === 'basic' ? 'simplified' : 'detailed',
        navigationStyle: experience.supportLevel === 'self_service' ? 'minimal' : 'guided',
        visualDesign: experience.communicationStyle === 'technical' ? 'data_heavy' : 'clean'
      },
      contentStrategy: {
        detailLevel: experience.informationDepth,
        language: experience.communicationStyle === 'simplified' ? 'plain' : 'technical',
        focusAreas: experience.trustFactors
      },
      communicationPlan: {
        frequency: experience.decisionSpeed === 'quick' ? 'minimal' : 'regular',
        channels: experience.supportLevel === 'high_touch' ? ['email', 'phone'] : ['email'],
        tone: experience.communicationStyle === 'simplified' ? 'friendly' : 'professional'
      },
      supportStrategy: {
        level: experience.supportLevel,
        proactivity: experience.supportLevel === 'high_touch' ? 'high' : 'low',
        preferredContact: experience.supportLevel === 'high_touch' ? 'phone' : 'chat'
      }
    };
  }

  /**
   * Calculate customer age from date of birth
   */
  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get customers by segment
   */
  async getCustomersBySegment(segmentId: string): Promise<any[]> {
    // This would implement actual segmentation logic
    // For now, returning mock data
    const allCustomers = await this.customerRepository.findAll({}, 1, 100);
    return allCustomers.customers.slice(0, 10); // Mock segmentation
  }

  /**
   * Update persona definitions
   */
  updatePersonaDefinition(persona: string, experience: PersonaExperience): void {
    this.personaDefinitions.set(persona, experience);
  }

  /**
   * Update customer segment information
   */
  async updateCustomerSegment(customerId: string, segmentData: {
    hasSubmittedCase?: boolean;
    isFirstTimeUser?: boolean;
    primaryCondition?: string;
    lastActivity?: Date;
    engagementLevel?: 'new' | 'active' | 'inactive';
  }): Promise<void> {
    try {
      // In a real implementation, this would update segment-related customer data
      console.log(`Updating customer segment for ${customerId}:`, segmentData);
      
      // Update customer record with segmentation data
      await this.customerRepository.update(customerId, {
        // Would map segmentData to customer fields
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Failed to update customer segment:', error);
      throw error;
    }
  }

  /**
   * Get customer persona with caching and last analyzed timestamp
   */
  async getCustomerPersonaWithMetadata(customerId: string): Promise<CustomerPersona & { lastAnalyzed: Date; primaryCondition?: string }> {
    const persona = await this.analyzeCustomerPersona(customerId);
    
    // In production, this would come from stored persona data
    return {
      ...persona,
      lastAnalyzed: new Date(),
      primaryCondition: undefined // Would be stored from previous analysis
    };
  }
}