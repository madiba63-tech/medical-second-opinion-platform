import { NextRequest } from 'next/server'
import { POST } from '../presign-upload/route'

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = { ...originalEnv }
})

afterAll(() => {
  process.env = originalEnv
})

describe('/api/presign-upload', () => {
  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/presign-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  it('generates local development upload URLs when S3 credentials are not available', async () => {
    // Clear S3 environment variables to simulate local development
    delete process.env.AWS_REGION
    delete process.env.AWS_ACCESS_KEY_ID
    delete process.env.AWS_SECRET_ACCESS_KEY
    delete process.env.S3_BUCKET_NAME

    const mockFiles = [
      { filename: 'test.pdf', mimetype: 'application/pdf' },
      { filename: 'image.jpg', mimetype: 'image/jpeg' }
    ]

    const request = createMockRequest(mockFiles)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(2)

    // Check that URLs are generated for local development
    data.forEach((item: any, index: number) => {
      expect(item).toHaveProperty('url')
      expect(item).toHaveProperty('key')
      expect(item.url).toContain('/api/upload/dev-put')
      expect(item.url).toContain('sig=dev')
      expect(item.key).toContain(mockFiles[index].filename)
    })
  })

  it('validates input schema correctly', async () => {
    const invalidRequest = createMockRequest([
      { filename: 'test.pdf' } // Missing mimetype
    ])

    const response = await POST(invalidRequest)
    expect(response.status).toBe(400)
  })

  it('handles empty file array', async () => {
    const request = createMockRequest([])
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(0)
  })

  it('generates unique keys for each file', async () => {
    const mockFiles = [
      { filename: 'test1.pdf', mimetype: 'application/pdf' },
      { filename: 'test2.pdf', mimetype: 'application/pdf' }
    ]

    const request = createMockRequest(mockFiles)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(2)

    // Check that keys are unique
    const keys = data.map((item: any) => item.key)
    const uniqueKeys = new Set(keys)
    expect(uniqueKeys.size).toBe(2)
  })

  it('includes proper query parameters in generated URLs', async () => {
    const mockFiles = [
      { filename: 'test.pdf', mimetype: 'application/pdf' }
    ]

    const request = createMockRequest(mockFiles)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(1)

    const url = data[0].url
    expect(url).toContain('key=')
    expect(url).toContain('exp=')
    expect(url).toContain('sig=dev')
  })

  it('handles special characters in filenames', async () => {
    const mockFiles = [
      { filename: 'test file with spaces.pdf', mimetype: 'application/pdf' },
      { filename: 'test-file_with_underscores.jpg', mimetype: 'image/jpeg' }
    ]

    const request = createMockRequest(mockFiles)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(2)

    data.forEach((item: any) => {
      expect(item.key).toContain('uploads/')
      expect(item.url).toContain(encodeURIComponent(item.key))
    })
  })

  it('sets proper expiration time for URLs', async () => {
    const mockFiles = [
      { filename: 'test.pdf', mimetype: 'application/pdf' }
    ]

    const request = createMockRequest(mockFiles)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(1)

    const url = data[0].url
    const urlParams = new URLSearchParams(url.split('?')[1])
    const exp = urlParams.get('exp')
    
    expect(exp).toBeTruthy()
    const expirationTime = parseInt(exp!)
    const currentTime = Date.now()
    
    // URL should expire in approximately 1 hour (3600000 ms)
    expect(expirationTime).toBeGreaterThan(currentTime)
    expect(expirationTime).toBeLessThan(currentTime + 3600000 + 1000) // Allow 1 second tolerance
  })
})
