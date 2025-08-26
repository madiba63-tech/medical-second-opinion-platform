import { CustomerRepository, CaseRepository, FileRepository } from '../repository';

export interface CustomerLifecycleData {
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone?: string;
  };
  medicalFiles: Array<{
    name: string;
    size: number;
    type: string;
    category: string;
    s3Key: string;
  }>;
  contextInfo: {
    ethnicity?: string;
    gender?: string;
    diseaseType?: string;
    isFirstOccurrence?: boolean;
    geneticFamilyHistory?: string[];
  };
  paymentId?: string;
  consentAccepted: boolean;
}

export class CustomerLifecycleModule {
  private customerRepository: CustomerRepository;
  private caseRepository: CaseRepository;
  private fileRepository: FileRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.caseRepository = new CaseRepository();
    this.fileRepository = new FileRepository();
  }

  /**
   * Process a complete customer case submission
   */
  async processCaseSubmission(data: CustomerLifecycleData) {
    // Generate case number
    const caseNumber = `CASE-${Date.now()}`;

    // Create customer record
    const customer = await this.customerRepository.create({
      firstName: data.personalInfo.firstName,
      middleName: data.personalInfo.middleName,
      lastName: data.personalInfo.lastName,
      dateOfBirth: data.personalInfo.dateOfBirth,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      preferredChannel: 'EMAIL',
      emailNotifications: true,
      smsNotifications: false,
    });

    // Create case record
    const caseRecord = await this.caseRepository.create({
      firstName: data.personalInfo.firstName,
      middleName: data.personalInfo.middleName,
      lastName: data.personalInfo.lastName,
      dateOfBirth: data.personalInfo.dateOfBirth,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      ethnicity: data.contextInfo.ethnicity,
      gender: data.contextInfo.gender,
      diseaseType: data.contextInfo.diseaseType,
      isFirstOccurrence: data.contextInfo.isFirstOccurrence,
      geneticFamilyHistory: data.contextInfo.geneticFamilyHistory ? JSON.stringify(data.contextInfo.geneticFamilyHistory) : undefined,
      paymentId: data.paymentId,
      consentAccepted: data.consentAccepted,
      customerId: customer.id,
    });

    // Update case with case number
    await this.caseRepository.update(caseRecord.id, {
      caseNumber: caseNumber,
    } as any); // Type assertion needed due to repository interface limitation

    // Create file records
    if (data.medicalFiles.length > 0) {
      for (const file of data.medicalFiles) {
        await this.fileRepository.create({
          caseId: caseRecord.id,
          fileName: file.name,
          originalName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          category: file.category,
          s3Key: file.s3Key,
        });
      }
    }

    return {
      caseId: caseRecord.id,
      caseNumber: caseNumber,
      customerId: customer.id,
      filesCount: data.medicalFiles.length,
    };
  }

  /**
   * Get customer with all their cases
   */
  async getCustomerWithCases(customerId: string) {
    return await this.customerRepository.findById(customerId);
  }

  /**
   * Get customer by email
   */
  async getCustomerByEmail(email: string) {
    return await this.customerRepository.findByEmail(email);
  }

  /**
   * Update customer information
   */
  async updateCustomer(customerId: string, data: Partial<{
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    preferredChannel: 'EMAIL' | 'SMS';
    emailNotifications: boolean;
    smsNotifications: boolean;
  }>) {
    return await this.customerRepository.update(customerId, data);
  }

  /**
   * Get customer statistics
   */
  async getCustomerStatistics() {
    return await this.customerRepository.getStatistics();
  }

  /**
   * Get case by case number for customer
   */
  async getCaseByNumber(caseNumber: string) {
    return await this.caseRepository.findByCaseNumber(caseNumber);
  }

  /**
   * Get all cases for a customer
   */
  async getCustomerCases(customerId: string, page: number = 1, limit: number = 20) {
    return await this.caseRepository.findAll({ customerId }, page, limit);
  }
}

export * from './customerLifecycleService';
