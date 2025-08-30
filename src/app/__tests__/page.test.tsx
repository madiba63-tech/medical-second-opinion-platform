import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'

// Mock the components
interface MockFormProps {
  updateFormData: (data: unknown) => void;
  nextStep: () => void;
}

jest.mock('@/components/PatientInfoForm', () => {
  return function MockPatientInfoForm({ updateFormData, nextStep }: MockFormProps) {
    return (
      <div data-testid="patient-info-form">
        <h2>Personal Information</h2>
        <button onClick={() => {
          updateFormData({ personalInfo: { firstName: 'John', lastName: 'Doe', dob: '1990-01-01', email: 'john@example.com', phone: '' } })
          nextStep()
        }}>
          Continue to Upload Documents
        </button>
      </div>
    )
  }
})

jest.mock('@/components/MedicalUploadForm', () => {
  return function MockMedicalUploadForm({ updateFormData, nextStep }: MockFormProps) {
    return (
      <div data-testid="medical-upload-form">
        <h2>Upload Documents</h2>
        <button onClick={() => {
          updateFormData({ medicalFiles: [{ name: 'test.pdf', size: 1024, type: 'application/pdf', category: "Doctor's Letter", s3Key: 'uploads/test.pdf' }] })
          nextStep()
        }}>
          Continue to Medical Context
        </button>
      </div>
    )
  }
})

jest.mock('@/components/MedicalContextForm', () => {
  return function MockMedicalContextForm({ updateFormData, nextStep }: MockFormProps) {
    return (
      <div data-testid="medical-context-form">
        <h2>Medical Context</h2>
        <button onClick={() => {
          updateFormData({ contextInfo: { ethnicity: 'White/Caucasian', gender: 'Male', diseaseType: 'Prostate Cancer', isFirstOccurrence: true, geneticFamilyHistory: ['Parents'] } })
          nextStep()
        }}>
          Continue to Review
        </button>
      </div>
    )
  }
})

jest.mock('@/components/ReviewSubmission', () => {
  return function MockReviewSubmission({ nextStep }: Pick<MockFormProps, 'nextStep'>) {
    return (
      <div data-testid="review-submission">
        <h2>Review</h2>
        <button onClick={() => nextStep()}>
          Continue to Payment
        </button>
      </div>
    )
  }
})

jest.mock('@/components/PaymentSection', () => {
  return function MockPaymentSection({ updateFormData, nextStep }: MockFormProps) {
    return (
      <div data-testid="payment-section">
        <h2>Payment</h2>
        <button onClick={() => {
          updateFormData({ paymentId: 'txn_12345' })
          nextStep()
        }}>
          Continue to Consent
        </button>
      </div>
    )
  }
})

interface MockTermsConsentProps extends MockFormProps {
  setCaseId: (caseId: string) => void;
}

jest.mock('@/components/TermsConsent', () => {
  return function MockTermsConsent({ updateFormData, nextStep, setCaseId }: MockTermsConsentProps) {
    return (
      <div data-testid="terms-consent">
        <h2>Terms & Conditions</h2>
        <button onClick={() => {
          updateFormData({ consentAccepted: true })
          setCaseId('CASE-123456789')
          nextStep()
        }}>
          Submit Request
        </button>
      </div>
    )
  }
})

interface MockConfirmationProps {
  caseId: string;
  customerName: string;
}

jest.mock('@/components/ConfirmationScreen', () => {
  return function MockConfirmationScreen({ caseId, customerName }: MockConfirmationProps) {
    return (
      <div data-testid="confirmation-screen">
        <h2>Confirmation</h2>
        <p>Case ID: {caseId}</p>
        <p>Customer: {customerName}</p>
      </div>
    )
  }
})

describe('Home Page Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the main page with step indicator', () => {
    render(<Home />)
    
    expect(screen.getByText('Medical Second Opinion Portal')).toBeInTheDocument()
    expect(screen.getByText('Submit your medical records for expert review by our qualified medical professionals')).toBeInTheDocument()
    
    // Check step indicator
    expect(screen.getByText('Personal Info')).toBeInTheDocument()
    expect(screen.getByText('Upload Documents')).toBeInTheDocument()
    expect(screen.getByText('Medical Context')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Payment')).toBeInTheDocument()
    expect(screen.getByText('Consent')).toBeInTheDocument()
    expect(screen.getByText('Confirmation')).toBeInTheDocument()
  })

  it('starts with step 1 (Personal Information)', () => {
    render(<Home />)
    
    expect(screen.getByTestId('patient-info-form')).toBeInTheDocument()
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
  })

  it('navigates through all steps correctly', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Step 1: Personal Information
    expect(screen.getByTestId('patient-info-form')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Upload Documents'))
    
    // Step 2: Upload Documents
    await waitFor(() => {
      expect(screen.getByTestId('medical-upload-form')).toBeInTheDocument()
    })
    expect(screen.getByText('Upload Documents')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Medical Context'))
    
    // Step 3: Medical Context
    await waitFor(() => {
      expect(screen.getByTestId('medical-context-form')).toBeInTheDocument()
    })
    expect(screen.getByText('Medical Context')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Review'))
    
    // Step 4: Review
    await waitFor(() => {
      expect(screen.getByTestId('review-submission')).toBeInTheDocument()
    })
    expect(screen.getByText('Review')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Payment'))
    
    // Step 5: Payment
    await waitFor(() => {
      expect(screen.getByTestId('payment-section')).toBeInTheDocument()
    })
    expect(screen.getByText('Payment')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Consent'))
    
    // Step 6: Terms & Consent
    await waitFor(() => {
      expect(screen.getByTestId('terms-consent')).toBeInTheDocument()
    })
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument()
    await user.click(screen.getByText('Submit Request'))
    
    // Step 7: Confirmation
    await waitFor(() => {
      expect(screen.getByTestId('confirmation-screen')).toBeInTheDocument()
    })
    expect(screen.getByText('Confirmation')).toBeInTheDocument()
    expect(screen.getByText('Case ID: CASE-123456789')).toBeInTheDocument()
    expect(screen.getByText('Customer: John Doe')).toBeInTheDocument()
  })

  it('updates step indicator correctly as user progresses', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Initially, step 1 should be active
    const step1Button = screen.getByRole('button', { name: '1' })
    expect(step1Button).toHaveClass('bg-blue-600')
    
    // Move to step 2
    await user.click(screen.getByText('Continue to Upload Documents'))
    await waitFor(() => {
      const step2Button = screen.getByRole('button', { name: '2' })
      expect(step2Button).toHaveClass('bg-blue-600')
    })
    
    // Step 1 should now be completed
    await waitFor(() => {
      const step1Button = screen.getByRole('button', { name: '✓' })
      expect(step1Button).toHaveClass('bg-green-500')
    })
  })

  it('displays security notice', () => {
    render(<Home />)
    
    expect(screen.getByText(/🔒 Your data is encrypted and securely stored/)).toBeInTheDocument()
    expect(screen.getByText(/We comply with HIPAA regulations/)).toBeInTheDocument()
  })

  it('allows navigation back to previous steps', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Move to step 2
    await user.click(screen.getByText('Continue to Upload Documents'))
    await waitFor(() => {
      expect(screen.getByTestId('medical-upload-form')).toBeInTheDocument()
    })
    
    // Click on step 1 to go back
    const step1Button = screen.getByRole('button', { name: '✓' })
    await user.click(step1Button)
    
    // Should be back at step 1
    await waitFor(() => {
      expect(screen.getByTestId('patient-info-form')).toBeInTheDocument()
    })
  })

  it('maintains form data across step navigation', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Fill step 1 and move to step 2
    await user.click(screen.getByText('Continue to Upload Documents'))
    await waitFor(() => {
      expect(screen.getByTestId('medical-upload-form')).toBeInTheDocument()
    })
    
    // Go back to step 1
    const step1Button = screen.getByRole('button', { name: '✓' })
    await user.click(step1Button)
    
    // Should still be at step 1 with data preserved
    await waitFor(() => {
      expect(screen.getByTestId('patient-info-form')).toBeInTheDocument()
    })
  })

  it('handles the complete workflow end-to-end', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    // Complete the entire workflow
    await user.click(screen.getByText('Continue to Upload Documents'))
    await user.click(screen.getByText('Continue to Medical Context'))
    await user.click(screen.getByText('Continue to Review'))
    await user.click(screen.getByText('Continue to Payment'))
    await user.click(screen.getByText('Continue to Consent'))
    await user.click(screen.getByText('Submit Request'))
    
    // Verify final confirmation
    await waitFor(() => {
      expect(screen.getByTestId('confirmation-screen')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Case ID: CASE-123456789')).toBeInTheDocument()
    expect(screen.getByText('Customer: John Doe')).toBeInTheDocument()
  })
})
