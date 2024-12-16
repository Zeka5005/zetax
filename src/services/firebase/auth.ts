import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { handleAuthError } from '../../utils/errors/authErrors';
import { validateSignUpData } from '../../utils/validation/authValidation';

export const authService = {
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      // Validate input data
      const validationErrors = validateSignUpData({
        firstName,
        lastName,
        email,
        password,
        confirmPassword: password
      });

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('. '));
      }

      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      return user;
    } catch (error: any) {
      throw handleAuthError(error);
    }
  },

  async signIn(email: string, password: string) {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error: any) {
      throw handleAuthError(error);
    }
  },

  async signOut() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error: any) {
      throw handleAuthError(error);
    }
  },

  getCurrentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }
};