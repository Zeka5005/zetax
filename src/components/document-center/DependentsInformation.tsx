import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import { FormField } from '../FormField';
import { Dependent } from '../../types/tax';

interface DependentsInformationProps {
  dependents: Dependent[];
  onUpdate: (dependents: Dependent[]) => void;
  errors: Record<string, string>;
}

export const DependentsInformation: React.FC<DependentsInformationProps> = ({
  dependents,
  onUpdate,
  errors
}) => {
  const handleAddDependent = () => {
    onUpdate([...dependents, {
      firstName: '',
      lastName: '',
      ssn: '',
      dateOfBirth: '',
      relationship: 'child',
      monthsLivedWithTaxpayer: 12,
      isStudent: false,
      isDisabled: false,
      providedSupport: 0,
      income: 0
    }]);
  };

  const handleRemoveDependent = (index: number) => {
    onUpdate(dependents.filter((_, i) => i !== index));
  };

  const handleDependentChange = (index: number, field: keyof Dependent, value: any) => {
    const updatedDependents = dependents.map((dependent, i) => {
      if (i === index) {
        return { ...dependent, [field]: value };
      }
      return dependent;
    });
    onUpdate(updatedDependents);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Dependent Information
        </h2>
        <button
          onClick={handleAddDependent}
          className="flex items-center px-4 py-2 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Dependent
        </button>
      </div>

      {dependents.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No dependents added yet</p>
      ) : (
        <div className="space-y-8">
          {dependents.map((dependent, index) => (
            <div key={index} className="border rounded-lg p-6 relative">
              <button
                onClick={() => handleRemoveDependent(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <h3 className="font-medium mb-4">Dependent {index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="First Name"
                  value={dependent.firstName}
                  onChange={(value) => handleDependentChange(index, 'firstName', value)}
                  error={errors[`dependent${index}FirstName`]}
                  required
                />

                <FormField
                  label="Last Name"
                  value={dependent.lastName}
                  onChange={(value) => handleDependentChange(index, 'lastName', value)}
                  error={errors[`dependent${index}LastName`]}
                  required
                />

                <FormField
                  label="Social Security Number"
                  type="ssn"
                  value={dependent.ssn}
                  onChange={(value) => handleDependentChange(index, 'ssn', value)}
                  error={errors[`dependent${index}SSN`]}
                  required
                />

                <FormField
                  label="Date of Birth"
                  type="date"
                  value={dependent.dateOfBirth}
                  onChange={(value) => handleDependentChange(index, 'dateOfBirth', value)}
                  error={errors[`dependent${index}DateOfBirth`]}
                  required
                />

                <FormField
                  label="Relationship"
                  type="select"
                  value={dependent.relationship}
                  onChange={(value) => handleDependentChange(index, 'relationship', value)}
                  options={[
                    { value: 'child', label: 'Child' },
                    { value: 'stepchild', label: 'Stepchild' },
                    { value: 'fosterChild', label: 'Foster Child' },
                    { value: 'parent', label: 'Parent' },
                    { value: 'sibling', label: 'Sibling' },
                    { value: 'other', label: 'Other' }
                  ]}
                  error={errors[`dependent${index}Relationship`]}
                  required
                />

                <FormField
                  label="Months Lived with Taxpayer"
                  type="number"
                  value={dependent.monthsLivedWithTaxpayer}
                  onChange={(value) => handleDependentChange(index, 'monthsLivedWithTaxpayer', parseInt(value) || 0)}
                  min={0}
                  max={12}
                  error={errors[`dependent${index}Months`]}
                  required
                />

                <FormField
                  label="Is Full-time Student?"
                  type="checkbox"
                  value={dependent.isStudent}
                  onChange={(value) => handleDependentChange(index, 'isStudent', value)}
                />

                <FormField
                  label="Is Permanently Disabled?"
                  type="checkbox"
                  value={dependent.isDisabled}
                  onChange={(value) => handleDependentChange(index, 'isDisabled', value)}
                />

                <FormField
                  label="Support Provided ($)"
                  type="number"
                  value={dependent.providedSupport}
                  onChange={(value) => handleDependentChange(index, 'providedSupport', parseFloat(value) || 0)}
                  prefix="$"
                  error={errors[`dependent${index}Support`]}
                />

                <FormField
                  label="Dependent's Income ($)"
                  type="number"
                  value={dependent.income}
                  onChange={(value) => handleDependentChange(index, 'income', parseFloat(value) || 0)}
                  prefix="$"
                  error={errors[`dependent${index}Income`]}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          A qualifying dependent must meet specific IRS criteria including relationship, age, residency, and support tests.
          Make sure to provide accurate information for each dependent.
        </p>
      </div>
    </div>
  );
};