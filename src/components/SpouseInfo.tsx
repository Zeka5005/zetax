import React from 'react';
import { User } from 'lucide-react';
import { SpouseInfo } from '../types/tax';
import { FormField } from './FormField';
import { validateSSN, formatSSN } from '../utils/validation';

interface SpouseInfoProps {
  spouse: SpouseInfo;
  onUpdate: (data: SpouseInfo) => void;
  errors: Record<string, string>;
}

export const SpouseInfoSection: React.FC<SpouseInfoProps> = ({ spouse, onUpdate, errors }) => {
  const handleSSNChange = (value: string) => {
    const formattedSSN = formatSSN(value);
    onUpdate({ ...spouse, ssn: formattedSSN });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Spouse Information
      </h2>
      <div className="space-y-4">
        <FormField
          label="First Name"
          value={spouse.firstName}
          onChange={(value) => onUpdate({ ...spouse, firstName: value })}
          error={errors.spouseFirstName}
        />
        
        <FormField
          label="Last Name"
          value={spouse.lastName}
          onChange={(value) => onUpdate({ ...spouse, lastName: value })}
          error={errors.spouseLastName}
        />
        
        <FormField
          label="Social Security Number"
          value={spouse.ssn}
          onChange={handleSSNChange}
          placeholder="XXX-XX-XXXX"
          error={errors.spouseSSN}
        />
        
        <FormField
          label="Age"
          type="number"
          value={spouse.age}
          onChange={(value) => onUpdate({ ...spouse, age: parseInt(value) || 0 })}
          min={0}
          max={120}
          error={errors.spouseAge}
        />
        
        <FormField
          label="Is Blind?"
          type="checkbox"
          value={spouse.isBlind}
          onChange={(value) => onUpdate({ ...spouse, isBlind: value })}
        />
      </div>
    </div>
  );
}