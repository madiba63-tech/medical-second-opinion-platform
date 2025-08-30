'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  subItems?: Omit<SidebarItem, 'subItems'>[];
}

interface DesktopSidebarProps {
  collapsed?: boolean;
  className?: string;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ collapsed = false, className }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['cases']);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/portal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'cases',
      label: 'My Cases',
      href: '/portal/cases',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      badge: 3,
      subItems: [
        {
          id: 'active-cases',
          label: 'Active Cases',
          href: '/portal/cases?status=active',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          badge: 2
        },
        {
          id: 'completed-cases',
          label: 'Completed',
          href: '/portal/cases?status=completed',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          badge: 1
        },
        {
          id: 'case-history',
          label: 'All Cases',
          href: '/portal/cases/history',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'profile',
      label: 'My Profile',
      href: '/portal/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      subItems: [
        {
          id: 'personal-info',
          label: 'Personal Info',
          href: '/portal/profile/personal',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 'medical-history',
          label: 'Medical History',
          href: '/portal/profile/medical-history',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          )
        },
        {
          id: 'preferences',
          label: 'Preferences',
          href: '/portal/profile/preferences',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      href: '/portal/support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      badge: 1,
      subItems: [
        {
          id: 'live-chat',
          label: 'Live Chat',
          href: '/portal/support/chat',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )
        },
        {
          id: 'faq',
          label: 'FAQ',
          href: '/portal/support/faq',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        },
        {
          id: 'contact',
          label: 'Contact Us',
          href: '/portal/support/contact',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'billing',
      label: 'Billing',
      href: '/portal/billing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === '/portal') {
      return pathname === '/portal';
    }
    return pathname?.startsWith(href);
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  if (!mounted) {
    return null;
  }

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
      "flex flex-col h-full",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      {!collapsed && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Patient Portal</h2>
              <p className="text-xs text-gray-500">Secure Healthcare</p>
            </div>
          </div>
          
          {/* Quick Start Action */}
          <Link
            href="/submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg py-2.5 px-4 text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Start New Case</span>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <div className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between w-full p-3 text-left text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-gray-50 hover:shadow-sm",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-gray-900",
                    collapsed && "justify-center"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "transition-colors",
                      isActive(item.href) ? "text-blue-600" : "text-gray-400"
                    )}>
                      {item.icon}
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  
                  {!collapsed && (
                    <div className="flex items-center space-x-1">
                      {item.badge && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.subItems && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleExpanded(item.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <svg 
                            className={cn(
                              "w-3 h-3 transition-transform",
                              isExpanded(item.id) ? "rotate-90" : ""
                            )} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </Link>

                {/* Sub-navigation */}
                {!collapsed && item.subItems && isExpanded(item.id) && (
                  <ul className="mt-2 ml-8 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.href}
                          className={cn(
                            "flex items-center justify-between p-2 text-sm rounded-md transition-colors",
                            "hover:bg-gray-50",
                            isActive(subItem.href)
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            <span className={cn(
                              "transition-colors",
                              isActive(subItem.href) ? "text-blue-600" : "text-gray-400"
                            )}>
                              {subItem.icon}
                            </span>
                            <span>{subItem.label}</span>
                          </div>
                          {subItem.badge && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="space-y-3">
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center space-x-2">
              <TrustBadge type="hipaa" size="sm" />
              <TrustBadge type="ssl" size="sm" />
            </div>
            
            {/* Support Contact */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Need help?</p>
              <Link
                href="/portal/support/contact"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact Support
              </Link>
            </div>
            
            {/* Version Info */}
            <div className="text-center">
              <p className="text-xs text-gray-400">v2.1.0 • Secure Portal</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DesktopSidebar;