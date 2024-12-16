import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { UploadedDocument } from '../../types/documents';

export const documentService = {
  async uploadDocument(document: UploadedDocument): Promise<string> {
    if (!document.userId) {
      throw new Error('User ID is required for document upload');
    }

    try {
      // Create storage path with user ID
      const timestamp = Date.now();
      const fileName = `${timestamp}_${document.file.name}`;
      const filePath = `users/${document.userId}/documents/${fileName}`;
      const storageRef = ref(storage, filePath);
      
      // Upload file to Storage
      const snapshot = await uploadBytes(storageRef, document.file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Create document record in Firestore
      const docRef = await addDoc(collection(db, 'documents'), {
        userId: document.userId,
        type: document.type,
        data: document.data,
        fileInfo: {
          name: document.file.name,
          type: document.file.type,
          size: document.file.size,
          url: downloadURL,
          path: filePath
        },
        uploadedAt: new Date().toISOString(),
        status: 'pending_review'
      });

      return docRef.id;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  async getUserDocuments(userId: string) {
    try {
      const q = query(collection(db, 'documents'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user documents:', error);
      throw error;
    }
  }
};