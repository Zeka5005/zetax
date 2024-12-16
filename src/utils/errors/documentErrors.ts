export class DocumentError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'DocumentError';
  }
}

export const handleDocumentError = (error: any): DocumentError => {
  const errorCode = error?.code || 'document/unknown';
  
  switch (errorCode) {
    case 'storage/unauthorized':
      return new DocumentError('You must be signed in to upload documents', errorCode, error);
    case 'storage/canceled':
      return new DocumentError('Upload was cancelled', errorCode, error);
    case 'storage/invalid-file-type':
      return new DocumentError('Invalid file type. Please upload PDF or image files only', errorCode, error);
    case 'storage/file-too-large':
      return new DocumentError('File is too large. Maximum size is 10MB', errorCode, error);
    default:
      return new DocumentError('Error uploading document', errorCode, error);
  }
};