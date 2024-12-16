import { collection, addDoc, updateDoc, getDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UploadedDocument } from '../../types/documents';

const COLLECTION_NAME = 'documents';

export const documentService = {
  async create(taxpayerId: string, document: UploadedDocument) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        taxpayerId,
        type: document.type,
        data: document.data,
        fileName: document.file.name,
        fileType: document.file.type,
        uploadedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },

  async getByTaxpayerId(taxpayerId: string) {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('taxpayerId', '==', taxpayerId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }
};