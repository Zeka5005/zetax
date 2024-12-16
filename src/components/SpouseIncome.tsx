import React from 'react';
import { DollarSign } from 'lucide-react';
import { SpouseIncome } from '../types/tax';
import { FormField } from './FormField';

interface SpouseIncomeProps {
  income: SpouseIncome;
  onUpdate: (data: SpouseIncome) => void;
  errors: Record<string, string>;
}

export const SpouseIncomeSection: React.FC<SpouseIncomeProps> = ({ income, onUpdate, errors }) => {
  const handleChange = (field: keyof SpouseIncome, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...income, [field]: numValue });
  };

  const incomeFields = [
    { key: 'wages', label: 'Wages & Salary' },
    { key: 'withholdingAmount', label: 'Tax Withholdings' },
    { key: 'selfEmployment', label: 'Self Employment' },
    { key: 'investments', label: 'Investment Income' },
    { key: 'dividends', label: 'Dividends' },
    { key: 'rentalIncome', label: 'Rental Income' },
    { key: 'retirement', label: 'Retirement Income' },
    { key: 'socialSecurity', label: 'Social Security Benefits' },
    { key: 'other', label: 'Other Income' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2" />
        Spouse Income
      </h2>
      <div className="space-y-4">
        {incomeFields.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            type="number"
            value={income[key as keyof SpouseIncome]}
            onChange={(value) => handleChange(key as keyof SpouseIncome, value)}
            prefix="$"
            placeholder="0.00"
            error={errors[`spouse${key}`]}
          />
        ))}
      </div>
    </div>
  );
}