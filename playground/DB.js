const {getVendor} = require('./../server/DB/dbConnect');
var serviceType = 'General_Maintenance';
var location = '';


getVendor(location, serviceType).then((value) => {
  console.log('value from testDB');
})
