import mailer from "nodemailer";

export function dispatchEmail(senderEmail: string,
                              password: string,
                              recipientEmail: string,
                              subject: string,
                              body: string) {
  const transportOpts = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: password
    }
  };

  const transporter = mailer.createTransport(transportOpts);

  const options = {
    from: senderEmail,
    to: recipientEmail,
    subject,
    html: body
  };

  console.log("Sending email with options", transportOpts, options);

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(options, error => {
      if (error) {
        reject(`Failed to send email to ${recipientEmail}: ${error}`);
      }
      else {
        console.log(`Email sent to ${recipientEmail}`);
        resolve();
      }
    });
  });
}
