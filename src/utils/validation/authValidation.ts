import { validateSSN } from './ssnValidation';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateSignUpData = (data: SignUpData): string[] => {
  const errors: string[] = [];

  if (!data.firstName.trim()) {
    errors.push('First name is required');
  }

  if (!data.lastName.trim()) {
    errors.push('Last name is required');
  }

  if (!validateEmail(data.email)) {
    errors.push('Invalid email address');
  }

  if (data.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { validateSSN } from './ssnValidation';