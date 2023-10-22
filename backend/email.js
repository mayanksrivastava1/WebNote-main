
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '21317@iiitu.ac.in', 
    pass: 'shreya123@#',
  },
});


exports.sendThankYouEmail = (email) => {
  const mailOptions = {
    from: '21317@iiitu.ac.in', 
    to: email,
    subject: 'Thank You for Signing Up',
    text: 'Thank you for signing up on our website. We appreciate your business.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending thank you email: ' + error);
    } else {
      // console.log('Thank you email sent: ' + info.response);
    }
  });
};
