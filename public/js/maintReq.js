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
const timeSlots = ['','Morning (8:00am-12:00pm)', 'Afternoon (12:00-4:00pm)', 'Evening (4:00-8:00pm)' ]

function getDate(dfd) {
  return moment(date).add(dfd, 'd').format('ddd: MMM Do');
};

for (var i = 0; i < availArr.length; i+= 2) {
  var ii = i+1;
  document.getElementById(`avail1`).innerHTML =
  //`<div id = 'availSlot${availArr[i]}'>${getDate(availArr[i])}:</div>`;
  `<label class="radio-inline"><input type="radio" name="optradio">${getDate(availArr[i])}: in the ${timeSlots[availArr[ii]]}</label><br>`
  // console.log(`${getDate(availArr[i])} at ${timeSlots[availArr[ii]]}`);
}
// // TODO: make time slots show up inline with days.
// for (var i = 0; i < availArr.length; i+= 2) {
//   var ii = i+1
//   var createElem = document.createElement("INPUT");
//   createElem.setAttribute("type", "radio")
//   var textNode = document.createElement(`<label class="radio-inline"><input type="radio" name="optradio">${timeSlots[availArr[ii]]}</label>`)  ;
//   document.getElementById(`availSlot${availArr[i]}`).appendChild(textNode);
// }



document.getElementById('serviceID').innerHTML = utmObj.sid;



// document.getElementById('time1Lable').innerHTML = utmObj.time1;
// document.getElementById('time2Lable').innerHTML = utmObj.time1;
// document.getElementById('time3Lable').innerHTML = utmObj.time1;
// document.getElementById('time1').value = utmObj.time1;
// document.getElementById('time2').value = utmObj.time1;
// document.getElementById('time3').value = utmObj.time1;
