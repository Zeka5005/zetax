import React from 'react';
import { DollarSign } from 'lucide-react';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UploadedDocument } from '../../../types/documents';

interface OtherIncomeUploadProps {
  documents: UploadedDocument[];
  onDocumentProcessed: (document: UploadedDocument) => void;
  onRemoveDocument: (index: number) => void;
}

export const OtherIncomeUpload: React.FC<OtherIncomeUploadProps> = ({
  documents,
  onDocumentProcessed,
  onRemoveDocument,
}) => {
  const otherDocuments = documents.filter(doc => doc.type === 'OTHER');

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="w-5 h-5 text-primary-500" />
        <h3 className="text-lg font-medium">Other Income Documents</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Upload any additional income-related documents not covered by other categories.
      </p>

      <DocumentUpload
        onDocumentProcessed={onDocumentProcessed}
        allowedTypes={['OTHER']}
      />

      {otherDocuments.length > 0 && (
        <DocumentList
          documents={otherDocuments}
          onRemove={onRemoveDocument}
        />
      )}
    </div>
  );
};