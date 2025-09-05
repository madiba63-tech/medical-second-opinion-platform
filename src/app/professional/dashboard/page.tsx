'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  casesThisQuarter: number;
  averageRating: number;
  totalEarnings: number;
  avgResponseTime: string;
  recentActivity: Array<{
    type: string;
    message: string;
    amount?: string;
    time: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from professional service
        const response = await fetch('http://localhost:4004/api/v1/professionals/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('professionalToken')}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.stats) {
            const apiStats = data.data.stats;
            setStats({
              casesThisQuarter: apiStats.performance?.completedCases || 12,
              averageRating: apiStats.performance?.rating || 4.8,
              totalEarnings: 15600, // Would come from payment service
              avgResponseTime: '2.3 days',
              recentActivity: [
                {
                  type: 'completed',
                  message: 'Case CASE-2024-003 completed',
                  amount: '+$1,200',
                  time: '2 hours ago'
                },
                {
                  type: 'assigned',
                  message: 'New case CASE-2024-004 assigned',
                  time: '1 day ago'
                },
                {
                  type: 'rating',
                  message: 'Customer rating received',
                  amount: '5.0 ⭐',
                  time: '2 days ago'
                }
              ]
            });
          } else {
            setStats(getMockStats());
          }
        } else {
          console.log('Stats API call failed, using mock data');
          setStats(getMockStats());
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats(getMockStats());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const getMockStats = (): DashboardStats => ({
    casesThisQuarter: 12,
    averageRating: 4.8,
    totalEarnings: 15600,
    avgResponseTime: '2.3 days',
    recentActivity: [
      {
        type: 'completed',
        message: 'Case CASE-2024-003 completed',
        amount: '+$1,200',
        time: '2 hours ago'
      },
      {
        type: 'assigned',
        message: 'New case CASE-2024-004 assigned',
        time: '1 day ago'
      },
      {
        type: 'rating',
        message: 'Customer rating received',
        amount: '5.0 ⭐',
        time: '2 days ago'
      }
    ]
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          border: '2px solid #e5e7eb',
          borderTop: '2px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          My Dashboard
        </h1>
        <p style={{ color: '#6b7280' }}>
          Overview of your professional performance and statistics
        </p>
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              backgroundColor: '#dbeafe', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              📊
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                Cases This Quarter
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                {stats?.casesThisQuarter || 12}
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              backgroundColor: '#dcfce7', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              ⭐
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                Average Rating
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                {stats?.averageRating || 4.8}/5.0
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              backgroundColor: '#f3e8ff', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              💰
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                Total Earnings
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                ${stats?.totalEarnings?.toLocaleString() || '15,600'}
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '2rem', 
              height: '2rem', 
              backgroundColor: '#fed7aa', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              ⏱️
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                Avg Response Time
              </p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                2.3 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(stats?.recentActivity || []).map((activity, index) => {
            const getBackgroundColor = (type: string) => {
              switch (type) {
                case 'completed': return '#dcfce7';
                case 'assigned': return '#dbeafe';  
                case 'rating': return '#fef3c7';
                default: return '#f3f4f6';
              }
            };
            
            const getDotColor = (type: string) => {
              switch (type) {
                case 'completed': return '#16a34a';
                case 'assigned': return '#2563eb';
                case 'rating': return '#d97706';
                default: return '#6b7280';
              }
            };
            
            const getTextColor = (type: string) => {
              switch (type) {
                case 'completed': return '#16a34a';
                case 'assigned': return '#2563eb';
                case 'rating': return '#d97706';
                default: return '#6b7280';
              }
            };
            
            return (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0.75rem', 
                backgroundColor: getBackgroundColor(activity.type),
                borderRadius: '0.5rem' 
              }}>
                <div style={{ 
                  width: '0.5rem', 
                  height: '0.5rem', 
                  backgroundColor: getDotColor(activity.type),
                  borderRadius: '50%', 
                  marginRight: '0.75rem' 
                }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                    {activity.message}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                    {activity.time}
                  </p>
                </div>
                {activity.amount && (
                  <span style={{ fontSize: '0.875rem', color: getTextColor(activity.type), fontWeight: '500' }}>
                    {activity.amount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a href="/professional/workplace" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          📂 My Workplace
        </a>
        
        <a href="/professional/account" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#6b7280', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          💳 My Account
        </a>
        
        <a href="/professional/profile" style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#6b7280', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          🧑 My Profile
        </a>
      </div>
    </div>
  );
}
