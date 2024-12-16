import React from 'react';
import { TrendingUp } from 'lucide-react';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UploadedDocument } from '../../../types/documents';

interface InvestmentIncomeUploadProps {
  documents: UploadedDocument[];
  onDocumentProcessed: (document: UploadedDocument) => void;
  onRemoveDocument: (index: number) => void;
}

export const InvestmentIncomeUpload: React.FC<InvestmentIncomeUploadProps> = ({
  documents,
  onDocumentProcessed,
  onRemoveDocument,
}) => {
  const investmentDocuments = documents.filter(
    doc => doc.type === '1099DIV' || doc.type === '1099INT'
  );

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary-500" />
        <h3 className="text-lg font-medium">Investment Income (1099-DIV, 1099-INT)</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Upload your 1099-DIV and 1099-INT forms for dividend and interest income.
      </p>

      <DocumentUpload
        onDocumentProcessed={onDocumentProcessed}
        allowedTypes={['1099DIV', '1099INT']}
      />

      {investmentDocuments.length > 0 && (
        <DocumentList
          documents={investmentDocuments}
          onRemove={onRemoveDocument}
        />
      )}
    </div>
  );
};