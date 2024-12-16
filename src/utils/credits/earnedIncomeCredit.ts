import { EARNED_INCOME_CREDIT_2024 } from '../taxConstants2024';

interface EarnedIncomeCreditResult {
  amount: number;
  qualifyingChildren: number;
}

export const calculateEarnedIncomeCredit = (
  earnedIncome: number,
  adjustedGrossIncome: number,
  investmentIncome: number,
  qualifyingChildren: number,
  filingStatus: string
): EarnedIncomeCreditResult => {
  // Check investment income limit
  if (investmentIncome > 11000) {
    return { amount: 0, qualifyingChildren: 0 };
  }

  // Cap number of qualifying children at 3 for calculation purposes
  const numChildren = Math.min(qualifyingChildren, 3);
  
  // Get income thresholds based on filing status
  const incomeThresholds = EARNED_INCOME_CREDIT_2024.incomeThresholds[filingStatus as keyof typeof EARNED_INCOME_CREDIT_2024.incomeThresholds];
  if (!incomeThresholds) {
    return { amount: 0, qualifyingChildren: 0 };
  }

  // Check if income exceeds threshold
  const threshold = incomeThresholds[numChildren as keyof typeof incomeThresholds];
  const qualifyingIncome = Math.max(earnedIncome, adjustedGrossIncome);
  
  if (qualifyingIncome > threshold) {
    return { amount: 0, qualifyingChildren: 0 };
  }

  // Calculate credit amount
  const maxCredit = EARNED_INCOME_CREDIT_2024.maxAmounts[numChildren as keyof typeof EARNED_INCOME_CREDIT_2024.maxAmounts];
  
  // Phase-in calculation
  const phaseInRate = EARNED_INCOME_CREDIT_2024.phaseInRates[numChildren as keyof typeof EARNED_INCOME_CREDIT_2024.phaseInRates];
  let credit = Math.min(earnedIncome * phaseInRate, maxCredit);

  // Phase-out calculation
  if (qualifyingIncome > EARNED_INCOME_CREDIT_2024.phaseoutStart[filingStatus as keyof typeof EARNED_INCOME_CREDIT_2024.phaseoutStart][numChildren as keyof typeof incomeThresholds]) {
    const phaseOutRate = EARNED_INCOME_CREDIT_2024.phaseOutRates[numChildren as keyof typeof EARNED_INCOME_CREDIT_2024.phaseOutRates];
    const phaseoutAmount = (qualifyingIncome - EARNED_INCOME_CREDIT_2024.phaseoutStart[filingStatus as keyof typeof EARNED_INCOME_CREDIT_2024.phaseoutStart][numChildren as keyof typeof incomeThresholds]) * phaseOutRate;
    credit = Math.max(0, credit - phaseoutAmount);
  }

  return {
    amount: Math.round(credit),
    qualifyingChildren: numChildren
  };
};