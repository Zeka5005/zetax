export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}