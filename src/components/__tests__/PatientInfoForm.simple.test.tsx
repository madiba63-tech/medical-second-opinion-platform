import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientInfoForm from '../PatientInfoForm'

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

describe('PatientInfoForm - Simple Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form correctly', () => {
    render(<PatientInfoForm {...defaultProps} />)
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('First Name *')).toBeInTheDocument()
    expect(screen.getByText('Last Name *')).toBeInTheDocument()
    expect(screen.getByText('Date of Birth *')).toBeInTheDocument()
    expect(screen.getByText('Email Address *')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Continue to Upload Documents/ })).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
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

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    render(<PatientInfoForm {...defaultProps} />)
    
    // Fill in required fields using name attributes
    const firstNameInput = screen.getByDisplayValue('')
    const lastNameInput = screen.getAllByDisplayValue('')[1]
    const emailInput = screen.getAllByDisplayValue('')[2]
    
    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john.doe@example.com')
    
    // Set date using fireEvent
    const dateInput = screen.getAllByDisplayValue('')[3]
    await user.clear(dateInput)
    await user.type(dateInput, '1990-01-01')
    
    const submitButton = screen.getByRole('button', { name: /Continue to Upload Documents/ })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockUpdateFormData).toHaveBeenCalled()
      expect(mockNextStep).toHaveBeenCalled()
    })
  })

  it('displays helpful text for users', () => {
    render(<PatientInfoForm {...defaultProps} />)
    
    expect(screen.getByText(/Let's start with your basic information/)).toBeInTheDocument()
    expect(screen.getByText(/We'll use this to send your second opinion report/)).toBeInTheDocument()
    expect(screen.getByText(/Optional - for urgent case updates only/)).toBeInTheDocument()
  })
})
