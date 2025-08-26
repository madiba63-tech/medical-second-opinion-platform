'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AccountInfo {
  accountId: string;
  subscriptionPlan: string;
  billingCycle: string;
  nextBillingDate: string;
  totalEarnings: number;
  completedCases: number;
  pendingCases: number;
}

export default function ProfessionalAccountPage() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Mock data for demonstration
    const mockAccountInfo: AccountInfo = {
      accountId: 'PROF-2024-001',
      subscriptionPlan: 'Professional',
      billingCycle: 'Monthly',
      nextBillingDate: '2024-02-15',
      totalEarnings: 12500.00,
      completedCases: 47,
      pendingCases: 3
    };

    setTimeout(() => {
      setAccountInfo(mockAccountInfo);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account information...</p>
        </div>
      </div>
    );
  }

  if (!accountInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load your account information.</p>
          <Link
            href="/professional/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/professional/dashboard"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings, billing, and earnings</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
                  <p className="text-sm text-gray-900 font-mono">{accountInfo.accountId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                  <p className="text-sm text-gray-900">{accountInfo.subscriptionPlan}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                  <p className="text-sm text-gray-900">{accountInfo.billingCycle}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Billing Date</label>
                  <p className="text-sm text-gray-900">{new Date(accountInfo.nextBillingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Earnings & Cases */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings & Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${accountInfo.totalEarnings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {accountInfo.completedCases}
                  </div>
                  <div className="text-sm text-gray-600">Completed Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {accountInfo.pendingCases}
                  </div>
                  <div className="text-sm text-gray-600">Pending Cases</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Case #2024-001 completed</p>
                    <p className="text-xs text-gray-500">Cardiology consultation</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+$250.00</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Case #2024-002 assigned</p>
                    <p className="text-xs text-gray-500">Neurology review</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">Pending</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Monthly subscription renewed</p>
                    <p className="text-xs text-gray-500">Professional plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">-$99.00</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/professional/profile"
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Edit Profile
                </Link>
                <button className="block w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Download Earnings Report
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View Billing History
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Update Payment Method
                </button>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">Add extra security to your account</div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Change Password</div>
                    <div className="text-sm text-gray-500">Update your account password</div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Login History</div>
                    <div className="text-sm text-gray-500">View recent login activity</div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Subscription Management */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900">{accountInfo.subscriptionPlan} Plan</div>
                  <div className="text-sm text-gray-500">${accountInfo.billingCycle === 'Monthly' ? '99' : '990'}/month</div>
                </div>
                <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Change Plan
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
