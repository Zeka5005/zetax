import React from 'react';
import { Calculator } from 'lucide-react';
import { TAX_BRACKETS_2024 } from '../../utils/taxConstants2024';

interface TaxBracketInfoProps {
  filingStatus: string;
  taxableIncome: number;
}

export const TaxBracketInfo: React.FC<TaxBracketInfoProps> = ({ filingStatus, taxableIncome }) => {
  const formatCurrency = (amount: number) => {
    return amount === Infinity 
      ? 'Over'
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(amount);
  };

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(1)}%`;
  };

  const getCurrentBracket = () => {
    for (let i = TAX_BRACKETS_2024.length - 1; i >= 0; i--) {
      const bracket = TAX_BRACKETS_2024[i];
      if (taxableIncome >= bracket[filingStatus as keyof typeof bracket]) {
        return bracket;
      }
    }
    return TAX_BRACKETS_2024[0];
  };

  const currentBracket = getCurrentBracket();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Calculator className="w-4 h-4 mr-1" />
          Current Tax Bracket
        </h3>
        <span className="text-lg font-bold text-blue-600">
          {formatRate(currentBracket.rate)}
        </span>
      </div>
      <p className="text-xs text-gray-500">
        This is your marginal tax rate. You only pay this rate on income above{' '}
        {formatCurrency(TAX_BRACKETS_2024[TAX_BRACKETS_2024.indexOf(currentBracket) - 1]?.[filingStatus as keyof typeof currentBracket] || 0)}
      </p>
    </div>
  );
};