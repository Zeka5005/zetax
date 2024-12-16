import React from 'react';
import { User, Trash2 } from 'lucide-react';
import { FormField } from '../FormField';
import { Dependent } from '../../types/tax';

interface DependentFormProps {
  dependent: Dependent;
  index: number;
  onUpdate: (updates: Partial<Dependent>) => void;
  onRemove: () => void;
  errors: Record<string, string>;
}

export const DependentForm: React.FC<DependentFormProps> = ({
  dependent,
  index,
  onUpdate,
  onRemove,
  errors,
}) => {
  return (
    <div className="border rounded-lg p-6 relative">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        title="Remove dependent"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex items-center mb-4">
        <User className="w-5 h-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-medium">Dependent {index + 1}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          value={dependent.firstName}
          onChange={(value) => onUpdate({ firstName: value })}
          error={errors[`dependent${index}FirstName`]}
          required
        />

        <FormField
          label="Last Name"
          value={dependent.lastName}
          onChange={(value) => onUpdate({ lastName: value })}
          error={errors[`dependent${index}LastName`]}
          required
        />

        <FormField
          label="Social Security Number"
          type="ssn"
          value={dependent.ssn}
          onChange={(value) => onUpdate({ ssn: value })}
          error={errors[`dependent${index}SSN`]}
          required
        />

        <FormField
          label="Date of Birth"
          type="date"
          value={dependent.dateOfBirth}
          onChange={(value) => onUpdate({ dateOfBirth: value })}
          error={errors[`dependent${index}DateOfBirth`]}
          required
        />

        <FormField
          label="Relationship"
          type="select"
          value={dependent.relationship}
          onChange={(value) => onUpdate({ relationship: value })}
          options={[
            { value: 'child', label: 'Child' },
            { value: 'stepchild', label: 'Stepchild' },
            { value: 'fosterChild', label: 'Foster Child' },
            { value: 'sibling', label: 'Sibling' },
            { value: 'parent', label: 'Parent' },
            { value: 'other', label: 'Other' },
          ]}
          error={errors[`dependent${index}Relationship`]}
          required
        />

        <FormField
          label="Months Lived with You"
          type="number"
          value={dependent.monthsLivedWithTaxpayer}
          onChange={(value) => onUpdate({ monthsLivedWithTaxpayer: parseInt(value) || 0 })}
          min={0}
          max={12}
          error={errors[`dependent${index}Months`]}
          required
        />

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Is Full-time Student?"
            type="checkbox"
            value={dependent.isStudent}
            onChange={(value) => onUpdate({ isStudent: value })}
          />

          <FormField
            label="Is Permanently Disabled?"
            type="checkbox"
            value={dependent.isDisabled}
            onChange={(value) => onUpdate({ isDisabled: value })}
          />
        </div>
      </div>
    </div>
  );
};