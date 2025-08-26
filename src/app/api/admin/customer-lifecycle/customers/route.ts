import { NextRequest, NextResponse } from 'next/server';
import { CustomerLifecycleService } from '@/modules/customerLifecycle/customerLifecycleService';
import { CustomerRepository } from '@/modules/repository/customerRepository';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const lifecycleService = new CustomerLifecycleService();
const customerRepository = new CustomerRepository();

export async function GET(req: NextRequest) {
  // Check admin permissions
  const authError = requireCustomerLifecyclePermission(req, 'read');
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    let customers;
    
    if (stage === 'all') {
      // Get all customers and calculate their lifecycle data
      const allCustomers = await customerRepository.findAll({ search }, page, limit);
      customers = allCustomers.customers;
    } else {
      // Get customers by specific stage
      const stageCustomers = await lifecycleService.getCustomersByStage(stage, page, limit);
      customers = stageCustomers.customers;
    }

    // Enrich customer data with lifecycle information
    const enrichedCustomers = await Promise.all(
      customers.map(async (customer) => {
        const journey = await lifecycleService.getCustomerJourney(customer.id);
        const healthScore = await lifecycleService.getCustomerHealthScore(customer.id);
        
        if (!journey) {
          return null;
        }

        const daysSinceLastActivity = Math.floor(
          (Date.now() - journey.lastActivity.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          customerId: customer.id,
          customerName: `${customer.firstName} ${customer.lastName}`,
          email: customer.email,
          currentStage: journey.currentStage.stage,
          healthScore,
          totalCases: journey.totalCases,
          lastActivity: journey.lastActivity.toISOString(),
          lifetimeValue: journey.lifetimeValue,
          daysSinceLastActivity,
        };
      })
    );

    // Filter out null values and apply search if needed
    const filteredCustomers = enrichedCustomers.filter(customer => customer !== null);
    
    // Apply search filter if provided
    const searchFilteredCustomers = search 
      ? filteredCustomers.filter(customer => 
          customer!.customerName.toLowerCase().includes(search.toLowerCase()) ||
          customer!.email.toLowerCase().includes(search.toLowerCase())
        )
      : filteredCustomers;

    return NextResponse.json({
      customers: searchFilteredCustomers,
      total: searchFilteredCustomers.length,
      page,
      totalPages: Math.ceil(searchFilteredCustomers.length / limit),
    });
  } catch (error) {
    console.error('Error fetching customers by lifecycle stage:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
