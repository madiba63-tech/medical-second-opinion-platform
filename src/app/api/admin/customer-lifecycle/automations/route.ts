import { NextRequest, NextResponse } from 'next/server';
import { AutomationService } from '@/modules/customerLifecycle/automationService';
import { requireCustomerLifecyclePermission } from '@/middleware/adminAuth';

const automationService = new AutomationService();

export async function GET(req: NextRequest) {
  const authError = await requireCustomerLifecyclePermission(req, 'read');
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const campaignId = searchParams.get('campaignId');
    
    if (action === 'rules') {
      // Get all automation rules
      const rules = automationService.getAllAutomationRules();
      return NextResponse.json({ rules });
    } else if (action === 'metrics' && campaignId) {
      // Get campaign metrics
      const metrics = automationService.getCampaignMetrics(campaignId);
      return NextResponse.json({ metrics });
    } else {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error fetching automation data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch automation data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireCustomerLifecyclePermission(req, 'write');
  if (authError) return authError;

  try {
    const data = await req.json();
    const { action, ruleData, ruleId, updates } = data;

    if (action === 'create' && ruleData) {
      // Create new automation rule
      const newRuleId = automationService.createAutomationRule(ruleData);
      return NextResponse.json({
        success: true,
        ruleId: newRuleId,
        message: 'Automation rule created successfully'
      });
    } else if (action === 'update' && ruleId && updates) {
      // Update existing automation rule
      const success = automationService.updateAutomationRule(ruleId, updates);
      return NextResponse.json({
        success,
        message: success ? 'Automation rule updated successfully' : 'Failed to update rule'
      });
    } else if (action === 'execute') {
      // Execute automation rules
      const executedCount = await automationService.executeAutomations();
      return NextResponse.json({
        success: true,
        executedCount,
        message: `${executedCount} automation rules executed`
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing automation request:', error);
    return NextResponse.json(
      { error: 'Failed to process automation request' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await requireCustomerLifecyclePermission(req, 'write');
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const ruleId = searchParams.get('ruleId');
    
    if (!ruleId) {
      return NextResponse.json(
        { error: 'Rule ID is required' },
        { status: 400 }
      );
    }

    const success = automationService.deleteAutomationRule(ruleId);
    return NextResponse.json({
      success,
      message: success ? 'Automation rule deleted successfully' : 'Failed to delete rule'
    });
  } catch (error) {
    console.error('Error deleting automation rule:', error);
    return NextResponse.json(
      { error: 'Failed to delete automation rule' },
      { status: 500 }
    );
  }
}