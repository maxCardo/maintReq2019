/*jshint esversion:6*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {insertDB,updateDB,logDB,getVendor, getServiceOrder} = require('./DB/dbConnect');
const {sendSMS} = require('./assets/twilio');
const {sendEmail} = require('./assets/email');
const {postSlack} = require('./assets/slack');
const {timeTrigger,intTrigger} = require('./assets/triggers');
const {schTemplet, notifyRes} = require('./assets/templets/email-templet');
const {host} = require('./config/creds');

const publicPath = path.join(__dirname, '../public');
const views = path.join(__dirname, '../views');
const port = process.env.PORT || 3000;
const app = express();
// TODO: to send link to responseform. convert to env var;

app.use(bodyParser.urlencoded({
  extended: false
}))

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
});

app.get('/reqSch', (req, res) => {
  res.sendFile(views + '/reqSch.html');
});

app.get('/vendorSignup', (req, res) => {
  res.sendFile(views + '/vendorSignup.html');
});

app.post('/form', (req, res) => {
  const request = JSON.stringify(req.body,null,2);
  postSlack(
    `New Service Request Added For ${req.body.property}.
      Unit: ${req.body.unitNum}
      Service Type: ${req.body.serviceType}
      Message: ${req.body.serviceDiscription}
    `);
  insertDB(req.body, 'firstReq')
  .then(() => {
    logDB(req.body._id, 'Work Order Created');
    const serviceType = req.body.serviceType;
    return serviceType;
  }).then((serviceType) => {
    getVendor(serviceType).then((value) => {
      const link = `https://${host}/reqSch?sid=${req.body._id}&sd=${req.body.serviceDate}&sav=${req.body.avail}`;
      const emailTemp = schTemplet(req.body, link);
      sendEmail(value.vendorEmail, emailTemp.subject, emailTemp.body, emailTemp.html);
      sendSMS(value.vendorNum, `a new maintenance request has been emailed to you at ${value.vendorEmail}`)
      return value
    }).then((value) => {
      postSlack(`${value.vendorName} has been assigned the ${req.body.serviceType} service order for ${req.body.property}`)
      logDB(req.body._id, `${value.vendorName} selected as vendor and email sent to ${value.vendorEmail}`)
    });
  });
  res.sendFile(views + '/form.html');
});

app.post('/sch', (req, res) => {
  const getStatus = new Promise((resolve, reject) => {
    if (req.body.optradio === 'vendorToContact') {
      resolve('VWC');
    } else {
      resolve('Scheduled')
    }
  });

  getStatus.then((status) => {
    updateDB(req.body._id, status);
    logDB(req.body._id, `Status updated to ${status}`)
  }).then(() => {
    getServiceOrder(req.body._id).then((serviceOrder) => {
      const emailTemp = notifyRes(req.body, serviceOrder)
      sendEmail(serviceOrder.email, emailTemp.subject, emailTemp.body, emailTemp.html);
      return serviceOrder
    }).then((serviceOrder) => {
      postSlack(`Service Request Updated For ${serviceOrder.serviceType} @ ${serviceOrder.property} Unit ${serviceOrder.unitNum}. Status changed to ${serviceOrder.status}`)
    })
  })
  res.send('<h3>Thank You</h3>');
  // next step build forward work flow, confirm day of, cal invites, flow for vendorWillContact reminders etc.
});

app.post('/addVendor', (req, res) => {
  new Promise((resolve, reject) => {
    const record = req.body;
    const skillsObj = {};
    for (var i = 1; i < req.body.skillSet.length; i++) {
      skillsObj[req.body.skillSet[i]] = true
    }
    record.skillSet = skillsObj;
    resolve(record);
  }).then((record) => {
    insertDB(record, 'vendors');
  });
  res.sendFile(views + '/vendorSignup.html');
});


app.listen(port, () => {
  console.log(`server up on port ${port}.`);
});
