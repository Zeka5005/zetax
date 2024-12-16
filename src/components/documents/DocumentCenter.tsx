import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { DocumentUpload } from '../document-upload/DocumentUpload';
import { DocumentList } from '../document-upload/DocumentList';
import { DocumentSummary } from '../document-upload/DocumentSummary';
import { SubmitButton } from './SubmitButton';
import { StatusMessage } from './StatusMessage';
import { useDocumentSubmission } from '../../hooks/useDocumentSubmission';
import { UploadedDocument } from '../../types/documents';

export const uploadyourDocument = () => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const { isSubmitting, submitStatus, submitDocuments } = useDocumentSubmission();

  const handleDocumentProcessed = (document: UploadedDocument) => {
    setDocuments(prev => [...prev, document]);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (documents.length === 0) {
      alert('Please upload at least one document before submitting.');
      return;
    }

    const success = await submitDocuments(documents);
    if (success) {
      // Clear documents after successful submission
      setDocuments([]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload Tax Documents
        </h2>
        
        <DocumentUpload
          onDocumentProcessed={handleDocumentProcessed}
          allowedTypes={['W2', '1099NEC', '1099INT', '1099DIV']}
        />

        {documents.length > 0 && (
          <div className="mt-6 space-y-6">
            <DocumentList documents={documents} onRemove={handleRemoveDocument} />
            <DocumentSummary documents={documents} />
            
            <div className="border-t pt-6">
              <SubmitButton
                isSubmitting={isSubmitting}
                disabled={documents.length === 0}
                onClick={handleSubmit}
              />
              <StatusMessage status={submitStatus} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};