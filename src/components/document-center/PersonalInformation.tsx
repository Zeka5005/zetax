import React, { useEffect } from 'react';
import { User } from 'lucide-react';
import { FormField } from '../FormField';
import { FilingStatusSelector } from '../filing-status/FilingStatusSelector';
import { SpouseInfo } from '../spouse/SpouseInfo';
import { AddressInfo } from '../taxpayer/AddressInfo';
import { TaxPayer } from '../../types/tax';
import { validatePersonalInfo } from '../../utils/validation/personalInfoValidation';

interface PersonalInformationProps {
  personalInfo: TaxPayer;
  onUpdate: (info: TaxPayer) => void;
  errors: Record<string, string>;
  onValidationChange: (isValid: boolean) => void;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  personalInfo,
  onUpdate,
  errors,
  onValidationChange,
}) => {
  // Run validation whenever personalInfo changes
  useEffect(() => {
    const validationErrors = validatePersonalInfo(personalInfo);
    const isValid = Object.keys(validationErrors).length === 0;
    onValidationChange(isValid);
  }, [personalInfo, onValidationChange]);

  const handleChange = (field: keyof TaxPayer, value: any) => {
    let updatedInfo = { ...personalInfo };

    if (field === 'filingStatus') {
      updatedInfo = {
        ...updatedInfo,
        [field]: value,
        spouseInfo: value === 'married' || value === 'marriedSeparate'
          ? personalInfo.spouseInfo || {
              firstName: '',
              lastName: '',
              ssn: '',
              dateOfBirth: '',
              occupation: ''
            }
          : undefined
      };
    } else if (field === 'dateOfBirth') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updatedInfo = {
        ...updatedInfo,
        dateOfBirth: value,
        age
      };
    } else {
      updatedInfo = {
        ...updatedInfo,
        [field]: value
      };
    }

    onUpdate(updatedInfo);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Information
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            value={personalInfo.firstName}
            onChange={(value) => handleChange('firstName', value)}
            error={errors.firstName}
            required
          />
          
          <FormField
            label="Last Name"
            value={personalInfo.lastName}
            onChange={(value) => handleChange('lastName', value)}
            error={errors.lastName}
            required
          />
          
          <FormField
            label="Social Security Number"
            type="ssn"
            value={personalInfo.ssn}
            onChange={(value) => handleChange('ssn', value)}
            error={errors.ssn}
            required
          />

          <FormField
            label="Date of Birth"
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(value) => handleChange('dateOfBirth', value)}
            error={errors.dateOfBirth}
            required
          />

          <FormField
            label="Occupation"
            value={personalInfo.occupation}
            onChange={(value) => handleChange('occupation', value)}
            error={errors.occupation}
            required
          />

          <FormField
            label="Email Address"
            type="email"
            value={personalInfo.email}
            onChange={(value) => handleChange('email', value)}
            error={errors.email}
            required
          />

          <FormField
            label="Phone Number"
            type="phone"
            value={personalInfo.phone}
            onChange={(value) => handleChange('phone', value)}
            error={errors.phone}
          />
        </div>

        <div className="border-t pt-6">
          <AddressInfo
            address={personalInfo.address}
            onUpdate={(updates) => handleChange('address', { ...personalInfo.address, ...updates })}
            errors={errors}
          />
        </div>

        <div className="border-t pt-6">
          <FilingStatusSelector
            value={personalInfo.filingStatus}
            onChange={(status) => handleChange('filingStatus', status)}
            error={errors.filingStatus}
          />
        </div>

        {(personalInfo.filingStatus === 'married' || personalInfo.filingStatus === 'marriedSeparate') && (
          <div className="border-t pt-6">
            <SpouseInfo
              spouseInfo={personalInfo.spouseInfo || {
                firstName: '',
                lastName: '',
                ssn: '',
                dateOfBirth: '',
                occupation: ''
              }}
              onUpdate={(spouseInfo) => onUpdate({ ...personalInfo, spouseInfo })}
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
};