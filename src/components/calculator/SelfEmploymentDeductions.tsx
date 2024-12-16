import React, { useState } from 'react';
import { Receipt, HelpCircle, Car, Building } from 'lucide-react';
import { FormField } from '../FormField';
import { MileageDeduction } from '../document-center/income-types/MileageDeduction';
import { SELF_EMPLOYMENT_DEDUCTION_FIELDS } from '../../utils/constants/deductionFields';

interface SelfEmploymentDeductionsProps {
  deductions: Record<string, number>;
  onUpdate: (deductions: Record<string, number>) => void;
}

export const SelfEmploymentDeductions: React.FC<SelfEmploymentDeductionsProps> = ({
  deductions,
  onUpdate,
}) => {
  const [deductionType, setDeductionType] = useState<'mileage' | 'expenses' | null>(null);

  const handleChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...deductions, [field]: numValue });
  };

  const handleMileageUpdate = (totalMileageDeduction: number) => {
    // Clear other deductions when using mileage
    const newDeductions = { mileage: totalMileageDeduction };
    onUpdate(newDeductions);
  };

  const handleDeductionTypeChange = (type: 'mileage' | 'expenses') => {
    setDeductionType(type);
    // Clear all deductions when switching types
    onUpdate({});
  };

  const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + (value || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Receipt className="w-5 h-5 mr-2 text-primary-500" />
          Self-Employment Deductions
        </h2>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">Choose your deduction method:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleDeductionTypeChange('mileage')}
              className={`p-6 rounded-lg border-2 transition-colors text-left
                ${deductionType === 'mileage' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center mb-2">
                <Car className="w-5 h-5 text-primary-500 mr-2" />
                <span className="font-medium">Standard Mileage Rate</span>
              </div>
              <p className="text-sm text-gray-600">
                Use the standard mileage rate of 67¢ per mile for 2024. 
                Best for high-mileage businesses with lower expenses.
              </p>
            </button>

            <button
              onClick={() => handleDeductionTypeChange('expenses')}
              className={`p-6 rounded-lg border-2 transition-colors text-left
                ${deductionType === 'expenses' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center mb-2">
                <Building className="w-5 h-5 text-primary-500 mr-2" />
                <span className="font-medium">Actual Expenses</span>
              </div>
              <p className="text-sm text-gray-600">
                Deduct actual business expenses including vehicle costs. 
                Best for businesses with high expenses or low mileage.
              </p>
            </button>
          </div>
        </div>

        {deductionType === 'mileage' && (
          <MileageDeduction onMileageUpdate={handleMileageUpdate} />
        )}

        {deductionType === 'expenses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SELF_EMPLOYMENT_DEDUCTION_FIELDS.map(({ key, label, example }) => (
                <div key={key} className="relative group">
                  <FormField
                    label={label}
                    type="number"
                    value={deductions[key] || ''}
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

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Deductions:</span>
                <span className="text-lg font-bold text-primary-600">
                  ${totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            {deductionType === 'mileage' 
              ? 'You cannot claim both standard mileage rate and actual vehicle expenses. The standard mileage rate includes gas, repairs, and vehicle depreciation.'
              : deductionType === 'expenses'
              ? 'When using actual expenses, you can deduct all qualifying business expenses including vehicle costs. Keep detailed records of all expenses.'
              : 'Choose a deduction method that will give you the largest tax benefit. You can calculate both ways to determine which is better.'}
          </p>
        </div>
      </div>
    </div>
  );
};