import React from 'react';
import { CreditCard as CreditCardIcon } from 'lucide-react';
import { TaxCalculation } from '../../types/tax';
import { CreditCard } from './CreditCard';
import { formatCurrency } from '../../utils/formatters';

interface CreditsSectionProps {
  calculation: TaxCalculation;
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({ calculation }) => {
  const totalCredits = calculation.childTaxCredit + calculation.earnedIncomeCredit;
  
  if (totalCredits <= 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CreditCardIcon className="w-5 h-5 mr-2" />
        Available Tax Credits
      </h2>
      
      <div className="space-y-4">
        <CreditCard
          title="Child Tax Credit"
          amount={calculation.childTaxCredit}
          qualifyingChildren={calculation.qualifyingChildren}
          description="Credit for qualifying children under 17"
        />
        
        <CreditCard
          title="Earned Income Credit"
          amount={calculation.earnedIncomeCredit}
          qualifyingChildren={calculation.eitcQualifyingChildren}
          description="Credit for low to moderate income working individuals and families"
        />

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-700">Total Credits</span>
            <span className="text-green-600">
              {formatCurrency(totalCredits)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};