import { TaxPayer } from '../../types/tax';
import { validateSSN } from './ssnValidation';
import { validateContactInfo } from './contactValidation';
import { validateSpouseInfo } from './spouseValidation';
import { validateAddress } from './addressValidation';

export const validatePersonalInfo = (personalInfo: TaxPayer): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Basic validation
  if (!personalInfo.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!personalInfo.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  if (!personalInfo.ssn) {
    errors.ssn = 'SSN is required';
  } else if (!validateSSN(personalInfo.ssn)) {
    errors.ssn = 'Invalid SSN format';
  }

  // Date of Birth validation
  if (!personalInfo.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const birthDate = new Date(personalInfo.dateOfBirth);
    const today = new Date();
    if (birthDate > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future';
    }
  }

  // Occupation validation
  if (!personalInfo.occupation?.trim()) {
    errors.occupation = 'Occupation is required';
  }

  // Contact validation
  const contactErrors = validateContactInfo(personalInfo.email, personalInfo.phone);
  Object.assign(errors, contactErrors);

  // Address validation
  if (personalInfo.address) {
    const addressErrors = validateAddress(personalInfo.address);
    Object.assign(errors, addressErrors);
  }

  // Filing status validation
  if (!personalInfo.filingStatus) {
    errors.filingStatus = 'Filing status is required';
  }

  // Spouse validation for married filing statuses
  if ((personalInfo.filingStatus === 'married' || personalInfo.filingStatus === 'marriedSeparate') 
      && personalInfo.spouseInfo) {
    const spouseErrors = validateSpouseInfo(personalInfo.spouseInfo);
    Object.assign(errors, spouseErrors);
  }

  return errors;
};