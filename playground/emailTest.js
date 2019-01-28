const nodemailer = require('nodemailer');
const config = require('./../server/config/creds')


//==================================SMTP version with godaddy email================================
  // TM approach with smtp godaddy email`
  // create reusable transporter object using the default SMTP transport


let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.smtpAcct, // generated ethereal user
    pass: config.smtpPass // generated ethereal password
    }
  });

  const sendTestEmail = () => {
    let mailOptions = {
      // from: '"Fred Foo 👻" <foo@example.com>', // sender address
      // to: "bar@example.com, baz@example.com", // list of receivers
      // subject: "Hello ✔", // Subject line
      // text: "Hello world?", // plain text body
      // html: "<b>Hello world?</b>" // html body
      from:'info@levanongrp.com',
      to: 'adampoznanski@outlook.com',
      subject:'test email',
      text:'this is a test',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }else {
        console.log('Email sent', info);
      }
    });

  }

  sendTestEmail();

//================================Simple Gmail Version=====================================
// let transporter = nodemailer.createTransport({
//   service:'gmail',
//   auth:{
//     user:config.gmlAcct,
//     pass: config.gmlPass
//   }
// });
//
// const sendEmail = (to, subject, body, html) => {
//   let mailOptions = {
//     from:'1214wynne@gmail.com',
//     to: to,
//     subject:subject,
//     text:body,
//     html:html
//   };
//
//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log('error sending message');
//     }else {
//       console.log('Email sent', info);
//     }
//   })
// };
