'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  Book,
  FileText,
  Users,
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function SupportPage() {
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How long does it take to get a second opinion?',
      answer: 'Typically, you can expect to receive your second opinion within 3-7 business days, depending on the complexity of your case and the availability of specialists in your medical field.',
      category: 'General'
    },
    {
      id: '2',
      question: 'What documents do I need to upload?',
      answer: 'You should upload all relevant medical records, test results, imaging reports (X-rays, MRIs, CT scans), lab results, and any previous treatment documentation. The more comprehensive your medical information, the better the second opinion.',
      category: 'Documents'
    },
    {
      id: '3',
      question: 'Are second opinions covered by insurance?',
      answer: 'Many insurance plans cover second opinions, especially for serious diagnoses or major treatments. Check with your insurance provider for specific coverage details. We also offer transparent pricing for self-pay patients.',
      category: 'Billing'
    },
    {
      id: '4',
      question: 'How do I know if I need a second opinion?',
      answer: 'Consider a second opinion if you have a serious diagnosis, are facing major surgery, treatment isn\'t working as expected, or you simply want confirmation of your current treatment plan.',
      category: 'General'
    },
    {
      id: '5',
      question: 'What happens after I submit my case?',
      answer: 'After submission, our medical team reviews your case and assigns it to the most appropriate specialist. You\'ll receive updates throughout the process and a comprehensive written report with recommendations.',
      category: 'Process'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support request submitted:', contactForm);
    // Reset form
    setContactForm({
      subject: '',
      category: '',
      message: '',
      priority: 'medium'
    });
    alert('Your support request has been submitted. We\'ll get back to you soon!');
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-1">Get help and find answers to your questions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Live Chat</div>
                    <div className="text-sm text-gray-500">Available 24/7</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Phone Support</div>
                    <div className="text-sm text-gray-500">1-800-MEDICAL</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email Support</div>
                    <div className="text-sm text-gray-500">support@medical.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Support Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium">9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="mt-3 p-2 bg-green-50 rounded text-green-700 text-xs">
                  Emergency support available 24/7
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={contactForm.category}
                      onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="general">General Question</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="medical">Medical Inquiry</option>
                      <option value="account">Account Issue</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe your question or issue in detail..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-3 text-gray-600 border-t border-gray-100">
                        <p className="mt-2">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Links */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-blue-600" />
                  Knowledge Base
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guides and tutorials to help you get the most out of our platform.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse Articles →
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Community Forum
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with other users and share experiences in our community forum.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Join Community →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}