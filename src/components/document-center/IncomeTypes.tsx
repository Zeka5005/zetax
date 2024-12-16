import React from 'react';
import { DollarSign } from 'lucide-react';
import { FormField } from '../FormField';

interface IncomeTypesProps {
  incomeData: {
    employmentIncome: boolean;
    selfEmploymentIncome: boolean;
    investmentIncome: boolean;
    rentalIncome: boolean;
    retirementIncome: boolean;
    otherIncome: boolean;
  };
  onUpdate: (data: any) => void;
}

export const IncomeTypes: React.FC<IncomeTypesProps> = ({
  incomeData,
  onUpdate,
}) => {
  // Initialize default values for all income types
  const defaultIncomeData = {
    employmentIncome: false,
    selfEmploymentIncome: false,
    investmentIncome: false,
    rentalIncome: false,
    retirementIncome: false,
    otherIncome: false,
    ...incomeData
  };

  const handleChange = (field: string, value: boolean) => {
    onUpdate({ ...defaultIncomeData, [field]: value });
  };

  const incomeTypes = [
    {
      key: 'employmentIncome',
      label: 'Employment Income (W-2)',
      description: 'Wages, salaries, tips, and other compensation',
    },
    {
      key: 'selfEmploymentIncome',
      label: 'Self-Employment Income (1099-NEC)',
      description: 'Independent contractor or freelance income',
    },
    {
      key: 'investmentIncome',
      label: 'Investment Income (1099-DIV, 1099-INT)',
      description: 'Dividends, interest, and capital gains',
    },
    {
      key: 'rentalIncome',
      label: 'Rental Income',
      description: 'Income from rental properties',
    },
    {
      key: 'retirementIncome',
      label: 'Retirement Income',
      description: 'Pension, IRA distributions, or Social Security benefits',
    },
    {
      key: 'otherIncome',
      label: 'Other Income',
      description: 'Any other sources of income not listed above',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <DollarSign className="w-5 h-5 mr-2" />
        Income Types
      </h2>

      <div className="space-y-4">
        {incomeTypes.map(({ key, label, description }) => (
          <div key={key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <FormField
              type="checkbox"
              label=""
              value={defaultIncomeData[key as keyof typeof defaultIncomeData]}
              onChange={(value) => handleChange(key, value)}
            />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-900">{label}</label>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          Select all types of income you received during the tax year. This helps us determine which documents you'll need to upload.
        </p>
      </div>
    </div>
  );
};