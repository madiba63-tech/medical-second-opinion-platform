'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { cn, formatDate, formatRelativeTime } from '@/lib/utils';

interface Case {
  id: string;
  caseNumber: string;
  diseaseType: string;
  status: 'submitted' | 'processing' | 'ai_analysis' | 'assigned' | 'under_review' | 'peer_review' | 'completed' | 'delivered';
  submittedDate: string;
  estimatedCompletion?: string;
  assignedTo?: string;
  finalOpinionUrl?: string;
  lastUpdated: string;
  urgency: 'low' | 'medium' | 'high';
  aiConfidenceScore?: number;
  progressPercentage?: number;
  nextStep?: string;
  documentsCount?: number;
  messagesCount?: number;
}

interface CaseCardProps {
  case: Case;
  onSwipeAction?: (action: 'view' | 'download' | 'contact') => void;
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  case: caseItem,
  onSwipeAction,
  className,
  showActions = true,
  compact = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault();
      setSwipeDistance(Math.max(-120, Math.min(120, deltaX)));
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(swipeDistance) > 60) {
      // Execute swipe action
      if (swipeDistance > 0) {
        onSwipeAction?.('view');
      } else {
        if (caseItem.finalOpinionUrl) {
          onSwipeAction?.('download');
        } else {
          onSwipeAction?.('contact');
        }
      }
      
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setSwipeDistance(0);
      }, 300);
    } else {
      // Snap back
      setSwipeDistance(0);
    }
    setTouchStart(null);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Opinion Delivered';
      case 'completed': return 'Review Complete';
      case 'under_review': return 'Under Expert Review';
      case 'peer_review': return 'Peer Review';
      case 'assigned': return 'Assigned to Specialist';
      case 'processing': return 'Processing Documents';
      case 'ai_analysis': return 'AI Analysis in Progress';
      case 'submitted': return 'Submitted';
      default: return status;
    }
  };

  const getProgressPercentage = () => {
    if (caseItem.progressPercentage) return caseItem.progressPercentage;
    
    // Calculate based on status
    switch (caseItem.status) {
      case 'submitted': return 10;
      case 'processing': return 25;
      case 'ai_analysis': return 45;
      case 'assigned': return 60;
      case 'under_review': return 80;
      case 'peer_review': return 90;
      case 'completed':
      case 'delivered': return 100;
      default: return 0;
    }
  };

  return (
    <div
      className={cn(
        "relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300",
        "hover:shadow-md hover:border-blue-200 group",
        isAnimating && "transition-transform duration-300",
        className
      )}
      style={{
        transform: `translateX(${swipeDistance}px)`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Actions Background */}
      <div className="absolute inset-0 flex">
        {/* Left Action (View) */}
        <div className="w-24 bg-blue-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        {/* Right Action (Download/Contact) */}
        <div className="w-24 bg-green-500 flex items-center justify-center ml-auto">
          {caseItem.finalOpinionUrl ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="relative bg-white p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {caseItem.caseNumber}
              </h3>
              {caseItem.finalOpinionUrl && (
                <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Report Ready</span>
                </div>
              )}
            </div>
            <p className="text-gray-700 font-medium mb-1">{caseItem.diseaseType}</p>
            <p className="text-sm text-gray-500">
              Submitted {formatDate(caseItem.submittedDate, { month: 'short', day: 'numeric' })}
              {caseItem.lastUpdated && (
                <span className="ml-2">• Updated {formatRelativeTime(caseItem.lastUpdated)}</span>
              )}
            </p>
          </div>
          
          <StatusIndicator 
            status={caseItem.status} 
            urgency={caseItem.urgency}
            showProgress={!compact}
          />
        </div>

        {/* Progress Bar */}
        {!compact && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {getStatusText(caseItem.status)}
              </span>
              <span className="text-sm text-gray-500">
                {getProgressPercentage()}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            {caseItem.nextStep && (
              <p className="text-xs text-gray-500 mt-2">
                Next: {caseItem.nextStep}
              </p>
            )}
          </div>
        )}

        {/* Case Details */}
        {!compact && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {caseItem.estimatedCompletion && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Due {formatDate(caseItem.estimatedCompletion, { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
            
            {caseItem.documentsCount && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{caseItem.documentsCount} documents</span>
              </div>
            )}
          </div>
        )}

        {/* Assigned Professional */}
        {caseItem.assignedTo && (
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {caseItem.assignedTo.split(' ')[1]?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {caseItem.assignedTo}
              </p>
              <p className="text-xs text-gray-500">
                Reviewing your case
              </p>
            </div>
            {caseItem.messagesCount && caseItem.messagesCount > 0 && (
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {caseItem.messagesCount} messages
              </div>
            )}
          </div>
        )}

        {/* AI Confidence Score */}
        {caseItem.aiConfidenceScore && !compact && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-900">AI Analysis Confidence</span>
              <span className="text-sm font-semibold text-purple-700">{caseItem.aiConfidenceScore}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                style={{ width: `${caseItem.aiConfidenceScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Link
              href={`/portal/cases/${caseItem.caseNumber}`}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-lg font-medium transition-all duration-200 hover:shadow-sm text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </Link>
            
            {caseItem.finalOpinionUrl ? (
              <a
                href={caseItem.finalOpinionUrl}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </a>
            ) : (
              <Link
                href={`/portal/cases/${caseItem.caseNumber}/communication`}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-50 border-2 border-blue-200 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg font-medium transition-all duration-200 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Message
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseCard;