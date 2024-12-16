import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { functions } from '../../config/firebase';

interface EmailNotification {
  to: string;
  subject: string;
  documentInfo: {
    name: string;
    type: string;
    submittedAt: Date;
  };
  taxpayerInfo: {
    name: string;
    ssn: string;
  };
}

export const sendDocumentNotification = async (notification: EmailNotification): Promise<boolean> => {
  try {
    const sendEmail = httpsCallable(functions, 'sendEmail');
    
    const result = await sendEmail({
      to: notification.to,
      subject: notification.subject,
      data: {
        documentInfo: {
          name: notification.documentInfo.name,
          type: notification.documentInfo.type,
          submittedAt: notification.documentInfo.submittedAt.toISOString(),
        },
        taxpayerInfo: {
          name: notification.taxpayerInfo.name,
          ssnLastFour: notification.taxpayerInfo.ssn.slice(-4),
        },
      },
    });

    return result.data as boolean;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
};