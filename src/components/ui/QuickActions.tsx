"use client";

import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      id: 'new-case',
      title: 'Start New Case',
      description: 'Submit medical documents for expert review',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      href: '/submit',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-white',
      primary: true
    },
    {
      id: 'schedule-consultation',
      title: 'Schedule Consultation',
      description: 'Book a video call with a specialist',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      href: '/portal/consultation',
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-white'
    },
    {
      id: 'expert-network',
      title: 'Expert Network',
      description: 'Browse our board-certified specialists',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: '/experts',
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-white'
    },
    {
      id: 'health-resources',
      title: 'Health Resources',
      description: 'Educational content and health guides',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/resources',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-white'
    },
    {
      id: 'support',
      title: 'Get Support',
      description: 'Contact our patient advocates',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: '/support',
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-white'
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Manage your billing and payment methods',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      href: '/portal/billing',
      color: 'from-teal-500 to-cyan-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="mb-6 lg:mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
          <p className="text-gray-600">Everything you need to manage your healthcare journey</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className={`group relative overflow-hidden rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                action.primary ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`bg-gradient-to-br ${action.color} p-4 lg:p-6 h-full`}>
                <div className="flex flex-col h-full">
                  <div className={`${action.textColor} mb-3`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm lg:text-base ${action.textColor} mb-1`}>
                      {action.title}
                    </h3>
                    <p className={`text-xs lg:text-sm ${action.textColor} opacity-90`}>
                      {action.description}
                    </p>
                  </div>
                  <div className={`${action.textColor} mt-3 opacity-75 group-hover:opacity-100 transition-opacity`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Emergency Contact */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-red-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">Emergency: 911</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-medium">Support: (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
