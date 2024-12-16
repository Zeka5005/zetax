import React from 'react';
import { Income } from '../types/tax';
import { DollarSign } from 'lucide-react';
import { FormField } from './FormField';

interface IncomeSectionProps {
  income: Income;
  onUpdate: (data: Income) => void;
  errors: Record<string, string>;
}

export const IncomeSection: React.FC<IncomeSectionProps> = ({ income, onUpdate, errors }) => {
  const handleChange = (field: keyof Income, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...income, [field]: value === '' ? 0 : numValue });
  };

  const incomeFields = [
    { key: 'wages', label: 'Wages & Salary (W-2)', description: 'Total wages, tips, and other compensation' },
    { key: 'withholdingAmount', label: 'Tax Withholdings', description: 'Federal income tax withheld from all W-2s' },
    { key: 'estimatedTaxPayments', label: 'Estimated Tax Payments', description: 'Total estimated tax payments made' },
    { key: 'selfEmployment', label: 'Self Employment (1099-NEC)', description: 'Income from independent contractor work' },
    { key: 'investments', label: 'Investment Income', description: 'Interest, dividends, and capital gains' },
    { key: 'dividends', label: 'Dividends', description: 'Total dividend payments received' },
    { key: 'rentalIncome', label: 'Rental Income', description: 'Income from rental properties' },
    { key: 'retirement', label: 'Retirement Income', description: 'Pension, IRA distributions, Social Security' },
    { key: 'socialSecurity', label: 'Social Security Benefits', description: 'Total Social Security benefits received' },
    { key: 'other', label: 'Other Income', description: 'Any other taxable income not listed above' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-primary-50 p-3 rounded-full">
            <DollarSign className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-8">
          Income & Payments
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {incomeFields.map(({ key, label, description }) => (
              <div key={key} className="relative">
                <FormField
                  label={label}
                  type="number"
                  value={income[key as keyof Income]}
                  onChange={(value) => handleChange(key as keyof Income, value)}
                  prefix="$"
                  placeholder="0.00"
                  error={errors[key]}
                />
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500 text-center">
              Enter all sources of income for the tax year. Make sure to include income from all W-2s, 1099s, and other tax documents.
              Round all amounts to the nearest dollar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};