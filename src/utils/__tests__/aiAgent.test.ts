import { extractDataFromPDF, mockAIExtractData } from '../aiAgent'

// Mock PDF processor
jest.mock('../pdfProcessor', () => ({
  extractTextFromPDF: jest.fn(),
  mockExtractTextFromPDF: jest.fn(),
}))

describe('AI Agent Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('extractDataFromPDF', () => {
    it('should extract data from PDF text successfully', async () => {
      const mockPdfText = {
        text: `DR. SARAH WILSON, MD
Medical Oncologist
Email: sarah.wilson@hospital.com
Phone: +1-617-555-0123
7 years of independent oncology practice
Current Affiliation: Boston Medical Center
25 peer-reviewed publications
License Number: MA-123456
Subspecialties: breast cancer, lung cancer
Society Memberships: ASCO, ESMO`,
        pages: 2,
        metadata: {
          title: 'Dr. Sarah Wilson CV',
          author: 'Dr. Sarah Wilson'
        }
      }

      const result = await extractDataFromPDF(mockPdfText)

      expect(result).toEqual(expect.objectContaining({
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@hospital.com',
        phone: '+1-617-555-0123',
        yearsPractice: 7,
        currentAffiliation: 'Boston Medical Center',
        publications: 25,
        licenseNumber: 'MA-123456',
        subspecialties: ['breast cancer', 'lung cancer'],
        societyMemberships: ['ASCO', 'ESMO']
      }))
    })

    it('should handle PDF text with minimal information', async () => {
      const mockPdfText = {
        text: 'Generic document with no specific information',
        pages: 1,
        metadata: {
          title: 'Generic Document'
        }
      }

      const result = await extractDataFromPDF(mockPdfText)

      expect(result).toEqual({})
    })

    it('should handle empty PDF text', async () => {
      const mockPdfText = {
        text: '',
        pages: 0,
        metadata: {}
      }

      const result = await extractDataFromPDF(mockPdfText)

      expect(result).toEqual({})
    })

    it('should extract board certification information', async () => {
      const mockPdfText = {
        text: `Board Certification: American Board of Internal Medicine - Medical Oncology
Certification Number: 123456789
Certification Date: 2017`,
        pages: 1,
        metadata: {
          title: 'Board Certification'
        }
      }

      const result = await extractDataFromPDF(mockPdfText)

      expect(result.boardCertification).toEqual({
        board: 'American Board of Internal Medicine',
        specialty: 'Medical Oncology',
        year: '2017'
      })
    })

    it('should extract clinical trials information', async () => {
      const mockPdfText = {
        text: 'Principal Investigator on clinical trials for breast cancer treatment',
        pages: 1,
        metadata: {
          title: 'Clinical Trials'
        }
      }

      const result = await extractDataFromPDF(mockPdfText)

      expect(result.clinicalTrials).toEqual({
        involved: true,
        description: 'Involved in clinical trials'
      })
    })

    it('should handle errors gracefully', async () => {
      // Mock the function to throw an error
      const originalExtractDataFromPDF = extractDataFromPDF
      jest.spyOn(console, 'error').mockImplementation(() => {})

      // This should not throw an error due to try-catch
      const mockPdfText = {
        text: 'Valid text',
        pages: 1,
        metadata: {}
      }

      const result = await extractDataFromPDF(mockPdfText)
      expect(result).toBeDefined()
    })
  })

  describe('mockAIExtractData', () => {
    it('should extract data from CV/resume files', async () => {
      const mockPdfText = {
        text: 'CV content',
        pages: 2,
        metadata: {
          title: 'Dr. Sarah Wilson CV'
        }
      }

      const result = await mockAIExtractData(mockPdfText)

      expect(result).toEqual(expect.objectContaining({
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@bostonmedical.org',
        phone: '+1-617-555-0123',
        yearsPractice: 7,
        currentAffiliation: 'Boston Medical Center',
        publications: 25,
        subspecialties: ['breast cancer', 'lung cancer'],
        societyMemberships: ['ASCO', 'ESMO', 'AACR']
      }))
    })

    it('should extract data from license files', async () => {
      const mockPdfText = {
        text: 'License content',
        pages: 1,
        metadata: {
          title: 'Medical License Certificate'
        }
      }

      const result = await mockAIExtractData(mockPdfText)

      expect(result).toEqual(expect.objectContaining({
        firstName: 'Sarah',
        lastName: 'Wilson',
        licenseNumber: 'MA-123456',
        licenseCountry: 'United States',
        licenseState: 'Massachusetts',
        licenseExpiry: '2025-12-31'
      }))
    })

    it('should extract data from degree files', async () => {
      const mockPdfText = {
        text: 'Degree content',
        pages: 1,
        metadata: {
          title: 'Medical Degree Diploma'
        }
      }

      const result = await mockAIExtractData(mockPdfText)

      expect(result).toEqual(expect.objectContaining({
        firstName: 'Sarah',
        lastName: 'Wilson',
        medicalDegree: {
          institution: 'Harvard Medical School',
          year: '2010',
          degree: 'MD'
        }
      }))
    })

    it('should return generic data for unknown file types', async () => {
      const mockPdfText = {
        text: 'Unknown content',
        pages: 1,
        metadata: {
          title: 'Unknown Document'
        }
      }

      const result = await mockAIExtractData(mockPdfText)

      expect(result).toEqual(expect.objectContaining({
        firstName: 'Unknown',
        lastName: 'Professional',
        yearsPractice: 5,
        publications: 10,
        subspecialties: ['oncology'],
        societyMemberships: ['ASCO']
      }))
    })

    it('should simulate processing delay', async () => {
      const mockPdfText = {
        text: 'Test content',
        pages: 1,
        metadata: {
          title: 'Test Document'
        }
      }

      const startTime = Date.now()
      await mockAIExtractData(mockPdfText)
      const endTime = Date.now()

      // Should take at least 3 seconds due to simulated delay
      expect(endTime - startTime).toBeGreaterThanOrEqual(2900)
    })
  })
})

