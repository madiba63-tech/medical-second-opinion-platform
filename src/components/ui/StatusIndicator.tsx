"use client";

interface StatusIndicatorProps {
  status: 'submitted' | 'processing' | 'ai_analysis' | 'assigned' | 'under_review' | 'peer_review' | 'completed' | 'delivered';
  urgency?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

export function StatusIndicator({ status, urgency = 'medium', size = 'md', showProgress = false }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm', 
    lg: 'px-4 py-2 text-base'
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          text: 'Delivered',
          progress: 100
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ),
          text: 'Completed',
          progress: 95
        };
      case 'peer_review':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          text: 'Peer Review',
          progress: 80
        };
      case 'under_review':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ),
          text: 'Under Review',
          progress: 65
        };
      case 'assigned':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          text: 'Assigned',
          progress: 50
        };
      case 'ai_analysis':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          text: 'AI Analysis',
          progress: 35
        };
      case 'processing':
        return {
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: (
            <svg className="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
          text: 'Processing',
          progress: 20
        };
      case 'submitted':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          text: 'Submitted',
          progress: 10
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          text: status,
          progress: 0
        };
    }
  };

  const getUrgencyIndicator = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return (
          <div className="flex items-center ml-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-600 ml-1 font-medium">Urgent</span>
          </div>
        );
      case 'medium':
        return null;
      case 'low':
        return (
          <div className="flex items-center ml-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-blue-600 ml-1">Standard</span>
          </div>
        );
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="flex items-center">
      <div className={`inline-flex items-center font-medium rounded-full border ${statusConfig.color} ${sizeClasses[size]}`}>
        {statusConfig.icon}
        <span>{statusConfig.text}</span>
      </div>
      
      {getUrgencyIndicator(urgency)}
      
      {showProgress && (
        <div className="flex items-center ml-3">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${statusConfig.progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">{statusConfig.progress}%</span>
        </div>
      )}
    </div>
  );
}
