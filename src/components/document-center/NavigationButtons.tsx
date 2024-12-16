import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: string;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onNext,
  onBack,
  isNextDisabled,
}) => {
  return (
    <div className="mt-8 flex justify-between items-center pt-6 border-t">
      <div className="flex items-center space-x-4">
        {currentStep !== 'personal' && (
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`flex items-center px-6 py-3 rounded-md transition-colors
          ${isNextDisabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-600'}`}
      >
        Next
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};