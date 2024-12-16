import React from 'react';
import { User } from 'lucide-react';
import { TaxPayer } from '../../types/tax';
import { PersonalDetails } from './PersonalDetails';
import { ContactInfo } from './ContactInfo';
import { FilingStatusSelector } from '../filing-status/FilingStatusSelector';
import { SpouseInfo } from '../spouse/SpouseInfo';

interface TaxpayerInfoProps {
  taxpayer: TaxPayer;
  onUpdate: (data: TaxPayer) => void;
  errors: Record<string, string>;
}

export const TaxpayerInfo: React.FC<TaxpayerInfoProps> = ({
  taxpayer,
  onUpdate,
  errors,
}) => {
  const handleChange = (field: keyof TaxPayer, value: any) => {
    if (field === 'filingStatus') {
      const newTaxpayer = {
        ...taxpayer,
        [field]: value,
        spouseInfo: value === 'married' || value === 'marriedSeparate' 
          ? taxpayer.spouseInfo || {
              firstName: '',
              lastName: '',
              ssn: '',
              dateOfBirth: '',
              occupation: ''
            }
          : undefined
      };
      onUpdate(newTaxpayer);
    } else {
      onUpdate({ ...taxpayer, [field]: value });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-primary-50 p-3 rounded-full">
            <User className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-8">
          Personal Information
        </h2>

        <div className="space-y-6">
          <PersonalDetails
            taxpayer={taxpayer}
            onUpdate={(updates) => onUpdate({ ...taxpayer, ...updates })}
            errors={errors}
          />

          <ContactInfo
            taxpayer={taxpayer}
            onUpdate={(updates) => onUpdate({ ...taxpayer, ...updates })}
            errors={errors}
          />

          <div className="border-t pt-6">
            <FilingStatusSelector
              value={taxpayer.filingStatus}
              onChange={(status) => handleChange('filingStatus', status)}
              error={errors.filingStatus}
            />
          </div>

          {(taxpayer.filingStatus === 'married' || taxpayer.filingStatus === 'marriedSeparate') && (
            <div className="border-t pt-6">
              <SpouseInfo
                spouseInfo={taxpayer.spouseInfo || {
                  firstName: '',
                  lastName: '',
                  ssn: '',
                  dateOfBirth: '',
                  occupation: ''
                }}
                onUpdate={(spouseInfo) => onUpdate({ ...taxpayer, spouseInfo })}
                errors={errors}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};