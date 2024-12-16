import React from 'react';
import { Baby, Plus, Trash2 } from 'lucide-react';
import { ChildInfo } from '../types/tax';
import { FormField } from './FormField';
import { validateSSN, formatSSN } from '../utils/validation';
import { calculateAge } from '../utils/ageCalculator';

interface ChildInfoProps {
  children: ChildInfo[];
  onUpdate: (children: ChildInfo[]) => void;
  errors: Record<string, string>;
}

export const ChildInfoSection: React.FC<ChildInfoProps> = ({ children, onUpdate, errors }) => {
  const handleAddChild = () => {
    onUpdate([...children, {
      firstName: '',
      lastName: '',
      ssn: '',
      dateOfBirth: '',
      relationship: 'child',
      monthsLivedWithTaxpayer: 12,
      isStudent: false,
      isDisabled: false,
      hasIncome: false,
      incomeAmount: 0,
    }]);
  };

  const handleRemoveChild = (index: number) => {
    onUpdate(children.filter((_, i) => i !== index));
  };

  const handleChildUpdate = (index: number, updates: Partial<ChildInfo>) => {
    const updatedChildren = children.map((child, i) => 
      i === index ? { ...child, ...updates } : child
    );
    onUpdate(updatedChildren);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Baby className="w-5 h-5 mr-2" />
          Dependent Children
        </h2>
        <button
          onClick={handleAddChild}
          className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Child
        </button>
      </div>

      {children.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No children added yet</p>
      ) : (
        <div className="space-y-6">
          {children.map((child, index) => {
            const age = calculateAge(child.dateOfBirth);
            
            return (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Child {index + 1}</h3>
                    {child.dateOfBirth && (
                      <span className="text-sm text-gray-500">
                        Age: {age} {age === 1 ? 'year' : 'years'} old
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveChild(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    value={child.firstName}
                    onChange={(value) => handleChildUpdate(index, { firstName: value })}
                    error={errors[`child${index}FirstName`]}
                  />
                  
                  <FormField
                    label="Last Name"
                    value={child.lastName}
                    onChange={(value) => handleChildUpdate(index, { lastName: value })}
                    error={errors[`child${index}LastName`]}
                  />
                  
                  <FormField
                    label="Social Security Number"
                    value={child.ssn}
                    onChange={(value) => handleChildUpdate(index, { ssn: formatSSN(value) })}
                    placeholder="XXX-XX-XXXX"
                    error={errors[`child${index}SSN`]}
                  />
                  
                  <FormField
                    label="Date of Birth"
                    type="date"
                    value={child.dateOfBirth}
                    onChange={(value) => handleChildUpdate(index, { dateOfBirth: value })}
                    error={errors[`child${index}DateOfBirth`]}
                  />
                  
                  <FormField
                    label="Relationship"
                    type="select"
                    value={child.relationship}
                    onChange={(value) => handleChildUpdate(index, { relationship: value })}
                    options={[
                      { value: 'child', label: 'Child' },
                      { value: 'stepchild', label: 'Stepchild' },
                      { value: 'fosterChild', label: 'Foster Child' },
                      { value: 'sibling', label: 'Sibling' },
                      { value: 'other', label: 'Other' },
                    ]}
                    error={errors[`child${index}Relationship`]}
                  />
                  
                  <FormField
                    label="Months Lived with Taxpayer"
                    type="number"
                    value={child.monthsLivedWithTaxpayer}
                    onChange={(value) => handleChildUpdate(index, { monthsLivedWithTaxpayer: parseInt(value) || 0 })}
                    min={0}
                    max={12}
                    error={errors[`child${index}Months`]}
                  />
                  
                  <FormField
                    label="Is Full-time Student?"
                    type="checkbox"
                    value={child.isStudent}
                    onChange={(value) => handleChildUpdate(index, { isStudent: value })}
                  />
                  
                  <FormField
                    label="Is Permanently Disabled?"
                    type="checkbox"
                    value={child.isDisabled}
                    onChange={(value) => handleChildUpdate(index, { isDisabled: value })}
                  />
                  
                  <FormField
                    label="Has Income?"
                    type="checkbox"
                    value={child.hasIncome}
                    onChange={(value) => handleChildUpdate(index, { hasIncome: value })}
                  />
                  
                  {child.hasIncome && (
                    <FormField
                      label="Income Amount"
                      type="number"
                      value={child.incomeAmount}
                      onChange={(value) => handleChildUpdate(index, { incomeAmount: parseFloat(value) || 0 })}
                      prefix="$"
                      placeholder="0.00"
                      error={errors[`child${index}Income`]}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};