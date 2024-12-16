import React from 'react';
import { Home, HelpCircle } from 'lucide-react';
import { FormField } from '../FormField';

interface RentalIncomeDeductionsProps {
  deductions: Record<string, number>;
  onUpdate: (deductions: Record<string, number>) => void;
}

export const RentalIncomeDeductions: React.FC<RentalIncomeDeductionsProps> = ({
  deductions,
  onUpdate,
}) => {
  const handleChange = (field: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...deductions, [field]: numValue });
  };

  const deductionFields = [
    { key: 'advertising', label: 'Advertising', example: 'Rental listings, signs, marketing materials' },
    { key: 'autoAndTravel', label: 'Auto and Travel', example: 'Mileage for property visits, travel to collect rent' },
    { key: 'cleaning', label: 'Cleaning and Maintenance', example: 'Regular cleaning, lawn care, snow removal' },
    { key: 'insurance', label: 'Insurance', example: 'Property insurance, liability insurance' },
    { key: 'legal', label: 'Legal and Professional Fees', example: 'Attorney fees, eviction costs, tax preparation' },
    { key: 'management', label: 'Property Management Fees', example: 'Property manager salary, management company fees' },
    { key: 'mortgageInterest', label: 'Mortgage Interest', example: 'Interest paid on rental property mortgage' },
    { key: 'repairs', label: 'Repairs', example: 'Plumbing, electrical, appliance repairs' },
    { key: 'supplies', label: 'Supplies', example: 'Cleaning supplies, light bulbs, filters' },
    { key: 'taxes', label: 'Property Taxes', example: 'Annual property taxes, special assessments' },
    { key: 'utilities', label: 'Utilities', example: 'Water, electricity, gas, trash removal' },
    { key: 'depreciation', label: 'Depreciation', example: 'Annual depreciation of building and improvements' },
    { key: 'other', label: 'Other Expenses', example: 'HOA fees, pest control, any other expenses' },
  ];

  const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + (value || 0), 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Home className="w-5 h-5 mr-2 text-primary-500" />
        Rental Property Deductions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deductionFields.map(({ key, label, example }) => (
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

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          Enter all expenses related to your rental property. These deductions can help reduce your taxable rental income.
          Make sure to keep detailed records and receipts for all expenses claimed.
        </p>
      </div>
    </div>
  );
};