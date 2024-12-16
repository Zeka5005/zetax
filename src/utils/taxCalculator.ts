import { Income, Deductions, TaxCalculation, TaxPayer } from '../types/tax';
import {
  TAX_BRACKETS_2024,
  STANDARD_DEDUCTION_2024,
  SELF_EMPLOYMENT_2024,
} from './taxConstants2024';
import { calculateChildTaxCredit } from './credits/childTaxCredit';
import { calculateEarnedIncomeCredit } from './credits/earnedIncomeCredit';
import { calculateIncomeTax } from './tax/incomeTax';
import { calculateTotalBusinessExpenses, calculateNetBusinessIncome } from './business/businessExpenses';

const calculateTotalIncome = (income: Income): number => {
  const netBusinessIncome = calculateNetBusinessIncome(income.selfEmployment, income.businessExpenses);
  return (
    (income.wages || 0) +
    netBusinessIncome +
    (income.investments || 0) +
    (income.dividends || 0) +
    (income.rentalIncome || 0) +
    (income.retirement || 0) +
    (income.socialSecurity || 0) +
    (income.other || 0)
  );
};

const calculateItemizedDeductions = (deductions: Deductions): number => {
  return (
    (deductions.mortgage || 0) +
    (deductions.studentLoanInterest || 0) +
    (deductions.charitable || 0) +
    (deductions.medical || 0) +
    (deductions.stateLocalTax || 0) +
    (deductions.propertyTax || 0) +
    (deductions.educationExpenses || 0) +
    (deductions.retirementContributions || 0) +
    (deductions.healthSavings || 0)
  );
};

const calculateSelfEmploymentTax = (netBusinessIncome: number): number => {
  if (netBusinessIncome < SELF_EMPLOYMENT_2024.threshold) {
    return 0;
  }
  const taxableAmount = netBusinessIncome * 0.9235;
  return taxableAmount * SELF_EMPLOYMENT_2024.taxRate;
};

export const calculateTax = (
  taxpayer: TaxPayer,
  income: Income,
  deductions: Deductions
): TaxCalculation => {
  // Calculate business income and expenses
  const businessExpenseTotal = calculateTotalBusinessExpenses(income.businessExpenses);
  const netBusinessIncome = calculateNetBusinessIncome(income.selfEmployment, income.businessExpenses);
  
  // Calculate total income using net business income
  const totalIncome = calculateTotalIncome(income);
  
  // Calculate deductions
  const itemizedDeductions = calculateItemizedDeductions(deductions);
  let standardDeduction = STANDARD_DEDUCTION_2024[taxpayer.filingStatus];
  
  if (taxpayer.age >= 65 || taxpayer.isBlind) {
    standardDeduction += STANDARD_DEDUCTION_2024.blindOrElderly;
  }
  
  const effectiveDeductions = Math.max(standardDeduction, itemizedDeductions);
  const taxableIncome = Math.max(0, totalIncome - effectiveDeductions);
  
  // Calculate income tax
  const estimatedTax = calculateIncomeTax(taxableIncome, taxpayer.filingStatus);

  // Calculate child tax credit
  const childTaxCreditResult = calculateChildTaxCredit(
    taxpayer.children,
    totalIncome,
    taxpayer.filingStatus
  );

  // Calculate earned income credit
  const earnedIncome = income.wages + netBusinessIncome;
  const investmentIncome = income.investments + income.dividends;
  const eitcResult = calculateEarnedIncomeCredit(
    earnedIncome,
    totalIncome,
    investmentIncome,
    taxpayer.children.length,
    taxpayer.filingStatus
  );

  // Calculate self-employment tax based on net business income
  const selfEmploymentTax = calculateSelfEmploymentTax(netBusinessIncome);
  
  // Calculate total tax before credits
  const taxBeforeCredits = estimatedTax + selfEmploymentTax;

  // Split child tax credit into refundable and non-refundable portions
  const maxRefundableChildTaxCredit = 1600; // 2024 maximum refundable amount per child
  const totalChildTaxCredit = childTaxCreditResult.amount;
  const refundableChildTaxCredit = Math.min(
    maxRefundableChildTaxCredit * childTaxCreditResult.qualifyingChildren,
    totalChildTaxCredit
  );
  const nonRefundableChildTaxCredit = totalChildTaxCredit - refundableChildTaxCredit;

  // Apply non-refundable credits (can't reduce tax below zero)
  const nonRefundableCredits = nonRefundableChildTaxCredit;
  const taxAfterNonRefundableCredits = Math.max(0, taxBeforeCredits - nonRefundableCredits);

  // Calculate total tax liability after non-refundable credits
  const totalTaxLiability = taxAfterNonRefundableCredits;

  // Calculate total payments and refundable credits
  const totalPayments = (income.withholdingAmount || 0) + 
                       (income.estimatedTaxPayments || 0) +
                       eitcResult.amount + // Earned Income Credit
                       refundableChildTaxCredit; // Refundable portion of Child Tax Credit

  // Calculate final refund or amount due
  const totalBalance = totalPayments - totalTaxLiability;
  const refundAmount = totalBalance > 0 ? totalBalance : 0;
  const amountDue = totalBalance < 0 ? -totalBalance : 0;
  
  // Calculate effective tax rate
  const effectiveTaxRate = totalIncome > 0 ? (totalTaxLiability / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalDeductions: effectiveDeductions,
    taxableIncome,
    standardDeduction,
    itemizedDeductions,
    effectiveDeductions,
    estimatedTax,
    finalTax: totalTaxLiability,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    selfEmploymentTax,
    totalTaxLiability,
    totalPayments,
    refundAmount,
    amountDue,
    filingStatus: taxpayer.filingStatus,
    childTaxCredit: childTaxCreditResult.amount,
    qualifyingChildren: childTaxCreditResult.qualifyingChildren,
    earnedIncomeCredit: eitcResult.amount,
    eitcQualifyingChildren: eitcResult.qualifyingChildren,
    businessExpenseTotal,
    netBusinessIncome
  };
};