/*jshint esversion:6*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {insertDB, updateDB} = require('./DB/dbConnect');
const {sendSMS} = require('./assets/twilio');
const {sendEmail} = require('./assets/email');
const {timeTrigger, intTrigger} = require('./assets/triggers');
const {schTemplet} = require('./assets/templets/email-templet');

const publicPath = path.join(__dirname, '../public');
const views = path.join(__dirname, '../views');
const port = process.env.PORT || 3000;
const app = express();
// TODO: to send link to responseform. convert to env var
const host = 'localhost:3000';

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(publicPath));

// //run time trigger, hour in 24, min and callback
// timeTrigger(6, 52, () => {
//   console.log('called trigger from server');
// });
//
// //interval triggger
// intTrigger('* * * * *', () => {
//   console.log('call int trigger every min from server');
// });

app.get('/', (req, res) => {
  res.sendFile(views + '/index.html')
})

app.get('/reqSch', (req, res) => {
  res.sendFile(views + '/reqSch.html');
})

app.post('/form', (req, res) => {
  // console.log(req.body);
   insertDB(req.body, 'insert').then((record) => {
     const link = `${host}/reqSch?sid=${record._id}&sd=${record.serviceDate}&sav=${record.avail}`
     console.log(link);
     console.log('sending email');
     console.log(record);
     const emailTemp = schTemplet(record, link);
     sendEmail('adampoznanski@outlook.com',emailTemp.subject, emailTemp.body, emailTemp.html);
   });
  res.sendFile(views + '/form.html');
  // TODO: vendor selection
  // notify vendor with accept form

})


app.post('/sch', (req, res) => {
  const getStatus = new Promise((resolve, reject) => {
    if (req.body.optradio === 'vendorToContact') {
      resolve('VWC');
    }else {
      resolve('Schedualed')
    }
  });

  getStatus.then((status) => {
    console.log('status: ',status, 'optradio: ', req.body.optradio);
    updateDB(req.body._id,status);
  })
  // notify custmer or the status with a templet
 // give max a head up
 console.log('run last log');
 res.send('<h3>Thank You</h3>');
 // next step build forward work flow, confirm dave of, calder invites, flow for vendorWillContact reminders etc.
});


app.listen(port, () => {
  console.log(`server up on port ${port}.`);
});
