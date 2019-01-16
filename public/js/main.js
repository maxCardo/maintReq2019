/*jshint esversion:6*/
let page = 1;
// TODO: add data validation to form
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// vaidation vid https://www.youtube.com/watch?v=cZVO8IWkFtg

//JQuery wrap for object validation and manipulation
$(document).ready(()=>{

  //Property = Other, new Field Appears
  $('#property').change(()=>{
    $('#property').val() === "Other" ? $('#keyedProperty').show() : $('#keyedProperty').hide();
  });

  $("input[name = 'avail']").change(()=>{
    $('#p3Err').addClass("valid");
  });

  $(`input`).blur(function(event){
    let name = $(this).prop('name');
    let eMsg = $(`[name=${name}_e]`);
    let val = $(this).prop('value');
    let pattern;
    if(val.length === 0) return;
    switch (name){
      case 'fname': 
        pattern = /^[a-z][a-z ]+$/i;
        break;
      case 'lname':
        pattern = /^[a-z][a-z\-]*[a-z]$/i;
        break;
      case 'phone':
        pattern = /^([2-9][0-9]{2}[-]){2}[0-9]{4}$/;
        break;
      case 'email':
        pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        break;
      case 'property':
        console.log(val);
      default:
        return;
      };
      if (!pattern.test(val)){
        eMsg.removeClass("valid");
      } else {
        eMsg.addClass("valid");
        $(`#p${page}Err`).addClass("valid");
      }; 
    });

  //Next Button Logic
  $('#next').click(()=>{
    let valid = true;
    
    var x = () => {};
    
    //Ensure all required fields have a value
    $(`#p${page} input`).each(function(i){
      if($(this).prop('required')) {
        if(!($(this).val())) valid = false;
      };
    });
    
    //Flag the page as invalid if any error messages are visible
    $(`#p${page} .err_msg`).each(function(i){
      if(valid && $(this).is(":visible")) {
        $(`#p${page}Err`).removeClass("valid");
        valid = false;
      } else {
        $(`#p${page}Err`).addClass("valid");
        valid = (valid && true);
      }; 
    });
    
    //If validity checks pass, allow the user forward movement
    if (valid) {
      $('#back').show();
      if(page === 2){
        $('#next').hide();
        $('#submit').show();
      };
      $(`#p${page}`).hide();
      $(`#p${++page}`).show();
      valid = false;
    } else {
      $(`#p${page}Err`).removeClass("valid");
    };
  });

  //Back Button Logic
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
  
  //Submission Validation
  $('#submit').click(()=>{
    console.log($('#avail').length);
    $('#avail').length > 0 ? $('#maintReq').attr('action', '/form') : $('#p3Err').removeClass("valid");
  });

  //Drag select mouse behavior on table
  /*
  $(() => {
    let isMouseDown = false;
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
  });*/
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
