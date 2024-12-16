import React from 'react';
import { Users } from 'lucide-react';

interface DependentsQuestionProps {
  hasDependents: boolean;
  onAnswer: (answer: boolean) => void;
}

export const DependentsQuestion: React.FC<DependentsQuestionProps> = ({
  hasDependents,
  onAnswer,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Users className="w-5 h-5 mr-2" />
        Dependents
      </h2>

      <div className="space-y-6">
        <p className="text-gray-600">
          Do you have any dependents to claim on your tax return?
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => onAnswer(true)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors
              ${hasDependents 
                ? 'border-primary-500 bg-primary-50 text-primary-700' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            Yes
          </button>
          <button
            onClick={() => onAnswer(false)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors
              ${hasDependents === false 
                ? 'border-primary-500 bg-primary-50 text-primary-700' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            No
          </button>
        </div>

        <div className="p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            A dependent can be a qualifying child or qualifying relative who meets specific IRS criteria.
            This may include children, stepchildren, foster children, siblings, parents, or other relatives.
          </p>
        </div>
      </div>
    </div>
  );
};