import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IdentityContactStep from '@/components/recruitment/IdentityContactStep';

const mockOnNext = jest.fn();
const mockOnPrev = jest.fn();
const mockOnDataChange = jest.fn();

const defaultProps = {
  data: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    governmentId: null,
  },
  onNext: mockOnNext,
  onPrev: mockOnPrev,
  onDataChange: mockOnDataChange,
  onFileUpload: jest.fn(),
  isUploading: false,
};

describe('IdentityContactStep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all required form fields', () => {
    render(<IdentityContactStep {...defaultProps} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nationality/i)).toBeInTheDocument();
  });

  it('displays validation errors for required fields', async () => {
    render(<IdentityContactStep {...defaultProps} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/date of birth is required/i)).toBeInTheDocument();
      expect(screen.getByText(/nationality is required/i)).toBeInTheDocument();
    });

    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<IdentityContactStep {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    const user = userEvent.setup();
    render(<IdentityContactStep {...defaultProps} />);

    const phoneInput = screen.getByLabelText(/phone/i);
    await user.type(phoneInput, '123'); // Invalid phone number

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });

  it('validates date of birth (must be 18 or older)', async () => {
    const user = userEvent.setup();
    render(<IdentityContactStep {...defaultProps} />);

    const dobInput = screen.getByLabelText(/date of birth/i);
    const today = new Date();
    const recentDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
    await user.type(dobInput, recentDate.toISOString().split('T')[0]);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/you must be at least 18 years old/i)).toBeInTheDocument();
    });
  });

  it('calls onDataChange when form fields are updated', async () => {
    const user = userEvent.setup();
    render(<IdentityContactStep {...defaultProps} />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'John');

    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        firstName: 'John',
      });
    });
  });

  it('sanitizes input to prevent XSS', async () => {
    const user = userEvent.setup();
    render(<IdentityContactStep {...defaultProps} />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, '<script>alert(\"xss\")</script>John');

    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        firstName: 'John', // Script tags should be stripped
      });
    });
  });

  it('successfully submits valid form data', async () => {
    const user = userEvent.setup();
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567',
      dateOfBirth: '1990-01-01',
      nationality: 'United States',
    };

    render(<IdentityContactStep {...defaultProps} data={validData} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('handles file upload for government ID', async () => {
    const mockFileUpload = jest.fn();
    render(<IdentityContactStep {...defaultProps} onFileUpload={mockFileUpload} />);

    const file = new File(['dummy content'], 'id.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/government.*id/i);

    await userEvent.upload(fileInput, file);

    expect(mockFileUpload).toHaveBeenCalledWith('governmentId', file);
  });

  it('shows loading state during file upload', () => {
    render(<IdentityContactStep {...defaultProps} isUploading={true} />);

    expect(screen.getByText(/uploading/i)).toBeInTheDocument();
  });

  it('navigates to previous step when prev button is clicked', () => {
    render(<IdentityContactStep {...defaultProps} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    expect(mockOnPrev).toHaveBeenCalled();
  });

  it('displays pre-populated data correctly', () => {
    const preFilledData = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+44-20-7946-0958',
      dateOfBirth: '1985-05-15',
      nationality: 'United Kingdom',
    };

    render(<IdentityContactStep {...defaultProps} data={preFilledData} />);

    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane.smith@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+44-20-7946-0958')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1985-05-15')).toBeInTheDocument();
    expect(screen.getByDisplayValue('United Kingdom')).toBeInTheDocument();
  });
});