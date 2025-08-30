# Customer Portal API Specification
## AI-Powered Medical Second Opinion Platform

**Version:** 1.0  
**Date:** August 28, 2025  
**Target:** Customer-facing portal integration with customer lifecycle module

---

## Executive Summary

This API specification defines customer-facing endpoints that connect the customer portal with the customer lifecycle module, providing persona-driven experiences, real-time lifecycle updates, communication management, and mobile/web portal support.

### Key Features
- **Persona-driven experiences** with personalized onboarding and content
- **Real-time lifecycle notifications** via WebSocket and Server-Sent Events
- **Communication preference management** with multi-channel support
- **Customer journey data access** with privacy controls
- **Mobile-first design** with progressive web app support
- **Comprehensive security** with JWT authentication and RBAC

---

## Table of Contents

1. [API Architecture Overview](#1-api-architecture-overview)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Customer Profile APIs](#3-customer-profile-apis)
4. [Customer Journey & Lifecycle APIs](#4-customer-journey--lifecycle-apis)
5. [Persona & Personalization APIs](#5-persona--personalization-apis)
6. [Communication Management APIs](#6-communication-management-apis)
7. [Real-time APIs](#7-real-time-apis)
8. [Data Models](#8-data-models)
9. [Error Handling](#9-error-handling)
10. [Rate Limiting](#10-rate-limiting)
11. [Code Examples](#11-code-examples)

---

## 1. API Architecture Overview

### 1.1 API Design Principles

**RESTful Design:**
- Resource-based URLs following REST conventions
- HTTP verbs for action indication (GET, POST, PUT, PATCH, DELETE)
- Stateless request/response pattern
- Consistent response formats across all endpoints

**API Versioning:**
```
Base URL: https://api.secondopinion.com/v1/portal/
Versioning Strategy: URL path versioning (/v1/, /v2/)
Deprecation Policy: 12-month support for previous versions
```

**Response Format:**
```json
{
  "success": true,
  "data": { /* response payload */ },
  "meta": {
    "timestamp": "2025-08-28T10:30:00Z",
    "version": "v1",
    "requestId": "uuid-request-id"
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### 1.2 Security Architecture

**Authentication Flow:**
```
1. Customer login → JWT access token (15 min) + refresh token (30 days)
2. Token refresh → New access token using valid refresh token
3. Token validation → Middleware validates JWT on protected routes
4. Session management → Secure httpOnly cookies for web, secure storage for mobile
```

**Authorization Levels:**
- **Customer**: Own data access only
- **Customer Premium**: Enhanced features and data access
- **Customer Admin**: Multi-account management (family/corporate)

### 1.3 Rate Limiting Strategy

**Tier-based Rate Limits:**
```
Free Tier: 100 requests/hour, 1000 requests/day
Standard Tier: 500 requests/hour, 5000 requests/day
Premium Tier: 2000 requests/hour, 20000 requests/day
```

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1693123200
X-RateLimit-Retry-After: 3600
```

---

## 2. Authentication & Authorization

### 2.1 Customer Authentication

#### POST /v1/portal/auth/login
**Description:** Customer login with email/password or social authentication

**Request:**
```json
{
  "email": "customer@example.com",
  "password": "securepassword123",
  "rememberMe": true,
  "deviceInfo": {
    "userAgent": "Mozilla/5.0...",
    "platform": "web|ios|android",
    "deviceId": "unique-device-identifier"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "8f3a4b2c1d9e5f7g...",
    "expiresIn": 900,
    "tokenType": "Bearer",
    "customer": {
      "id": "cust_12345",
      "email": "customer@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "persona": "informed_advocator",
      "preferences": {
        "language": "en",
        "timezone": "America/New_York",
        "notifications": ["email", "push"]
      }
    }
  }
}
```

#### POST /v1/portal/auth/refresh
**Description:** Refresh access token using refresh token

**Request:**
```json
{
  "refreshToken": "8f3a4b2c1d9e5f7g..."
}
```

#### POST /v1/portal/auth/logout
**Description:** Logout and invalidate tokens

**Request:**
```json
{
  "refreshToken": "8f3a4b2c1d9e5f7g...",
  "allDevices": false
}
```

### 2.2 Social Authentication

#### POST /v1/portal/auth/social
**Description:** Authentication via Google, Apple, or Facebook

**Request:**
```json
{
  "provider": "google|apple|facebook",
  "idToken": "provider-id-token",
  "accessToken": "provider-access-token",
  "deviceInfo": {
    "platform": "web|ios|android"
  }
}
```

### 2.3 Two-Factor Authentication

#### POST /v1/portal/auth/2fa/enable
**Description:** Enable 2FA for account security

#### POST /v1/portal/auth/2fa/verify
**Description:** Verify 2FA code during login

---

## 3. Customer Profile APIs

### 3.1 Profile Management

#### GET /v1/portal/profile
**Description:** Get customer profile with personalization data

**Response:**
```json
{
  "success": true,
  "data": {
    "customer": {
      "id": "cust_12345",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "dateOfBirth": "1985-06-15",
      "address": {
        "street": "123 Main St",
        "city": "Boston",
        "state": "MA",
        "zipCode": "02101",
        "country": "US"
      },
      "preferences": {
        "language": "en",
        "timezone": "America/New_York",
        "currency": "USD",
        "notifications": {
          "email": true,
          "sms": true,
          "push": true,
          "whatsapp": false
        },
        "privacy": {
          "shareDataForResearch": false,
          "allowMarketingEmails": true
        }
      },
      "emergencyContact": {
        "name": "Jane Doe",
        "relationship": "spouse",
        "phone": "+1234567891"
      }
    }
  }
}
```

#### PATCH /v1/portal/profile
**Description:** Update customer profile information

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "preferences": {
    "language": "en",
    "notifications": {
      "email": true,
      "sms": false
    }
  }
}
```

### 3.2 Communication Preferences

#### GET /v1/portal/profile/communication-preferences
**Description:** Get detailed communication preferences

#### PUT /v1/portal/profile/communication-preferences
**Description:** Update communication preferences with channel-specific settings

**Request:**
```json
{
  "channels": {
    "email": {
      "enabled": true,
      "types": ["case_updates", "educational_content", "reminders"],
      "frequency": "immediate|daily|weekly"
    },
    "sms": {
      "enabled": true,
      "types": ["urgent_updates", "appointment_reminders"],
      "quietHours": {
        "start": "22:00",
        "end": "08:00"
      }
    },
    "push": {
      "enabled": true,
      "types": ["all"],
      "quietHours": {
        "start": "22:00",
        "end": "08:00"
      }
    },
    "whatsapp": {
      "enabled": false,
      "types": [],
      "phoneNumber": "+1234567890"
    }
  },
  "globalPreferences": {
    "frequency": "immediate",
    "language": "en",
    "timezone": "America/New_York"
  }
}
```

---

## 4. Customer Journey & Lifecycle APIs

### 4.1 Journey Overview

#### GET /v1/portal/journey
**Description:** Get customer's complete journey and lifecycle data

**Response:**
```json
{
  "success": true,
  "data": {
    "customer": {
      "id": "cust_12345",
      "joinedDate": "2024-01-15T10:30:00Z",
      "currentStage": "active",
      "persona": "informed_advocator"
    },
    "journey": {
      "stages": [
        {
          "stage": "onboarding",
          "startDate": "2024-01-15T10:30:00Z",
          "endDate": "2024-01-16T14:20:00Z",
          "duration": "1 day",
          "milestones": [
            "profile_created",
            "first_case_submitted",
            "payment_completed"
          ]
        },
        {
          "stage": "active",
          "startDate": "2024-01-16T14:20:00Z",
          "endDate": null,
          "duration": "7 months",
          "milestones": [
            "second_case_submitted",
            "referred_friend",
            "premium_upgrade"
          ]
        }
      ],
      "totalCases": 5,
      "completedCases": 4,
      "activeCases": 1,
      "lifetimeValue": 1495.00,
      "healthScore": 85,
      "riskLevel": "low",
      "lastActivity": "2025-08-20T09:15:00Z",
      "nextPredictedAction": "case_submission",
      "nextActionProbability": 0.75
    },
    "milestones": [
      {
        "id": "milestone_1",
        "type": "first_case_submitted",
        "title": "First Second Opinion",
        "description": "You submitted your first case for expert review",
        "date": "2024-01-15T14:30:00Z",
        "icon": "medical-case",
        "celebrated": true
      },
      {
        "id": "milestone_5",
        "type": "loyalty_member",
        "title": "Loyalty Member",
        "description": "You've become a valued member with 5+ cases",
        "date": "2025-06-10T16:45:00Z",
        "icon": "star",
        "celebrated": false
      }
    ]
  }
}
```

### 4.2 Health Score & Insights

#### GET /v1/portal/journey/health-score
**Description:** Get customer health score with improvement recommendations

**Response:**
```json
{
  "success": true,
  "data": {
    "healthScore": 85,
    "previousScore": 78,
    "trend": "improving",
    "riskLevel": "low",
    "factors": {
      "activity": {
        "score": 90,
        "weight": 40,
        "description": "Recent case submissions and portal usage"
      },
      "engagement": {
        "score": 85,
        "weight": 30,
        "description": "Response to communications and feature usage"
      },
      "satisfaction": {
        "score": 80,
        "weight": 30,
        "description": "Case ratings and feedback scores"
      }
    },
    "recommendations": [
      {
        "type": "feature_usage",
        "priority": "medium",
        "title": "Try our Mobile App",
        "description": "Access your cases on-the-go with our mobile app",
        "action": "download_app",
        "expectedImpact": "+5 health score points"
      }
    ],
    "insights": [
      "You're in the top 25% of engaged customers",
      "Your case completion rate is excellent at 95%",
      "Consider referring friends to earn rewards"
    ]
  }
}
```

### 4.3 Activity Timeline

#### GET /v1/portal/journey/timeline
**Description:** Get chronological activity timeline

**Query Parameters:**
- `from`: ISO date (default: 30 days ago)
- `to`: ISO date (default: now)
- `limit`: integer (default: 50, max: 100)
- `types`: array of activity types

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "activity_123",
        "type": "case_submitted",
        "timestamp": "2025-08-25T14:30:00Z",
        "title": "New Case Submitted",
        "description": "Cardiology second opinion case #EU-2025-001234",
        "metadata": {
          "caseNumber": "EU-2025-001234",
          "specialty": "Cardiology"
        },
        "icon": "medical-case",
        "actionable": true,
        "actions": [
          {
            "label": "View Case",
            "url": "/portal/cases/EU-2025-001234"
          }
        ]
      },
      {
        "id": "activity_124",
        "type": "professional_assigned",
        "timestamp": "2025-08-25T16:15:00Z",
        "title": "Expert Assigned",
        "description": "Dr. Sarah Johnson has been assigned to your case",
        "metadata": {
          "caseNumber": "EU-2025-001234",
          "professionalName": "Dr. Sarah Johnson",
          "specialization": "Interventional Cardiology"
        },
        "icon": "doctor",
        "actionable": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 127,
      "totalPages": 3
    }
  }
}
```

---

## 5. Persona & Personalization APIs

### 5.1 Persona Analysis

#### GET /v1/portal/persona
**Description:** Get customer persona analysis and characteristics

**Response:**
```json
{
  "success": true,
  "data": {
    "persona": {
      "type": "informed_advocator",
      "confidence": 0.87,
      "lastUpdated": "2025-08-20T10:30:00Z",
      "characteristics": {
        "primaryTraits": [
          "research_oriented",
          "quality_focused",
          "technology_comfortable",
          "family_centered"
        ],
        "communicationStyle": "detailed",
        "decisionMakingStyle": "collaborative",
        "riskTolerance": "moderate",
        "technologyAdoption": "early_adopter"
      },
      "preferences": {
        "informationDepth": "comprehensive",
        "communicationFrequency": "regular",
        "channelPreferences": ["email", "portal", "phone"],
        "contentTypes": ["educational", "comparison", "expert_insights"]
      },
      "behaviorPredictors": {
        "likelyToRefer": 0.78,
        "likelyToUpgrade": 0.45,
        "likelyToChurn": 0.12,
        "nextActionProbability": {
          "case_submission": 0.65,
          "referral": 0.35,
          "profile_update": 0.20
        }
      }
    },
    "insights": [
      "You value comprehensive information and expert credentials",
      "You prefer detailed explanations and multiple options",
      "You're likely to research extensively before decisions"
    ],
    "recommendations": {
      "ui": {
        "layout": "detailed",
        "navigationStyle": "comprehensive",
        "contentDisplay": "expanded"
      },
      "communication": {
        "tone": "professional",
        "detail_level": "high",
        "frequency": "regular"
      },
      "features": [
        "professional_credentials_display",
        "detailed_case_explanations",
        "comparison_tools",
        "educational_resources"
      ]
    }
  }
}
```

### 5.2 Personalized Experience

#### GET /v1/portal/personalization/dashboard
**Description:** Get personalized dashboard configuration

**Response:**
```json
{
  "success": true,
  "data": {
    "layout": "detailed_grid",
    "widgets": [
      {
        "id": "cases_overview",
        "type": "cases_summary",
        "position": 1,
        "size": "large",
        "config": {
          "showProfessionalDetails": true,
          "showTimelineView": true,
          "defaultView": "detailed"
        }
      },
      {
        "id": "health_insights",
        "type": "health_score",
        "position": 2,
        "size": "medium",
        "config": {
          "showTrends": true,
          "showRecommendations": true
        }
      },
      {
        "id": "educational_content",
        "type": "content_recommendations",
        "position": 3,
        "size": "medium",
        "config": {
          "contentTypes": ["expert_articles", "case_studies"],
          "personalizedTo": "cardiology"
        }
      }
    ],
    "quickActions": [
      {
        "id": "submit_case",
        "label": "Submit New Case",
        "icon": "plus-medical",
        "priority": 1,
        "personalized": true
      },
      {
        "id": "refer_friend",
        "label": "Refer a Friend",
        "icon": "share",
        "priority": 2,
        "personalized": true,
        "context": "You're likely to refer based on your satisfaction"
      }
    ]
  }
}
```

### 5.3 Content Recommendations

#### GET /v1/portal/personalization/content
**Description:** Get personalized content recommendations

**Query Parameters:**
- `type`: content type filter
- `limit`: number of recommendations (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "content_123",
        "type": "educational_article",
        "title": "Understanding Your Cardiac MRI Results",
        "description": "Expert guide to interpreting cardiac imaging",
        "url": "/education/cardiac-mri-guide",
        "relevanceScore": 0.92,
        "personalizedReason": "Based on your recent cardiology case",
        "estimatedReadTime": "8 minutes",
        "author": {
          "name": "Dr. Michael Chen",
          "credentials": "MD, Cardiac Imaging Specialist",
          "photo": "/images/professionals/dr-chen.jpg"
        },
        "tags": ["cardiology", "imaging", "patient_education"]
      }
    ],
    "categories": [
      {
        "name": "Your Specialties",
        "count": 5,
        "items": ["cardiology", "orthopedics"]
      },
      {
        "name": "Trending Topics",
        "count": 3,
        "items": ["ai_in_medicine", "telemedicine", "preventive_care"]
      }
    ]
  }
}
```

---

## 6. Communication Management APIs

### 6.1 Message Center

#### GET /v1/portal/messages
**Description:** Get customer message inbox with threading

**Query Parameters:**
- `type`: message type filter
- `status`: read/unread filter
- `page`: pagination
- `limit`: results per page

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_123",
        "threadId": "thread_456",
        "type": "case_update",
        "from": {
          "type": "professional",
          "id": "pro_789",
          "name": "Dr. Sarah Johnson",
          "title": "Cardiologist"
        },
        "subject": "Your Case Update - EU-2025-001234",
        "preview": "I've completed my initial review of your cardiac imaging...",
        "timestamp": "2025-08-25T14:30:00Z",
        "status": "unread",
        "priority": "normal",
        "attachments": [
          {
            "id": "att_123",
            "name": "preliminary_analysis.pdf",
            "size": "2.1 MB",
            "type": "application/pdf"
          }
        ],
        "actions": [
          {
            "type": "reply",
            "label": "Reply to Dr. Johnson"
          },
          {
            "type": "view_case",
            "label": "View Full Case",
            "url": "/portal/cases/EU-2025-001234"
          }
        ]
      }
    ],
    "summary": {
      "unreadCount": 3,
      "totalMessages": 47,
      "lastActivity": "2025-08-25T14:30:00Z"
    }
  }
}
```

#### POST /v1/portal/messages
**Description:** Send message to professional or support team

**Request:**
```json
{
  "recipientType": "professional|support",
  "recipientId": "pro_789",
  "caseNumber": "EU-2025-001234",
  "subject": "Question about my diagnosis",
  "message": "I have a question about the terminology used in my report...",
  "attachments": ["file_id_123", "file_id_456"],
  "priority": "normal|high|urgent"
}
```

### 6.2 Notification Preferences

#### GET /v1/portal/notifications/preferences
**Description:** Get detailed notification preferences

#### PUT /v1/portal/notifications/preferences
**Description:** Update notification preferences by type and channel

**Request:**
```json
{
  "preferences": {
    "case_updates": {
      "enabled": true,
      "channels": ["email", "push", "sms"],
      "frequency": "immediate",
      "quietHours": {
        "enabled": true,
        "start": "22:00",
        "end": "08:00",
        "timezone": "America/New_York"
      }
    },
    "educational_content": {
      "enabled": true,
      "channels": ["email"],
      "frequency": "weekly",
      "dayOfWeek": "monday",
      "timeOfDay": "09:00"
    },
    "marketing": {
      "enabled": false,
      "channels": [],
      "frequency": "never"
    },
    "system_updates": {
      "enabled": true,
      "channels": ["email", "push"],
      "frequency": "as_needed"
    }
  },
  "globalSettings": {
    "doNotDisturb": {
      "enabled": true,
      "start": "22:00",
      "end": "08:00",
      "timezone": "America/New_York",
      "emergencyOverride": true
    },
    "language": "en",
    "timezone": "America/New_York"
  }
}
```

### 6.3 Communication History

#### GET /v1/portal/communications/history
**Description:** Get customer communication history across all channels

**Query Parameters:**
- `channel`: filter by communication channel
- `dateFrom`: start date filter
- `dateTo`: end date filter
- `type`: communication type filter

**Response:**
```json
{
  "success": true,
  "data": {
    "communications": [
      {
        "id": "comm_123",
        "type": "case_update_notification",
        "channel": "email",
        "status": "delivered",
        "sentAt": "2025-08-25T14:30:00Z",
        "deliveredAt": "2025-08-25T14:30:15Z",
        "openedAt": "2025-08-25T15:45:22Z",
        "subject": "Case Update: Professional Assigned",
        "caseNumber": "EU-2025-001234",
        "metadata": {
          "templateId": "professional_assigned_v2",
          "personalization": {
            "professionalName": "Dr. Sarah Johnson",
            "customerName": "John"
          }
        }
      }
    ],
    "analytics": {
      "totalSent": 156,
      "totalDelivered": 154,
      "totalOpened": 128,
      "totalClicked": 89,
      "averageOpenTime": "2 hours",
      "preferredChannel": "email",
      "engagement": {
        "openRate": 0.83,
        "clickRate": 0.69,
        "responseRate": 0.34
      }
    }
  }
}
```

---

## 7. Real-time APIs

### 7.1 WebSocket Connection

#### WS /v1/portal/ws
**Description:** WebSocket connection for real-time updates

**Connection Flow:**
```javascript
// 1. Authenticate WebSocket connection
const ws = new WebSocket('wss://api.secondopinion.com/v1/portal/ws');

// 2. Send authentication message
ws.send(JSON.stringify({
  type: 'auth',
  token: 'jwt-access-token'
}));

// 3. Subscribe to event types
ws.send(JSON.stringify({
  type: 'subscribe',
  events: ['case_updates', 'messages', 'notifications']
}));
```

**Message Types:**
```javascript
// Case Status Update
{
  "type": "case_status_update",
  "timestamp": "2025-08-25T14:30:00Z",
  "data": {
    "caseNumber": "EU-2025-001234",
    "previousStatus": "submitted",
    "currentStatus": "professional_assigned",
    "professionalInfo": {
      "name": "Dr. Sarah Johnson",
      "specialization": "Cardiology",
      "estimatedCompletion": "2025-08-27T10:00:00Z"
    }
  }
}

// New Message
{
  "type": "message_received",
  "timestamp": "2025-08-25T14:30:00Z",
  "data": {
    "messageId": "msg_123",
    "from": "Dr. Sarah Johnson",
    "caseNumber": "EU-2025-001234",
    "preview": "I've completed my initial review...",
    "urgent": false
  }
}

// Health Score Update
{
  "type": "health_score_update",
  "timestamp": "2025-08-25T14:30:00Z",
  "data": {
    "previousScore": 78,
    "currentScore": 85,
    "trend": "improving",
    "factors": {
      "activity": "increased_engagement"
    }
  }
}
```

### 7.2 Server-Sent Events (SSE)

#### GET /v1/portal/events/stream
**Description:** Server-sent events stream for real-time notifications

**Headers:**
```
Authorization: Bearer jwt-access-token
Accept: text/event-stream
Cache-Control: no-cache
```

**Event Format:**
```
event: case_update
data: {"caseNumber":"EU-2025-001234","status":"professional_assigned"}

event: message
data: {"messageId":"msg_123","from":"Dr. Johnson","urgent":false}

event: heartbeat
data: {"timestamp":"2025-08-25T14:30:00Z","connectionId":"conn_456"}
```

### 7.3 Push Notifications

#### POST /v1/portal/notifications/register-device
**Description:** Register device for push notifications

**Request:**
```json
{
  "platform": "ios|android|web",
  "deviceToken": "device-push-token",
  "deviceId": "unique-device-id",
  "appVersion": "1.2.3",
  "osVersion": "iOS 16.0",
  "preferences": {
    "badge": true,
    "sound": true,
    "alert": true,
    "quietHours": {
      "enabled": true,
      "start": "22:00",
      "end": "08:00"
    }
  }
}
```

#### DELETE /v1/portal/notifications/unregister-device
**Description:** Unregister device from push notifications

---

## 8. Data Models

### 8.1 Customer Profile Model

```typescript
interface CustomerProfile {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    language: string;
    timezone: string;
    currency: string;
    notifications: NotificationPreferences;
    privacy: PrivacyPreferences;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### 8.2 Customer Journey Model

```typescript
interface CustomerJourney {
  customerId: string;
  currentStage: 'onboarding' | 'active' | 'inactive' | 'churned' | 'reactivated';
  stages: CustomerLifecycleStage[];
  metrics: {
    totalCases: number;
    completedCases: number;
    activeCases: number;
    lifetimeValue: number;
    healthScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    lastActivity: string;
  };
  milestones: CustomerMilestone[];
  predictions: {
    nextPredictedAction: string;
    nextActionProbability: number;
    churnRisk: number;
    lifetimeValuePrediction: number;
  };
}
```

### 8.3 Persona Model

```typescript
interface CustomerPersona {
  type: 'informed_advocator' | 'cautious_researcher' | 'tech_savvy_optimizer';
  confidence: number;
  characteristics: {
    primaryTraits: string[];
    communicationStyle: 'detailed' | 'concise' | 'visual';
    decisionMakingStyle: 'independent' | 'collaborative' | 'guided';
    riskTolerance: 'low' | 'moderate' | 'high';
    technologyAdoption: 'laggard' | 'follower' | 'early_adopter';
  };
  preferences: PersonaPreferences;
  behaviorPredictors: {
    likelyToRefer: number;
    likelyToUpgrade: number;
    likelyToChurn: number;
    nextActionProbability: Record<string, number>;
  };
  lastUpdated: string;
}
```

### 8.4 Communication Model

```typescript
interface CommunicationHistory {
  id: string;
  customerId: string;
  type: string;
  channel: 'email' | 'sms' | 'push' | 'whatsapp' | 'in_app';
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
  sentAt: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  subject?: string;
  content: string;
  templateId?: string;
  metadata: {
    caseNumber?: string;
    personalization?: Record<string, any>;
    campaignId?: string;
  };
}
```

---

## 9. Error Handling

### 9.1 Error Response Format

**Standard Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid",
        "code": "INVALID_EMAIL"
      }
    ],
    "requestId": "req_123456",
    "timestamp": "2025-08-25T14:30:00Z"
  }
}
```

### 9.2 Error Codes

**Authentication Errors (4xx):**
```
AUTH_TOKEN_MISSING - 401
AUTH_TOKEN_INVALID - 401
AUTH_TOKEN_EXPIRED - 401
INSUFFICIENT_PERMISSIONS - 403
ACCOUNT_LOCKED - 423
```

**Validation Errors (4xx):**
```
VALIDATION_ERROR - 400
MISSING_REQUIRED_FIELD - 400
INVALID_DATA_FORMAT - 400
DUPLICATE_ENTRY - 409
```

**Resource Errors (4xx):**
```
RESOURCE_NOT_FOUND - 404
RESOURCE_CONFLICT - 409
RESOURCE_GONE - 410
```

**Rate Limiting (4xx):**
```
RATE_LIMIT_EXCEEDED - 429
QUOTA_EXCEEDED - 429
```

**Server Errors (5xx):**
```
INTERNAL_SERVER_ERROR - 500
SERVICE_UNAVAILABLE - 503
GATEWAY_TIMEOUT - 504
```

### 9.3 Error Handling Best Practices

**Client Error Handling:**
```javascript
// Axios interceptor for error handling
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      return handleAuthError(error);
    }
    
    if (error.response?.status === 429) {
      // Handle rate limiting with exponential backoff
      return handleRateLimit(error);
    }
    
    // Show user-friendly error messages
    showErrorMessage(error.response?.data?.error?.message);
    return Promise.reject(error);
  }
);
```

---

## 10. Rate Limiting

### 10.1 Rate Limiting Strategy

**Sliding Window Algorithm:**
- More accurate than fixed windows
- Prevents burst traffic at window boundaries
- Gradual limit enforcement

**Rate Limit Tiers:**
```typescript
interface RateLimitTier {
  name: string;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  specialEndpoints?: {
    [endpoint: string]: {
      requestsPerHour: number;
      requestsPerDay: number;
    };
  };
}

const rateLimitTiers: RateLimitTier[] = [
  {
    name: 'free',
    requestsPerHour: 100,
    requestsPerDay: 1000,
    burstLimit: 10,
    specialEndpoints: {
      '/v1/portal/auth/login': {
        requestsPerHour: 10,
        requestsPerDay: 50
      }
    }
  },
  {
    name: 'premium',
    requestsPerHour: 2000,
    requestsPerDay: 20000,
    burstLimit: 50
  }
];
```

### 10.2 Rate Limit Headers

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1693123200
X-RateLimit-Retry-After: 3600
X-RateLimit-Tier: premium
```

### 10.3 Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "resetTime": "2025-08-25T15:30:00Z",
      "retryAfter": 3600
    }
  }
}
```

---

## 11. Code Examples

### 11.1 Customer Portal Integration

**React Hook for Customer Journey:**
```typescript
// useCustomerJourney.ts
import { useState, useEffect } from 'react';
import { CustomerJourney } from '../types/customer';
import { apiClient } from '../utils/apiClient';

export function useCustomerJourney(customerId: string) {
  const [journey, setJourney] = useState<CustomerJourney | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJourney() {
      try {
        setLoading(true);
        const response = await apiClient.get('/v1/portal/journey');
        setJourney(response.data.data.journey);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch journey');
      } finally {
        setLoading(false);
      }
    }

    fetchJourney();
  }, [customerId]);

  return { journey, loading, error, refetch: fetchJourney };
}
```

**Real-time Updates Hook:**
```typescript
// useRealTimeUpdates.ts
import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useRealTimeUpdates(onUpdate: (event: any) => void) {
  const ws = useRef<WebSocket | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    // Establish WebSocket connection
    ws.current = new WebSocket('wss://api.secondopinion.com/v1/portal/ws');

    ws.current.onopen = () => {
      // Authenticate connection
      ws.current?.send(JSON.stringify({
        type: 'auth',
        token: token
      }));

      // Subscribe to events
      ws.current?.send(JSON.stringify({
        type: 'subscribe',
        events: ['case_updates', 'messages', 'health_score']
      }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    ws.current.onclose = () => {
      // Implement reconnection logic
      setTimeout(() => {
        // Reconnect after delay
      }, 5000);
    };

    return () => {
      ws.current?.close();
    };
  }, [token, onUpdate]);

  return ws.current;
}
```

### 11.2 API Client Implementation

**Type-safe API Client:**
```typescript
// apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CustomerJourney, CustomerPersona, CommunicationHistory } from '../types';

class CustomerPortalAPI {
  private client: AxiosInstance;

  constructor(baseURL: string = 'https://api.secondopinion.com') {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.refreshToken();
          return this.client.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.client.post('/v1/portal/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await this.client.post('/v1/portal/auth/refresh', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return response.data;
  }

  // Customer Journey
  async getJourney(): Promise<CustomerJourney> {
    const response = await this.client.get('/v1/portal/journey');
    return response.data.data.journey;
  }

  async getHealthScore() {
    const response = await this.client.get('/v1/portal/journey/health-score');
    return response.data.data;
  }

  async getActivityTimeline(options?: {
    from?: string;
    to?: string;
    limit?: number;
  }) {
    const response = await this.client.get('/v1/portal/journey/timeline', {
      params: options,
    });
    return response.data.data;
  }

  // Persona & Personalization
  async getPersona(): Promise<CustomerPersona> {
    const response = await this.client.get('/v1/portal/persona');
    return response.data.data.persona;
  }

  async getPersonalizedDashboard() {
    const response = await this.client.get('/v1/portal/personalization/dashboard');
    return response.data.data;
  }

  async getContentRecommendations(type?: string, limit?: number) {
    const response = await this.client.get('/v1/portal/personalization/content', {
      params: { type, limit },
    });
    return response.data.data;
  }

  // Communication
  async getMessages(options?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await this.client.get('/v1/portal/messages', {
      params: options,
    });
    return response.data.data;
  }

  async sendMessage(data: {
    recipientType: 'professional' | 'support';
    recipientId?: string;
    caseNumber?: string;
    subject: string;
    message: string;
    attachments?: string[];
    priority?: 'normal' | 'high' | 'urgent';
  }) {
    const response = await this.client.post('/v1/portal/messages', data);
    return response.data;
  }

  async updateNotificationPreferences(preferences: any) {
    const response = await this.client.put(
      '/v1/portal/notifications/preferences',
      { preferences }
    );
    return response.data;
  }

  async getCommunicationHistory(options?: {
    channel?: string;
    dateFrom?: string;
    dateTo?: string;
    type?: string;
  }): Promise<CommunicationHistory[]> {
    const response = await this.client.get('/v1/portal/communications/history', {
      params: options,
    });
    return response.data.data.communications;
  }

  // Push Notifications
  async registerDevice(deviceData: {
    platform: 'ios' | 'android' | 'web';
    deviceToken: string;
    deviceId: string;
    appVersion: string;
    osVersion: string;
    preferences: any;
  }) {
    const response = await this.client.post(
      '/v1/portal/notifications/register-device',
      deviceData
    );
    return response.data;
  }
}

export const customerPortalAPI = new CustomerPortalAPI();
```

### 11.3 React Components

**Personalized Dashboard Component:**
```tsx
// PersonalizedDashboard.tsx
import React from 'react';
import { useCustomerJourney } from '../hooks/useCustomerJourney';
import { usePersonalization } from '../hooks/usePersonalization';
import { useRealTimeUpdates } from '../hooks/useRealTimeUpdates';

export function PersonalizedDashboard({ customerId }: { customerId: string }) {
  const { journey, loading: journeyLoading } = useCustomerJourney(customerId);
  const { dashboardConfig, loading: configLoading } = usePersonalization();
  const [realtimeUpdates, setRealtimeUpdates] = React.useState([]);

  useRealTimeUpdates((update) => {
    setRealtimeUpdates(prev => [update, ...prev.slice(0, 9)]);
  });

  if (journeyLoading || configLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, {journey?.customer?.firstName}!</h1>
        <div className="health-score">
          <span>Health Score: {journey?.healthScore}</span>
          <HealthScoreTrend trend={journey?.riskLevel} />
        </div>
      </header>

      <div className="dashboard-grid">
        {dashboardConfig?.widgets?.map((widget) => (
          <DashboardWidget
            key={widget.id}
            {...widget}
            data={getWidgetData(widget.type, journey)}
          />
        ))}
      </div>

      <aside className="real-time-updates">
        <h3>Live Updates</h3>
        {realtimeUpdates.map((update, index) => (
          <UpdateNotification key={index} update={update} />
        ))}
      </aside>
    </div>
  );
}
```

**Smart Communication Component:**
```tsx
// SmartCommunication.tsx
import React from 'react';
import { usePersona } from '../hooks/usePersona';
import { useCommunication } from '../hooks/useCommunication';

export function SmartCommunication({ customerId }: { customerId: string }) {
  const { persona } = usePersona(customerId);
  const { messages, sendMessage } = useCommunication();

  const getPersonalizedInterface = () => {
    if (persona?.type === 'informed_advocator') {
      return {
        layout: 'detailed',
        showProfessionalCredentials: true,
        communicationStyle: 'comprehensive'
      };
    }
    
    if (persona?.type === 'cautious_researcher') {
      return {
        layout: 'simple',
        showReassurance: true,
        communicationStyle: 'supportive'
      };
    }

    return {
      layout: 'standard',
      communicationStyle: 'professional'
    };
  };

  const interfaceConfig = getPersonalizedInterface();

  return (
    <div className={`communication-interface ${interfaceConfig.layout}`}>
      <MessageList 
        messages={messages}
        showCredentials={interfaceConfig.showProfessionalCredentials}
        style={interfaceConfig.communicationStyle}
      />
      
      <MessageComposer 
        onSend={sendMessage}
        assistanceLevel={persona?.characteristics?.technologyAdoption}
      />
      
      {interfaceConfig.showReassurance && (
        <TrustIndicators />
      )}
    </div>
  );
}
```

---

## Conclusion

This comprehensive API specification provides a robust foundation for connecting customer portals with the customer lifecycle module. The design emphasizes:

- **Security-first approach** with JWT authentication and comprehensive authorization
- **Real-time capabilities** through WebSocket and SSE implementations  
- **Persona-driven experiences** with personalized content and interfaces
- **Mobile-first design** with progressive web app support
- **Scalable architecture** with proper rate limiting and error handling
- **Developer experience** with type-safe clients and comprehensive documentation

The APIs support the complete customer journey from onboarding through long-term engagement, providing the technical foundation for exceptional customer experiences in the medical second opinion platform.

### Next Steps

1. **Implementation Planning** - Prioritize API endpoints based on customer portal requirements
2. **Security Review** - Conduct comprehensive security assessment of authentication flows
3. **Performance Testing** - Load test critical endpoints and real-time systems
4. **Documentation** - Generate interactive API documentation with Swagger/OpenAPI
5. **SDK Development** - Create client SDKs for web, iOS, and Android platforms