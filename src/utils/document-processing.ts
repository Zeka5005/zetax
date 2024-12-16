import { DocumentType, ProcessedDocument } from '../types/documents';
import { extractW2Data, extract1099NECData, extract1099INTData, extract1099DIVData } from './document-parsers';

export const processDocument = async (file: File): Promise<ProcessedDocument> => {
  if (file.type === 'application/pdf') {
    return processPDF(file);
  } else if (file.type.startsWith('image/')) {
    return processImage(file);
  }
  throw new Error('Unsupported file type');
};

const processPDF = async (file: File): Promise<ProcessedDocument> => {
  // Process PDF file and extract data
  const formData = await extractTaxFormData(file);
  return {
    type: determineDocumentType(formData),
    data: formData,
  };
};

const processImage = async (file: File): Promise<ProcessedDocument> => {
  // Process image file and extract data
  const formData = await extractTaxFormData(file);
  return {
    type: determineDocumentType(formData),
    data: formData,
  };
};

const determineDocumentType = (data: any): DocumentType => {
  // Logic to determine document type based on extracted data
  if (data.employerEIN && data.wagesTips) {
    return 'W2';
  } else if (data.payerTIN && data.nonemployeeCompensation) {
    return '1099NEC';
  } else if (data.payerTIN && data.interestIncome) {
    return '1099INT';
  } else if (data.payerTIN && data.totalOrdinaryDividends) {
    return '1099DIV';
  }
  return 'OTHER';
};

const extractTaxFormData = async (file: File): Promise<any> => {
  // For now, we'll return empty data since OCR is removed
  // In a real application, this would integrate with a document processing service
  return {
    employerEIN: '',
    employerName: '',
    wagesTips: 0,
    federalTax: 0,
  };
};