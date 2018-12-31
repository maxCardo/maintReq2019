/*jshint esversion:6*/


// TODO: add data validation to form
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// vaidation vid https://www.youtube.com/watch?v=cZVO8IWkFtg

function pageTurn(from, to) {
  document.getElementById(from).style.display = "none";
  document.getElementById(to).style.display = "block";
}
