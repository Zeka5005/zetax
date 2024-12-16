import { TAX_BRACKETS_2024 } from '../taxConstants2024';

export const calculateIncomeTax = (
  taxableIncome: number,
  filingStatus: string
): number => {
  let incomeTax = 0;
  let previousBracketLimit = 0;

  for (const bracket of TAX_BRACKETS_2024) {
    const bracketLimit = bracket[filingStatus as keyof typeof bracket];
    if (taxableIncome > previousBracketLimit) {
      const taxableInBracket = Math.min(
        taxableIncome - previousBracketLimit,
        bracketLimit - previousBracketLimit
      );
      incomeTax += taxableInBracket * bracket.rate;
    }
    previousBracketLimit = bracketLimit;
  }

  return incomeTax;
};