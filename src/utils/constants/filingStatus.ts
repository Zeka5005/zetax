import { FilingStatus } from '../../types/tax';

export const FILING_STATUS_OPTIONS = [
  { 
    value: 'single', 
    label: 'Single',
    description: 'Unmarried or legally separated individuals'
  },
  { 
    value: 'married', 
    label: 'Married Filing Jointly',
    description: 'Married couples who file a joint return'
  },
  { 
    value: 'marriedSeparate', 
    label: 'Married Filing Separately',
    description: 'Married individuals who file separate returns'
  },
  { 
    value: 'headOfHousehold', 
    label: 'Head of Household',
    description: 'Unmarried individuals who pay more than half the costs of keeping up a home'
  },
  { 
    value: 'qualifyingWidow', 
    label: 'Qualifying Widow(er)',
    description: 'Surviving spouse with a dependent child'
  }
] as const;

export const getFilingStatusLabel = (status: FilingStatus): string => {
  return FILING_STATUS_OPTIONS.find(option => option.value === status)?.label || status;
};

export const getFilingStatusDescription = (status: FilingStatus): string => {
  return FILING_STATUS_OPTIONS.find(option => option.value === status)?.description || '';
};

export const validateFilingStatus = (status: FilingStatus, maritalStatus: string, dependents: number): string[] => {
  const errors: string[] = [];

  if (status === 'headOfHousehold' && dependents === 0) {
    errors.push('Head of Household status requires at least one qualifying dependent');
  }

  if (status === 'married' && maritalStatus !== 'married') {
    errors.push('Married Filing Jointly status is only available for married individuals');
  }

  if (status === 'qualifyingWidow' && maritalStatus !== 'widowed') {
    errors.push('Qualifying Widow(er) status is only available for surviving spouses');
  }

  return errors;
};