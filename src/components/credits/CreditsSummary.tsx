import React from 'react';
import { CreditCard } from 'lucide-react';
import { TaxCalculation } from '../../types/tax';
import { formatCurrency } from '../../utils/formatters';

interface CreditsSummaryProps {
  calculation: TaxCalculation;
}

export const CreditsSummary: React.FC<CreditsSummaryProps> = ({ calculation }) => {
  const totalCredits = calculation.childTaxCredit + calculation.earnedIncomeCredit;

  if (totalCredits <= 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
      <div className="flex items-center mb-3">
        <CreditCard className="w-4 h-4 text-blue-600 mr-2" />
        <h3 className="text-sm font-medium text-blue-900">Tax Credits Applied</h3>
      </div>
      
      <div className="space-y-2">
        {calculation.childTaxCredit > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 flex items-center">
              Child Tax Credit
              <span className="text-xs ml-2 text-gray-500">
                ({calculation.qualifyingChildren} qualifying {calculation.qualifyingChildren === 1 ? 'child' : 'children'})
              </span>
            </span>
            <span className="text-green-600">-{formatCurrency(calculation.childTaxCredit)}</span>
          </div>
        )}
        
        {calculation.earnedIncomeCredit > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 flex items-center">
              Earned Income Credit
              <span className="text-xs ml-2 text-gray-500">
                ({calculation.eitcQualifyingChildren} qualifying {calculation.eitcQualifyingChildren === 1 ? 'child' : 'children'})
              </span>
            </span>
            <span className="text-green-600">-{formatCurrency(calculation.earnedIncomeCredit)}</span>
          </div>
        )}
        
        <div className="pt-2 border-t border-blue-100">
          <div className="flex justify-between items-center font-medium">
            <span className="text-blue-900">Total Credits</span>
            <span className="text-green-600">-{formatCurrency(totalCredits)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};