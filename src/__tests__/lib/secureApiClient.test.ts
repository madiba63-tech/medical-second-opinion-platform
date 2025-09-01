import { SecureApiClient } from '@/lib/secureApiClient';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock fetch globally
global.fetch = jest.fn();

describe('SecureApiClient', () => {
  let client: SecureApiClient;
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
  const mockLocalStorage = window.localStorage as jest.Mocked<typeof localStorage>;

  beforeEach(() => {
    jest.clearAllMocks();
    client = SecureApiClient.getInstance();
  });

  describe('Singleton Pattern', () => {
    it('returns the same instance when called multiple times', () => {
      const client1 = SecureApiClient.getInstance();
      const client2 = SecureApiClient.getInstance();
      expect(client1).toBe(client2);
    });
  });

  describe('CSRF Token Management', () => {
    it('fetches CSRF token before making requests', async () => {
      // Mock CSRF token response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'csrf-token-123' }),
      } as Response);

      // Mock actual API request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      await client.secureRequest('/api/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/csrf-token'),
        expect.objectContaining({ method: 'GET' })
      );
    });
  });

  describe('Authentication', () => {
    it('includes auth token when available', async () => {
      mockLocalStorage.getItem.mockReturnValue('auth-token-123');
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      await client.secureRequest('/api/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer auth-token-123',
          }),
        })
      );
    });
  });

  describe('Input Sanitization', () => {
    it('sanitizes application data', async () => {
      const maliciousData = {
        firstName: '<script>alert("xss")</script>John',
        lastName: 'Doe<script>',
        email: 'john@example.com',
        currentAffiliation: '<h1>Hospital</h1>',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      await client.submitApplication(maliciousData);

      const [url, options] = mockFetch.mock.calls[0];
      const sanitizedData = JSON.parse(options?.body as string);

      expect(sanitizedData.firstName).toBe('John'); // Script tags removed
      expect(sanitizedData.lastName).toBe('Doe'); // Script tags removed
      expect(sanitizedData.currentAffiliation).toBe('Hospital'); // HTML tags removed
    });
  });
});