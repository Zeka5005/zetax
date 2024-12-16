import React from 'react';
import { Plus } from 'lucide-react';
import { DependentForm } from './DependentForm';
import { Dependent } from '../../types/tax';

interface DependentsListProps {
  dependents: Dependent[];
  onUpdate: (dependents: Dependent[]) => void;
  errors: Record<string, string>;
}

export const DependentsList: React.FC<DependentsListProps> = ({
  dependents,
  onUpdate,
  errors,
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
      income: 0,
    }]);
  };

  const handleUpdateDependent = (index: number, updates: Partial<Dependent>) => {
    const updatedDependents = dependents.map((dep, i) => 
      i === index ? { ...dep, ...updates } : dep
    );
    onUpdate(updatedDependents);
  };

  const handleRemoveDependent = (index: number) => {
    onUpdate(dependents.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {dependents.map((dependent, index) => (
        <DependentForm
          key={index}
          dependent={dependent}
          index={index}
          onUpdate={(updates) => handleUpdateDependent(index, updates)}
          onRemove={() => handleRemoveDependent(index)}
          errors={errors}
        />
      ))}

      <button
        onClick={handleAddDependent}
        className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Another Dependent
      </button>

      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          Make sure to have all required information for each dependent, including their 
          Social Security numbers and dates of birth. This information is crucial for 
          claiming dependent-related tax benefits.
        </p>
      </div>
    </div>
  );
};