'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CustomerLifecycleStats {
  total: number;
  active: number;
  inactive: number;
  churned: number;
  onboarding: number;
  reactivated: number;
  averageHealthScore: number;
  atRiskCount: number;
}

interface CustomerJourney {
  customerId: string;
  customerName: string;
  email: string;
  currentStage: string;
  healthScore: number;
  totalCases: number;
  lastActivity: string;
  lifetimeValue: number;
  daysSinceLastActivity: number;
}

interface LifecycleStage {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

export default function CustomerLifecycleDashboard() {
  const [stats, setStats] = useState<CustomerLifecycleStats | null>(null);
  const [customers, setCustomers] = useState<CustomerJourney[]>([]);
  const [stages, setStages] = useState<LifecycleStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedStage, currentPage]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch lifecycle statistics
      const statsResponse = await fetch('/api/admin/customer-lifecycle/stats');
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch customers by stage
      const customersResponse = await fetch(`/api/admin/customer-lifecycle/customers?stage=${selectedStage}&page=${currentPage}&search=${searchTerm}`);
      const customersData = await customersResponse.json();
      setCustomers(customersData.customers);
      setTotalPages(customersData.totalPages);

      // Calculate stage distribution
      if (statsData) {
        const total = statsData.total || 0;
        const stageData: LifecycleStage[] = [
          { stage: 'Active', count: statsData.active || 0, percentage: total > 0 ? ((statsData.active || 0) / total) * 100 : 0, color: 'bg-green-500' },
          { stage: 'Inactive', count: statsData.inactive || 0, percentage: total > 0 ? ((statsData.inactive || 0) / total) * 100 : 0, color: 'bg-yellow-500' },
          { stage: 'Churned', count: statsData.churned || 0, percentage: total > 0 ? ((statsData.churned || 0) / total) * 100 : 0, color: 'bg-red-500' },
          { stage: 'Onboarding', count: statsData.onboarding || 0, percentage: total > 0 ? ((statsData.onboarding || 0) / total) * 100 : 0, color: 'bg-blue-500' },
          { stage: 'Reactivated', count: statsData.reactivated || 0, percentage: total > 0 ? ((statsData.reactivated || 0) / total) * 100 : 0, color: 'bg-purple-500' },
        ];
        setStages(stageData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReEngagement = async (customerId: string) => {
    try {
      await fetch(`/api/admin/customer-lifecycle/re-engage/${customerId}`, {
        method: 'POST',
      });
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error triggering re-engagement:', error);
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'churned': return 'bg-red-100 text-red-800';
      case 'onboarding': return 'bg-blue-100 text-blue-800';
      case 'reactivated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer lifecycle dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 mb-4"
          >
            ← Back to Admin Portal
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Customer Lifecycle Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage customer journeys across all lifecycle stages</p>
        </div>

        {/* Key Metrics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">At Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.atRiskCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Health Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.averageHealthScore ? stats.averageHealthScore.toFixed(0) : '0'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lifecycle Stage Distribution */}
        {stages.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Customer Lifecycle Distribution</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {stages.map((stage) => (
                  <div key={stage.stage} className="text-center">
                    <div className={`w-16 h-16 rounded-full ${stage.color} flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-white font-bold text-lg">{stage.count}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                    <p className="text-xs text-gray-500">{stage.percentage.toFixed(1)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customer Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Customer Lifecycle Management</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Stages</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="churned">Churned</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="reactivated">Reactivated</option>
                </select>
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lifecycle Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cases
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lifetime Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.customerId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.customerName}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(customer.currentStage)}`}>
                        {customer.currentStage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHealthScoreColor(customer.healthScore)}`}>
                        {customer.healthScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.totalCases} cases
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>{new Date(customer.lastActivity).toISOString().split('T')[0]}</div>
                        <div className="text-xs text-gray-400">
                          {customer.daysSinceLastActivity} days ago
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${customer.lifetimeValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/customers/${customer.customerId}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      {(customer.currentStage === 'inactive' || customer.currentStage === 'churned') && (
                        <button
                          onClick={() => handleReEngagement(customer.customerId)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Re-engage
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
