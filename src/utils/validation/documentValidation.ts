import { UploadedDocument } from '../../types/documents';

export const validateDocument = (file: File): string | null => {
  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return 'File size exceeds 10MB limit';
  }

  // Validate file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type. Please upload PDF or image files only';
  }

  return null;
};

export const validateDocuments = (documents: UploadedDocument[]): string[] => {
  const errors: string[] = [];

  if (documents.length === 0) {
    errors.push('Please upload at least one document');
  }

  return errors;
};