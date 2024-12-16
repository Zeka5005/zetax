import React from 'react';
import { User } from 'lucide-react';
import { FormField } from '../FormField';
import { SpouseInfoData } from '../../types/tax';
import { formatSSN } from '../../utils/validation/ssnValidation';

interface SpouseInfoProps {
  spouseInfo: SpouseInfoData;
  onUpdate: (data: SpouseInfoData) => void;
  errors: Record<string, string>;
}

export const SpouseInfo: React.FC<SpouseInfoProps> = ({
  spouseInfo,
  onUpdate,
  errors,
}) => {
  const handleChange = (field: keyof SpouseInfoData, value: any) => {
    if (field === 'ssn') {
      value = formatSSN(value);
    }
    onUpdate({ ...spouseInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center">
        <User className="w-5 h-5 mr-2 text-primary-500" />
        Spouse Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          value={spouseInfo.firstName || ''}
          onChange={(value) => handleChange('firstName', value)}
          error={errors.spouseFirstName}
          required
        />

        <FormField
          label="Last Name"
          value={spouseInfo.lastName || ''}
          onChange={(value) => handleChange('lastName', value)}
          error={errors.spouseLastName}
          required
        />

        <FormField
          label="Social Security Number"
          type="ssn"
          value={spouseInfo.ssn || ''}
          onChange={(value) => handleChange('ssn', value)}
          error={errors.spouseSSN}
          required
          placeholder="XXX-XX-XXXX"
        />

        <FormField
          label="Date of Birth"
          type="date"
          value={spouseInfo.dateOfBirth || ''}
          onChange={(value) => handleChange('dateOfBirth', value)}
          error={errors.spouseDateOfBirth}
          required
        />

        <FormField
          label="Occupation"
          value={spouseInfo.occupation || ''}
          onChange={(value) => handleChange('occupation', value)}
          error={errors.spouseOccupation}
          required
        />
      </div>
    </div>
  );
};