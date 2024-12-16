import React from 'react';
import { CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface TaxCreditsDisplayProps {
  credits: {
    childTaxCredit?: number;
    educationCredit?: number;
    earnedIncomeCredit?: number;
    energyCredit?: number;
    premiumTaxCredit?: number;
    retirementSavingsCredit?: number;
    totalCredits: number;
  };
}

export const TaxCreditsDisplay: React.FC<TaxCreditsDisplayProps> = ({ credits }) => {
  const creditItems = [
    { key: 'childTaxCredit', label: 'Child Tax Credit' },
    { key: 'educationCredit', label: 'Education Credit' },
    { key: 'earnedIncomeCredit', label: 'Earned Income Credit' },
    { key: 'energyCredit', label: 'Energy Credit' },
    { key: 'premiumTaxCredit', label: 'Premium Tax Credit' },
    { key: 'retirementSavingsCredit', label: 'Retirement Savings Credit' },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-3">
      <div className="flex items-center text-lg font-semibold text-blue-600">
        <CreditCard className="w-5 h-5 mr-2" />
        Available Tax Credits
      </div>
      <div className="space-y-2 text-sm">
        {creditItems.map(({ key, label }) => {
          const value = credits[key as keyof typeof credits];
          return value && value > 0 ? (
            <div key={key} className="flex justify-between items-center">
              <span>{label}</span>
              <span className="text-green-600">+{formatCurrency(value)}</span>
            </div>
          ) : null;
        })}
        <div className="flex justify-between items-center pt-2 border-t font-medium">
          <span>Total Credits</span>
          <span className="text-green-600">+{formatCurrency(credits.totalCredits)}</span>
        </div>
      </div>
    </div>
  );
};