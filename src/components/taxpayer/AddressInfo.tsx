import React from 'react';
import { FormField } from '../FormField';
import { Address } from '../../types/tax';
import { US_STATES } from '../../utils/constants/states';

interface AddressInfoProps {
  address: Address;
  onUpdate: (updates: Partial<Address>) => void;
  errors: Record<string, string>;
}

export const AddressInfo: React.FC<AddressInfoProps> = ({
  address,
  onUpdate,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Address Information</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <FormField
          label="Street Address"
          value={address.street || ''}
          onChange={(value) => onUpdate({ street: value })}
          error={errors.street}
          required
          placeholder="123 Main St"
        />

        <FormField
          label="Apartment/Suite/Unit"
          value={address.apartment || ''}
          onChange={(value) => onUpdate({ apartment: value })}
          error={errors.apartment}
          placeholder="Apt 4B (optional)"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="City"
            value={address.city || ''}
            onChange={(value) => onUpdate({ city: value })}
            error={errors.city}
            required
          />

          <FormField
            label="State"
            type="select"
            value={address.state || ''}
            onChange={(value) => onUpdate({ state: value })}
            options={US_STATES}
            error={errors.state}
            required
          />

          <FormField
            label="ZIP Code"
            value={address.zipCode || ''}
            onChange={(value) => onUpdate({ zipCode: value })}
            error={errors.zipCode}
            required
            placeholder="12345"
          />
        </div>
      </div>
    </div>
  );
};