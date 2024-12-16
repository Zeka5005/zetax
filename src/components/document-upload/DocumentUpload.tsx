import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, Mail } from 'lucide-react';
import { processDocument } from '../../utils/document-processing';
import { sendDocumentNotification } from '../../utils/email/sendgrid';
import { DocumentPreview } from './DocumentPreview';
import { DocumentType, UploadedDocument } from '../../types/documents';

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
  const [notificationSent, setNotificationSent] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setProcessing(true);
    setError(null);

    try {
      for (const file of acceptedFiles) {
        const result = await processDocument(file);
        const uploadedDoc: UploadedDocument = {
          file,
          type: result.type,
          data: result.data,
          preview: URL.createObjectURL(file),
        };
        onDocumentProcessed(uploadedDoc);
      }
      setNotificationSent(true);
    } catch (err) {
      setError('Error processing documents. Please try again.');
      console.error('Document processing error:', err);
    } finally {
      setProcessing(false);
    }
  }, [onDocumentProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10485760, // 10MB
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${processing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} disabled={processing} />
        <div className="flex flex-col items-center space-y-2">
          <Upload className={`w-12 h-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="text-sm text-gray-600">
            {isDragActive ? (
              <p>Drop your documents here</p>
            ) : (
              <p>
                Drag & drop your tax documents here, or <span className="text-blue-500">browse</span>
                <br />
                <span className="text-xs text-gray-500">
                  Supports PDF, JPG, PNG (max 10MB)
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {notificationSent && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
          <Mail className="w-5 h-5" />
          <span className="text-sm">Documents processed successfully!</span>
        </div>
      )}
    </div>
  );
};