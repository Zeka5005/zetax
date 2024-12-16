import React from 'react';
import { FormField } from '../FormField';
import { TaxPayer } from '../../types/tax';

interface PersonalDetailsProps {
  taxpayer: TaxPayer;
  onUpdate: (updates: Partial<TaxPayer>) => void;
  errors: Record<string, string>;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  taxpayer,
  onUpdate,
  errors,
}) => {
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (value: string) => {
    onUpdate({
      dateOfBirth: value,
      age: calculateAge(value)
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          value={taxpayer.firstName}
          onChange={(value) => onUpdate({ firstName: value })}
          error={errors.firstName}
          required
        />
        
        <FormField
          label="Last Name"
          value={taxpayer.lastName}
          onChange={(value) => onUpdate({ lastName: value })}
          error={errors.lastName}
          required
        />
        
        <FormField
          label="Social Security Number"
          type="ssn"
          value={taxpayer.ssn}
          onChange={(value) => onUpdate({ ssn: value })}
          error={errors.ssn}
          required
        />

        <FormField
          label="Date of Birth"
          type="date"
          value={taxpayer.dateOfBirth}
          onChange={handleDateOfBirthChange}
          error={errors.dateOfBirth}
          required
        />

        <FormField
          label="Occupation"
          value={taxpayer.occupation}
          onChange={(value) => onUpdate({ occupation: value })}
          error={errors.occupation}
          required
          placeholder="Enter your occupation"
        />

        <FormField
          label="Age"
          type="number"
          value={taxpayer.age}
          onChange={(value) => onUpdate({ age: parseInt(value) || 0 })}
          error={errors.age}
          min={0}
          max={120}
          disabled
        />

        <FormField
          label="Is Blind?"
          type="checkbox"
          value={taxpayer.isBlind}
          onChange={(value) => onUpdate({ isBlind: value })}
        />
      </div>
    </div>
  );
};