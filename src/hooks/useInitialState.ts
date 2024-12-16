import { useState, useEffect } from 'react';
import { TaxPayer, Income, Deductions, TaxCalculation } from '../types/tax';
import { calculateTax } from '../utils/taxCalculator';
import { validateTaxpayer } from '../utils/validation';

export const useInitialState = () => {
  const [taxpayerInfo, setTaxpayerInfo] = useState<TaxPayer>({
    firstName: '',
    lastName: '',
    ssn: '',
    filingStatus: 'single',
    dependents: 0,
    age: 0,
    isBlind: false,
    children: [],
  });

  const [income, setIncome] = useState<Income>({
    wages: 0,
    selfEmployment: 0,
    investments: 0,
    dividends: 0,
    rentalIncome: 0,
    retirement: 0,
    socialSecurity: 0,
    other: 0,
    withholdingAmount: 0,
    estimatedTaxPayments: 0,
    businessExpenses: {
      advertising: 0,
      carAndTruck: 0,
      commissions: 0,
      contractLabor: 0,
      depreciation: 0,
      insurance: 0,
      mortgageInterest: 0,
      otherInterest: 0,
      legalServices: 0,
      officeExpenses: 0,
      supplies: 0,
      repairs: 0,
      taxes: 0,
      travel: 0,
      meals: 0,
      utilities: 0,
      wages: 0,
      other: 0,
    },
  });

  const [deductions, setDeductions] = useState<Deductions>({
    mortgage: 0,
    studentLoanInterest: 0,
    charitable: 0,
    medical: 0,
    stateLocalTax: 0,
    propertyTax: 0,
    educationExpenses: 0,
    retirementContributions: 0,
    healthSavings: 0,
  });

  const [calculation, setCalculation] = useState<TaxCalculation>({
    totalIncome: 0,
    totalDeductions: 0,
    taxableIncome: 0,
    standardDeduction: 0,
    itemizedDeductions: 0,
    effectiveDeductions: 0,
    estimatedTax: 0,
    finalTax: 0,
    effectiveTaxRate: 0,
    selfEmploymentTax: 0,
    totalTaxLiability: 0,
    totalPayments: 0,
    refundAmount: 0,
    amountDue: 0,
    filingStatus: taxpayerInfo.filingStatus,
    childTaxCredit: 0,
    qualifyingChildren: 0,
    earnedIncomeCredit: 0,
    eitcQualifyingChildren: 0,
    businessExpenseTotal: 0,
    netBusinessIncome: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const validationErrors = validateTaxpayer(taxpayerInfo);
    const newErrors: Record<string, string> = {};
    
    validationErrors.forEach(error => {
      const [field, message] = error.split(':');
      newErrors[field] = message;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newCalculation = calculateTax(taxpayerInfo, income, deductions);
      setCalculation(newCalculation);
    }
  }, [taxpayerInfo, income, deductions]);

  return {
    taxpayerInfo,
    setTaxpayerInfo,
    income,
    setIncome,
    deductions,
    setDeductions,
    calculation,
    errors,
  };
};