import { NextRequest, NextResponse } from 'next/server';
import { CustomerLifecycleService } from '@/modules/customerLifecycle/customerLifecycleService';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const lifecycleService = new CustomerLifecycleService();

export async function POST(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  // Check admin permissions
  const authError = requireCustomerLifecyclePermission(req, 'write');
  if (authError) return authError;

  try {
    const result = await lifecycleService.triggerReEngagement(params.customerId);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error triggering re-engagement:', error);
    return NextResponse.json(
      { error: 'Failed to trigger re-engagement' },
      { status: 500 }
    );
  }
}
