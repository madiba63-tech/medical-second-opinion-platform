import { NextRequest, NextResponse } from 'next/server';
import { CaseRepository } from '@/modules/repository/caseRepository';

const caseRepository = new CaseRepository();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const dateFrom = searchParams.get('dateFrom') ? new Date(searchParams.get('dateFrom')!) : undefined;
    const dateTo = searchParams.get('dateTo') ? new Date(searchParams.get('dateTo')!) : undefined;

    const filters = {
      status,
      search,
      dateFrom,
      dateTo,
    };

    const result = await caseRepository.findAll(filters, page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching cases:', error);
    
    // Return fallback data instead of error
    const fallbackResult = {
      cases: [],
      total: 0,
      page: 1,
      totalPages: 0,
    };
    
    return NextResponse.json(fallbackResult);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const caseId = searchParams.get('id');

    if (!caseId) {
      return NextResponse.json(
        { error: 'Case ID is required' },
        { status: 400 }
      );
    }

    await caseRepository.delete(caseId);
    
    return NextResponse.json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Error deleting case:', error);
    return NextResponse.json(
      { error: 'Failed to delete case' },
      { status: 500 }
    );
  }
}
