
// # Setting Env_vars on a local machine
// # https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
//
// # Windows:
// # setx TWLS_ID = "yourid"
// # setx TWL_AUTH_TOKEN  = "yourauthtoken"
// # setx GML_ACCT  = "yourgmailaccount"
// # setx GML_PASS  = "yourgmailpass"
// # Restart machine
// #
// # GUI:
// # https://helpdeskgeek.com/how-to/create-custom-environment-variables-in-windows/
// #
// # Mac(linux)/Cygwin
// # In terminal, type 'nano .bash_profile'
// # Add these lines:
// # export TWLS_ID="yourid"
// # export TWL_AUTH_TOKEN="yourauthtoken"
// # export GML_ACCT="yourgmailaccount"
// # export GML_PASS="yourgmailpass"
// # Hit ctrl+x, then y to save, followed by enter to confirm file name
// # Close and reopen terminal
// # Type printenv in terminal to ensure the vars have been properly set
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
const host = process.env.APP_HOST;


module.exports = {twlAuthToken, twlsid, gmlAcct, gmlPass, smtpPass, smtpHost, smtpAcct, host};
