import type { MailDataRequired } from '@sendgrid/mail';

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
  const SENDGRID_CONFIG = {
    apiKey: import.meta.env.VITE_SENDGRID_API_KEY,
    fromEmail: import.meta.env.VITE_SENDER_EMAIL,
  };

  if (!SENDGRID_CONFIG.apiKey) {
    console.error('SendGrid API key not configured');
    return false;
  }

  try {
    const { default: sgMail } = await import('@sendgrid/mail');
    sgMail.setApiKey(SENDGRID_CONFIG.apiKey);

    const msg: MailDataRequired = {
      to: notification.to,
      from: SENDGRID_CONFIG.fromEmail,
      subject: notification.subject,
      text: `
New Document Submission from Zetax

Document Information:
- Name: ${notification.documentInfo.name}
- Type: ${notification.documentInfo.type}
- Submitted: ${notification.documentInfo.submittedAt.toLocaleString()}

Taxpayer Information:
- Name: ${notification.taxpayerInfo.name}
- SSN (last 4): ${notification.taxpayerInfo.ssn.slice(-4)}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">New Document Submission from Zetax</h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534;">Document Information:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Name:</strong> ${notification.documentInfo.name}</li>
              <li style="margin: 10px 0;"><strong>Type:</strong> ${notification.documentInfo.type}</li>
              <li style="margin: 10px 0;"><strong>Submitted:</strong> ${notification.documentInfo.submittedAt.toLocaleString()}</li>
            </ul>

            <h3 style="color: #166534; margin-top: 20px;">Taxpayer Information:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Name:</strong> ${notification.taxpayerInfo.name}</li>
              <li style="margin: 10px 0;"><strong>SSN (last 4):</strong> ${notification.taxpayerInfo.ssn.slice(-4)}</li>
            </ul>
          </div>
          
          <p style="color: #64748b; font-size: 12px;">
            This is an automated notification from Zetax.
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
};