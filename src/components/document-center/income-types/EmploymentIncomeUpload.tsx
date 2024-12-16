import React from 'react';
import { Briefcase } from 'lucide-react';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UploadedDocument } from '../../../types/documents';

interface EmploymentIncomeUploadProps {
  documents: UploadedDocument[];
  onDocumentProcessed: (document: UploadedDocument) => void;
  onRemoveDocument: (index: number) => void;
}

export const EmploymentIncomeUpload: React.FC<EmploymentIncomeUploadProps> = ({
  documents,
  onDocumentProcessed,
  onRemoveDocument,
}) => {
  const w2Documents = documents.filter(doc => doc.type === 'W2');

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Briefcase className="w-5 h-5 text-primary-500" />
        <h3 className="text-lg font-medium">Employment Income (W-2)</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Upload your W-2 forms from each employer you worked for during the tax year.
      </p>

      <DocumentUpload
        onDocumentProcessed={onDocumentProcessed}
        allowedTypes={['W2']}
      />

      {w2Documents.length > 0 && (
        <DocumentList
          documents={w2Documents}
          onRemove={onRemoveDocument}
        />
      )}
    </div>
  );
};