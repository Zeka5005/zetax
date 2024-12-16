import React from 'react';
import { Users, HelpCircle } from 'lucide-react';

interface DependentQuestionProps {
  hasDependents: boolean | null;
  onAnswer: (answer: boolean) => void;
}

export const DependentQuestion: React.FC<DependentQuestionProps> = ({
  hasDependents,
  onAnswer,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Do You Have Dependents?
        </h2>
        <div className="relative group">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="hidden group-hover:block absolute right-0 z-10 w-72 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-md shadow-lg">
            <p className="mb-2">A dependent can be:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>A qualifying child under 19 (or 24 if student)</li>
              <li>A qualifying relative</li>
              <li>Someone who lives with you and you support</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={() => onAnswer(true)}
            className={`flex-1 py-4 px-6 rounded-lg border-2 transition-colors
              ${hasDependents === true 
                ? 'border-primary-500 bg-primary-50 text-primary-700' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            <p className="font-medium">Yes</p>
            <p className="text-sm text-gray-500 mt-1">I have dependents to claim</p>
          </button>
          <button
            onClick={() => onAnswer(false)}
            className={`flex-1 py-4 px-6 rounded-lg border-2 transition-colors
              ${hasDependents === false 
                ? 'border-primary-500 bg-primary-50 text-primary-700' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            <p className="font-medium">No</p>
            <p className="text-sm text-gray-500 mt-1">I have no dependents to claim</p>
          </button>
        </div>
      </div>
    </div>
  );
};