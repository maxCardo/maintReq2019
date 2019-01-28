
// # See:
// # https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
//
// # set environment variables on windows from terminal
// # setx TWLS_ID = "yourid"
// # setx TWL_AUTH_TOKEN  = "yourauthtoken"
// # setx GML_ACCT  = "yourgmailaccount"
// # setx GML_PASS  = "yourgmailpass"
// #
// # set environment vars from gui
// # https://helpdeskgeek.com/how-to/create-custom-environment-variables-in-windows/
// #
// # set environment variables on linux/cygwin from terminal
// # export TWLS_ID="yourid"
// # export TWL_AUTH_TOKEN="yourauthtoken"
// # export GML_ACCT="yourgmailaccount"
// # export GML_PASS="yourgmailpass"
//
// # this block pulls the environment variable from windows/linux

console.log('connected to config file');

const twlsid = process.env.TWLS_ID;
const twlAuthToken = process.env.TWL_AUTH_TOKEN;
const gmlAcct = process.env.GML_ACCT;
const gmlPass = process.env.GML_PASS;
const smtpPass = process.env.SMTP_PASS;
const smtpAcct = process.env.SMTP_ACCT;
const smtpHost = process.env.SMTP_HOST;


module.exports = {twlAuthToken, twlsid, gmlAcct, gmlPass, smtpPass, smtpHost, smtpAcct};
