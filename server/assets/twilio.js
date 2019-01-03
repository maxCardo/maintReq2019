
const config = require('./../config/config')

const client = require('twilio')(config.twlsid, config.twlAuthToken);


const sendSMS= (to,body) => {
  client.messages
  .create({
    body: body,
    from:'+14124447757',
    to: to
  })
  .then(message => console.log(message.sid))
  .done();
}

module.exports = {sendSMS};
