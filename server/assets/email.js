const nodemailer = require('nodemailer');
const config = require('./../config/creds')

// make email less secure
//https://myaccount.google.com/lesssecureapps?pli=1

let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: config.smtpAcct,
    pass: config.smtpPass
    }
  });

const sendEmail = (to, subject, body, html) => {
  let mailOptions = {
    from:'info@levanongrp.com',
    to: to,
    subject:subject,
    text:body,
    html:html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }else {
      console.log('Email sent', info);
    }
  })
};
// console.log('send email test start');
// sendEmail('adampoznanski@outlook.com', 'test', 'test email');



module.exports = {sendEmail};
