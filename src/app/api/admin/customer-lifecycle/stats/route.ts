import { NextRequest, NextResponse } from 'next/server';
import { CustomerLifecycleService } from '@/modules/customerLifecycle/customerLifecycleService';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const lifecycleService = new CustomerLifecycleService();

export async function GET(req: NextRequest) {
  // Check admin permissions
  const authError = requireCustomerLifecyclePermission(req, 'read');
  if (authError) return authError;

  try {
    const stats = await lifecycleService.getLifecycleStatistics();
    
    // Calculate additional metrics
    const atRiskCustomers = await lifecycleService.getAtRiskCustomers(50);
    const atRiskCount = atRiskCustomers.length;
    
    // Calculate average health score
    let totalHealthScore = 0;
    let customerCount = 0;
    
    // Get all customers to calculate health scores
    const allCustomers = await lifecycleService.getCustomersByStage('all', 1, 1000);
    for (const customer of allCustomers.customers) {
      const healthScore = await lifecycleService.getCustomerHealthScore(customer.id);
      totalHealthScore += healthScore;
      customerCount++;
    }
    
    const averageHealthScore = customerCount > 0 ? totalHealthScore / customerCount : 0;

    return NextResponse.json({
      total: stats.totalCustomers,
      active: stats.stageDistribution.active,
      inactive: stats.stageDistribution.inactive,
      churned: stats.stageDistribution.churned,
      onboarding: stats.stageDistribution.onboarding,
      reactivated: stats.stageDistribution.reactivated,
      averageHealthScore,
      atRiskCount,
    });
  } catch (error) {
    console.error('Error fetching lifecycle statistics:', error);
    
    // Return fallback data instead of error
    return NextResponse.json({
      total: 0,
      active: 0,
      inactive: 0,
      churned: 0,
      onboarding: 0,
      reactivated: 0,
      averageHealthScore: 0,
      atRiskCount: 0,
    });
  }
}
