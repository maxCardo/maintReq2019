/*jshint esversion:6*/


// TODO: add data validation to form
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// vaidation vid https://www.youtube.com/watch?v=cZVO8IWkFtg

//maint req page turner
function pageTurn(from, to) {
  document.getElementById(from).style.display = "none";
  document.getElementById(to).style.display = "block";
}

// Set date for scheduling
const date = new Date().getTime();
// dfd = days from date
document.getElementById('serviceDate').value = date;
function getDate(dfd) {
  return moment(date).add(dfd, 'd').format('dddd:  MMM Do');
};

for (var i = 1; i < 8; i++) {
  document.getElementById(`day${i}`).innerHTML = getDate(i);
}
