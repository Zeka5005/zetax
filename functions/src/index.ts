import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Gmail transporter configuration
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zekasalama92@gmail.com',
    pass: functions.config().gmail.password // Use the configured app password
  }
});

export const sendDocumentNotification = functions.firestore
  .document('documents/{documentId}')
  .onCreate(async (snap, context) => {
    const document = snap.data();
    
    try {
      // Get user data
      const userSnapshot = await admin.firestore()
        .collection('users')
        .doc(document.userId)
        .get();
      const userData = userSnapshot.data();

      // Email content
      const mailOptions = {
        from: '"Zetax Tax Filing" <zekasalama92@gmail.com>',
        to: 'zekasalama92@gmail.com',
        subject: 'New Tax Document Upload',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8F4495;">New Document Upload Notification</h2>
            
            <div style="background-color: #f9f0f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #7c3981;">Document Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Document Type:</strong> ${document.type}</li>
                <li><strong>File Name:</strong> ${document.fileInfo.name}</li>
                <li><strong>Upload Date:</strong> ${new Date(document.uploadedAt).toLocaleString()}</li>
                <li><strong>Download URL:</strong> <a href="${document.fileInfo.url}" target="_blank">View Document</a></li>
              </ul>

              <h3 style="color: #7c3981;">User Information:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Name:</strong> ${userData?.firstName} ${userData?.lastName}</li>
                <li><strong>Email:</strong> ${userData?.email}</li>
              </ul>
            </div>
          </div>
        `
      };

      // Send email
      await gmailTransporter.sendMail(mailOptions);

      // Update document status
      await snap.ref.update({
        notificationSent: true,
        notificationSentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new functions.https.HttpsError('internal', 'Failed to send notification');
    }
  });