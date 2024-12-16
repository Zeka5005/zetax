import { createScheduler, createWorker } from 'tesseract.js';

export const cleanNumericString = (value: string): string => {
  return value.replace(/[^\d.-]/g, '');
};

export const improveOCRAccuracy = async (text: string): Promise<string> => {
  // Pre-processing
  text = text.replace(/[^\x20-\x7E\n]/g, ''); // Remove non-printable characters
  text = text.replace(/\s+/g, ' ').trim(); // Normalize whitespace

  // Advanced OCR processing for numeric fields
  const numericFields = text.match(/\$?\s*[\d,.-]+/g) || [];
  for (const field of numericFields) {
    const cleanField = field.replace(/[^\d.-]/g, '');
    if (isNaN(parseFloat(cleanField))) {
      // Re-process unclear numeric fields
      const scheduler = createScheduler();
      const worker = await createWorker('eng');
      await scheduler.addWorker(worker);
      
      const { data: { text: improvedText } } = await worker.recognize(field, {
        tessedit_char_whitelist: '0123456789.-',
      });
      
      text = text.replace(field, improvedText);
      
      await worker.terminate();
      await scheduler.terminate();
    }
  }

  return text;
};

export const validateExtractedData = (data: Record<string, any>): boolean => {
  // Validate numeric fields
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      return false;
    }
  }

  // Validate required fields exist and are non-empty
  const requiredFields = ['payerTIN', 'payerName'];
  return requiredFields.every(field => {
    const value = data[field];
    return value !== undefined && value !== null && value !== '';
  });
};