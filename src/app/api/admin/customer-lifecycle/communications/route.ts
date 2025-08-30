import { NextRequest, NextResponse } from 'next/server';
import { CommunicationService } from '@/modules/customerLifecycle/communicationService';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const communicationService = new CommunicationService();

export async function GET(req: NextRequest) {
  const authError = requireCustomerLifecyclePermission(req, 'read');
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');
    const action = searchParams.get('action');
    
    if (customerId && action === 'history') {
      // Get communication history for specific customer
      const history = await communicationService.getCommunicationHistory(customerId);
      return NextResponse.json({ history });
    } else if (action === 'templates') {
      // Get all communication templates
      const templates = communicationService.getAllTemplates();
      return NextResponse.json({ templates });
    } else {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error fetching communication data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch communication data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authError = requireCustomerLifecyclePermission(req, 'write');
  if (authError) return authError;

  try {
    const data = await req.json();
    const { customerId, stage, variables, priority, message } = data;

    let success = false;

    if (stage && customerId) {
      // Send lifecycle message
      success = await communicationService.sendLifecycleMessage(
        customerId,
        stage,
        variables || {}
      );
    } else if (message && customerId) {
      // Send multi-channel notification
      success = await communicationService.sendMultiChannelNotification(
        customerId,
        message,
        priority || 'medium'
      );
    }

    return NextResponse.json({
      success,
      message: success ? 'Communication sent successfully' : 'Failed to send communication'
    });
  } catch (error) {
    console.error('Error sending communication:', error);
    return NextResponse.json(
      { error: 'Failed to send communication' },
      { status: 500 }
    );
  }
}