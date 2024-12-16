import React from 'react';
import { FormField } from '../FormField';
import { TaxPayer } from '../../types/tax';

interface ContactInfoProps {
  taxpayer: TaxPayer;
  onUpdate: (updates: Partial<TaxPayer>) => void;
  errors: Record<string, string>;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  taxpayer,
  onUpdate,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Email Address"
        type="email"
        value={taxpayer.email}
        onChange={(value) => onUpdate({ email: value })}
        error={errors.email}
        required
      />

      <FormField
        label="Phone Number"
        type="phone"
        value={taxpayer.phone}
        onChange={(value) => onUpdate({ phone: value })}
        error={errors.phone}
        placeholder="(555) 555-5555"
      />
    </div>
  );
};