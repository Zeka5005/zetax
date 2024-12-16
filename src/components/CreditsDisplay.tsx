import React from 'react';
import { CreditCard } from 'lucide-react';
import { TaxCalculation } from '../types/tax';
import { formatCurrency } from '../utils/formatters';

interface CreditsDisplayProps {
  calculation: TaxCalculation;
}

export const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ calculation }) => {
  const hasAnyCredits = calculation.childTaxCredit > 0 || calculation.earnedIncomeCredit > 0;

  if (!hasAnyCredits) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CreditCard className="w-5 h-5 mr-2" />
        Available Tax Credits
      </h2>
      <div className="space-y-4">
        {calculation.childTaxCredit > 0 && (
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-700">Child Tax Credit</span>
              <span className="text-sm text-gray-500 ml-2">
                ({calculation.qualifyingChildren} qualifying {calculation.qualifyingChildren === 1 ? 'child' : 'children'})
              </span>
            </div>
            <span className="text-green-600 font-medium">
              {formatCurrency(calculation.childTaxCredit)}
            </span>
          </div>
        )}
        
        {calculation.earnedIncomeCredit > 0 && (
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-700">Earned Income Credit</span>
              <span className="text-sm text-gray-500 ml-2">
                ({calculation.eitcQualifyingChildren} qualifying {calculation.eitcQualifyingChildren === 1 ? 'child' : 'children'})
              </span>
            </div>
            <span className="text-green-600 font-medium">
              {formatCurrency(calculation.earnedIncomeCredit)}
            </span>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center font-medium">
            <span className="text-gray-700">Total Credits</span>
            <span className="text-green-600">
              {formatCurrency(calculation.childTaxCredit + calculation.earnedIncomeCredit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};