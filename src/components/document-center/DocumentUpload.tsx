import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle } from 'lucide-react';
import { processDocument } from '../../utils/document-processing';
import { DocumentType, UploadedDocument } from '../../types/documents';
import { ErrorAlert } from '../common/ErrorAlert';
import { useAuth } from '../../contexts/AuthContext';
import { documentService } from '../../services/firebase/documents';

interface DocumentUploadProps {
  onDocumentProcessed: (data: UploadedDocument) => void;
  allowedTypes: DocumentType[];
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onDocumentProcessed,
  allowedTypes,
}) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      setError('Please sign in to upload documents');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      for (const file of acceptedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('File size exceeds 10MB limit');
        }

        const result = await processDocument(file);
        const uploadedDoc: UploadedDocument = {
          file,
          type: result.type,
          data: result.data,
          preview: URL.createObjectURL(file),
          userId: user.uid
        };

        // Upload to Firebase Storage and Firestore
        await documentService.uploadDocument(uploadedDoc);
        onDocumentProcessed(uploadedDoc);
      }
    } catch (err: any) {
      setError(err.message || 'Error processing documents');
      console.error('Document processing error:', err);
    } finally {
      setProcessing(false);
    }
  }, [onDocumentProcessed, user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10485760,
    disabled: processing || !user
  });

  return (
    <div className="space-y-4">
      {!user && (
        <ErrorAlert 
          message="Please sign in to upload documents"
          onDismiss={() => setError(null)}
        />
      )}

      {error && (
        <ErrorAlert 
          message={error}
          onDismiss={() => setError(null)}
        />
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${processing || !user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <Upload className={`w-12 h-12 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
          <div className="text-sm text-gray-600">
            {isDragActive ? (
              <p>Drop your documents here</p>
            ) : (
              <p>
                {user ? (
                  <>
                    Drag & drop your tax documents here, or <span className="text-primary-500">browse</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      Supports PDF, JPG, PNG (max 10MB)
                    </span>
                  </>
                ) : (
                  <span>Sign in to upload documents</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};