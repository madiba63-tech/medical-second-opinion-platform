import { NextRequest, NextResponse } from 'next/server';
import { PersonaService } from '@/modules/customerLifecycle/personaService';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const personaService = new PersonaService();

export async function GET(req: NextRequest) {
  const authError = requireCustomerLifecyclePermission(req, 'read');
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');
    
    if (customerId) {
      // Get persona analysis for specific customer
      const persona = await personaService.analyzeCustomerPersona(customerId);
      const recommendations = personaService.getPersonalizedExperienceRecommendations(persona);
      
      return NextResponse.json({
        persona,
        recommendations
      });
    } else {
      // Get customer segments
      const segments = await personaService.createCustomerSegments();
      return NextResponse.json({ segments });
    }
  } catch (error) {
    console.error('Error fetching persona data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch persona data' },
      { status: 500 }
    );
  }
}