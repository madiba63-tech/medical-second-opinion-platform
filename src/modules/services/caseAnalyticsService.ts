import { prisma } from '@/lib/prisma';
import { CaseRepository } from '../repository/caseRepository';
import { CustomerRepository } from '../repository/customerRepository';

export interface CaseAnalyticsData {
  submissionTrends: {
    daily: Array<{ date: string; count: number }>;
    weekly: Array<{ week: string; count: number }>;
    monthly: Array<{ month: string; count: number }>;
  };
  customerInsights: {
    newCustomers: number;
    returningCustomers: number;
    churnRate: number;
    averageTimeBetweenCases: number;
  };
  medicalInsights: {
    topDiseaseTypes: Array<{ type: string; count: number; percentage: number }>;
    firstOccurrenceRate: number;
    averageAge: number;
    genderDistribution: Record<string, number>;
  };
  performanceMetrics: {
    averageProcessingTime: number;
    caseCompletionRate: number;
    customerSatisfactionScore: number;
    professionalUtilization: number;
  };
  revenueMetrics: {
    totalRevenue: number;
    averageRevenuePerCase: number;
    averageRevenuePerCustomer: number;
    monthlyRecurringRevenue: number;
  };
}

export interface CasePerformanceReport {
  caseId: string;
  caseNumber: string;
  submissionDate: Date;
  completionDate?: Date;
  processingTime?: number;
  stageBreakdown: {
    submission: { duration: number; percentage: number };
    aiProcessing: { duration: number; percentage: number };
    professionalReview: { duration: number; percentage: number };
    peerReview: { duration: number; percentage: number };
    completion: { duration: number; percentage: number };
  };
  customerSatisfaction?: number;
  qualityScore?: number;
  professionalFeedback?: string;
}

export class CaseAnalyticsService {
  private caseRepository: CaseRepository;
  private customerRepository: CustomerRepository;

  constructor() {
    this.caseRepository = new CaseRepository();
    this.customerRepository = new CustomerRepository();
  }

  /**
   * Get comprehensive case analytics dashboard data
   */
  async getCaseAnalyticsDashboard(dateFrom?: Date, dateTo?: Date): Promise<CaseAnalyticsData> {
    const whereClause = this.buildDateFilter(dateFrom, dateTo);

    try {
      const [
        submissionTrends,
        customerInsights,
        medicalInsights,
        performanceMetrics,
        revenueMetrics
      ] = await Promise.all([
        this.getSubmissionTrends(whereClause),
        this.getCustomerInsights(whereClause),
        this.getMedicalInsights(whereClause),
        this.getPerformanceMetrics(whereClause),
        this.getRevenueMetrics(whereClause)
      ]);

      return {
        submissionTrends,
        customerInsights,
        medicalInsights,
        performanceMetrics,
        revenueMetrics
      };
    } catch (error) {
      console.error('Failed to get case analytics dashboard:', error);
      throw error;
    }
  }

  /**
   * Get submission trends (daily, weekly, monthly)
   */
  private async getSubmissionTrends(whereClause: any): Promise<CaseAnalyticsData['submissionTrends']> {
    const cases = await prisma.case.findMany({
      where: whereClause,
      select: {
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const daily = this.aggregateByPeriod(cases, 'day');
    const weekly = this.aggregateByPeriod(cases, 'week');
    const monthly = this.aggregateByPeriod(cases, 'month');

    return { daily, weekly, monthly };
  }

  /**
   * Get customer insights
   */
  private async getCustomerInsights(whereClause: any): Promise<CaseAnalyticsData['customerInsights']> {
    const cases = await prisma.case.findMany({
      where: whereClause,
      include: {
        customer: {
          select: {
            id: true,
            createdAt: true,
            cases: {
              select: {
                id: true,
                createdAt: true
              }
            }
          }
        }
      }
    });

    const uniqueCustomers = new Set(cases.map(c => c.customerId));
    const newCustomers = new Set();
    const returningCustomers = new Set();

    for (const case_ of cases) {
      const customerCaseCount = case_.customer.cases.length;
      if (customerCaseCount === 1) {
        newCustomers.add(case_.customerId);
      } else {
        returningCustomers.add(case_.customerId);
      }
    }

    // Calculate average time between cases for returning customers
    let totalTimeBetweenCases = 0;
    let casePairsCount = 0;

    for (const case_ of cases) {
      const customerCases = case_.customer.cases.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      
      for (let i = 1; i < customerCases.length; i++) {
        const timeDiff = new Date(customerCases[i].createdAt).getTime() - 
                        new Date(customerCases[i - 1].createdAt).getTime();
        totalTimeBetweenCases += timeDiff / (1000 * 60 * 60 * 24); // Convert to days
        casePairsCount++;
      }
    }

    return {
      newCustomers: newCustomers.size,
      returningCustomers: returningCustomers.size,
      churnRate: 0, // Would require more complex calculation with business rules
      averageTimeBetweenCases: casePairsCount > 0 ? totalTimeBetweenCases / casePairsCount : 0
    };
  }

  /**
   * Get medical insights from case data
   */
  private async getMedicalInsights(whereClause: any): Promise<CaseAnalyticsData['medicalInsights']> {
    const cases = await prisma.case.findMany({
      where: whereClause,
      select: {
        diseaseType: true,
        isFirstOccurrence: true,
        dateOfBirth: true,
        gender: true
      }
    });

    // Disease type distribution
    const diseaseTypeCounts = new Map<string, number>();
    let firstOccurrenceCount = 0;
    let totalAgeSum = 0;
    const genderDistribution: Record<string, number> = {};

    for (const case_ of cases) {
      // Disease types
      const diseaseType = case_.diseaseType || 'Unknown';
      diseaseTypeCounts.set(diseaseType, (diseaseTypeCounts.get(diseaseType) || 0) + 1);

      // First occurrence
      if (case_.isFirstOccurrence) {
        firstOccurrenceCount++;
      }

      // Age calculation
      const age = this.calculateAge(case_.dateOfBirth);
      totalAgeSum += age;

      // Gender distribution
      const gender = case_.gender || 'Not specified';
      genderDistribution[gender] = (genderDistribution[gender] || 0) + 1;
    }

    const totalCases = cases.length;
    const topDiseaseTypes = Array.from(diseaseTypeCounts.entries())
      .map(([type, count]) => ({
        type,
        count,
        percentage: (count / totalCases) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      topDiseaseTypes,
      firstOccurrenceRate: (firstOccurrenceCount / totalCases) * 100,
      averageAge: totalAgeSum / totalCases,
      genderDistribution
    };
  }

  /**
   * Get performance metrics
   */
  private async getPerformanceMetrics(whereClause: any): Promise<CaseAnalyticsData['performanceMetrics']> {
    const cases = await prisma.case.findMany({
      where: whereClause,
      include: {
        caseAssignments: {
          select: {
            assignedAt: true,
            completedAt: true
          }
        }
      }
    });

    let totalProcessingTime = 0;
    let completedCases = 0;

    for (const case_ of cases) {
      if (case_.caseAssignments.length > 0) {
        const assignment = case_.caseAssignments[0];
        if (assignment.completedAt) {
          const processingTime = new Date(assignment.completedAt).getTime() - 
                               new Date(assignment.assignedAt).getTime();
          totalProcessingTime += processingTime / (1000 * 60 * 60); // Convert to hours
          completedCases++;
        }
      }
    }

    return {
      averageProcessingTime: completedCases > 0 ? totalProcessingTime / completedCases : 0,
      caseCompletionRate: (completedCases / cases.length) * 100,
      customerSatisfactionScore: 85, // Mock data - would come from satisfaction surveys
      professionalUtilization: 78 // Mock data - would calculate from professional workload
    };
  }

  /**
   * Get revenue metrics
   */
  private async getRevenueMetrics(whereClause: any): Promise<CaseAnalyticsData['revenueMetrics']> {
    const cases = await prisma.case.findMany({
      where: whereClause,
      include: {
        customer: {
          select: {
            id: true,
            cases: {
              select: {
                id: true
              }
            }
          }
        }
      }
    });

    // Mock pricing - in production this would come from payment records
    const pricePerCase = 299;
    const totalRevenue = cases.length * pricePerCase;
    const uniqueCustomers = new Set(cases.map(c => c.customerId)).size;

    return {
      totalRevenue,
      averageRevenuePerCase: pricePerCase,
      averageRevenuePerCustomer: uniqueCustomers > 0 ? totalRevenue / uniqueCustomers : 0,
      monthlyRecurringRevenue: totalRevenue * 0.15 // Estimated based on repeat rate
    };
  }

  /**
   * Get detailed case performance report
   */
  async getCasePerformanceReport(caseId: string): Promise<CasePerformanceReport | null> {
    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
      include: {
        caseAssignments: true,
        aiAnalyses: true,
        medicalOpinions: true
      }
    });

    if (!caseData) return null;

    // Mock stage breakdown - in production this would come from actual stage tracking
    const stageBreakdown = {
      submission: { duration: 0, percentage: 0 },
      aiProcessing: { duration: 2, percentage: 10 },
      professionalReview: { duration: 24, percentage: 60 },
      peerReview: { duration: 8, percentage: 20 },
      completion: { duration: 4, percentage: 10 }
    };

    const totalDuration = Object.values(stageBreakdown).reduce((sum, stage) => sum + stage.duration, 0);
    
    // Calculate percentages
    for (const stage of Object.values(stageBreakdown)) {
      stage.percentage = (stage.duration / totalDuration) * 100;
    }

    return {
      caseId: caseData.id,
      caseNumber: caseData.caseNumber,
      submissionDate: caseData.createdAt,
      completionDate: caseData.caseAssignments[0]?.completedAt || undefined,
      processingTime: totalDuration,
      stageBreakdown,
      customerSatisfaction: 4.2, // Mock data
      qualityScore: 87, // Mock data
      professionalFeedback: "Comprehensive analysis with clear recommendations" // Mock data
    };
  }

  /**
   * Get customer journey analytics
   */
  async getCustomerJourneyAnalytics(customerId: string): Promise<{
    totalCases: number;
    averageTimeBetweenCases: number;
    preferredDiseaseTypes: string[];
    engagementTrend: 'increasing' | 'stable' | 'decreasing';
    lifetimeValue: number;
    satisfactionTrend: number[];
    nextRecommendedAction: string;
  }> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new Error('Customer not found');

    const cases = await this.caseRepository.findAll({ customerId }, 1, 100);
    
    // Calculate metrics
    const diseaseTypes = new Map<string, number>();
    const caseDates = cases.cases.map(c => new Date(c.createdAt)).sort((a, b) => a.getTime() - b.getTime());
    
    for (const case_ of cases.cases) {
      if (case_.diseaseType) {
        diseaseTypes.set(case_.diseaseType, (diseaseTypes.get(case_.diseaseType) || 0) + 1);
      }
    }

    let averageTimeBetweenCases = 0;
    if (caseDates.length > 1) {
      const intervals = [];
      for (let i = 1; i < caseDates.length; i++) {
        intervals.push((caseDates[i].getTime() - caseDates[i - 1].getTime()) / (1000 * 60 * 60 * 24));
      }
      averageTimeBetweenCases = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    }

    const preferredDiseaseTypes = Array.from(diseaseTypes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type);

    return {
      totalCases: cases.total,
      averageTimeBetweenCases,
      preferredDiseaseTypes,
      engagementTrend: this.calculateEngagementTrend(caseDates),
      lifetimeValue: cases.total * 299, // Mock calculation
      satisfactionTrend: [4.1, 4.3, 4.2, 4.4], // Mock data
      nextRecommendedAction: this.getNextRecommendedAction(cases.total, averageTimeBetweenCases)
    };
  }

  /**
   * Private helper methods
   */
  private buildDateFilter(dateFrom?: Date, dateTo?: Date): any {
    const where: any = {};
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = dateFrom;
      if (dateTo) where.createdAt.lte = dateTo;
    }
    return where;
  }

  private aggregateByPeriod(cases: Array<{ createdAt: Date }>, period: 'day' | 'week' | 'month'): Array<{ date: string; count: number }> | Array<{ week: string; count: number }> | Array<{ month: string; count: number }> {
    const aggregation = new Map<string, number>();

    for (const case_ of cases) {
      let key: string;
      const date = new Date(case_.createdAt);

      switch (period) {
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'week':
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - date.getDay());
          key = startOfWeek.toISOString().split('T')[0];
          break;
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      aggregation.set(key, (aggregation.get(key) || 0) + 1);
    }

    return Array.from(aggregation.entries())
      .map(([key, count]) => {
        switch (period) {
          case 'day':
            return { date: key, count };
          case 'week':
            return { week: key, count };
          case 'month':
            return { month: key, count };
          default:
            return { date: key, count };
        }
      })
      .sort((a, b) => {
        const aKey = (a as any).date || (a as any).week || (a as any).month;
        const bKey = (b as any).date || (b as any).week || (b as any).month;
        return aKey.localeCompare(bKey);
      }) as any;
  }

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

  private calculateEngagementTrend(caseDates: Date[]): 'increasing' | 'stable' | 'decreasing' {
    if (caseDates.length < 3) return 'stable';

    const recentInterval = caseDates[caseDates.length - 1].getTime() - caseDates[caseDates.length - 2].getTime();
    const previousInterval = caseDates[caseDates.length - 2].getTime() - caseDates[caseDates.length - 3].getTime();

    if (recentInterval < previousInterval * 0.8) {
      return 'increasing'; // Cases are coming more frequently
    } else if (recentInterval > previousInterval * 1.2) {
      return 'decreasing'; // Cases are coming less frequently
    } else {
      return 'stable';
    }
  }

  private getNextRecommendedAction(totalCases: number, averageTimeBetweenCases: number): string {
    if (totalCases === 1) {
      return 'Send follow-up satisfaction survey and educational content';
    } else if (averageTimeBetweenCases > 90) {
      return 'Initiate re-engagement campaign with health check-up reminders';
    } else if (totalCases >= 3) {
      return 'Offer loyalty program benefits and premium services';
    } else {
      return 'Continue monitoring for case submission patterns';
    }
  }
}