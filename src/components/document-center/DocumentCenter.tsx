import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { DocumentUpload } from '../document-upload/DocumentUpload';
import { DocumentList } from '../document-upload/DocumentList';
import { DocumentSummary } from '../document-upload/DocumentSummary';
import { SubmitButton } from '../documents/SubmitButton';
import { StatusMessage } from '../documents/StatusMessage';
import { useDocumentSubmission } from '../../hooks/useDocumentSubmission';
import { useAuth } from '../../contexts/AuthContext';
import { documentService } from '../../services/firebase/documents';
import { UploadedDocument } from '../../types/documents';

export const DocumentCenter = () => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [previousUploads, setPreviousUploads] = useState<any[]>([]);
  const { isSubmitting, submitStatus, submitDocuments } = useDocumentSubmission();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserDocuments();
    }
  }, [user]);

  const loadUserDocuments = async () => {
    if (!user) {
      console.log('User must be logged in to view documents');
      return;
    }

    try {
      const userDocs = await documentService.getUserDocuments(user.uid);
      setPreviousUploads(userDocs);
    } catch (error) {
      console.error('Error loading user documents:', error);
    }
  };

  const handleDocumentProcessed = (document: UploadedDocument) => {
    setDocuments(prev => [...prev, document]);
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert('Please sign in to submit documents');
      return;
    }

    if (documents.length === 0) {
      alert('Please upload at least one document before submitting.');
      return;
    }

    try {
      await submitDocuments(documents);
      setDocuments([]);
      await loadUserDocuments(); // Reload the user's documents after successful submission
    } catch (error) {
      console.error('Error submitting documents:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
        <p className="text-gray-600">You must be signed in to upload and view documents.</p>
      </div>
    );
  }

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

        {previousUploads.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Previously Uploaded Documents</h3>
            <div className="space-y-4">
              {previousUploads.map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{doc.fileInfo.name}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    doc.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {doc.status === 'pending_review' ? 'Pending Review' : 'Processed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};