'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CaseCard } from '../case-management/CaseCard';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { cn, formatDate, generateInitials } from '@/lib/utils';

interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string;
  completedCases: number;
  avatar?: string;
  membershipTier: 'basic' | 'premium' | 'enterprise';
  preferredChannel: 'EMAIL' | 'SMS';
  healthConditions?: string[];
}

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

interface Notification {
  id: string;
  type: 'case_update' | 'system' | 'appointment' | 'billing';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

interface PersonalizedDashboardProps {
  profile: CustomerProfile;
  cases: Case[];
  notifications: Notification[];
  onNotificationAction?: (id: string, action: string) => void;
  className?: string;
}

export const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({
  profile,
  cases,
  notifications,
  onNotificationAction,
  className
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const activeCases = cases.filter(c => 
    c.status !== 'delivered' && c.status !== 'completed'
  );
  const completedCases = cases.filter(c => 
    c.status === 'delivered' || c.status === 'completed'
  );
  const reportsReady = cases.filter(c => c.finalOpinionUrl).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMembershipBadgeColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getNextAppointment = () => {
    // Mock next appointment - replace with real data
    const nextAppt = activeCases.find(c => c.estimatedCompletion);
    return nextAppt ? new Date(nextAppt.estimatedCompletion!) : null;
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("space-y-6 lg:space-y-8", className)}>
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 lg:p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {generateInitials(profile.firstName, profile.lastName)}
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">
                    {getGreeting()}, {profile.firstName}!
                  </h1>
                  <p className="text-blue-100 text-sm">
                    Welcome back to your medical portal
                  </p>
                  <div className={cn(
                    'inline-flex items-center space-x-1 text-xs px-2 py-1 rounded-full border font-medium mt-2',
                    'bg-white/20 text-white border-white/30'
                  )}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>{profile.membershipTier.charAt(0).toUpperCase() + profile.membershipTier.slice(1)} Member</span>
                  </div>
                </div>
              </div>
              
              {/* Member Stats */}
              <div className="flex flex-wrap items-center space-x-6 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Member since {formatDate(profile.memberSince, { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{profile.completedCases} completed cases</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/submit"
                className="bg-white/20 backdrop-blur hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>New Case</span>
              </Link>
              
              <Link
                href="/portal/support/chat"
                className="bg-white hover:bg-gray-50 text-blue-600 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Get Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-4 lg:space-x-6">
            <TrustBadge type="hipaa" />
            <TrustBadge type="ssl" />
            <TrustBadge type="expert" />
            <div className="text-xs text-gray-500">256-bit encryption • SOC 2 Type II compliant</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-md transition-all duration-300 hover:border-blue-200 group">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {cases.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-md transition-all duration-300 hover:border-yellow-200 group">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                {activeCases.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-md transition-all duration-300 hover:border-green-200 group">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {completedCases.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-md transition-all duration-300 hover:border-purple-200 group">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Reports Ready</p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {reportsReady}
              </p>
              {reportsReady > 0 && (
                <p className="text-xs text-purple-600 font-medium animate-pulse">Ready to download</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      {(activeCases.length > 0 || unreadNotifications > 0) && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Cases */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Active Cases</h2>
                  <Link 
                    href="/portal/cases" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {activeCases.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No active cases</h3>
                    <p className="text-gray-600 mb-6">
                      Ready to get expert medical opinions?
                    </p>
                    <Link
                      href="/submit"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Start Your First Case</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeCases.slice(0, 2).map((caseItem) => (
                      <CaseCard
                        key={caseItem.id}
                        case={caseItem}
                        compact={true}
                        onSwipeAction={(action) => {
                          console.log('Swipe action:', action, caseItem.caseNumber);
                        }}
                      />
                    ))}
                    {activeCases.length > 2 && (
                      <div className="text-center pt-4">
                        <Link
                          href="/portal/cases?status=active"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View {activeCases.length - 2} more active cases
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Notifications */}
            {unreadNotifications > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
                </div>
                <div className="p-4 space-y-3">
                  {notifications.filter(n => !n.read).slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                        notification.priority === 'high' ? 'bg-red-500' :
                        notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(notification.timestamp, { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: 'numeric', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 text-center">
                    <Link
                      href="/portal/notifications"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Support */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our patient advocates are here to guide you through any questions.
              </p>
              <div className="space-y-2">
                <Link
                  href="/portal/support/chat"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Start Live Chat</span>
                </Link>
                <Link
                  href="/portal/support/faq"
                  className="w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Browse FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completed Cases Summary */}
      {completedCases.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Completed Cases</h2>
          </div>
          <div className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCases.slice(0, 3).map((caseItem) => (
                <div key={caseItem.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{caseItem.caseNumber}</h4>
                    <StatusIndicator status={caseItem.status} urgency={caseItem.urgency} />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{caseItem.diseaseType}</p>
                  {caseItem.finalOpinionUrl && (
                    <a
                      href={caseItem.finalOpinionUrl}
                      className="inline-flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Report</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedDashboard;