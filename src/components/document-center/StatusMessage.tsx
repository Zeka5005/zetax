import React from 'react';

interface StatusMessageProps {
  status: 'idle' | 'success' | 'error';
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (status === 'idle') return null;

  const isSuccess = status === 'success';
  const bgColor = isSuccess ? 'bg-primary-50' : 'bg-red-50';
  const textColor = isSuccess ? 'text-primary-800' : 'text-red-800';

  return (
    <div className={`mt-4 p-4 ${bgColor} rounded-md`}>
      <p className={`text-sm ${textColor}`}>
        {isSuccess
          ? 'Documents submitted successfully! We\'ll process them and update your tax return.'
          : 'There was an error submitting your documents. Please try again or contact support.'}
      </p>
    </div>
  );
};