/*jshint esversion: 6 */
const url = window.location.search.substring(1).split('&');
const utmObj = {};

for (let i = 0; i < url.length; i++) {
  let params = url[i].split('=');
  let key = params[0];
  let value = params[1].replace('%20', ' ');
  utmObj[key] = value;
}

console.log('utmObj', utmObj);

const availArr = utmObj.sav.replace(/,/g,"").split("");
console.log('availArr',availArr);
const date = parseInt(utmObj.sd, 10);
const timeSlots = ['','Morning (8am-11am)', 'Afternoon (12pm-4pm)', 'Evening (4pm-8pm)' ]

function getDate(dfd) {
  return moment(date).add(dfd, 'd').format('ddd: MMM Do');
};
var record = '';
for (var i = 0; i < availArr.length; i+= 2) {
  var ii = i+1;
  record += `<label class="radio-inline"><input type="radio" required name="optradio" value=${availArr[i]+availArr[ii]}><b>${getDate(availArr[i])}:</b> in the ${timeSlots[availArr[ii]]}</label><br>`

}
document.getElementById(`avail1`).innerHTML = record;
document.getElementById('_id').value = utmObj.sid;
document.getElementById('serviceDate').value = utmObj.sd;
