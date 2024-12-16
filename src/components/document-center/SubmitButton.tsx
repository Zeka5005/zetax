import React from 'react';
import { Send, Loader } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  disabled,
  onClick,
}) => (
  <button
    onClick={onClick}
    disabled={isSubmitting || disabled}
    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent 
      text-base font-medium rounded-md text-white 
      ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600'} 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
      transition-colors duration-200`}
  >
    {isSubmitting ? (
      <>
        <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
        Submitting...
      </>
    ) : (
      <>
        <Send className="w-5 h-5 mr-2" />
        Submit Documents
      </>
    )}
  </button>
);