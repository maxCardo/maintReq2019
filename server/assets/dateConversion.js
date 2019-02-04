var moment = require('moment');

getSchDate = (serviceDate, schDate ) => {
  if (schDate === 'vendorToContact') {
    return 'Vendor will contact you directly to schedule service.'
  }
  const dateInt = parseInt(serviceDate,10);
  const schArr = schDate.split("");
  const timeArr = ['','Morning (8am-11am)', 'Afternoon (12pm-4pm)', 'Evening (4pm-8pm)' ];
  const formatDate = moment(dateInt).add(schArr[0], 'd').format("dddd MMM Do");

  return `${formatDate} in the ${timeArr[schArr[1]]}`;
}

module.exports = {getSchDate};
