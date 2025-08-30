# Real-time API Design for Customer Portal
## WebSocket, Server-Sent Events, and Push Notifications

**Version:** 1.0  
**Date:** August 28, 2025  
**Target:** Real-time customer engagement and lifecycle updates

---

## Executive Summary

This document defines the real-time API architecture for the customer portal, enabling instant notifications, live case updates, and seamless customer lifecycle experiences. The design implements multiple real-time communication channels including WebSocket connections, Server-Sent Events, and push notifications to ensure customers receive immediate updates across all platforms.

### Real-time Capabilities
- **WebSocket connections** for bidirectional real-time communication
- **Server-Sent Events (SSE)** for server-initiated updates
- **Push notifications** for mobile and web platforms
- **Real-time case status updates** with professional assignments
- **Live customer journey tracking** with milestone celebrations
- **Instant messaging** between customers and professionals
- **Proactive lifecycle notifications** based on persona and stage

---

## Table of Contents

1. [Real-time Architecture Overview](#1-real-time-architecture-overview)
2. [WebSocket Implementation](#2-websocket-implementation)
3. [Server-Sent Events (SSE)](#3-server-sent-events-sse)
4. [Push Notification System](#4-push-notification-system)
5. [Real-time Event Types](#5-real-time-event-types)
6. [Scalability & Performance](#6-scalability--performance)
7. [Implementation Examples](#7-implementation-examples)
8. [Mobile Integration](#8-mobile-integration)

---

## 1. Real-time Architecture Overview

### 1.1 Communication Channels Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Real-time Communication Stack                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐   │
│  │   WebSocket     │    │  Server-Sent    │    │  Push           │   │
│  │   Bidirectional │    │  Events (SSE)   │    │  Notifications  │   │
│  │   • Chat        │    │  • Updates      │    │  • Mobile       │   │
│  │   • Live Data   │    │  • Status       │    │  • Background   │   │
│  │   • Commands    │    │  • Events       │    │  • Critical     │   │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘   │
│           │                       │                       │         │
│           └───────────────────────┼───────────────────────┘         │
│                                   │                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │              Real-time Message Router                          │ │
│  │  • Event filtering by customer ID and preferences              │ │
│  │  • Channel selection (WebSocket/SSE/Push)                      │ │
│  │  • Message queuing for offline customers                       │ │
│  │  • Delivery confirmation and retry logic                       │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                   │                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                Event Processing Engine                          │ │
│  │  • Customer lifecycle events                                   │ │
│  │  • Case status changes                                         │ │
│  │  • Professional assignments                                    │ │
│  │  • Journey milestone achievements                              │ │
│  │  • Communication messages                                      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                   │                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    Data Sources                                 │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │ │
│  │  │ Case System   │  │ Lifecycle     │  │ Communication │       │ │
│  │  │ Updates       │  │ Service       │  │ Service       │       │ │
│  │  └───────────────┘  └───────────────┘  └───────────────┘       │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Real-time Event Flow

**Event Lifecycle:**
```
1. Business Event Occurs → 2. Event Processing → 3. Customer Filtering → 4. Channel Selection → 5. Delivery
```

**Event Processing Pipeline:**
```typescript
// Event processing flow
interface EventProcessingFlow {
  source: 'case_system' | 'lifecycle_service' | 'communication_service' | 'ai_service';
  event: BusinessEvent;
  processing: {
    validation: boolean;
    customerFiltering: string[];
    personalization: PersonalizationRules;
    channelSelection: DeliveryChannel[];
  };
  delivery: {
    immediate: DeliveryChannel[];
    queued: QueuedDelivery[];
    failed: FailedDelivery[];
  };
}
```

### 1.3 Connection Management

**Connection Pool Architecture:**
```typescript
// Connection management system
class ConnectionManager {
  private connections: Map<string, CustomerConnection> = new Map();
  private heartbeatInterval: NodeJS.Timer;

  async addConnection(customerId: string, connection: CustomerConnection) {
    // Store connection with customer mapping
    this.connections.set(customerId, connection);
    
    // Setup heartbeat monitoring
    this.setupHeartbeat(customerId, connection);
    
    // Send connection acknowledgment
    await this.sendConnectionAck(connection);
  }

  async broadcast(event: RealtimeEvent, targetCustomers?: string[]) {
    const targets = targetCustomers || Array.from(this.connections.keys());
    
    await Promise.allSettled(
      targets.map(customerId => this.sendToCustomer(customerId, event))
    );
  }

  private setupHeartbeat(customerId: string, connection: CustomerConnection) {
    const interval = setInterval(() => {
      if (connection.readyState === WebSocket.OPEN) {
        connection.ping();
      } else {
        this.removeConnection(customerId);
        clearInterval(interval);
      }
    }, 30000); // 30 second heartbeat
  }
}

interface CustomerConnection extends WebSocket {
  customerId: string;
  deviceId: string;
  subscriptions: string[];
  lastActivity: Date;
  metadata: {
    platform: 'web' | 'ios' | 'android';
    version: string;
    userAgent?: string;
  };
}
```

---

## 2. WebSocket Implementation

### 2.1 WebSocket Server Architecture

```typescript
// websocketServer.ts
import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { URL } from 'url';
import { AuthenticationService } from './authenticationService';
import { CustomerLifecycleService } from './customerLifecycleService';

export class CustomerPortalWebSocketServer {
  private wss: WebSocketServer;
  private authService: AuthenticationService;
  private lifecycleService: CustomerLifecycleService;
  private connectionManager: ConnectionManager;

  constructor(server: any) {
    this.wss = new WebSocketServer({ 
      server,
      path: '/v1/portal/ws',
      verifyClient: this.verifyClient.bind(this)
    });

    this.authService = new AuthenticationService();
    this.lifecycleService = new CustomerLifecycleService();
    this.connectionManager = new ConnectionManager();

    this.setupWebSocketServer();
  }

  private async verifyClient(info: { origin: string; secure: boolean; req: IncomingMessage }): Promise<boolean> {
    try {
      // Verify origin
      const allowedOrigins = process.env.ALLOWED_WS_ORIGINS?.split(',') || [
        'https://portal.secondopinion.com',
        'https://app.secondopinion.com'
      ];

      if (!allowedOrigins.includes(info.origin)) {
        return false;
      }

      // Additional security checks can be added here
      return true;

    } catch (error) {
      console.error('WebSocket client verification failed:', error);
      return false;
    }
  }

  private setupWebSocketServer() {
    this.wss.on('connection', async (ws: WebSocket, request: IncomingMessage) => {
      try {
        // Parse URL for initial parameters
        const url = new URL(request.url!, `http://${request.headers.host}`);
        const token = url.searchParams.get('token');

        if (!token) {
          ws.close(1008, 'Authentication token required');
          return;
        }

        // Authenticate connection
        const tokenPayload = await this.authService.validateAccessToken(token);
        const customer = await this.customerRepository.findById(tokenPayload.sub);

        if (!customer) {
          ws.close(1008, 'Invalid customer');
          return;
        }

        // Setup customer connection
        const connection = this.createCustomerConnection(ws, customer, request);
        await this.connectionManager.addConnection(customer.id, connection);

        // Setup message handlers
        this.setupMessageHandlers(connection);

        // Send welcome message with customer data
        await this.sendWelcomeMessage(connection);

        console.log(`WebSocket connection established for customer ${customer.id}`);

      } catch (error) {
        console.error('WebSocket connection setup failed:', error);
        ws.close(1011, 'Server error');
      }
    });

    this.wss.on('error', (error) => {
      console.error('WebSocket server error:', error);
    });
  }

  private createCustomerConnection(
    ws: WebSocket, 
    customer: Customer, 
    request: IncomingMessage
  ): CustomerConnection {
    const connection = ws as CustomerConnection;
    
    connection.customerId = customer.id;
    connection.deviceId = this.extractDeviceId(request);
    connection.subscriptions = ['case_updates', 'messages', 'journey_updates'];
    connection.lastActivity = new Date();
    connection.metadata = {
      platform: this.detectPlatform(request.headers['user-agent'] || ''),
      version: this.extractClientVersion(request.headers['user-agent'] || ''),
      userAgent: request.headers['user-agent']
    };

    return connection;
  }

  private setupMessageHandlers(connection: CustomerConnection) {
    connection.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        await this.handleMessage(connection, message);
      } catch (error) {
        console.error('WebSocket message handling error:', error);
        connection.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format'
        }));
      }
    });

    connection.on('close', (code: number, reason: Buffer) => {
      console.log(`WebSocket connection closed for customer ${connection.customerId}: ${code} ${reason.toString()}`);
      this.connectionManager.removeConnection(connection.customerId);
    });

    connection.on('error', (error: Error) => {
      console.error(`WebSocket error for customer ${connection.customerId}:`, error);
    });

    connection.on('pong', () => {
      connection.lastActivity = new Date();
    });
  }

  private async handleMessage(connection: CustomerConnection, message: any) {
    const { type, payload } = message;

    switch (type) {
      case 'subscribe':
        await this.handleSubscription(connection, payload);
        break;

      case 'unsubscribe':
        await this.handleUnsubscription(connection, payload);
        break;

      case 'send_message':
        await this.handleSendMessage(connection, payload);
        break;

      case 'update_preferences':
        await this.handleUpdatePreferences(connection, payload);
        break;

      case 'ping':
        connection.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        break;

      default:
        connection.send(JSON.stringify({
          type: 'error',
          message: 'Unknown message type',
          receivedType: type
        }));
    }
  }

  private async handleSubscription(connection: CustomerConnection, payload: any) {
    const { events } = payload;
    
    if (Array.isArray(events)) {
      // Validate subscription permissions
      const allowedEvents = await this.getAllowedEvents(connection.customerId);
      const validEvents = events.filter(event => allowedEvents.includes(event));
      
      connection.subscriptions = [...new Set([...connection.subscriptions, ...validEvents])];
      
      connection.send(JSON.stringify({
        type: 'subscription_confirmed',
        subscriptions: connection.subscriptions
      }));
    }
  }

  private async sendWelcomeMessage(connection: CustomerConnection) {
    // Get customer journey data
    const journey = await this.lifecycleService.getCustomerJourney(connection.customerId);
    const unreadMessages = await this.getUnreadMessageCount(connection.customerId);

    connection.send(JSON.stringify({
      type: 'welcome',
      timestamp: new Date().toISOString(),
      data: {
        customerId: connection.customerId,
        subscriptions: connection.subscriptions,
        journey: {
          currentStage: journey?.currentStage.stage,
          healthScore: journey?.metrics.healthScore,
          activeCases: journey?.metrics.activeCases
        },
        notifications: {
          unreadMessages
        }
      }
    }));
  }

  // Public method to broadcast events to specific customers
  async broadcastToCustomers(customerIds: string[], event: RealtimeEvent) {
    await this.connectionManager.broadcast(event, customerIds);
  }

  // Public method to send event to single customer
  async sendToCustomer(customerId: string, event: RealtimeEvent) {
    const connection = this.connectionManager.getConnection(customerId);
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(event));
    }
  }
}

// WebSocket message types
interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'send_message' | 'update_preferences' | 'ping';
  payload: any;
  requestId?: string;
  timestamp: string;
}

interface RealtimeEvent {
  type: string;
  timestamp: string;
  data: any;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  persistent?: boolean; // Should be queued if customer offline
}
```

### 2.2 WebSocket Client Implementation

```typescript
// websocketClient.ts
export class CustomerPortalWebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor(
    private baseUrl: string,
    private getAccessToken: () => string | null
  ) {}

  async connect(): Promise<void> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('Access token required for WebSocket connection');
    }

    const wsUrl = `${this.baseUrl.replace('http', 'ws')}/v1/portal/ws?token=${encodeURIComponent(token)}`;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.setupHeartbeat();
        resolve();
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.cleanup();
        
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      // Connection timeout
      setTimeout(() => {
        if (this.ws?.readyState !== WebSocket.OPEN) {
          this.ws?.close();
          reject(new Error('WebSocket connection timeout'));
        }
      }, 10000);
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
    }
    this.cleanup();
  }

  subscribe(events: string[]): void {
    this.send({
      type: 'subscribe',
      payload: { events },
      timestamp: new Date().toISOString()
    });
  }

  unsubscribe(events: string[]): void {
    this.send({
      type: 'unsubscribe',
      payload: { events },
      timestamp: new Date().toISOString()
    });
  }

  sendMessage(recipientType: string, recipientId: string, message: string, caseNumber?: string): void {
    this.send({
      type: 'send_message',
      payload: {
        recipientType,
        recipientId,
        message,
        caseNumber
      },
      timestamp: new Date().toISOString()
    });
  }

  on(eventType: string, handler: Function): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  off(eventType: string, handler?: Function): void {
    if (!handler) {
      this.eventHandlers.delete(eventType);
    } else {
      const handlers = this.eventHandlers.get(eventType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    }
  }

  private send(message: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message not sent:', message);
    }
  }

  private handleMessage(message: any): void {
    const { type, data } = message;
    
    // Emit to specific event handlers
    const handlers = this.eventHandlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data, message);
        } catch (error) {
          console.error('Error in WebSocket event handler:', error);
        }
      });
    }

    // Emit to generic message handlers
    const genericHandlers = this.eventHandlers.get('message');
    if (genericHandlers) {
      genericHandlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Error in WebSocket message handler:', error);
        }
      });
    }
  }

  private setupHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping', timestamp: new Date().toISOString() });
      }
    }, 30000);
  }

  private scheduleReconnect(): void {
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      console.log(`Attempting WebSocket reconnection (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.connect().catch(error => {
        console.error('WebSocket reconnection failed:', error);
      });
    }, delay);
  }

  private cleanup(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  get connectionState(): string {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting';
      case WebSocket.OPEN: return 'connected';
      case WebSocket.CLOSING: return 'closing';
      case WebSocket.CLOSED: return 'closed';
      default: return 'unknown';
    }
  }
}

// React hook for WebSocket
export function useWebSocket(baseUrl: string, getAccessToken: () => string | null) {
  const [client, setClient] = useState<CustomerPortalWebSocketClient | null>(null);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const wsClient = new CustomerPortalWebSocketClient(baseUrl, getAccessToken);
    
    wsClient.on('message', (message) => {
      setLastMessage(message);
    });

    wsClient.connect().then(() => {
      setConnectionState('connected');
      setClient(wsClient);
    }).catch(error => {
      console.error('WebSocket connection failed:', error);
      setConnectionState('error');
    });

    return () => {
      wsClient.disconnect();
      setClient(null);
      setConnectionState('disconnected');
    };
  }, [baseUrl, getAccessToken]);

  return {
    client,
    connectionState,
    lastMessage,
    isConnected: connectionState === 'connected'
  };
}
```

---

## 3. Server-Sent Events (SSE)

### 3.1 SSE Server Implementation

```typescript
// sseServer.ts
import { NextRequest, NextResponse } from 'next/server';
import { AuthenticationService } from './authenticationService';

export class ServerSentEventsService {
  private connections: Map<string, SSEConnection> = new Map();
  private authService: AuthenticationService;

  constructor() {
    this.authService = new AuthenticationService();
  }

  async handleSSERequest(req: NextRequest): Promise<NextResponse> {
    try {
      // Validate authentication
      const token = req.headers.get('authorization')?.replace('Bearer ', '');
      if (!token) {
        return NextResponse.json({ error: 'Authorization required' }, { status: 401 });
      }

      const tokenPayload = await this.authService.validateAccessToken(token);
      const customerId = tokenPayload.sub;

      // Create SSE response
      const stream = new ReadableStream({
        start: (controller) => {
          const connection: SSEConnection = {
            customerId,
            controller,
            lastPing: Date.now(),
            subscriptions: req.nextUrl.searchParams.getAll('events') || ['all']
          };

          this.connections.set(customerId, connection);

          // Send initial connection event
          this.sendSSEMessage(controller, {
            type: 'connection_established',
            data: {
              customerId,
              subscriptions: connection.subscriptions,
              timestamp: new Date().toISOString()
            }
          });

          // Setup ping interval
          const pingInterval = setInterval(() => {
            if (this.connections.has(customerId)) {
              this.sendSSEMessage(controller, {
                type: 'ping',
                data: { timestamp: Date.now() }
              });
            } else {
              clearInterval(pingInterval);
            }
          }, 30000);

          return () => {
            clearInterval(pingInterval);
            this.connections.delete(customerId);
          };
        }
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Cache-Control'
        }
      });

    } catch (error) {
      console.error('SSE connection error:', error);
      return NextResponse.json({ error: 'Connection failed' }, { status: 500 });
    }
  }

  async broadcastToCustomer(customerId: string, event: RealtimeEvent): Promise<boolean> {
    const connection = this.connections.get(customerId);
    if (!connection) {
      return false;
    }

    try {
      // Check if customer is subscribed to this event type
      if (!this.isSubscribed(connection, event.type)) {
        return false;
      }

      this.sendSSEMessage(connection.controller, event);
      return true;

    } catch (error) {
      console.error(`Failed to send SSE message to customer ${customerId}:`, error);
      this.connections.delete(customerId);
      return false;
    }
  }

  async broadcastToAll(event: RealtimeEvent, filter?: (customerId: string) => boolean): Promise<number> {
    let successCount = 0;
    
    for (const [customerId, connection] of this.connections.entries()) {
      if (filter && !filter(customerId)) {
        continue;
      }

      if (await this.broadcastToCustomer(customerId, event)) {
        successCount++;
      }
    }

    return successCount;
  }

  private sendSSEMessage(controller: ReadableStreamDefaultController, event: RealtimeEvent): void {
    const eventData = `event: ${event.type}\ndata: ${JSON.stringify(event.data)}\nid: ${Date.now()}\n\n`;
    controller.enqueue(new TextEncoder().encode(eventData));
  }

  private isSubscribed(connection: SSEConnection, eventType: string): boolean {
    return connection.subscriptions.includes('all') || 
           connection.subscriptions.includes(eventType) ||
           connection.subscriptions.some(sub => eventType.startsWith(sub));
  }

  getActiveConnectionCount(): number {
    return this.connections.size;
  }

  getCustomerConnectionInfo(customerId: string): SSEConnectionInfo | null {
    const connection = this.connections.get(customerId);
    if (!connection) return null;

    return {
      customerId,
      connectedAt: new Date(connection.lastPing),
      subscriptions: connection.subscriptions,
      isActive: Date.now() - connection.lastPing < 60000 // Active if pinged within last minute
    };
  }
}

interface SSEConnection {
  customerId: string;
  controller: ReadableStreamDefaultController;
  lastPing: number;
  subscriptions: string[];
}

interface SSEConnectionInfo {
  customerId: string;
  connectedAt: Date;
  subscriptions: string[];
  isActive: boolean;
}

// SSE API Route Implementation
// /api/v1/portal/events/stream/route.ts
export async function GET(req: NextRequest) {
  const sseService = new ServerSentEventsService();
  return await sseService.handleSSERequest(req);
}
```

### 3.2 SSE Client Implementation

```typescript
// sseClient.ts
export class SSEClient {
  private eventSource: EventSource | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor(
    private baseUrl: string,
    private getAccessToken: () => string | null,
    private subscriptions: string[] = ['all']
  ) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const token = this.getAccessToken();
      if (!token) {
        reject(new Error('Access token required'));
        return;
      }

      const url = new URL(`${this.baseUrl}/v1/portal/events/stream`);
      this.subscriptions.forEach(sub => url.searchParams.append('events', sub));

      this.eventSource = new EventSource(url.toString(), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      this.eventSource.onopen = () => {
        console.log('SSE connection established');
        this.reconnectAttempts = 0;
        resolve();
      };

      this.eventSource.onmessage = (event) => {
        this.handleMessage('message', event);
      };

      this.eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        
        if (this.eventSource?.readyState === EventSource.CLOSED) {
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect();
          } else {
            reject(new Error('Max reconnection attempts reached'));
          }
        }
      };

      // Setup event listeners for different event types
      this.setupEventListeners();
    });
  }

  private setupEventListeners(): void {
    if (!this.eventSource) return;

    // Case update events
    this.eventSource.addEventListener('case_status_update', (event) => {
      this.handleMessage('case_status_update', event);
    });

    // Message events
    this.eventSource.addEventListener('message_received', (event) => {
      this.handleMessage('message_received', event);
    });

    // Journey events
    this.eventSource.addEventListener('journey_milestone', (event) => {
      this.handleMessage('journey_milestone', event);
    });

    // Health score updates
    this.eventSource.addEventListener('health_score_update', (event) => {
      this.handleMessage('health_score_update', event);
    });

    // Professional assignment
    this.eventSource.addEventListener('professional_assigned', (event) => {
      this.handleMessage('professional_assigned', event);
    });

    // Connection events
    this.eventSource.addEventListener('connection_established', (event) => {
      this.handleMessage('connection_established', event);
    });

    this.eventSource.addEventListener('ping', (event) => {
      // Handle ping for connection health
    });
  }

  private handleMessage(type: string, event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      
      // Emit to specific event handlers
      const handlers = this.eventHandlers.get(type);
      if (handlers) {
        handlers.forEach(handler => {
          try {
            handler(data, event);
          } catch (error) {
            console.error(`Error in SSE ${type} handler:`, error);
          }
        });
      }

      // Emit to generic event handlers
      const genericHandlers = this.eventHandlers.get('*');
      if (genericHandlers) {
        genericHandlers.forEach(handler => {
          try {
            handler({ type, data }, event);
          } catch (error) {
            console.error('Error in SSE generic handler:', error);
          }
        });
      }

    } catch (error) {
      console.error('Error parsing SSE message:', error);
    }
  }

  on(eventType: string, handler: Function): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  off(eventType: string, handler?: Function): void {
    if (!handler) {
      this.eventHandlers.delete(eventType);
    } else {
      const handlers = this.eventHandlers.get(eventType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private scheduleReconnect(): void {
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      console.log(`Attempting SSE reconnection (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.connect().catch(error => {
        console.error('SSE reconnection failed:', error);
      });
    }, delay);
  }

  get connectionState(): 'connecting' | 'open' | 'closed' {
    if (!this.eventSource) return 'closed';
    
    switch (this.eventSource.readyState) {
      case EventSource.CONNECTING: return 'connecting';
      case EventSource.OPEN: return 'open';
      case EventSource.CLOSED: return 'closed';
      default: return 'closed';
    }
  }

  get isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN;
  }
}

// React Hook for SSE
export function useSSE(
  baseUrl: string, 
  getAccessToken: () => string | null,
  subscriptions?: string[]
) {
  const [client, setClient] = useState<SSEClient | null>(null);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [lastEvent, setLastEvent] = useState<any>(null);

  useEffect(() => {
    const sseClient = new SSEClient(baseUrl, getAccessToken, subscriptions);
    
    sseClient.on('*', (event) => {
      setLastEvent(event);
    });

    sseClient.connect().then(() => {
      setConnectionState('connected');
      setClient(sseClient);
    }).catch(error => {
      console.error('SSE connection failed:', error);
      setConnectionState('error');
    });

    return () => {
      sseClient.disconnect();
      setClient(null);
      setConnectionState('disconnected');
    };
  }, [baseUrl, getAccessToken, subscriptions]);

  return {
    client,
    connectionState,
    lastEvent,
    isConnected: connectionState === 'connected'
  };
}
```

---

## 4. Push Notification System

### 4.1 Push Notification Service

```typescript
// pushNotificationService.ts
import webpush from 'web-push';
import { FCMService } from './fcmService';
import { APNService } from './apnService';

export class PushNotificationService {
  private fcmService: FCMService;
  private apnService: APNService;
  private webPushConfig: any;

  constructor() {
    // Initialize services
    this.fcmService = new FCMService();
    this.apnService = new APNService();
    
    // Configure web push
    webpush.setVapidDetails(
      'mailto:support@secondopinion.com',
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    );
  }

  async registerDevice(customerId: string, deviceData: PushDeviceRegistration): Promise<boolean> {
    try {
      // Store device registration
      await this.storeDeviceRegistration(customerId, deviceData);

      // Platform-specific setup
      switch (deviceData.platform) {
        case 'web':
          await this.setupWebPushSubscription(customerId, deviceData);
          break;
        case 'ios':
          await this.setupAPNSDevice(customerId, deviceData);
          break;
        case 'android':
          await this.setupFCMDevice(customerId, deviceData);
          break;
      }

      return true;
    } catch (error) {
      console.error('Device registration failed:', error);
      return false;
    }
  }

  async sendPushNotification(
    customerId: string, 
    notification: PushNotificationPayload
  ): Promise<PushNotificationResult> {
    try {
      // Get customer's registered devices
      const devices = await this.getCustomerDevices(customerId);
      
      if (devices.length === 0) {
        return { success: false, reason: 'No registered devices' };
      }

      // Check if customer allows this type of notification
      const preferences = await this.getNotificationPreferences(customerId);
      if (!this.shouldSendNotification(notification, preferences)) {
        return { success: false, reason: 'User preferences block notification' };
      }

      // Send to all registered devices
      const results = await Promise.allSettled(
        devices.map(device => this.sendToDevice(device, notification))
      );

      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      // Update delivery statistics
      await this.recordDeliveryStats(customerId, notification.type, successful, failed);

      return {
        success: successful > 0,
        totalDevices: devices.length,
        successful,
        failed,
        details: results
      };

    } catch (error) {
      console.error('Push notification failed:', error);
      return { success: false, reason: error.message };
    }
  }

  async sendBulkNotifications(
    notifications: Array<{ customerId: string; notification: PushNotificationPayload }>
  ): Promise<BulkNotificationResult> {
    const results = await Promise.allSettled(
      notifications.map(({ customerId, notification }) => 
        this.sendPushNotification(customerId, notification)
      )
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return {
      total: notifications.length,
      successful,
      failed,
      results
    };
  }

  private async sendToDevice(
    device: RegisteredDevice, 
    notification: PushNotificationPayload
  ): Promise<boolean> {
    const payload = this.formatPayloadForPlatform(device.platform, notification);

    switch (device.platform) {
      case 'web':
        return await this.sendWebPush(device, payload);
      case 'ios':
        return await this.sendAPNS(device, payload);
      case 'android':
        return await this.sendFCM(device, payload);
      default:
        throw new Error(`Unsupported platform: ${device.platform}`);
    }
  }

  private async sendWebPush(device: RegisteredDevice, payload: any): Promise<boolean> {
    try {
      const subscription = {
        endpoint: device.endpoint,
        keys: {
          p256dh: device.p256dhKey,
          auth: device.authKey
        }
      };

      await webpush.sendNotification(subscription, JSON.stringify(payload));
      return true;
    } catch (error) {
      console.error('Web push failed:', error);
      
      // Remove invalid subscriptions
      if (error.statusCode === 410 || error.statusCode === 404) {
        await this.removeInvalidDevice(device.id);
      }
      
      return false;
    }
  }

  private async sendFCM(device: RegisteredDevice, payload: any): Promise<boolean> {
    return await this.fcmService.send(device.token, payload);
  }

  private async sendAPNS(device: RegisteredDevice, payload: any): Promise<boolean> {
    return await this.apnService.send(device.token, payload);
  }

  private formatPayloadForPlatform(platform: string, notification: PushNotificationPayload): any {
    const basePayload = {
      title: notification.title,
      body: notification.body,
      icon: notification.icon || '/icons/notification-icon.png',
      badge: notification.badge || '/icons/badge-icon.png',
      data: notification.data,
      actions: notification.actions
    };

    switch (platform) {
      case 'web':
        return {
          ...basePayload,
          requireInteraction: notification.priority === 'high',
          silent: notification.silent || false,
          tag: notification.tag || notification.type,
          timestamp: Date.now()
        };

      case 'android':
        return {
          notification: basePayload,
          data: notification.data,
          android: {
            priority: notification.priority === 'high' ? 'high' : 'normal',
            channelId: this.getAndroidChannelId(notification.type),
            sound: notification.sound || 'default'
          }
        };

      case 'ios':
        return {
          aps: {
            alert: {
              title: notification.title,
              body: notification.body
            },
            badge: notification.badge,
            sound: notification.sound || 'default',
            'content-available': notification.contentAvailable ? 1 : 0,
            category: notification.category || notification.type
          },
          data: notification.data
        };

      default:
        return basePayload;
    }
  }

  private shouldSendNotification(
    notification: PushNotificationPayload, 
    preferences: NotificationPreferences
  ): boolean {
    // Check global preferences
    if (!preferences.pushEnabled) {
      return false;
    }

    // Check quiet hours
    if (preferences.quietHours?.enabled && this.isInQuietHours(preferences.quietHours)) {
      // Only allow urgent notifications during quiet hours
      return notification.priority === 'urgent';
    }

    // Check type-specific preferences
    const typePrefs = preferences.types[notification.type];
    if (typePrefs && !typePrefs.enabled) {
      return false;
    }

    return true;
  }

  private isInQuietHours(quietHours: QuietHours): boolean {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const startTime = this.parseTime(quietHours.start);
    const endTime = this.parseTime(quietHours.end);

    if (startTime < endTime) {
      // Same day quiet hours (e.g., 22:00 to 08:00 next day)
      return currentTime >= startTime || currentTime < endTime;
    } else {
      // Overnight quiet hours (e.g., 22:00 to 08:00)
      return currentTime >= startTime && currentTime < endTime;
    }
  }

  private parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private getAndroidChannelId(notificationType: string): string {
    const channelMap = {
      'case_updates': 'case_notifications',
      'messages': 'message_notifications',
      'journey_milestones': 'achievement_notifications',
      'urgent': 'urgent_notifications'
    };

    return channelMap[notificationType] || 'default_notifications';
  }

  async createNotificationTemplate(template: NotificationTemplate): Promise<string> {
    const templateId = `template_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    await this.storeNotificationTemplate(templateId, template);
    
    return templateId;
  }

  async sendFromTemplate(
    customerId: string,
    templateId: string,
    variables: Record<string, string>
  ): Promise<PushNotificationResult> {
    const template = await this.getNotificationTemplate(templateId);
    if (!template) {
      throw new Error('Notification template not found');
    }

    const notification = this.renderTemplate(template, variables);
    return await this.sendPushNotification(customerId, notification);
  }

  private renderTemplate(
    template: NotificationTemplate, 
    variables: Record<string, string>
  ): PushNotificationPayload {
    let title = template.title;
    let body = template.body;

    // Replace variables in title and body
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      title = title.replace(new RegExp(placeholder, 'g'), value);
      body = body.replace(new RegExp(placeholder, 'g'), value);
    });

    return {
      type: template.type,
      title,
      body,
      icon: template.icon,
      data: { ...template.data, ...variables },
      priority: template.priority,
      actions: template.actions
    };
  }
}

// Interfaces
interface PushDeviceRegistration {
  platform: 'web' | 'ios' | 'android';
  token?: string;
  endpoint?: string;
  p256dhKey?: string;
  authKey?: string;
  deviceId: string;
  appVersion: string;
  osVersion: string;
  preferences: {
    badge: boolean;
    sound: boolean;
    alert: boolean;
    quietHours?: QuietHours;
  };
}

interface PushNotificationPayload {
  type: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, any>;
  actions?: NotificationAction[];
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  silent?: boolean;
  sound?: string;
  tag?: string;
  category?: string;
  contentAvailable?: boolean;
}

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

interface PushNotificationResult {
  success: boolean;
  reason?: string;
  totalDevices?: number;
  successful?: number;
  failed?: number;
  details?: any[];
}

interface BulkNotificationResult {
  total: number;
  successful: number;
  failed: number;
  results: any[];
}

interface RegisteredDevice {
  id: string;
  customerId: string;
  platform: 'web' | 'ios' | 'android';
  token?: string;
  endpoint?: string;
  p256dhKey?: string;
  authKey?: string;
  deviceId: string;
  lastUsed: Date;
  active: boolean;
}

interface NotificationPreferences {
  pushEnabled: boolean;
  quietHours?: QuietHours;
  types: Record<string, { enabled: boolean; sound?: string }>;
}

interface QuietHours {
  enabled: boolean;
  start: string; // "22:00"
  end: string;   // "08:00"
  timezone: string;
}

interface NotificationTemplate {
  type: string;
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, any>;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actions?: NotificationAction[];
}
```

---

## 5. Real-time Event Types

### 5.1 Customer Lifecycle Events

```typescript
// realtimeEvents.ts
export class RealtimeEventTypes {
  
  // Case Management Events
  static CASE_STATUS_UPDATE = 'case_status_update';
  static PROFESSIONAL_ASSIGNED = 'professional_assigned';
  static CASE_COMPLETED = 'case_completed';
  static AI_ANALYSIS_COMPLETE = 'ai_analysis_complete';
  static PEER_REVIEW_STARTED = 'peer_review_started';
  static REPORT_READY = 'report_ready';

  // Communication Events
  static MESSAGE_RECEIVED = 'message_received';
  static MESSAGE_READ = 'message_read';
  static PROFESSIONAL_ONLINE = 'professional_online';
  static SUPPORT_RESPONSE = 'support_response';

  // Journey & Lifecycle Events
  static MILESTONE_ACHIEVED = 'journey_milestone';
  static HEALTH_SCORE_UPDATE = 'health_score_update';
  static STAGE_TRANSITION = 'lifecycle_stage_transition';
  static PERSONA_UPDATE = 'persona_update';
  static ACHIEVEMENT_UNLOCKED = 'achievement_unlocked';

  // Personalization Events
  static RECOMMENDATION_AVAILABLE = 'recommendation_available';
  static CONTENT_PERSONALIZED = 'content_personalized';
  static DASHBOARD_UPDATE = 'dashboard_update';

  // System Events
  static MAINTENANCE_SCHEDULED = 'maintenance_scheduled';
  static FEATURE_ANNOUNCEMENT = 'feature_announcement';
  static SECURITY_ALERT = 'security_alert';
}

export interface CaseStatusUpdateEvent {
  type: typeof RealtimeEventTypes.CASE_STATUS_UPDATE;
  timestamp: string;
  data: {
    caseNumber: string;
    previousStatus: string;
    currentStatus: string;
    estimatedCompletion?: string;
    statusMessage?: string;
    metadata?: {
      automated?: boolean;
      triggeredBy?: string;
    };
  };
  priority: 'normal' | 'high';
  persistent: boolean;
}

export interface ProfessionalAssignedEvent {
  type: typeof RealtimeEventTypes.PROFESSIONAL_ASSIGNED;
  timestamp: string;
  data: {
    caseNumber: string;
    professional: {
      id: string;
      name: string;
      title: string;
      specialization: string;
      experience: string;
      credentials: string[];
      profilePhoto?: string;
    };
    estimatedCompletion: string;
    introductoryMessage?: string;
  };
  priority: 'high';
  persistent: true;
}

export interface JourneyMilestoneEvent {
  type: typeof RealtimeEventTypes.MILESTONE_ACHIEVED;
  timestamp: string;
  data: {
    milestone: {
      id: string;
      type: 'first_case' | 'case_completion' | 'referral' | 'loyalty_tier' | 'health_improvement';
      title: string;
      description: string;
      icon: string;
      points?: number;
      reward?: {
        type: 'discount' | 'priority_support' | 'feature_unlock';
        value: string;
        expiresAt?: string;
      };
    };
    journey: {
      totalMilestones: number;
      nextMilestone?: {
        type: string;
        progress: number;
        target: number;
      };
    };
  };
  priority: 'normal';
  persistent: true;
}

export interface HealthScoreUpdateEvent {
  type: typeof RealtimeEventTypes.HEALTH_SCORE_UPDATE;
  timestamp: string;
  data: {
    previousScore: number;
    currentScore: number;
    change: number;
    trend: 'improving' | 'stable' | 'declining';
    factors: {
      activity: { score: number; change: number };
      engagement: { score: number; change: number };
      satisfaction: { score: number; change: number };
    };
    recommendations?: Array<{
      type: string;
      title: string;
      description: string;
      action?: string;
      expectedImpact: string;
    }>;
    riskLevel: 'low' | 'medium' | 'high';
  };
  priority: 'normal';
  persistent: false;
}

export interface MessageReceivedEvent {
  type: typeof RealtimeEventTypes.MESSAGE_RECEIVED;
  timestamp: string;
  data: {
    messageId: string;
    threadId: string;
    from: {
      type: 'professional' | 'support' | 'system';
      id: string;
      name: string;
      title?: string;
      avatar?: string;
    };
    subject?: string;
    preview: string;
    fullMessage?: string;
    caseNumber?: string;
    attachments?: Array<{
      id: string;
      name: string;
      size: string;
      type: string;
    }>;
    urgent: boolean;
    requiresResponse: boolean;
  };
  priority: 'high';
  persistent: true;
}
```

### 5.2 Event Processing and Broadcasting

```typescript
// eventBroadcaster.ts
export class RealtimeEventBroadcaster {
  private websocketServer: CustomerPortalWebSocketServer;
  private sseService: ServerSentEventsService;
  private pushService: PushNotificationService;
  private eventQueue: Map<string, QueuedEvent[]> = new Map();

  constructor() {
    this.websocketServer = new CustomerPortalWebSocketServer();
    this.sseService = new ServerSentEventsService();
    this.pushService = new PushNotificationService();
  }

  async broadcastEvent(event: RealtimeEvent, targetCustomers?: string[]): Promise<BroadcastResult> {
    const timestamp = new Date().toISOString();
    const broadcastId = `broadcast_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
      // Determine target customers
      const customers = targetCustomers || await this.getEventTargetCustomers(event);
      
      if (customers.length === 0) {
        return { success: true, customers: 0, channels: {} };
      }

      // Filter customers based on event type and preferences
      const filteredCustomers = await this.filterCustomersByPreferences(customers, event);
      
      // Broadcast via multiple channels
      const results = await Promise.allSettled([
        this.broadcastViaWebSocket(event, filteredCustomers),
        this.broadcastViaSSE(event, filteredCustomers),
        this.broadcastViaPush(event, filteredCustomers)
      ]);

      // Process results
      const [wsResult, sseResult, pushResult] = results;

      // Queue for offline customers
      await this.queueForOfflineCustomers(event, filteredCustomers);

      // Log broadcast statistics
      await this.logBroadcastStats(broadcastId, event, {
        targetCustomers: customers.length,
        filteredCustomers: filteredCustomers.length,
        websocket: wsResult.status === 'fulfilled' ? wsResult.value : 0,
        sse: sseResult.status === 'fulfilled' ? sseResult.value : 0,
        push: pushResult.status === 'fulfilled' ? pushResult.value : 0
      });

      return {
        success: true,
        broadcastId,
        customers: filteredCustomers.length,
        channels: {
          websocket: wsResult.status === 'fulfilled' ? wsResult.value : 0,
          sse: sseResult.status === 'fulfilled' ? sseResult.value : 0,
          push: pushResult.status === 'fulfilled' ? pushResult.value : 0
        },
        timestamp
      };

    } catch (error) {
      console.error('Event broadcast failed:', error);
      return {
        success: false,
        error: error.message,
        broadcastId,
        timestamp
      };
    }
  }

  async broadcastCaseStatusUpdate(
    customerId: string, 
    caseNumber: string, 
    previousStatus: string, 
    currentStatus: string,
    metadata?: any
  ): Promise<void> {
    const event: CaseStatusUpdateEvent = {
      type: RealtimeEventTypes.CASE_STATUS_UPDATE,
      timestamp: new Date().toISOString(),
      data: {
        caseNumber,
        previousStatus,
        currentStatus,
        statusMessage: this.getStatusMessage(currentStatus),
        metadata
      },
      priority: 'normal',
      persistent: true
    };

    await this.broadcastEvent(event, [customerId]);
  }

  async broadcastProfessionalAssignment(
    customerId: string,
    caseNumber: string,
    professional: any
  ): Promise<void> {
    const event: ProfessionalAssignedEvent = {
      type: RealtimeEventTypes.PROFESSIONAL_ASSIGNED,
      timestamp: new Date().toISOString(),
      data: {
        caseNumber,
        professional: {
          id: professional.id,
          name: `${professional.firstName} ${professional.lastName}`,
          title: professional.title,
          specialization: professional.specialization,
          experience: `${professional.yearsExperience} years`,
          credentials: professional.credentials,
          profilePhoto: professional.profilePhoto
        },
        estimatedCompletion: this.calculateEstimatedCompletion(professional.averageCompletionTime),
        introductoryMessage: professional.introductoryMessage
      },
      priority: 'high',
      persistent: true
    };

    await this.broadcastEvent(event, [customerId]);
  }

  async broadcastJourneyMilestone(
    customerId: string,
    milestone: any
  ): Promise<void> {
    const journey = await this.lifecycleService.getCustomerJourney(customerId);
    
    const event: JourneyMilestoneEvent = {
      type: RealtimeEventTypes.MILESTONE_ACHIEVED,
      timestamp: new Date().toISOString(),
      data: {
        milestone,
        journey: {
          totalMilestones: journey?.milestones.length || 0,
          nextMilestone: this.getNextMilestone(journey)
        }
      },
      priority: 'normal',
      persistent: true
    };

    await this.broadcastEvent(event, [customerId]);
  }

  async broadcastHealthScoreUpdate(
    customerId: string,
    previousScore: number,
    currentScore: number
  ): Promise<void> {
    const recommendations = await this.getPersonalizedRecommendations(customerId);
    
    const event: HealthScoreUpdateEvent = {
      type: RealtimeEventTypes.HEALTH_SCORE_UPDATE,
      timestamp: new Date().toISOString(),
      data: {
        previousScore,
        currentScore,
        change: currentScore - previousScore,
        trend: this.calculateTrend(previousScore, currentScore),
        factors: await this.getHealthScoreFactors(customerId),
        recommendations,
        riskLevel: this.calculateRiskLevel(currentScore)
      },
      priority: 'normal',
      persistent: false
    };

    await this.broadcastEvent(event, [customerId]);
  }

  private async broadcastViaWebSocket(event: RealtimeEvent, customers: string[]): Promise<number> {
    return await this.websocketServer.broadcastToCustomers(customers, event);
  }

  private async broadcastViaSSE(event: RealtimeEvent, customers: string[]): Promise<number> {
    let successCount = 0;
    for (const customerId of customers) {
      if (await this.sseService.broadcastToCustomer(customerId, event)) {
        successCount++;
      }
    }
    return successCount;
  }

  private async broadcastViaPush(event: RealtimeEvent, customers: string[]): Promise<number> {
    // Only send push notifications for high priority events or when customers prefer them
    if (event.priority !== 'high' && event.priority !== 'urgent') {
      return 0;
    }

    const pushPayload = this.convertEventToPushNotification(event);
    let successCount = 0;

    for (const customerId of customers) {
      const result = await this.pushService.sendPushNotification(customerId, pushPayload);
      if (result.success) {
        successCount++;
      }
    }

    return successCount;
  }

  private convertEventToPushNotification(event: RealtimeEvent): PushNotificationPayload {
    const notificationMap = {
      [RealtimeEventTypes.CASE_STATUS_UPDATE]: {
        title: 'Case Update',
        body: `Your case ${event.data.caseNumber} status has been updated to ${event.data.currentStatus}`,
        icon: '/icons/case-update.png'
      },
      [RealtimeEventTypes.PROFESSIONAL_ASSIGNED]: {
        title: 'Professional Assigned',
        body: `${event.data.professional.name} has been assigned to your case`,
        icon: '/icons/professional.png'
      },
      [RealtimeEventTypes.MESSAGE_RECEIVED]: {
        title: 'New Message',
        body: `${event.data.from.name}: ${event.data.preview}`,
        icon: '/icons/message.png'
      },
      [RealtimeEventTypes.MILESTONE_ACHIEVED]: {
        title: 'Milestone Achieved!',
        body: event.data.milestone.title,
        icon: '/icons/achievement.png'
      }
    };

    const config = notificationMap[event.type] || {
      title: 'Update Available',
      body: 'You have a new update in your medical portal',
      icon: '/icons/notification.png'
    };

    return {
      type: event.type,
      title: config.title,
      body: config.body,
      icon: config.icon,
      data: event.data,
      priority: event.priority as any
    };
  }

  private async queueForOfflineCustomers(event: RealtimeEvent, customers: string[]): Promise<void> {
    if (!event.persistent) {
      return; // Don't queue non-persistent events
    }

    for (const customerId of customers) {
      const isOnline = await this.isCustomerOnline(customerId);
      if (!isOnline) {
        await this.addToQueue(customerId, event);
      }
    }
  }

  private async addToQueue(customerId: string, event: RealtimeEvent): Promise<void> {
    if (!this.eventQueue.has(customerId)) {
      this.eventQueue.set(customerId, []);
    }

    const queue = this.eventQueue.get(customerId)!;
    queue.push({
      event,
      queuedAt: new Date(),
      attempts: 0
    });

    // Limit queue size (keep only last 50 events)
    if (queue.length > 50) {
      queue.splice(0, queue.length - 50);
    }
  }

  async processQueuedEvents(customerId: string): Promise<void> {
    const queue = this.eventQueue.get(customerId);
    if (!queue || queue.length === 0) {
      return;
    }

    // Send queued events
    for (const queuedEvent of queue) {
      try {
        await this.broadcastEvent(queuedEvent.event, [customerId]);
        queuedEvent.attempts++;
      } catch (error) {
        console.error(`Failed to deliver queued event to ${customerId}:`, error);
      }
    }

    // Clear successful deliveries (this could be more sophisticated)
    this.eventQueue.set(customerId, []);
  }

  private async isCustomerOnline(customerId: string): Promise<boolean> {
    const wsConnected = this.websocketServer.isCustomerConnected(customerId);
    const sseConnected = this.sseService.getCustomerConnectionInfo(customerId)?.isActive;
    
    return wsConnected || sseConnected || false;
  }
}

interface BroadcastResult {
  success: boolean;
  broadcastId?: string;
  customers?: number;
  channels?: {
    websocket?: number;
    sse?: number;
    push?: number;
  };
  error?: string;
  timestamp?: string;
}

interface QueuedEvent {
  event: RealtimeEvent;
  queuedAt: Date;
  attempts: number;
}
```

---

## 6. Scalability & Performance

### 6.1 Horizontal Scaling Architecture

```typescript
// scalingStrategy.ts
export class RealtimeScalingStrategy {
  private redisCluster: Redis.Cluster;
  private loadBalancer: LoadBalancer;
  private metricsCollector: MetricsCollector;

  constructor() {
    this.redisCluster = new Redis.Cluster([
      { host: 'redis-node-1', port: 6379 },
      { host: 'redis-node-2', port: 6379 },
      { host: 'redis-node-3', port: 6379 }
    ]);

    this.loadBalancer = new LoadBalancer();
    this.metricsCollector = new MetricsCollector();
  }

  // Connection distribution strategy
  async distributeConnection(customerId: string): Promise<string> {
    // Use consistent hashing to ensure customer always connects to same server
    const hash = this.hashCustomerId(customerId);
    const availableServers = await this.getAvailableServers();
    
    const serverIndex = hash % availableServers.length;
    return availableServers[serverIndex].id;
  }

  // Cross-server event broadcasting
  async broadcastCrossServer(event: RealtimeEvent, targetCustomers: string[]): Promise<void> {
    // Group customers by their assigned servers
    const customersByServer = await this.groupCustomersByServer(targetCustomers);
    
    // Send to each server's event queue
    const promises = Object.entries(customersByServer).map(([serverId, customers]) => 
      this.sendToServerQueue(serverId, event, customers)
    );

    await Promise.all(promises);
  }

  private async sendToServerQueue(
    serverId: string, 
    event: RealtimeEvent, 
    customers: string[]
  ): Promise<void> {
    const queueKey = `server_events:${serverId}`;
    const eventData = {
      event,
      customers,
      timestamp: Date.now()
    };

    await this.redisCluster.lpush(queueKey, JSON.stringify(eventData));
    await this.redisCluster.expire(queueKey, 3600); // 1 hour TTL
  }

  // Server-side queue processing
  async processServerEventQueue(serverId: string): Promise<void> {
    const queueKey = `server_events:${serverId}`;
    
    while (true) {
      try {
        const eventData = await this.redisCluster.brpop(queueKey, 5); // 5 second timeout
        if (!eventData) continue;

        const { event, customers } = JSON.parse(eventData[1]);
        await this.localBroadcast(event, customers);

      } catch (error) {
        console.error('Server queue processing error:', error);
        await this.sleep(1000); // Wait 1 second before retrying
      }
    }
  }

  // Connection pooling and management
  class ConnectionPool {
    private pools: Map<string, Set<CustomerConnection>> = new Map();
    private maxConnectionsPerPool = 1000;

    addConnection(serverId: string, connection: CustomerConnection): boolean {
      if (!this.pools.has(serverId)) {
        this.pools.set(serverId, new Set());
      }

      const pool = this.pools.get(serverId)!;
      
      if (pool.size >= this.maxConnectionsPerPool) {
        return false; // Pool is full
      }

      pool.add(connection);
      return true;
    }

    removeConnection(serverId: string, connection: CustomerConnection): void {
      const pool = this.pools.get(serverId);
      if (pool) {
        pool.delete(connection);
      }
    }

    getPoolSize(serverId: string): number {
      return this.pools.get(serverId)?.size || 0;
    }

    getTotalConnections(): number {
      return Array.from(this.pools.values())
        .reduce((total, pool) => total + pool.size, 0);
    }

    // Health check for connections
    async healthCheck(): Promise<PoolHealthReport> {
      const report: PoolHealthReport = {
        totalPools: this.pools.size,
        totalConnections: this.getTotalConnections(),
        pools: []
      };

      for (const [serverId, pool] of this.pools.entries()) {
        let activeConnections = 0;
        let staleConnections = 0;

        for (const connection of pool) {
          if (this.isConnectionActive(connection)) {
            activeConnections++;
          } else {
            staleConnections++;
            pool.delete(connection); // Clean up stale connections
          }
        }

        report.pools.push({
          serverId,
          totalConnections: pool.size,
          activeConnections,
          staleConnections
        });
      }

      return report;
    }

    private isConnectionActive(connection: CustomerConnection): boolean {
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
      return connection.lastActivity.getTime() > fiveMinutesAgo;
    }
  }

  // Metrics and monitoring
  async collectRealtimeMetrics(): Promise<RealtimeMetrics> {
    const metrics = {
      connections: {
        websocket: await this.getWebSocketConnectionCount(),
        sse: await this.getSSEConnectionCount(),
        total: 0
      },
      events: {
        broadcastsPerMinute: await this.getEventBroadcastRate(),
        queuedEvents: await this.getQueuedEventCount(),
        failedDeliveries: await this.getFailedDeliveryCount()
      },
      performance: {
        averageLatency: await this.getAverageLatency(),
        throughput: await this.getThroughput(),
        errorRate: await this.getErrorRate()
      },
      resources: {
        memoryUsage: process.memoryUsage(),
        cpuUsage: await this.getCPUUsage(),
        redisConnections: await this.getRedisConnectionCount()
      }
    };

    metrics.connections.total = metrics.connections.websocket + metrics.connections.sse;

    return metrics;
  }

  // Auto-scaling decisions
  async evaluateScaling(): Promise<ScalingDecision> {
    const metrics = await this.collectRealtimeMetrics();
    const decision: ScalingDecision = {
      action: 'maintain',
      reason: 'Metrics within normal range',
      recommendedInstances: await this.getCurrentInstanceCount()
    };

    // Scale up conditions
    if (metrics.connections.total > 8000 || 
        metrics.performance.averageLatency > 1000 ||
        metrics.performance.errorRate > 0.05) {
      
      decision.action = 'scale_up';
      decision.reason = 'High load detected';
      decision.recommendedInstances = Math.min(
        decision.recommendedInstances + 2, 
        10 // Max instances
      );
    }

    // Scale down conditions  
    if (metrics.connections.total < 2000 && 
        metrics.performance.averageLatency < 200 &&
        decision.recommendedInstances > 2) {
      
      decision.action = 'scale_down';
      decision.reason = 'Low utilization';
      decision.recommendedInstances = Math.max(
        decision.recommendedInstances - 1,
        2 // Min instances
      );
    }

    return decision;
  }

  private hashCustomerId(customerId: string): number {
    let hash = 0;
    for (let i = 0; i < customerId.length; i++) {
      const char = customerId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

// Interfaces
interface PoolHealthReport {
  totalPools: number;
  totalConnections: number;
  pools: {
    serverId: string;
    totalConnections: number;
    activeConnections: number;
    staleConnections: number;
  }[];
}

interface RealtimeMetrics {
  connections: {
    websocket: number;
    sse: number;
    total: number;
  };
  events: {
    broadcastsPerMinute: number;
    queuedEvents: number;
    failedDeliveries: number;
  };
  performance: {
    averageLatency: number;
    throughput: number;
    errorRate: number;
  };
  resources: {
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: number;
    redisConnections: number;
  };
}

interface ScalingDecision {
  action: 'scale_up' | 'scale_down' | 'maintain';
  reason: string;
  recommendedInstances: number;
}
```

---

## 7. Implementation Examples

### 7.1 React Real-time Dashboard Component

```typescript
// RealtimeDashboard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useSSE } from '../hooks/useSSE';
import { usePushNotifications } from '../hooks/usePushNotifications';

interface RealtimeDashboardProps {
  customerId: string;
  baseUrl: string;
  getAccessToken: () => string | null;
}

export function RealtimeDashboard({ customerId, baseUrl, getAccessToken }: RealtimeDashboardProps) {
  const [realtimeEvents, setRealtimeEvents] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState({
    websocket: 'disconnected',
    sse: 'disconnected',
    push: 'disabled'
  });

  // WebSocket connection
  const { client: wsClient, connectionState: wsState, isConnected: wsConnected } = useWebSocket(
    baseUrl, 
    getAccessToken
  );

  // Server-Sent Events connection
  const { client: sseClient, connectionState: sseState, lastEvent: sseEvent } = useSSE(
    baseUrl,
    getAccessToken,
    ['case_updates', 'messages', 'journey_updates', 'health_score']
  );

  // Push notifications
  const { isSupported: pushSupported, isEnabled: pushEnabled, requestPermission } = usePushNotifications();

  useEffect(() => {
    setConnectionStatus({
      websocket: wsState,
      sse: sseState,
      push: pushEnabled ? 'enabled' : (pushSupported ? 'available' : 'unsupported')
    });
  }, [wsState, sseState, pushEnabled, pushSupported]);

  // Handle WebSocket events
  useEffect(() => {
    if (wsClient) {
      const handleCaseUpdate = (data: any) => {
        setRealtimeEvents(prev => [{
          id: `ws_${Date.now()}`,
          type: 'case_update',
          source: 'websocket',
          data,
          timestamp: new Date()
        }, ...prev.slice(0, 49)]);
      };

      const handleMessage = (data: any) => {
        setRealtimeEvents(prev => [{
          id: `ws_msg_${Date.now()}`,
          type: 'message',
          source: 'websocket',
          data,
          timestamp: new Date()
        }, ...prev.slice(0, 49)]);
      };

      const handleMilestone = (data: any) => {
        setRealtimeEvents(prev => [{
          id: `ws_milestone_${Date.now()}`,
          type: 'milestone',
          source: 'websocket',
          data,
          timestamp: new Date()
        }, ...prev.slice(0, 49)]);
        
        // Show celebration animation
        showMilestoneCelebration(data.milestone);
      };

      wsClient.on('case_status_update', handleCaseUpdate);
      wsClient.on('message_received', handleMessage);
      wsClient.on('journey_milestone', handleMilestone);

      // Subscribe to relevant events
      wsClient.subscribe([
        'case_updates',
        'messages', 
        'journey_updates',
        'health_score_updates'
      ]);

      return () => {
        wsClient.off('case_status_update', handleCaseUpdate);
        wsClient.off('message_received', handleMessage);
        wsClient.off('journey_milestone', handleMilestone);
      };
    }
  }, [wsClient]);

  // Handle SSE events
  useEffect(() => {
    if (sseEvent) {
      setRealtimeEvents(prev => [{
        id: `sse_${Date.now()}`,
        type: sseEvent.type,
        source: 'sse',
        data: sseEvent.data,
        timestamp: new Date()
      }, ...prev.slice(0, 49)]);
    }
  }, [sseEvent]);

  const sendMessage = useCallback(async (recipientId: string, message: string) => {
    if (wsClient && wsConnected) {
      wsClient.sendMessage('professional', recipientId, message);
    }
  }, [wsClient, wsConnected]);

  const enablePushNotifications = useCallback(async () => {
    if (pushSupported && !pushEnabled) {
      await requestPermission();
    }
  }, [pushSupported, pushEnabled, requestPermission]);

  const showMilestoneCelebration = (milestone: any) => {
    // Implementation for milestone celebration UI
    console.log('🎉 Milestone achieved:', milestone.title);
  };

  return (
    <div className="realtime-dashboard">
      {/* Connection Status Indicator */}
      <div className="connection-status">
        <div className="status-indicators">
          <StatusIndicator 
            type="websocket" 
            status={connectionStatus.websocket}
            label="Real-time Updates"
          />
          <StatusIndicator 
            type="sse" 
            status={connectionStatus.sse}
            label="Live Events"
          />
          <StatusIndicator 
            type="push" 
            status={connectionStatus.push}
            label="Push Notifications"
            action={connectionStatus.push === 'available' ? enablePushNotifications : undefined}
          />
        </div>
      </div>

      {/* Real-time Event Feed */}
      <div className="event-feed">
        <h3>Live Updates</h3>
        {realtimeEvents.length === 0 ? (
          <div className="no-events">
            <p>No recent updates. You'll see real-time notifications here.</p>
          </div>
        ) : (
          <div className="events-list">
            {realtimeEvents.map(event => (
              <EventCard 
                key={event.id}
                event={event}
                onAction={sendMessage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Real-time Statistics */}
      <div className="realtime-stats">
        <div className="stat">
          <span className="label">WebSocket</span>
          <span className={`status ${wsConnected ? 'connected' : 'disconnected'}`}>
            {wsConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
        <div className="stat">
          <span className="label">Events Received</span>
          <span className="value">{realtimeEvents.length}</span>
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ 
  type, 
  status, 
  label, 
  action 
}: { 
  type: string; 
  status: string; 
  label: string;
  action?: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'open':
      case 'enabled':
        return 'green';
      case 'connecting':
        return 'yellow';
      case 'available':
        return 'blue';
      default:
        return 'red';
    }
  };

  return (
    <div className={`status-indicator ${type}`}>
      <div 
        className={`status-dot ${getStatusColor(status)}`}
        title={`${label}: ${status}`}
      />
      <span className="status-label">{label}</span>
      {action && (
        <button onClick={action} className="enable-button">
          Enable
        </button>
      )}
    </div>
  );
}

function EventCard({ event, onAction }: { event: any; onAction: (id: string, message: string) => void }) {
  const getEventIcon = (type: string) => {
    const icons = {
      case_update: '📋',
      message: '💬',
      milestone: '🏆',
      health_score: '❤️',
      professional_assigned: '👨‍⚕️'
    };
    return icons[type] || '📢';
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={`event-card ${event.type} ${event.source}`}>
      <div className="event-header">
        <span className="event-icon">{getEventIcon(event.type)}</span>
        <span className="event-type">{event.type.replace('_', ' ').toUpperCase()}</span>
        <span className="event-timestamp">{formatTimestamp(event.timestamp)}</span>
        <span className={`event-source ${event.source}`}>{event.source}</span>
      </div>
      
      <div className="event-content">
        {event.type === 'case_update' && (
          <div>
            <p><strong>Case {event.data.caseNumber}</strong></p>
            <p>Status: {event.data.previousStatus} → {event.data.currentStatus}</p>
          </div>
        )}
        
        {event.type === 'message' && (
          <div>
            <p><strong>From:</strong> {event.data.from.name}</p>
            <p>{event.data.preview}</p>
            {event.data.urgent && <span className="urgent-badge">URGENT</span>}
          </div>
        )}
        
        {event.type === 'milestone' && (
          <div>
            <p><strong>{event.data.milestone.title}</strong></p>
            <p>{event.data.milestone.description}</p>
            {event.data.milestone.points && (
              <span className="points">+{event.data.milestone.points} points</span>
            )}
          </div>
        )}
      </div>
      
      {event.type === 'message' && (
        <div className="event-actions">
          <button onClick={() => onAction(event.data.from.id, 'Quick reply')}>
            Reply
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## 8. Mobile Integration

### 8.1 React Native WebSocket Implementation

```typescript
// MobileWebSocketClient.ts
import { useEffect, useState, useRef } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class MobileWebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private backgroundTimer: NodeJS.Timeout | null = null;
  private eventHandlers: Map<string, Function[]> = new Map();
  
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10; // More attempts for mobile
  private isInBackground = false;

  constructor(
    private baseUrl: string,
    private getAccessToken: () => Promise<string | null>
  ) {
    this.setupAppStateHandling();
  }

  private setupAppStateHandling() {
    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        this.handleAppBackground();
      } else if (nextAppState === 'active') {
        this.handleAppForeground();
      }
    });
  }

  async connect(): Promise<void> {
    const token = await this.getAccessToken();
    if (!token) {
      throw new Error('Access token required for WebSocket connection');
    }

    const wsUrl = `${this.baseUrl.replace('http', 'ws')}/v1/portal/ws?token=${encodeURIComponent(token)}`;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Mobile WebSocket connected');
        this.reconnectAttempts = 0;
        this.setupMobileHeartbeat();
        resolve();
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };

      this.ws.onclose = (event) => {
        console.log('Mobile WebSocket disconnected:', event.code, event.reason);
        this.cleanup();
        
        if (!this.isInBackground && 
            event.code !== 1000 && 
            this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (error) => {
        console.error('Mobile WebSocket error:', error);
        reject(error);
      };

      // Longer timeout for mobile networks
      setTimeout(() => {
        if (this.ws?.readyState !== WebSocket.OPEN) {
          this.ws?.close();
          reject(new Error('WebSocket connection timeout'));
        }
      }, 15000);
    });
  }

  private setupMobileHeartbeat(): void {
    // More frequent heartbeat for mobile to detect network changes
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ 
          type: 'ping', 
          timestamp: new Date().toISOString(),
          mobile: true 
        });
      }
    }, 20000); // 20 seconds
  }

  private handleAppBackground(): void {
    console.log('App going to background');
    this.isInBackground = true;
    
    // Close WebSocket connection to save battery and data
    if (this.ws) {
      this.ws.close(1000, 'App backgrounded');
    }
    
    this.cleanup();
    
    // Set up background timer to reconnect periodically
    this.backgroundTimer = setInterval(() => {
      if (this.isInBackground) {
        this.quickBackgroundSync();
      }
    }, 300000); // 5 minutes
  }

  private handleAppForeground(): void {
    console.log('App coming to foreground');
    this.isInBackground = false;
    
    if (this.backgroundTimer) {
      clearInterval(this.backgroundTimer);
      this.backgroundTimer = null;
    }
    
    // Reconnect immediately when app becomes active
    this.connect().catch(error => {
      console.error('Foreground reconnection failed:', error);
    });
  }

  private async quickBackgroundSync(): Promise<void> {
    // Quick sync for missed events while in background
    try {
      const token = await this.getAccessToken();
      if (!token) return;

      const response = await fetch(`${this.baseUrl}/v1/portal/events/missed`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const { events } = await response.json();
        
        // Store events for when app becomes active
        await AsyncStorage.setItem('pendingEvents', JSON.stringify(events));
      }
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }

  private scheduleReconnect(): void {
    // Exponential backoff with jitter for mobile networks
    const baseDelay = 1000 * Math.pow(2, this.reconnectAttempts);
    const jitter = Math.random() * 1000;
    const delay = Math.min(baseDelay + jitter, 60000); // Max 1 minute
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      console.log(`Attempting mobile WebSocket reconnection (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.connect().catch(error => {
        console.error('Mobile WebSocket reconnection failed:', error);
      });
    }, delay);
  }

  async processPendingEvents(): Promise<void> {
    try {
      const pendingEventsStr = await AsyncStorage.getItem('pendingEvents');
      if (pendingEventsStr) {
        const pendingEvents = JSON.parse(pendingEventsStr);
        
        for (const event of pendingEvents) {
          this.handleMessage(event);
        }
        
        await AsyncStorage.removeItem('pendingEvents');
      }
    } catch (error) {
      console.error('Failed to process pending events:', error);
    }
  }

  // Rest of the implementation similar to web client but with mobile-specific optimizations
  private handleMessage(message: any): void {
    // Store important messages locally for offline access
    if (message.priority === 'high' || message.persistent) {
      this.storeMessageLocally(message);
    }

    // Handle message same as web client
    const { type, data } = message;
    
    const handlers = this.eventHandlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data, message);
        } catch (error) {
          console.error('Error in mobile WebSocket event handler:', error);
        }
      });
    }
  }

  private async storeMessageLocally(message: any): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem('offlineMessages') || '[]';
      const messages = JSON.parse(stored);
      
      messages.push({
        ...message,
        storedAt: new Date().toISOString()
      });
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.splice(0, messages.length - 100);
      }
      
      await AsyncStorage.setItem('offlineMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to store message locally:', error);
    }
  }

  async getOfflineMessages(): Promise<any[]> {
    try {
      const stored = await AsyncStorage.getItem('offlineMessages') || '[]';
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to retrieve offline messages:', error);
      return [];
    }
  }

  private cleanup(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  // Public methods same as web client
  send(message: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('Mobile WebSocket not connected, message queued for later');
      // Could implement local queuing here
    }
  }

  on(eventType: string, handler: Function): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
    }
    this.cleanup();
    
    if (this.backgroundTimer) {
      clearInterval(this.backgroundTimer);
      this.backgroundTimer = null;
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// React Native Hook
export function useMobileWebSocket(baseUrl: string, getAccessToken: () => Promise<string | null>) {
  const [client, setClient] = useState<MobileWebSocketClient | null>(null);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [offlineMessages, setOfflineMessages] = useState<any[]>([]);

  useEffect(() => {
    const wsClient = new MobileWebSocketClient(baseUrl, getAccessToken);
    
    wsClient.on('message', (message) => {
      setLastMessage(message);
    });

    wsClient.connect().then(() => {
      setConnectionState('connected');
      setClient(wsClient);
      
      // Process any pending events from background
      wsClient.processPendingEvents();
      
      // Load offline messages
      wsClient.getOfflineMessages().then(setOfflineMessages);
      
    }).catch(error => {
      console.error('Mobile WebSocket connection failed:', error);
      setConnectionState('error');
    });

    return () => {
      wsClient.disconnect();
      setClient(null);
      setConnectionState('disconnected');
    };
  }, [baseUrl, getAccessToken]);

  return {
    client,
    connectionState,
    lastMessage,
    offlineMessages,
    isConnected: connectionState === 'connected'
  };
}
```

---

## Conclusion

This comprehensive real-time API design provides:

### 🔄 **Multi-Channel Communication**
- WebSocket for bidirectional real-time updates
- Server-Sent Events for server-initiated notifications  
- Push notifications for mobile and background alerts
- Seamless fallback between channels

### 📱 **Mobile-First Architecture**
- React Native WebSocket client with background handling
- Offline message storage and sync
- Battery-optimized connection management
- Network change detection and recovery

### 🚀 **Scalable Infrastructure**
- Horizontal scaling with Redis clustering
- Cross-server event broadcasting
- Connection pooling and load distribution
- Auto-scaling based on real-time metrics

### 🎯 **Personalized Experiences**
- Customer journey milestone celebrations
- Health score updates with actionable insights
- Persona-driven notification preferences
- Smart quiet hours and priority handling

### 📊 **Comprehensive Monitoring**
- Real-time connection health monitoring
- Event delivery tracking and analytics
- Performance metrics and auto-scaling
- Failed delivery detection and retry logic

The real-time API system creates engaging customer experiences through instant updates, personalized notifications, and seamless cross-platform communication, supporting the platform's mission to provide exceptional medical second opinion services.

### Next Implementation Steps

1. **WebSocket Server Setup** - Deploy scalable WebSocket infrastructure with Redis clustering
2. **Push Notification Configuration** - Set up FCM/APNS services and VAPID keys  
3. **Event Processing Pipeline** - Implement event broadcasting and customer filtering
4. **Mobile SDK Development** - Create React Native real-time client library
5. **Monitoring Dashboard** - Build real-time metrics and connection monitoring
6. **Load Testing** - Validate performance under concurrent user scenarios