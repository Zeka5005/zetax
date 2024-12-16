import { Address } from '../../types/tax';

export const validateAddress = (address: Address): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!address.street.trim()) {
    errors.street = 'Street address is required';
  }

  if (!address.city.trim()) {
    errors.city = 'City is required';
  }

  if (!address.state) {
    errors.state = 'State is required';
  }

  if (!address.zipCode.trim()) {
    errors.zipCode = 'ZIP code is required';
  } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
    errors.zipCode = 'Invalid ZIP code format';
  }

  return errors;
};