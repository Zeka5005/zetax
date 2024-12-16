import React from 'react';
import { Deductions } from '../types/tax';
import { Calculator } from 'lucide-react';
import { FormField } from './FormField';

interface DeductionsSectionProps {
  deductions: Deductions;
  onUpdate: (data: Deductions) => void;
  errors: Record<string, string>;
}

export const DeductionsSection: React.FC<DeductionsSectionProps> = ({ deductions, onUpdate, errors }) => {
  const handleChange = (field: keyof Deductions, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...deductions, [field]: value === '' ? 0 : numValue });
  };

  const deductionFields = [
    { key: 'mortgage', label: 'Mortgage Interest', description: 'Interest paid on your primary residence' },
    { key: 'studentLoanInterest', label: 'Student Loan Interest', description: 'Interest paid on qualified student loans' },
    { key: 'charitable', label: 'Charitable Contributions', description: 'Donations to qualified organizations' },
    { key: 'medical', label: 'Medical Expenses', description: 'Out-of-pocket medical and dental expenses' },
    { key: 'stateLocalTax', label: 'State & Local Taxes', description: 'State income and local taxes paid' },
    { key: 'propertyTax', label: 'Property Taxes', description: 'Real estate and personal property taxes' },
    { key: 'educationExpenses', label: 'Education Expenses', description: 'Qualified education expenses' },
    { key: 'retirementContributions', label: 'Retirement Contributions', description: 'IRA and other retirement account contributions' },
    { key: 'healthSavings', label: 'Health Savings', description: 'HSA and FSA contributions' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-primary-50 p-3 rounded-full">
            <Calculator className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-8">
          Deductions
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {deductionFields.map(({ key, label, description }) => (
              <div key={key} className="relative">
                <FormField
                  label={label}
                  type="number"
                  value={deductions[key as keyof Deductions]}
                  onChange={(value) => handleChange(key as keyof Deductions, value)}
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
              Enter all qualifying deductions for the tax year. These deductions can help reduce your taxable income.
              Make sure to keep documentation for all deductions claimed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};