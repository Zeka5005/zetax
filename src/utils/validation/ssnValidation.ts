export const validateSSN = (ssn: string): boolean => {
  // Remove any non-digit characters
  const cleanSSN = ssn.replace(/\D/g, '');
  
  // Check if it's exactly 9 digits
  if (cleanSSN.length !== 9) {
    return false;
  }

  // Check if it's a valid SSN format
  // Cannot start with 000, 666, or 900-999
  // Cannot have 00 in positions 4-5
  // Cannot have 0000 in positions 6-9
  const firstThree = parseInt(cleanSSN.substring(0, 3));
  const middleTwo = parseInt(cleanSSN.substring(3, 5));
  const lastFour = parseInt(cleanSSN.substring(5, 9));

  if (firstThree === 0 || firstThree === 666 || firstThree >= 900) {
    return false;
  }

  if (middleTwo === 0) {
    return false;
  }

  if (lastFour === 0) {
    return false;
  }

  return true;
};

export const formatSSN = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  // Format as XXX-XX-XXXX
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
};