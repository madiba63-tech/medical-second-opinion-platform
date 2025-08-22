import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientInfoForm from '../PatientInfoForm'
import { PersonalInfo } from '@/types/form'

// Mock the form data
const mockFormData = {
  personalInfo: {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: ''
  },
  medicalFiles: [],
  contextInfo: {
    ethnicity: '',
    gender: '',
    diseaseType: '',
    isFirstOccurrence: null,
    geneticFamilyHistory: []
  },
  paymentId: '',
  consentAccepted: false
}

const mockUpdateFormData = jest.fn()
const mockNextStep = jest.fn()

const defaultProps = {
  formData: mockFormData,
  updateFormData: mockUpdateFormData,
  nextStep: mockNextStep
}

describe('PatientInfoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form with all required fields', () => {
    render(<PatientInfoForm {...defaultProps} />)
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('First Name *')).toBeInTheDocument()
    expect(screen.getByText('Last Name *')).toBeInTheDocument()
    expect(screen.getByText('Date of Birth *')).toBeInTheDocument()
    expect(screen.getByText('Email Address *')).toBeInTheDocument()
    expect(screen.getByText('Phone Number')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Continue to Upload Documents/ })).toBeInTheDocument()
  })

  it('shows validation errors for required fields when submitted empty', async () => {
    const user = userEvent.setup()
    render(<PatientInfoForm {...defaultProps} />)
    
    const submitButton = screen.getByRole('button', { name: /Continue to Upload Documents/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Date of birth is required')).toBeInTheDocument()
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('validates email format correctly', async () => {
    const user = userEvent.setup()
    render(<PatientInfoForm {...defaultProps} />)
    
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: /Continue to Upload Documents/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('accepts valid form data and calls updateFormData and nextStep', async () => {
    const user = userEvent.setup()
    render(<PatientInfoForm {...defaultProps} />)
    
    // Fill in required fields
    await user.type(screen.getByPlaceholderText('Enter your first name'), 'John')
    await user.type(screen.getByPlaceholderText('Enter your last name'), 'Doe')
    await user.type(screen.getByDisplayValue(''), '1990-01-01') // Date input
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'john.doe@example.com')
    
    const submitButton = screen.getByRole('button', { name: /Continue to Upload Documents/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockUpdateFormData).toHaveBeenCalledWith({
        personalInfo: {
          firstName: 'John',
          middleName: '',
          lastName: 'Doe',
          dob: '1990-01-01',
          email: 'john.doe@example.com',
          phone: ''
        }
      })
      expect(mockNextStep).toHaveBeenCalled()
    })
  })

  it('handles optional fields correctly', async () => {
    const user = userEvent.setup()
    render(<PatientInfoForm {...defaultProps} />)
    
    // Fill in required fields
    await user.type(screen.getByPlaceholderText('Enter your first name'), 'Jane')
    await user.type(screen.getByPlaceholderText('Enter your last name'), 'Smith')
    await user.type(screen.getByDisplayValue(''), '1985-05-15') // Date input
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'jane.smith@example.com')
    
    // Fill in optional fields
    await user.type(screen.getByPlaceholderText('Middle name (optional)'), 'Marie')
    await user.type(screen.getByPlaceholderText('(555) 123-4567'), '+1234567890')
    
    const submitButton = screen.getByRole('button', { name: /Continue to Upload Documents/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockUpdateFormData).toHaveBeenCalledWith({
        personalInfo: {
          firstName: 'Jane',
          middleName: 'Marie',
          lastName: 'Smith',
          dob: '1985-05-15',
          email: 'jane.smith@example.com',
          phone: '+1234567890'
        }
      })
    })
  })

  it('pre-fills form with existing data', () => {
    const existingFormData = {
      ...mockFormData,
      personalInfo: {
        firstName: 'Alice',
        middleName: 'Jane',
        lastName: 'Johnson',
        dob: '1980-12-25',
        email: 'alice.johnson@example.com',
        phone: '+1987654321'
      }
    }
    
    render(<PatientInfoForm {...defaultProps} formData={existingFormData} />)
    
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Johnson')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1980-12-25')).toBeInTheDocument()
    expect(screen.getByDisplayValue('alice.johnson@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('+1987654321')).toBeInTheDocument()
  })

  it('handles defensive programming when props are undefined', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <PatientInfoForm 
        formData={mockFormData}
        updateFormData={undefined as any}
        nextStep={undefined as any}
      />
    )
    
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Enter your first name'), 'Test')
    await user.type(screen.getByPlaceholderText('Enter your last name'), 'User')
    await user.type(screen.getByDisplayValue(''), '1990-01-01') // Date input
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: /Continue to Upload Documents/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('updateFormData is not a function:', undefined)
      expect(consoleSpy).toHaveBeenCalledWith('nextStep is not a function:', undefined)
    })
    
    consoleSpy.mockRestore()
  })

  it('displays contact information notice', () => {
    render(<PatientInfoForm {...defaultProps} />)
    
    expect(screen.getByText(/We'll use this to send your second opinion report/)).toBeInTheDocument()
    expect(screen.getByText(/Optional - for urgent case updates only/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<PatientInfoForm {...defaultProps} />)
    
    const firstNameInput = screen.getByPlaceholderText('Enter your first name')
    const lastNameInput = screen.getByPlaceholderText('Enter your last name')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    
    expect(firstNameInput).toHaveAttribute('type', 'text')
    expect(lastNameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    
    expect(firstNameInput).toHaveAttribute('placeholder', 'Enter your first name')
    expect(lastNameInput).toHaveAttribute('placeholder', 'Enter your last name')
    expect(emailInput).toHaveAttribute('placeholder', 'your.email@example.com')
  })
})
