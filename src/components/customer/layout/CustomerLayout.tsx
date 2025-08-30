'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MobileNavigation from './MobileNavigation';
import DesktopSidebar from './DesktopSidebar';
import CustomerHeader from './CustomerHeader';
import { NotificationCenter } from '@/components/ui/NotificationCenter';
import { cn } from '@/lib/utils';

interface CustomerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface LayoutContextType {
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notifications: any[];
  unreadCount: number;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, className }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications - replace with real data
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'case_update',
      title: 'Case Update',
      message: 'Your case CASE-2024-002 is now under expert review',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'system',
      title: 'Security Update',
      message: 'Your account security settings have been updated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true,
      priority: 'medium'
    }
  ]);

  useEffect(() => {
    setMounted(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleNotificationDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Customer Header */}
      <CustomerHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onNotificationsClick={() => setShowNotifications(!showNotifications)}
        unreadCount={unreadCount}
        isMobile={isMobile}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <DesktopSidebar 
            className={cn(
              "transition-all duration-300",
              sidebarOpen ? "w-64" : "w-16"
            )}
            collapsed={!sidebarOpen}
          />
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <DesktopSidebar 
              className="fixed left-0 top-16 bottom-0 w-64 z-50 lg:hidden shadow-xl"
              collapsed={false}
            />
          </>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-auto",
          "pb-16 lg:pb-0", // Space for mobile navigation
          !isMobile && sidebarOpen ? "ml-0" : "",
          className
        )}>
          {/* Notification Center */}
          {showNotifications && (
            <NotificationCenter
              notifications={notifications}
              onNotificationRead={handleNotificationRead}
              onNotificationDismiss={handleNotificationDismiss}
              onClose={() => setShowNotifications(false)}
              className="absolute top-16 right-4 z-40"
            />
          )}
          
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}

      {/* Global modals, toasts, etc. can go here */}
    </div>
  );
};

export default CustomerLayout;