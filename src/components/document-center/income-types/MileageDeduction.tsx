import React, { useState } from 'react';
import { Car, HelpCircle } from 'lucide-react';
import { FormField } from '../../FormField';

interface MileageDeductionProps {
  onMileageUpdate: (totalDeduction: number) => void;
}

export const MileageDeduction: React.FC<MileageDeductionProps> = ({ onMileageUpdate }) => {
  const [totalMiles, setTotalMiles] = useState<number>(0);
  
  // 2024 IRS standard mileage rate
  const MILEAGE_RATE = 0.67;

  const handleMileageChange = (value: string) => {
    const miles = parseFloat(value) || 0;
    setTotalMiles(miles);
    const totalDeduction = miles * MILEAGE_RATE;
    onMileageUpdate(totalDeduction);
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Car className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-medium">Business Mileage Deduction</h3>
        </div>
        <div className="relative group">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="hidden group-hover:block absolute right-0 z-10 w-72 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-md shadow-lg">
            <p className="mb-2">You can deduct business miles driven for:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Client meetings</li>
              <li>Business errands</li>
              <li>Travel between work locations</li>
              <li>Business-related events</li>
            </ul>
            <p className="mt-2 text-xs text-gray-500">Note: Commuting miles are not deductible</p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          For 2024, the standard mileage rate is {(MILEAGE_RATE * 100).toFixed(1)}¢ per mile
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          label="Total Business Miles"
          type="number"
          value={totalMiles}
          onChange={handleMileageChange}
          placeholder="Enter total business miles"
        />

        <div className="p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Rate per mile: ${MILEAGE_RATE.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">
                Total Deduction: ${(totalMiles * MILEAGE_RATE).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};