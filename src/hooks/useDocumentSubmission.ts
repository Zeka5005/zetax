import { useState } from 'react';
import { UploadedDocument } from '../types/documents';
import { documentService } from '../services/firebase/documents';
import { useAuth } from '../contexts/AuthContext';

export const useDocumentSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  const handleSubmit = async (documents: UploadedDocument[]) => {
    if (documents.length === 0) return false;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Upload all documents
      const uploadPromises = documents.map(doc => 
        documentService.uploadDocument(doc, user?.uid)
      );

      await Promise.all(uploadPromises);
      
      setSubmitStatus('success');
      return true;
    } catch (error) {
      console.error('Error submitting documents:', error);
      setSubmitStatus('error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitStatus,
    submitDocuments: handleSubmit,
  };
};