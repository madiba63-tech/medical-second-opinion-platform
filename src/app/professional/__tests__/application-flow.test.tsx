import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import ProfessionalApplication from '../apply/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock the professional application components
jest.mock('@/components/professional/IdentityStep', () => {
  return function MockIdentityStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="identity-step">
        <h2>Identity Verification</h2>
        <input 
          data-testid="first-name-input"
          placeholder="First Name"
          onChange={(e) => updateFormData({ ...formData, firstName: e.target.value })}
        />
        <input 
          data-testid="last-name-input"
          placeholder="Last Name"
          onChange={(e) => updateFormData({ ...formData, lastName: e.target.value })}
        />
        <input 
          data-testid="email-input"
          placeholder="Email"
          onChange={(e) => updateFormData({ ...formData, email: e.target.value })}
        />
        <button onClick={() => nextStep()}>Continue to Experience</button>
      </div>
    )
  }
})

jest.mock('@/components/professional/ExperienceStep', () => {
  return function MockExperienceStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="experience-step">
        <h2>Professional Experience</h2>
        <input 
          data-testid="specialization-input"
          placeholder="Specialization"
          onChange={(e) => updateFormData({ ...formData, specialization: e.target.value })}
        />
        <input 
          data-testid="years-experience-input"
          type="number"
          placeholder="Years of Experience"
          onChange={(e) => updateFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) })}
        />
        <button onClick={() => nextStep()}>Continue to Licensing</button>
      </div>
    )
  }
})

jest.mock('@/components/professional/LicensingStep', () => {
  return function MockLicensingStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="licensing-step">
        <h2>Licensing Information</h2>
        <input 
          data-testid="license-number-input"
          placeholder="License Number"
          onChange={(e) => updateFormData({ ...formData, licenseNumber: e.target.value })}
        />
        <input 
          data-testid="state-input"
          placeholder="State"
          onChange={(e) => updateFormData({ ...formData, state: e.target.value })}
        />
        <button onClick={() => nextStep()}>Continue to Education</button>
      </div>
    )
  }
})

jest.mock('@/components/professional/EducationStep', () => {
  return function MockEducationStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="education-step">
        <h2>Education Background</h2>
        <input 
          data-testid="medical-school-input"
          placeholder="Medical School"
          onChange={(e) => updateFormData({ ...formData, medicalSchool: e.target.value })}
        />
        <input 
          data-testid="graduation-year-input"
          type="number"
          placeholder="Graduation Year"
          onChange={(e) => updateFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
        />
        <button onClick={() => nextStep()}>Continue to Research</button>
      </div>
    )
  }
})

jest.mock('@/components/professional/ResearchStep', () => {
  return function MockResearchStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="research-step">
        <h2>Research & Publications</h2>
        <textarea 
          data-testid="research-interests-input"
          placeholder="Research Interests"
          onChange={(e) => updateFormData({ ...formData, researchInterests: e.target.value })}
        />
        <input 
          data-testid="publications-input"
          placeholder="Number of Publications"
          type="number"
          onChange={(e) => updateFormData({ ...formData, publications: parseInt(e.target.value) })}
        />
        <button onClick={() => nextStep()}>Continue to Assessment</button>
      </div>
    )
  }
})

jest.mock('@/components/professional/AssessmentStep', () => {
  return function MockAssessmentStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="assessment-step">
        <h2>Competency Assessment</h2>
        <select 
          data-testid="case-complexity-input"
          onChange={(e) => updateFormData({ ...formData, caseComplexity: e.target.value })}
        >
          <option value="">Select Complexity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={() => nextStep()}>Continue to Compliance</button>
      </div>
    )
  }
})

jest.mock('@/components/professional/ComplianceStep', () => {
  return function MockComplianceStep({ formData, updateFormData, nextStep }: any) {
    return (
      <div data-testid="compliance-step">
        <h2>Compliance & Ethics</h2>
        <label>
          <input 
            type="checkbox"
            data-testid="ethics-agreement-checkbox"
            onChange={(e) => updateFormData({ ...formData, ethicsAgreement: e.target.checked })}
          />
          I agree to ethical guidelines
        </label>
        <label>
          <input 
            type="checkbox"
            data-testid="privacy-agreement-checkbox"
            onChange={(e) => updateFormData({ ...formData, privacyAgreement: e.target.checked })}
          />
          I agree to privacy policy
        </label>
        <button onClick={() => nextStep()}>Submit Application</button>
      </div>
    )
  }
})

// Mock fetch for API calls
global.fetch = jest.fn()

describe('Professional Application Flow', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true, professionalId: 'PROF-123' })
    })
  })

  it('should render the initial identity step', () => {
    render(<ProfessionalApplication />)
    
    expect(screen.getByTestId('identity-step')).toBeInTheDocument()
    expect(screen.getByText('Identity Verification')).toBeInTheDocument()
    expect(screen.queryByTestId('experience-step')).not.toBeInTheDocument()
  })

  it('should progress through all steps correctly', async () => {
    const user = userEvent.setup()
    render(<ProfessionalApplication />)

    // Step 1: Identity
    expect(screen.getByTestId('identity-step')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Experience'))

    // Step 2: Experience
    await waitFor(() => {
      expect(screen.getByTestId('experience-step')).toBeInTheDocument()
    })
    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Licensing'))

    // Step 3: Licensing
    await waitFor(() => {
      expect(screen.getByTestId('licensing-step')).toBeInTheDocument()
    })
    expect(screen.getByText('Licensing Information')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Education'))

    // Step 4: Education
    await waitFor(() => {
      expect(screen.getByTestId('education-step')).toBeInTheDocument()
    })
    expect(screen.getByText('Education Background')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Research'))

    // Step 5: Research
    await waitFor(() => {
      expect(screen.getByTestId('research-step')).toBeInTheDocument()
    })
    expect(screen.getByText('Research & Publications')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Assessment'))

    // Step 6: Assessment
    await waitFor(() => {
      expect(screen.getByTestId('assessment-step')).toBeInTheDocument()
    })
    expect(screen.getByText('Competency Assessment')).toBeInTheDocument()
    await user.click(screen.getByText('Continue to Compliance'))

    // Step 7: Compliance
    await waitFor(() => {
      expect(screen.getByTestId('compliance-step')).toBeInTheDocument()
    })
    expect(screen.getByText('Compliance & Ethics')).toBeInTheDocument()
  })

  it('should handle form data updates correctly', async () => {
    const user = userEvent.setup()
    render(<ProfessionalApplication />)

    // Fill out identity step
    const firstNameInput = screen.getByTestId('first-name-input')
    const lastNameInput = screen.getByTestId('last-name-input')
    const emailInput = screen.getByTestId('email-input')

    await user.type(firstNameInput, 'Dr. Jane')
    await user.type(lastNameInput, 'Smith')
    await user.type(emailInput, 'jane.smith@hospital.com')

    expect(firstNameInput).toHaveValue('Dr. Jane')
    expect(lastNameInput).toHaveValue('Smith')
    expect(emailInput).toHaveValue('jane.smith@hospital.com')

    // Progress to next step
    await user.click(screen.getByText('Continue to Experience'))

    // Fill out experience step
    await waitFor(() => {
      expect(screen.getByTestId('experience-step')).toBeInTheDocument()
    })

    const specializationInput = screen.getByTestId('specialization-input')
    const yearsExperienceInput = screen.getByTestId('years-experience-input')

    await user.type(specializationInput, 'Oncology')
    await user.type(yearsExperienceInput, '15')

    expect(specializationInput).toHaveValue('Oncology')
    expect(yearsExperienceInput).toHaveValue(15)
  })

  it('should handle application submission successfully', async () => {
    const user = userEvent.setup()
    render(<ProfessionalApplication />)

    // Navigate to compliance step
    await user.click(screen.getByText('Continue to Experience'))
    await user.click(screen.getByText('Continue to Licensing'))
    await user.click(screen.getByText('Continue to Education'))
    await user.click(screen.getByText('Continue to Research'))
    await user.click(screen.getByText('Continue to Assessment'))
    await user.click(screen.getByText('Continue to Compliance'))

    // Fill out compliance agreements
    await waitFor(() => {
      expect(screen.getByTestId('compliance-step')).toBeInTheDocument()
    })

    const ethicsCheckbox = screen.getByTestId('ethics-agreement-checkbox')
    const privacyCheckbox = screen.getByTestId('privacy-agreement-checkbox')

    await user.click(ethicsCheckbox)
    await user.click(privacyCheckbox)

    expect(ethicsCheckbox).toBeChecked()
    expect(privacyCheckbox).toBeChecked()

    // Submit application
    await user.click(screen.getByText('Submit Application'))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/professional/apply',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
    })
  })

  it('should handle API errors during submission', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ 
        success: false, 
        message: 'Internal server error' 
      })
    })

    render(<ProfessionalApplication />)

    // Navigate to compliance step
    await user.click(screen.getByText('Continue to Experience'))
    await user.click(screen.getByText('Continue to Licensing'))
    await user.click(screen.getByText('Continue to Education'))
    await user.click(screen.getByText('Continue to Research'))
    await user.click(screen.getByText('Continue to Assessment'))
    await user.click(screen.getByText('Continue to Compliance'))

    // Fill out compliance agreements
    await waitFor(() => {
      expect(screen.getByTestId('compliance-step')).toBeInTheDocument()
    })

    const ethicsCheckbox = screen.getByTestId('ethics-agreement-checkbox')
    const privacyCheckbox = screen.getByTestId('privacy-agreement-checkbox')

    await user.click(ethicsCheckbox)
    await user.click(privacyCheckbox)

    // Submit application
    await user.click(screen.getByText('Submit Application'))

    await waitFor(() => {
      expect(screen.getByText('Error submitting application')).toBeInTheDocument()
    })
  })

  it('should validate required fields before proceeding', async () => {
    const user = userEvent.setup()
    render(<ProfessionalApplication />)

    // Try to proceed without filling required fields
    await user.click(screen.getByText('Continue to Experience'))

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument()
    })

    // Fill required fields
    const firstNameInput = screen.getByTestId('first-name-input')
    const lastNameInput = screen.getByTestId('last-name-input')
    const emailInput = screen.getByTestId('email-input')

    await user.type(firstNameInput, 'Dr. Jane')
    await user.type(lastNameInput, 'Smith')
    await user.type(emailInput, 'jane.smith@hospital.com')

    // Try to proceed again
    await user.click(screen.getByText('Continue to Experience'))

    // Should proceed successfully
    await waitFor(() => {
      expect(screen.getByTestId('experience-step')).toBeInTheDocument()
    })
  })

  it('should allow navigation back to previous steps', async () => {
    const user = userEvent.setup()
    render(<ProfessionalApplication />)

    // Progress to experience step
    await user.click(screen.getByText('Continue to Experience'))
    await waitFor(() => {
      expect(screen.getByTestId('experience-step')).toBeInTheDocument()
    })

    // Go back to identity step
    const backButton = screen.getByText('Back')
    await user.click(backButton)

    await waitFor(() => {
      expect(screen.getByTestId('identity-step')).toBeInTheDocument()
    })
  })
})

