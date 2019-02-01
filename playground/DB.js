const DB = require('./../server/DB/dbConnect');
var serviceType = 'General_Maintenance';
var location = '';

//
// DB.getVendor(location, serviceType).then((value) => {
//   console.log('value from testDB');
// })

DB.getServiceOrder('5c5439d47d184e2eb85aa346').then((value) => console.log(value));
