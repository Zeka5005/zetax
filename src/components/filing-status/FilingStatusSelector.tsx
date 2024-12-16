import React from 'react';
import { Info } from 'lucide-react';
import { FILING_STATUS_OPTIONS } from '../../utils/constants/filingStatus';
import { FilingStatus } from '../../types/tax';

interface FilingStatusSelectorProps {
  value: FilingStatus;
  onChange: (status: FilingStatus) => void;
  error?: string;
}

export const FilingStatusSelector: React.FC<FilingStatusSelectorProps> = ({
  value,
  onChange,
  error
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Filing Status
      </label>

      <div className="space-y-2">
        {FILING_STATUS_OPTIONS.map((option) => (
          <div
            key={option.value}
            className={`relative flex items-start p-4 cursor-pointer rounded-lg border transition-colors
              ${value === option.value 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => onChange(option.value as FilingStatus)}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={value === option.value}
                  onChange={() => onChange(option.value as FilingStatus)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <label className="ml-3 font-medium text-gray-900">
                  {option.label}
                </label>
                <div className="ml-2 group relative">
                  <Info className="w-4 h-4 text-gray-400" />
                  <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-1 text-sm text-gray-600 bg-white border rounded-md shadow-lg left-0">
                    {option.description}
                  </div>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500 ml-7">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          Your filing status affects your standard deduction, tax brackets, and eligibility for certain credits and deductions.
          Choose carefully as it can significantly impact your tax return.
        </p>
      </div>
    </div>
  );
};