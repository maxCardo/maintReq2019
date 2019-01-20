// cron docs: https://www.npmjs.com/package/node-cron

const cron = require('node-cron');

//
// //runs daily at 6:30pm
// cron.schedule(' 30 18 * * *', () => {
//   console.log('run at 6:30p');
// });
//
// //runs every 10 sec
// cron.schedule('*/10 * * * * *', () => {
//   console.log('running a task every minute');
// });


const timeTrigger = (hour, min, callback) => {
  let schedule = `${min} ${hour} * * *`
  cron.schedule(schedule,callback)
};

const intTrigger = (arg, callback) => {
  let schedule = arg;
  cron.schedule(arg, callback)
}

module.exports = {timeTrigger, intTrigger};
