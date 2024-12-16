import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Send } from 'lucide-react';
import { EFileState } from '../../types/efile';

interface EFileStatusProps {
  status: EFileState;
  submissionId?: string;
  estimatedRefund?: number;
  errors?: string[];
}

export const EFileStatus: React.FC<EFileStatusProps> = ({
  status,
  submissionId,
  estimatedRefund,
  errors = [],
}) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'ACCEPTED':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
          title: 'Return Accepted',
          description: 'Your tax return has been accepted by the IRS.',
          color: 'green',
        };
      case 'REJECTED':
        return {
          icon: <AlertCircle className="w-6 h-6 text-red-500" />,
          title: 'Return Rejected',
          description: 'Your tax return was rejected. Please review the errors below.',
          color: 'red',
        };
      case 'PENDING':
        return {
          icon: <Clock className="w-6 h-6 text-blue-500" />,
          title: 'Processing',
          description: 'Your return is being processed by the IRS.',
          color: 'blue',
        };
      default:
        return {
          icon: <Send className="w-6 h-6 text-gray-500" />,
          title: 'Ready to File',
          description: 'Your return is ready to be submitted.',
          color: 'gray',
        };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-4 mb-4">
        {statusInfo.icon}
        <div>
          <h3 className="font-medium text-lg">{statusInfo.title}</h3>
          <p className="text-gray-600">{statusInfo.description}</p>
        </div>
      </div>

      {submissionId && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Submission ID: <span className="font-mono">{submissionId}</span>
          </p>
        </div>
      )}

      {estimatedRefund && status === 'ACCEPTED' && (
        <div className="mb-4 p-4 bg-green-50 rounded-md">
          <h4 className="font-medium text-green-800">Estimated Refund</h4>
          <p className="text-2xl font-bold text-green-600">
            ${estimatedRefund.toLocaleString()}
          </p>
          <p className="text-sm text-green-700 mt-1">
            Expected within 21 days of acceptance
          </p>
        </div>
      )}

      {errors.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-red-800">Errors to Resolve:</h4>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};