import { ChildInfo } from '../../types/tax';

interface ChildTaxCreditResult {
  amount: number;
  qualifyingChildren: number;
}

const CHILD_TAX_CREDIT_2024 = {
  maxCredit: 2000,
  phaseoutStart: {
    single: 200000,
    married: 400000,
    marriedSeparate: 200000,
    headOfHousehold: 200000,
  },
  phaseoutRate: 0.05,
};

export const calculateChildTaxCredit = (
  children: ChildInfo[],
  totalIncome: number,
  filingStatus: string
): ChildTaxCreditResult => {
  if (!children?.length) {
    return { amount: 0, qualifyingChildren: 0 };
  }

  const currentYear = new Date().getFullYear();
  const qualifyingChildren = children.filter(child => {
    const birthDate = new Date(child.dateOfBirth);
    const age = currentYear - birthDate.getFullYear();
    
    return (
      age < 17 && 
      child.monthsLivedWithTaxpayer >= 6 && 
      ['child', 'stepchild', 'fosterChild'].includes(child.relationship)
    );
  });

  const numQualifyingChildren = qualifyingChildren.length;
  if (numQualifyingChildren === 0) {
    return { amount: 0, qualifyingChildren: 0 };
  }

  const basicCreditAmount = numQualifyingChildren * CHILD_TAX_CREDIT_2024.maxCredit;
  const phaseoutStart = CHILD_TAX_CREDIT_2024.phaseoutStart[filingStatus as keyof typeof CHILD_TAX_CREDIT_2024.phaseoutStart];
  
  let finalCredit = basicCreditAmount;
  if (totalIncome > phaseoutStart) {
    const phaseoutAmount = Math.floor((totalIncome - phaseoutStart) / 1000) * 
      CHILD_TAX_CREDIT_2024.phaseoutRate * numQualifyingChildren;
    finalCredit = Math.max(0, basicCreditAmount - phaseoutAmount);
  }

  return {
    amount: finalCredit,
    qualifyingChildren: numQualifyingChildren
  };
};