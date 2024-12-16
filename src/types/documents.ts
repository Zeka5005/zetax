export type DocumentType = 'W2' | '1099NEC' | '1099INT' | '1099DIV' | 'OTHER';

export interface UploadedDocument {
  file: File;
  type: DocumentType;
  data: W2Data | Form1099NECData | Form1099INTData | Form1099DIVData | Record<string, any>;
  preview: string;
  userId?: string;
}

// Rest of the file remains unchanged...