import React from 'react';
import { ExternalLink } from 'lucide-react';

export const RefundStatus = () => {
  const handleCheckStatus = () => {
    window.open('https://sa.www4.irs.gov/irfof/lang/en/irfofgetstatus.jsp', '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Check Your Refund Status</h2>
        
        <p className="text-gray-600 mb-8">
          Track the status of your federal tax refund using the IRS "Where's My Refund?" tool.
          You'll need:
        </p>

        <ul className="text-left max-w-md mx-auto mb-8 space-y-2">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            <span>Your Social Security Number</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            <span>Your Filing Status</span>
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            <span>Your Exact Refund Amount</span>
          </li>
        </ul>

        <button
          onClick={handleCheckStatus}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Check Refund Status
          <ExternalLink className="ml-2 -mr-1 w-5 h-5" />
        </button>

        <div className="mt-8 p-4 bg-blue-50 rounded-md text-sm text-blue-700">
          <p>
            The IRS updates refund status information once every 24 hours, usually overnight.
            You can check your refund status 24 hours after e-filing or 4 weeks after mailing your return.
          </p>
        </div>
      </div>
    </div>
  );
};