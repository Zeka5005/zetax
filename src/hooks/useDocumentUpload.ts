import { useState, useCallback } from 'react';
import { UploadedDocument } from '../types/documents';
import { processDocument } from '../utils/document-processing';
import { validateDocument } from '../utils/validation/documentValidation';
import { useAuth } from '../contexts/AuthContext';

export const useDocumentUpload = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleUpload = useCallback(async (file: File, onSuccess: (doc: UploadedDocument) => void) => {
    if (!user) {
      setError('Please sign in to upload documents');
      return;
    }

    const validationError = validateDocument(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const result = await processDocument(file);
      const uploadedDoc: UploadedDocument = {
        file,
        type: result.type,
        data: result.data,
        preview: URL.createObjectURL(file),
      };
      onSuccess(uploadedDoc);
    } catch (err: any) {
      setError(err.message || 'Error processing document');
      console.error('Document processing error:', err);
    } finally {
      setProcessing(false);
    }
  }, [user]);

  return {
    processing,
    error,
    setError,
    handleUpload,
  };
};