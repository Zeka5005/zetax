import { collection, addDoc, updateDoc, getDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { TaxPayer } from '../../types/tax';

const COLLECTION_NAME = 'taxpayers';

export const taxpayerService = {
  async create(taxpayer: TaxPayer) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...taxpayer,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating taxpayer:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<TaxPayer>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating taxpayer:', error);
      throw error;
    }
  },

  async getBySSN(ssn: string) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('ssn', '==', ssn));
      const snapshot = await getDocs(q);
      return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } catch (error) {
      console.error('Error fetching taxpayer:', error);
      throw error;
    }
  }
};