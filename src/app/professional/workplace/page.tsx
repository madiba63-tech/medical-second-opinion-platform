'use client';

export default function WorkplacePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          My Workplace
        </h1>
        <p style={{ color: '#6b7280' }}>
          Manage your assigned medical cases and provide second opinions
        </p>
      </div>

      {/* Cases Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {/* Case 1 */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          cursor: 'pointer'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                  CASE-2024-001
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                  Breast Cancer
                </p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                borderRadius: '9999px',
                backgroundColor: '#fef3c7',
                color: '#d97706'
              }}>
                Assigned
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Patient:</span>
                <span style={{ color: '#111827' }}>Sarah Johnson (45, Female)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Submitted:</span>
                <span style={{ color: '#111827' }}>Jan 15, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Due:</span>
                <span style={{ color: '#111827' }}>Jan 25, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Documents:</span>
                <span style={{ color: '#111827' }}>3 files</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Open Case
              </button>
            </div>
          </div>
        </div>

        {/* Case 2 */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          cursor: 'pointer'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                  CASE-2024-002
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                  Lung Cancer
                </p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                borderRadius: '9999px',
                backgroundColor: '#dbeafe',
                color: '#2563eb'
              }}>
                In Progress
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Patient:</span>
                <span style={{ color: '#111827' }}>Michael Chen (62, Male)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Submitted:</span>
                <span style={{ color: '#111827' }}>Jan 10, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Due:</span>
                <span style={{ color: '#111827' }}>Jan 20, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Documents:</span>
                <span style={{ color: '#111827' }}>2 files</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Open Case
              </button>
            </div>
          </div>
        </div>

        {/* Case 3 */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          cursor: 'pointer'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                  CASE-2024-003
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                  Colorectal Cancer
                </p>
              </div>
              <span style={{ 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                borderRadius: '9999px',
                backgroundColor: '#dcfce7',
                color: '#16a34a'
              }}>
                Completed
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Patient:</span>
                <span style={{ color: '#111827' }}>Emily Rodriguez (58, Female)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Submitted:</span>
                <span style={{ color: '#111827' }}>Jan 5, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Due:</span>
                <span style={{ color: '#111827' }}>Jan 15, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Documents:</span>
                <span style={{ color: '#111827' }}>2 files</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                View Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div style={{ 
        marginTop: '2rem',
        backgroundColor: '#dbeafe', 
        border: '1px solid #93c5fd', 
        borderRadius: '0.5rem', 
        padding: '1rem' 
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>
          💡 How to Use My Workplace
        </h3>
        <ul style={{ color: '#1e40af', fontSize: '0.875rem', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Click on any case to open the workspace</li>
          <li>Review patient documents in the left panel</li>
          <li>Edit AI-generated draft opinions in the right panel</li>
          <li>Save drafts and finalize reports when ready</li>
        </ul>
      </div>
    </div>
  );
}
