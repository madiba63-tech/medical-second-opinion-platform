import { extractTextFromPDF, mockExtractTextFromPDF } from '../pdfProcessor'

// Mock PDF-lib
jest.mock('pdf-lib', () => ({
  PDFDocument: {
    load: jest.fn()
  }
}))

describe('PDF Processor Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('extractTextFromPDF', () => {
    it('should extract text from a valid PDF file', async () => {
      const mockPDFDocument = {
        getPageCount: jest.fn().mockReturnValue(2),
        getTitle: jest.fn().mockReturnValue('Test Document'),
        getAuthor: jest.fn().mockReturnValue('Test Author'),
        getSubject: jest.fn().mockReturnValue('Test Subject'),
        getCreator: jest.fn().mockReturnValue('Test Creator'),
        getProducer: jest.fn().mockReturnValue('Test Producer'),
        getCreationDate: jest.fn().mockReturnValue(new Date('2023-01-01')),
        getModificationDate: jest.fn().mockReturnValue(new Date('2023-01-02'))
      }

      const { PDFDocument } = require('pdf-lib')
      PDFDocument.load.mockResolvedValue(mockPDFDocument)

      const mockFile = new File(['%PDF-1.4 test content'], 'test.pdf', {
        type: 'application/pdf'
      })

      const result = await extractTextFromPDF(mockFile)

      expect(result).toEqual({
        text: '',
        pages: 2,
        metadata: {
          title: 'Test Document',
          author: 'Test Author',
          subject: 'Test Subject',
          creator: 'Test Creator',
          producer: 'Test Producer',
          creationDate: '2023-01-01T00:00:00.000Z',
          modificationDate: '2023-01-02T00:00:00.000Z'
        }
      })
    })

    it('should handle PDF loading errors', async () => {
      const { PDFDocument } = require('pdf-lib')
      PDFDocument.load.mockRejectedValue(new Error('Invalid PDF format'))

      const mockFile = new File(['invalid pdf content'], 'test.pdf', {
        type: 'application/pdf'
      })

      await expect(extractTextFromPDF(mockFile))
        .rejects.toThrow('Failed to extract text from PDF')
    })

    it('should handle empty PDF file', async () => {
      const mockPDFDocument = {
        getPageCount: jest.fn().mockReturnValue(0),
        getTitle: jest.fn().mockReturnValue(null),
        getAuthor: jest.fn().mockReturnValue(null),
        getSubject: jest.fn().mockReturnValue(null),
        getCreator: jest.fn().mockReturnValue(null),
        getProducer: jest.fn().mockReturnValue(null),
        getCreationDate: jest.fn().mockReturnValue(null),
        getModificationDate: jest.fn().mockReturnValue(null)
      }

      const { PDFDocument } = require('pdf-lib')
      PDFDocument.load.mockResolvedValue(mockPDFDocument)

      const mockFile = new File([''], 'empty.pdf', {
        type: 'application/pdf'
      })

      const result = await extractTextFromPDF(mockFile)

      expect(result).toEqual({
        text: '',
        pages: 0,
        metadata: {}
      })
    })
  })

  describe('mockExtractTextFromPDF', () => {
    it('should extract text from CV/resume files', async () => {
      const mockFile = new File(['CV content'], 'dr_sarah_wilson_cv.pdf', {
        type: 'application/pdf'
      })

      const result = await mockExtractTextFromPDF(mockFile)

      expect(result).toEqual(expect.objectContaining({
        text: expect.stringContaining('DR. SARAH WILSON, MD, PHD'),
        pages: 2,
        metadata: {
          title: 'Dr. Sarah Wilson CV',
          author: 'Dr. Sarah Wilson',
          subject: 'Medical Oncologist CV'
        }
      }))
    })

    it('should extract text from license files', async () => {
      const mockFile = new File(['License content'], 'medical_license_certificate.pdf', {
        type: 'application/pdf'
      })

      const result = await mockExtractTextFromPDF(mockFile)

      expect(result).toEqual(expect.objectContaining({
        text: expect.stringContaining('MEDICAL LICENSE CERTIFICATE'),
        pages: 1,
        metadata: {
          title: 'Medical License Certificate',
          subject: 'Medical License'
        }
      }))
    })

    it('should extract text from degree files', async () => {
      const mockFile = new File(['Degree content'], 'medical_degree_diploma.pdf', {
        type: 'application/pdf'
      })

      const result = await mockExtractTextFromPDF(mockFile)

      expect(result).toEqual(expect.objectContaining({
        text: expect.stringContaining('HARVARD MEDICAL SCHOOL'),
        pages: 1,
        metadata: {
          title: 'Medical Degree Diploma',
          subject: 'Medical Education'
        }
      }))
    })

    it('should return generic text for unknown file types', async () => {
      const mockFile = new File(['Unknown content'], 'unknown_document.pdf', {
        type: 'application/pdf'
      })

      const result = await mockExtractTextFromPDF(mockFile)

      expect(result).toEqual(expect.objectContaining({
        text: expect.stringContaining('DOCUMENT TITLE: unknown_document.pdf'),
        pages: 1,
        metadata: {
          title: 'unknown_document.pdf',
          subject: 'Professional Document'
        }
      }))
    })

    it('should simulate processing delay', async () => {
      const mockFile = new File(['Test content'], 'test.pdf', {
        type: 'application/pdf'
      })

      const startTime = Date.now()
      await mockExtractTextFromPDF(mockFile)
      const endTime = Date.now()

      // Should take at least 2 seconds due to simulated delay
      expect(endTime - startTime).toBeGreaterThanOrEqual(1900)
    })

    it('should handle case-insensitive file name matching', async () => {
      const mockFile = new File(['CV content'], 'RESUME.PDF', {
        type: 'application/pdf'
      })

      const result = await mockExtractTextFromPDF(mockFile)

      expect(result.text).toContain('DR. SARAH WILSON, MD, PHD')
    })
  })
})

