import React from 'react';
import { Briefcase } from 'lucide-react';
import { DocumentUpload } from '../DocumentUpload';
import { DocumentList } from '../DocumentList';
import { UploadedDocument } from '../../../types/documents';

interface SelfEmploymentUploadProps {
  documents: UploadedDocument[];
  onDocumentProcessed: (document: UploadedDocument) => void;
  onRemoveDocument: (index: number) => void;
}

export const SelfEmploymentUpload: React.FC<SelfEmploymentUploadProps> = ({
  documents,
  onDocumentProcessed,
  onRemoveDocument,
}) => {
  const necDocuments = documents.filter(doc => doc.type === '1099NEC');

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Briefcase className="w-5 h-5 text-primary-500" />
        <h3 className="text-lg font-medium">Self-Employment Income (1099-NEC)</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Upload your 1099-NEC forms for any independent contractor or freelance work.
      </p>

      <DocumentUpload
        onDocumentProcessed={onDocumentProcessed}
        allowedTypes={['1099NEC']}
      />

      {necDocuments.length > 0 && (
        <DocumentList
          documents={necDocuments}
          onRemove={onRemoveDocument}
        />
      )}
    </div>
  );
};