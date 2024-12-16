import React from 'react';
import { FileText, DollarSign } from 'lucide-react';
import { UploadedDocument } from '../../types/documents';
import { formatCurrency } from '../../utils/formatters';

interface DocumentSummaryProps {
  documents: UploadedDocument[];
}

export const DocumentSummary: React.FC<DocumentSummaryProps> = ({ documents }) => {
  const calculateTotals = () => {
    return documents.reduce(
      (acc, doc) => {
        if (doc.type === 'W2') {
          acc.wages += doc.data.wagesTips || 0;
          acc.federalWithholding += doc.data.federalTax || 0;
        } else if (doc.type === '1099NEC') {
          acc.selfEmployment += doc.data.nonemployeeCompensation || 0;
          acc.federalWithholding += doc.data.federalTax || 0;
        }
        return acc;
      },
      { wages: 0, selfEmployment: 0, federalWithholding: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium flex items-center mb-4">
        <FileText className="w-5 h-5 mr-2 text-blue-500" />
        Document Summary
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">W-2 Wages</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(totals.wages)}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">1099-NEC Income</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(totals.selfEmployment)}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Federal Tax Withheld</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(totals.federalWithholding)}
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium text-blue-900">Total Income</span>
            </div>
            <span className="text-xl font-bold text-blue-900">
              {formatCurrency(totals.wages + totals.selfEmployment)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};