export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const handleAuthError = (error: any): AuthError => {
  const errorCode = error?.code || 'auth/unknown';
  
  switch (errorCode) {
    case 'auth/invalid-email':
      return new AuthError('Invalid email address', errorCode, error);
    case 'auth/user-disabled':
      return new AuthError('This account has been disabled', errorCode, error);
    case 'auth/user-not-found':
      return new AuthError('No account found with this email', errorCode, error);
    case 'auth/wrong-password':
      return new AuthError('Incorrect password', errorCode, error);
    case 'auth/email-already-in-use':
      return new AuthError('An account already exists with this email', errorCode, error);
    case 'auth/weak-password':
      return new AuthError('Password should be at least 6 characters', errorCode, error);
    case 'auth/network-request-failed':
      return new AuthError('Network error. Please check your connection', errorCode, error);
    default:
      return new AuthError('An unexpected error occurred', errorCode, error);
  }
};