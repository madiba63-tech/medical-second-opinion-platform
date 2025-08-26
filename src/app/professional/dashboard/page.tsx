'use client';

export default function DashboardPage() {
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
                12
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
                4.8/5.0
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
                $15,600
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0.75rem', 
            backgroundColor: '#dcfce7', 
            borderRadius: '0.5rem' 
          }}>
            <div style={{ 
              width: '0.5rem', 
              height: '0.5rem', 
              backgroundColor: '#16a34a', 
              borderRadius: '50%', 
              marginRight: '0.75rem' 
            }}></div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                Case CASE-2024-003 completed
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                2 hours ago
              </p>
            </div>
            <span style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '500' }}>
              +$1,200
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0.75rem', 
            backgroundColor: '#dbeafe', 
            borderRadius: '0.5rem' 
          }}>
            <div style={{ 
              width: '0.5rem', 
              height: '0.5rem', 
              backgroundColor: '#2563eb', 
              borderRadius: '50%', 
              marginRight: '0.75rem' 
            }}></div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                New case CASE-2024-004 assigned
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                1 day ago
              </p>
            </div>
            <span style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '500' }}>
              Breast Cancer
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0.75rem', 
            backgroundColor: '#fef3c7', 
            borderRadius: '0.5rem' 
          }}>
            <div style={{ 
              width: '0.5rem', 
              height: '0.5rem', 
              backgroundColor: '#d97706', 
              borderRadius: '50%', 
              marginRight: '0.75rem' 
            }}></div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>
                Customer rating received
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                2 days ago
              </p>
            </div>
            <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: '500' }}>
              5.0 ⭐
            </span>
          </div>
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
