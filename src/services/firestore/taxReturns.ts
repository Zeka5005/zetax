import { collection, addDoc, updateDoc, getDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Income, Deductions, TaxCalculation } from '../../types/tax';

const COLLECTION_NAME = 'taxReturns';

export const taxReturnService = {
  async create(taxpayerId: string, data: {
    income: Income,
    deductions: Deductions,
    calculation: TaxCalculation
  }) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        taxpayerId,
        ...data,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating tax return:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<{
    income: Income,
    deductions: Deductions,
    calculation: TaxCalculation
  }>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating tax return:', error);
      throw error;
    }
  },

  async getByTaxpayerId(taxpayerId: string) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('taxpayerId', '==', taxpayerId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching tax returns:', error);
      throw error;
    }
  }
};