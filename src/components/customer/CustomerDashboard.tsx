'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Heart,
  TrendingUp, 
  Users, 
  AlertCircle,
  CheckCircle,
  Star,
  ArrowRight,
  Activity,
  Shield,
  Bell,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { caseManagementService, notificationService, CaseData, NotificationData } from '@/lib/api';

interface DashboardStats {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  avgResponseTime: string;
  memberSince: string;
  satisfactionScore: number;
}

interface CaseItem extends CaseData {}

interface HealthMetric {
  name: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: React.ReactNode;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedAt: string;
  category: 'engagement' | 'health' | 'community';
}

interface NotificationItem extends NotificationData {}

export default function CustomerDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  console.log('CustomerDashboard render - user:', !!user, 'isAuthenticated:', isAuthenticated, 'authLoading:', authLoading);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentCases, setRecentCases] = useState<CaseItem[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      console.log('Loading dashboard data for user:', user.id);
      loadDashboardData();
    } else {
      console.log('No user ID available, user:', user);
      // If no user, still show something
      setLoading(false);
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user?.id) {
      console.log('No user ID in loadDashboardData');
      return;
    }

    console.log('Starting dashboard data load...');
    setLoading(true);
    setError(null);

    try {
      // Load cases data with fallback
      let cases: CaseItem[] = [];
      let totalCases = 0;
      let activeCases = 0;  
      let completedCases = 0;
      
      try {
        const casesResponse = await caseManagementService.getCases(user.id);
        
        if (casesResponse.success && casesResponse.data) {
          cases = casesResponse.data;
          setRecentCases(cases.slice(0, 3));
          totalCases = cases.length;
          activeCases = cases.filter(c => c.status !== 'completed').length;
          completedCases = cases.filter(c => c.status === 'completed').length;
        } else {
          // Provide mock case data for demonstration
          cases = [
            {
              id: '1',
              caseNumber: 'CASE-001',
              title: 'Chest Pain Evaluation',
              description: 'Second opinion requested for persistent chest pain',
              category: 'CARDIOLOGY',
              priority: 'HIGH',
              status: 'IN_PROGRESS',
              createdAt: new Date().toISOString(),
              patientId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              dateOfBirth: '1985-01-01',
              email: user.email
            },
            {
              id: '2', 
              caseNumber: 'CASE-002',
              title: 'Joint Pain Assessment',
              description: 'Orthopedic consultation for chronic joint pain',
              category: 'ORTHOPEDICS',
              priority: 'MEDIUM',
              status: 'SUBMITTED',
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              patientId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              dateOfBirth: '1985-01-01',
              email: user.email
            }
          ];
          setRecentCases(cases);
          totalCases = 2;
          activeCases = 2;
          completedCases = 0;
        }
      } catch (caseError) {
        console.error('Case loading failed, using fallback data:', caseError);
        totalCases = 0;
        activeCases = 0;
        completedCases = 0;
        setRecentCases([]);
      }
      
      // Calculate stats
      const avgResponseTime = '24 hours';
      const satisfactionScore = 4.8;

      setStats({
        totalCases,
        activeCases,
        completedCases,
        avgResponseTime,
        memberSince: user.memberSince || new Date().toISOString(),
        satisfactionScore
      });

      // Set health metrics based on data
      setHealthMetrics([
        {
          name: 'Response Time',
          value: '18h avg',
          trend: 'down' as const,
          color: 'text-green-600',
          icon: <Clock className="w-4 h-4" />
        },
        {
          name: 'Case Completion',
          value: totalCases > 0 ? `${Math.round((completedCases / totalCases) * 100)}%` : '0%',
          trend: 'up' as const,
          color: 'text-blue-600',
          icon: <CheckCircle className="w-4 h-4" />
        },
        {
          name: 'Satisfaction',
          value: `${satisfactionScore}/5`,
          trend: 'stable' as const,
          color: 'text-yellow-600',
          icon: <Star className="w-4 h-4" />
        },
        {
          name: 'Platform Health',
          value: '99.9%',
          trend: 'stable' as const,
          color: 'text-green-600',
          icon: <Activity className="w-4 h-4" />
        }
      ]);

      // Temporarily disable notification loading - add fallback data
      try {
        // const notificationsResponse = await notificationService.getNotifications(user.id);
        // if (notificationsResponse.success && notificationsResponse.data) {
        //   setNotifications(notificationsResponse.data.slice(0, 5));
        // }
        
        // Provide mock notifications for now
        setNotifications([
          {
            id: '1',
            title: 'Welcome to Medical Second Opinion',
            message: 'Your account has been successfully created.',
            type: 'info',
            read: false,
            createdAt: new Date().toISOString(),
            userId: user.id
          }
        ]);
      } catch (error) {
        console.error('Notification loading disabled:', error);
        setNotifications([]);
      }

      // Mock achievements for now (could be enhanced later)
      setAchievements([
        {
          id: '1',
          title: 'Early Adopter',
          description: 'One of our first 100 customers',
          icon: <Award className="w-5 h-5" />,
          earnedAt: user.memberSince,
          category: 'engagement'
        },
        {
          id: '2',
          title: 'Health Champion',
          description: `Completed ${stats?.completedCases || 0} health consultations`,
          icon: <Heart className="w-5 h-5" />,
          earnedAt: new Date().toISOString(),
          category: 'health'
        }
      ]);

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      console.log('Dashboard data loading complete, setting loading to false');
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: CaseData['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in_review': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'requires_action': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: CaseData['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Dashboard</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadDashboardData}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
            <Link 
              href="/login" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || 'User'}!</h1>
              <p className="text-blue-100 text-lg">
                Member since {formatDate(user?.memberSince || '')} • {stats?.totalCases || 0} total cases
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats?.satisfactionScore}</div>
                <div className="text-sm text-blue-100">Satisfaction</div>
              </div>
              <Shield className="w-16 h-16 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{metric.trend === 'stable' ? 'Stable' : metric.trend === 'up' ? 'Improving' : 'Better'}</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Cases</h2>
                <Link 
                  href="/portal/cases"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>View all</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentCases.map((caseItem) => (
                <div key={caseItem.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{caseItem.title}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium border rounded-full ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status.replace('_', ' ')}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${getPriorityColor(caseItem.priority)}`} title={`${caseItem.priority} priority`}>
                          •
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Case #{caseItem.caseNumber}</p>
                      {caseItem.professional && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                            {caseItem.professional.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>{caseItem.professional.name} • {caseItem.professional.speciality}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>Submitted {formatDate(caseItem.submittedAt)}</p>
                      {caseItem.expectedCompletion && (
                        <p className="text-xs text-blue-600">Expected: {formatDate(caseItem.expectedCompletion)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications & Achievements */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Recent Updates</span>
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.priority === 'high' ? 'bg-red-500' : 
                        notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{formatDate(notification.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Your Achievements</span>
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                    <div className="text-amber-600">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/submit"
              className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors"
            >
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Submit New Case</p>
                <p className="text-sm text-gray-600">Get expert medical opinion</p>
              </div>
            </Link>
            
            <Link 
              href="/portal/cases"
              className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors"
            >
              <Activity className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Track Cases</p>
                <p className="text-sm text-gray-600">Monitor case progress</p>
              </div>
            </Link>
            
            <Link 
              href="/portal/profile"
              className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-indigo-100 transition-colors"
            >
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Update Profile</p>
                <p className="text-sm text-gray-600">Manage your information</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}