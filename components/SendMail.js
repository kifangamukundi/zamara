import * as MailComposer from 'expo-mail-composer';

const SendMail = (to, subject, text) => {
  MailComposer.composeAsync({
    recipients: [to],
    subject: subject,
    body: text,
  })
  .then(result => {
    if (result.status === 'sent') {
      console.log('Email sent successfully');
    } else {
      console.log('Could not send email:', result.status);
    }
  })
  .catch(error => console.error('Could not send email:', error));
};

export default SendMail;

