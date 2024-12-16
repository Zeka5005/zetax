import { SpouseInfoData } from '../../types/tax';
import { validateSSN } from './ssnValidation';

export const validateSpouseInfo = (spouseInfo: SpouseInfoData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!spouseInfo.firstName.trim()) {
    errors.spouseFirstName = 'Spouse first name is required';
  }

  if (!spouseInfo.lastName.trim()) {
    errors.spouseLastName = 'Spouse last name is required';
  }

  if (!spouseInfo.ssn) {
    errors.spouseSSN = 'Spouse SSN is required';
  } else if (!validateSSN(spouseInfo.ssn)) {
    errors.spouseSSN = 'Invalid SSN format';
  }

  if (!spouseInfo.dateOfBirth) {
    errors.spouseDateOfBirth = 'Spouse date of birth is required';
  }

  if (!spouseInfo.occupation.trim()) {
    errors.spouseOccupation = 'Spouse occupation is required';
  }

  return errors;
};