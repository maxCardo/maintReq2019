
const request = require('request-promise');

const hook = 'TBL7CG7L1/BFWT14J58/UFV18ef9FDbMrPbFfgFVc4Mr';

// post to slack

const postSlack = (record) => {
  const slackBody = {
    text: 'test slack entry from node.js',
  }

  request({
    url:`https://hooks.slack.com/services/${hook}`,
    method: 'POST',
    body: slackBody,
    json:true
  })
}

module.exports = {postSlack};
