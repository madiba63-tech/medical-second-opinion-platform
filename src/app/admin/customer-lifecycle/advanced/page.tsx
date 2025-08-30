'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PersonaData {
  type: string;
  confidence: number;
  characteristics: string[];
  preferredExperience: any;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  executionCount: number;
  lastExecuted?: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  averageLifetimeValue: number;
  conversionRate: number;
}

interface CommunicationTemplate {
  id: string;
  name: string;
  type: string;
  stage: string;
  isActive: boolean;
}

export default function AdvancedCustomerLifecycle() {
  const [activeTab, setActiveTab] = useState('personas');
  const [loading, setLoading] = useState(true);
  const [personas, setPersonas] = useState<PersonaData[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [templates, setTemplates] = useState<CommunicationTemplate[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'personas':
          const personaResponse = await fetch('/api/admin/customer-lifecycle/personas');
          const personaData = await personaResponse.json();
          setSegments(personaData.segments || []);
          break;
        
        case 'automations':
          const automationResponse = await fetch('/api/admin/customer-lifecycle/automations?action=rules');
          const automationData = await automationResponse.json();
          setAutomationRules(automationData.rules || []);
          break;
          
        case 'segments':
          const segmentResponse = await fetch('/api/admin/customer-lifecycle/segments');
          const segmentData = await segmentResponse.json();
          setSegments(segmentData.segments || []);
          break;
          
        case 'communications':
          const commResponse = await fetch('/api/admin/customer-lifecycle/communications?action=templates');
          const commData = await commResponse.json();
          setTemplates(commData.templates || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCustomerPersona = async () => {
    if (!selectedCustomerId) return;
    
    try {
      const response = await fetch(`/api/admin/customer-lifecycle/personas?customerId=${selectedCustomerId}`);
      const data = await response.json();
      
      alert(`Customer Persona Analysis:\nType: ${data.persona.type}\nConfidence: ${(data.persona.confidence * 100).toFixed(1)}%\nCharacteristics: ${data.persona.characteristics.join(', ')}`);
    } catch (error) {
      console.error('Error analyzing persona:', error);
    }
  };

  const executeAutomations = async () => {
    try {
      const response = await fetch('/api/admin/customer-lifecycle/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'execute' })
      });
      
      const data = await response.json();
      alert(`Automation Execution Complete!\n${data.executedCount} rules executed`);
      fetchData();
    } catch (error) {
      console.error('Error executing automations:', error);
    }
  };

  const toggleAutomationRule = async (ruleId: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/admin/customer-lifecycle/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          ruleId,
          updates: { isActive: !isActive }
        })
      });
      
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling automation rule:', error);
    }
  };

  const sendTestCommunication = async (customerId: string) => {
    try {
      const response = await fetch('/api/admin/customer-lifecycle/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          message: 'This is a test message from the advanced customer lifecycle system.',
          priority: 'medium'
        })
      });
      
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error sending test communication:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading advanced customer lifecycle features...</p>
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
            href="/admin/customer-lifecycle"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900 mb-4"
          >
            ← Back to Customer Lifecycle Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Customer Lifecycle Management</h1>
          <p className="text-gray-600 mt-2">AI-powered customer personas, automation, and personalized communications</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <nav className="flex border-b border-gray-200">
            {[
              { key: 'personas', label: 'Customer Personas & Segmentation', icon: '👤' },
              { key: 'automations', label: 'Lifecycle Automations', icon: '⚡' },
              { key: 'communications', label: 'Smart Communications', icon: '📧' },
              { key: 'segments', label: 'Market Segments', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {/* Customer Personas Tab */}
          {activeTab === 'personas' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Customer Persona Analysis</h2>
                <div className="flex items-center space-x-4 mb-6">
                  <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={analyzeCustomerPersona}
                    disabled={!selectedCustomerId}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Analyze Persona
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Informed Advocator</h3>
                    <p className="text-sm text-blue-700 mt-2">Research-oriented, values expert validation, comprehensive information seekers</p>
                    <div className="mt-3 text-xs text-blue-600">
                      Characteristics: High engagement, multiple consultations, detailed communication preference
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900">Cautious Researcher</h3>
                    <p className="text-sm text-green-700 mt-2">Needs guidance and reassurance, prefers human interaction, price-conscious</p>
                    <div className="mt-3 text-xs text-green-600">
                      Characteristics: High-touch support needs, simplified communication, testimonial-driven
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900">Tech-Savvy Optimizer</h3>
                    <p className="text-sm text-purple-700 mt-2">Expects modern experiences, values efficiency, data-driven decisions</p>
                    <div className="mt-3 text-xs text-purple-600">
                      Characteristics: Self-service preference, technical communication, AI-transparency focused
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Automations Tab */}
          {activeTab === 'automations' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Lifecycle Automation Rules</h2>
                  <button
                    onClick={executeAutomations}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Execute All Automations
                  </button>
                </div>
                <div className="space-y-4">
                  {automationRules.map((rule) => (
                    <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{rule.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Executions: {rule.executionCount}</span>
                            {rule.lastExecuted && (
                              <span>Last: {new Date(rule.lastExecuted).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            rule.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rule.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button
                            onClick={() => toggleAutomationRule(rule.id, rule.isActive)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            {rule.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Communications Tab */}
          {activeTab === 'communications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Communication Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          template.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Type: {template.type.toUpperCase()}</p>
                        <p>Stage: {template.stage}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Test Communications</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Customer ID for test message"
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => sendTestCommunication(selectedCustomerId)}
                      disabled={!selectedCustomerId}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      Send Test Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Segments Tab */}
          {activeTab === 'segments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Customer Market Segments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {segments.map((segment) => (
                    <div key={segment.id} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-lg mb-2">{segment.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{segment.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Customers:</span>
                          <span className="font-semibold">{segment.customerCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg LTV:</span>
                          <span className="font-semibold">${segment.averageLifetimeValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Conversion Rate:</span>
                          <span className="font-semibold">{segment.conversionRate}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-left">
              <div className="text-blue-600 mb-2">📊</div>
              <div className="font-semibold">Analyze All Customers</div>
              <div className="text-sm text-gray-600">Run persona analysis on all customers</div>
            </button>
            <button className="bg-green-100 hover:bg-green-200 p-4 rounded-lg text-left">
              <div className="text-green-600 mb-2">🎯</div>
              <div className="font-semibold">Create Campaign</div>
              <div className="text-sm text-gray-600">Set up new automated campaign</div>
            </button>
            <button className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-left">
              <div className="text-purple-600 mb-2">📈</div>
              <div className="font-semibold">View Reports</div>
              <div className="text-sm text-gray-600">Detailed lifecycle analytics</div>
            </button>
            <button className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded-lg text-left">
              <div className="text-yellow-600 mb-2">⚙️</div>
              <div className="font-semibold">Configure Rules</div>
              <div className="text-sm text-gray-600">Manage automation settings</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}