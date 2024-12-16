import { W2Data, Form1099NECData, Form1099INTData, Form1099DIVData } from '../../types/documents';
import { cleanNumericString, improveOCRAccuracy } from './ocr-helpers';

export const extractW2Data = async (text: string): Promise<Partial<W2Data>> => {
  text = await improveOCRAccuracy(text);
  const data: Partial<W2Data> = {};
  
  // Enhanced EIN extraction with validation
  const einMatch = text.match(/(?:EIN|Employer ID Number|Employer's ID)[:\s]*([0-9-]{10})/i);
  if (einMatch) {
    data.employerEIN = einMatch[1].replace(/[^\d-]/g, '');
  }

  // Enhanced employer name extraction
  const employerMatch = text.match(/(?:Employer's name|Employer name)[:\s]*([^\n]+)/i);
  if (employerMatch) {
    data.employerName = employerMatch[1].trim().replace(/\s+/g, ' ');
  }

  // Enhanced wages extraction with decimal handling
  const wagesMatch = text.match(/(?:Wages, tips, other|Box 1)[:\s]*\$?\s*([\d,.-]+)/i);
  if (wagesMatch) {
    data.wagesTips = parseFloat(cleanNumericString(wagesMatch[1]));
  }

  // Enhanced federal tax extraction
  const fedTaxMatch = text.match(/(?:Federal income tax withheld|Box 2)[:\s]*\$?\s*([\d,.-]+)/i);
  if (fedTaxMatch) {
    data.federalTax = parseFloat(cleanNumericString(fedTaxMatch[1]));
  }

  return data;
};

export const extract1099NECData = async (text: string): Promise<Partial<Form1099NECData>> => {
  text = await improveOCRAccuracy(text);
  const data: Partial<Form1099NECData> = {};
  
  const tinMatch = text.match(/(?:PAYER'S TIN|Payer's TIN)[:\s]*([0-9-]{10})/i);
  if (tinMatch) {
    data.payerTIN = tinMatch[1].replace(/[^\d-]/g, '');
  }

  const payerMatch = text.match(/(?:PAYER'S name|Payer's name)[:\s]*([^\n]+)/i);
  if (payerMatch) {
    data.payerName = payerMatch[1].trim().replace(/\s+/g, ' ');
  }

  const compensationMatch = text.match(/(?:Nonemployee compensation|Box 1)[:\s]*\$?\s*([\d,.-]+)/i);
  if (compensationMatch) {
    data.nonemployeeCompensation = parseFloat(cleanNumericString(compensationMatch[1]));
  }

  const fedTaxMatch = text.match(/(?:Federal income tax withheld|Box 4)[:\s]*\$?\s*([\d,.-]+)/i);
  if (fedTaxMatch) {
    data.federalTax = parseFloat(cleanNumericString(fedTaxMatch[1]));
  }

  return data;
};

export const extract1099INTData = async (text: string): Promise<Partial<Form1099INTData>> => {
  text = await improveOCRAccuracy(text);
  const data: Partial<Form1099INTData> = {};

  const tinMatch = text.match(/(?:PAYER'S TIN|Payer's TIN)[:\s]*([0-9-]{10})/i);
  if (tinMatch) {
    data.payerTIN = tinMatch[1].replace(/[^\d-]/g, '');
  }

  const payerMatch = text.match(/(?:PAYER'S name|Payer's name)[:\s]*([^\n]+)/i);
  if (payerMatch) {
    data.payerName = payerMatch[1].trim().replace(/\s+/g, ' ');
  }

  const interestMatch = text.match(/(?:Interest income|Box 1)[:\s]*\$?\s*([\d,.-]+)/i);
  if (interestMatch) {
    data.interestIncome = parseFloat(cleanNumericString(interestMatch[1]));
  }

  const fedTaxMatch = text.match(/(?:Federal income tax withheld|Box 4)[:\s]*\$?\s*([\d,.-]+)/i);
  if (fedTaxMatch) {
    data.federalTax = parseFloat(cleanNumericString(fedTaxMatch[1]));
  }

  return data;
};

export const extract1099DIVData = async (text: string): Promise<Partial<Form1099DIVData>> => {
  text = await improveOCRAccuracy(text);
  const data: Partial<Form1099DIVData> = {};

  const tinMatch = text.match(/(?:PAYER'S TIN|Payer's TIN)[:\s]*([0-9-]{10})/i);
  if (tinMatch) {
    data.payerTIN = tinMatch[1].replace(/[^\d-]/g, '');
  }

  const payerMatch = text.match(/(?:PAYER'S name|Payer's name)[:\s]*([^\n]+)/i);
  if (payerMatch) {
    data.payerName = payerMatch[1].trim().replace(/\s+/g, ' ');
  }

  const totalDividendsMatch = text.match(/(?:Total ordinary dividends|Box 1a)[:\s]*\$?\s*([\d,.-]+)/i);
  if (totalDividendsMatch) {
    data.totalOrdinaryDividends = parseFloat(cleanNumericString(totalDividendsMatch[1]));
  }

  const qualifiedDividendsMatch = text.match(/(?:Qualified dividends|Box 1b)[:\s]*\$?\s*([\d,.-]+)/i);
  if (qualifiedDividendsMatch) {
    data.qualifiedDividends = parseFloat(cleanNumericString(qualifiedDividendsMatch[1]));
  }

  const fedTaxMatch = text.match(/(?:Federal income tax withheld|Box 4)[:\s]*\$?\s*([\d,.-]+)/i);
  if (fedTaxMatch) {
    data.federalTax = parseFloat(cleanNumericString(fedTaxMatch[1]));
  }

  return data;
};