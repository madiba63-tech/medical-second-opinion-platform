import { NextRequest, NextResponse } from 'next/server';
import { PersonaService } from '@/modules/customerLifecycle/personaService';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const personaService = new PersonaService();

export async function GET(req: NextRequest) {
  const authError = await requireCustomerLifecyclePermission(req, 'read');
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const segmentId = searchParams.get('segmentId');
    
    if (segmentId) {
      // Get customers in specific segment
      const customers = await personaService.getCustomersBySegment(segmentId);
      return NextResponse.json({ 
        segmentId,
        customers,
        count: customers.length 
      });
    } else {
      // Get all customer segments
      const segments = await personaService.createCustomerSegments();
      return NextResponse.json({ segments });
    }
  } catch (error) {
    console.error('Error fetching segment data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch segment data' },
      { status: 500 }
    );
  }
}