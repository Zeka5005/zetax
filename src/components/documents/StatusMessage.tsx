import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface StatusMessageProps {
  status: 'idle' | 'success' | 'error';
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (status === 'idle') return null;

  const isSuccess = status === 'success';
  const bgColor = isSuccess ? 'bg-[#8F4495]/10' : 'bg-red-50';
  const textColor = isSuccess ? 'text-[#8F4495]' : 'text-red-800';
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div className={`mt-4 p-4 ${bgColor} rounded-md`}>
      <div className="flex items-start">
        <Icon className={`${textColor} w-5 h-5 mt-0.5 mr-3`} />
        <div>
          <p className={`text-sm ${textColor} font-medium`}>
            {isSuccess ? 'Documents Submitted Successfully!' : 'Submission Failed'}
          </p>
          <p className={`mt-1 text-sm ${textColor} opacity-90`}>
            {isSuccess
              ? 'We\'ll process your documents and update your tax return accordingly.'
              : 'There was an error submitting your documents. Please try again or contact support.'}
          </p>
        </div>
      </div>
    </div>
  );
};