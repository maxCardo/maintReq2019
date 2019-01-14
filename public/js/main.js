/*jshint esversion:6*/
let page = 1;
// TODO: add data validation to form
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// vaidation vid https://www.youtube.com/watch?v=cZVO8IWkFtg

//JQuery wrap for object validation and manipulation
$(document).ready(()=>{

  //maint req page turner
  pageTurn = (from, to) => {
    $(`#${from}`).hide();
    $(`#${to}`).show();
  };

  $('#property').change(()=>{
    $('#property').val() === "Other" ? $('#othAddress').show() : $('#othAddress').hide();
  });

  $('#next').click(()=>{
    $('#back').show();
    if(page === 2){
      $('#next').hide();
      $('#submit').show();
    };
    $(`#p${page}`).hide();
    $(`#p${++page}`).show();
  });

  $('#back').click(()=>{
    $('#next').show();
    switch(page){
      case 2:
        $('#back').hide();
        break;
      case 3:
        $('#submit').hide();
        break;
    };
    $(`#p${page}`).hide();
    $(`#p${--page}`).show();
  });
  
  $(() => {
    var isMouseDown = false;
    $("#availability td")
      .mousedown(()=> {
        isMouseDown = true;
        $(this).toggleClass("highlighted");
        return false;
      }).mouseover(() => {
        if (isMouseDown) {
          $(this).toggleClass("highlighted");
        };
      }).bind("selectstart",() => {
        return false;
      });

      $(document).mouseup(() => {
        isMouseDown = false;
      });
  });
});

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
