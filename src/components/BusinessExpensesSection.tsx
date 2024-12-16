import React from 'react';
import { Receipt, Building2, TrendingDown, TrendingUp } from 'lucide-react';
import { BusinessExpenses } from '../types/tax';
import { FormField } from './FormField';
import { formatCurrency } from '../utils/formatters';

interface BusinessExpensesSectionProps {
  expenses: BusinessExpenses;
  onUpdate: (expenses: BusinessExpenses) => void;
  errors: Record<string, string>;
  totalExpenses: number;
  grossIncome: number;
  netIncome: number;
}

export const BusinessExpensesSection: React.FC<BusinessExpensesSectionProps> = ({
  expenses,
  onUpdate,
  errors,
  totalExpenses,
  grossIncome,
  netIncome,
}) => {
  const handleChange = (field: keyof BusinessExpenses, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...expenses, [field]: numValue });
  };

  const expenseFields = [
    { key: 'advertising', label: 'Advertising' },
    { key: 'carAndTruck', label: 'Car and Truck Expenses' },
    { key: 'commissions', label: 'Commissions and Fees' },
    { key: 'contractLabor', label: 'Contract Labor' },
    { key: 'depreciation', label: 'Depreciation' },
    { key: 'insurance', label: 'Insurance' },
    { key: 'mortgageInterest', label: 'Mortgage Interest' },
    { key: 'otherInterest', label: 'Other Interest' },
    { key: 'legalServices', label: 'Legal and Professional Services' },
    { key: 'officeExpenses', label: 'Office Expenses' },
    { key: 'supplies', label: 'Supplies' },
    { key: 'repairs', label: 'Repairs and Maintenance' },
    { key: 'taxes', label: 'Taxes and Licenses' },
    { key: 'travel', label: 'Travel' },
    { key: 'meals', label: 'Meals (50% deductible)' },
    { key: 'utilities', label: 'Utilities' },
    { key: 'wages', label: 'Wages' },
    { key: 'other', label: 'Other Expenses' },
  ];

  const hasLoss = netIncome < 0;
  const loss = Math.abs(netIncome);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Building2 className="w-5 h-5 mr-2" />
          Business Expenses (Schedule C)
        </h2>
        <div className="text-sm text-gray-500">
          Form 1099-NEC
        </div>
      </div>

      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-blue-600">Gross Income</div>
            <div className="text-lg font-semibold">{formatCurrency(grossIncome)}</div>
          </div>
          <div>
            <div className="text-sm text-red-600">Total Expenses</div>
            <div className="text-lg font-semibold">{formatCurrency(totalExpenses)}</div>
          </div>
          <div>
            {hasLoss ? (
              <div className="flex items-center space-x-2">
                <div>
                  <div className="text-sm text-red-600 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    Business Loss
                  </div>
                  <div className="text-lg font-semibold text-red-600">
                    ({formatCurrency(loss)})
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Net Profit
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {formatCurrency(netIncome)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expenseFields.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            type="number"
            value={expenses[key as keyof BusinessExpenses]}
            onChange={(value) => handleChange(key as keyof BusinessExpenses, value)}
            prefix="$"
            placeholder="0.00"
            error={errors[`businessExpense_${key}`]}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Total Expenses
          </span>
          <span className="text-red-600">{formatCurrency(totalExpenses)}</span>
        </div>
        {hasLoss && (
          <div className="mt-2 p-3 bg-red-50 rounded-md border border-red-100">
            <div className="flex items-start">
              <TrendingDown className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-red-800">Business Loss Detected</h4>
                <p className="text-sm text-red-700 mt-1">
                  Your business expenses ({formatCurrency(totalExpenses)}) exceed your gross income ({formatCurrency(grossIncome)}), 
                  resulting in a business loss of {formatCurrency(loss)}. This loss may be deductible from your other income.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};