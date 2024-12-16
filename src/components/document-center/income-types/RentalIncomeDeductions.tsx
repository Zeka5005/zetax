import React from 'react';
import { Home, HelpCircle } from 'lucide-react';
import { FormField } from '../../FormField';
import { RENTAL_DEDUCTION_FIELDS } from '../../../utils/constants/deductionFields';

interface RentalIncomeDeductionsProps {
  deductions: {
    advertising: number;
    autoAndTravel: number;
    cleaning: number;
    commissions: number;
    insurance: number;
    legal: number;
    management: number;
    mortgageInterest: number;
    repairs: number;
    supplies: number;
    taxes: number;
    utilities: number;
    depreciation: number;
    other: number;
  };
  onUpdate: (deductions: any) => void;
}

export const RentalIncomeDeductions: React.FC<RentalIncomeDeductionsProps> = ({
  deductions,
  onUpdate,
}) => {
  const handleChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...deductions, [field]: numValue });
  };

  return (
    <div className="border rounded-lg p-6 mt-4">
      <div className="flex items-center space-x-2 mb-6">
        <Home className="w-5 h-5 text-primary-500" />
        <h3 className="text-lg font-medium">Rental Property Expenses (Schedule E)</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RENTAL_DEDUCTION_FIELDS.map(({ key, label, example }) => (
          <div key={key} className="relative group">
            <FormField
              label={label}
              type="number"
              value={deductions[key as keyof typeof deductions]}
              onChange={(value) => handleChange(key, value)}
              prefix="$"
              placeholder="0.00"
            />
            <div className="absolute right-0 top-0 mt-1">
              <div className="relative">
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="hidden group-hover:block absolute right-0 z-10 w-64 p-2 mt-1 text-sm text-gray-600 bg-white border rounded-md shadow-lg">
                  {example}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          Enter all expenses related to your rental property. Hover over the help icon next to each field for examples.
        </p>
      </div>
    </div>
  );
};