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
    text:body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw console.error(err);
    }else {
      console.log('Email sent', info);
    }
  })
};


module.exports = {sendEmail};
