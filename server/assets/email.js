const nodemailer = require('nodemailer');

const config = require('./../config/config')

// make email less secure
//https://myaccount.google.com/lesssecureapps?pli=1

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:config.gmlAcct,
    pass: config.gmlPass
  }
});

const sendEmail = (to, subject, body) => {
  const mailOptions = {
    from:'1214wynne@gmail.com',
    to: to,
    subject:subject,
    text:body,
    //html:body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('error sending message');
    }else {
      console.log('Email sent', info);
    }
  })
};
// console.log('send email test start');
// sendEmail('adampoznanski@outlook.com', 'test', 'test email');



module.exports = {sendEmail};
