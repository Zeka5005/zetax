import { validateEmail } from './authValidation';

export const validatePhoneNumber = (phone: string): boolean => {
  // Allow empty phone numbers since they're optional
  if (!phone) return true;
  
  // Check for format (XXX) XXX-XXXX
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Format the phone number
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

export const validateContactInfo = (email: string, phone: string | undefined): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (phone && !validatePhoneNumber(phone)) {
    errors.phone = 'Please enter a valid phone number: (XXX) XXX-XXXX';
  }

  return errors;
};