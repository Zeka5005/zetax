import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../config/firebase';
import { UploadedDocument } from '../../types/documents';

export const uploadDocumentToFirebase = async (
  file: File,
  documentType: string,
  metadata: any
) => {
  try {
    // Create a storage reference
    const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Store document metadata in Firestore
    const docRef = await addDoc(collection(db, 'documents'), {
      fileName: file.name,
      fileType: file.type,
      documentType,
      metadata,
      downloadURL,
      uploadedAt: serverTimestamp(),
      status: 'pending_review'
    });

    return {
      id: docRef.id,
      downloadURL,
      status: 'uploaded'
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const submitDocuments = async (documents: UploadedDocument[]) => {
  try {
    const submissions = await Promise.all(
      documents.map(async (doc) => {
        const result = await uploadDocumentToFirebase(
          doc.file,
          doc.type,
          doc.data
        );
        
        // Add submission record
        await addDoc(collection(db, 'submissions'), {
          documentId: result.id,
          submittedAt: serverTimestamp(),
          status: 'submitted',
          documentType: doc.type,
          metadata: doc.data
        });

        return result;
      })
    );

    return {
      success: true,
      submissions
    };
  } catch (error) {
    console.error('Error submitting documents:', error);
    return {
      success: false,
      error: 'Failed to submit documents'
    };
  }
};