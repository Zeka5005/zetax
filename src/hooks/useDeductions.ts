import { useState } from 'react';

export interface BusinessDeductions {
  advertising: number;
  carAndTruck: number;
  commissions: number;
  contractLabor: number;
  depreciation: number;
  insurance: number;
  mortgageInterest: number;
  otherInterest: number;
  legalServices: number;
  officeExpenses: number;
  supplies: number;
  repairs: number;
  taxes: number;
  travel: number;
  meals: number;
  utilities: number;
  wages: number;
  other: number;
}

export interface RentalDeductions {
  advertising: number;
  autoAndTravel: number;
  cleaning: number;
  commissions: number;
  insurance: number;
  legal: number;
  management: number;
  mortgageInterest: number;
  repairs: number;
  supplies: number;
  taxes: number;
  utilities: number;
  depreciation: number;
  other: number;
}

export const useDeductions = <T extends BusinessDeductions | RentalDeductions>(initialState: T) => {
  const [deductions, setDeductions] = useState<T>(initialState);

  const updateDeduction = (field: keyof T, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setDeductions(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateTotal = () => {
    return Object.values(deductions).reduce((sum, value) => sum + (value || 0), 0);
  };

  return {
    deductions,
    updateDeduction,
    calculateTotal,
  };
};