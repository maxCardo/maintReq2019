let page = 1;
let checked = [];

//JQuery wrap for object validation and manipulation
$(document).ready(()=>{
  //Property = Other, new Field Appears
  $('#property').change(function(){
    let addy = $('#property').val();
    if(addy === "Other"){
      $('#address').val('');
      $('#keyedProperty').show();
      $(`#zip`).prop('required', true);
    } else {
      $('#keyedProperty').hide();
      $('#address').val(addy);
      $('#zip').prop('required', false);
    }
  });

  //ServiceType = If not selected prevents forward movement
  $('#serviceType').change(function() {
    $('#svcType').val($('#serviceType').val());
    $('#serviceType_e').addClass("valid");
  });

  //ServiceDiscription = Checks for adequate length
  $('#serviceDiscription').keyup(function(){
    if ($(this).val().length > 15){
      $('#serviceDiscription_e').addClass("valid");
    };
  });

  $(`input:not(:checkbox)`).blur(function(event){
    let id = $(this).prop('id');
    let eMsg = $(`#${id}_e`);
    let val = $(this).val();
    let pattern;

    if(val.length === 0 && eMsg.addClass("valid")) return;
    switch (id){
      case 'fname':
        pattern = /^[a-z][a-z ]+$/i;
        break;
      case 'lname':
        pattern = /^[a-z][a-z\-]*[a-z]$/i;
        break;
      case 'phone':
        pattern = /^([2-9][0-9]{2}[\-]){2}[0-9]{4}$/;
        break;
      case 'email':
        pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        break;
      case 'unitNum':
        pattern = /^[a-z0-9]*$/i;
        break;
      case 'address':
        pattern = /^[1-9]+[ ][a-z0-9 \.\-]+$/i;
        break;
      case 'zip':
        pattern = /^[0-9]{5}$/;
        break;
      default:
        break;
    };
    if (pattern.test(val)){
      eMsg.addClass("valid");
      $(`#p${page}Err`).addClass("valid");
    } else {
      eMsg.removeClass("valid");
    };

  });

  //Next Button Logic
  $('#next').click(()=>{
    $(`#p${page}Err`).addClass("valid");
    let valid = true;

    //Flag page as invalid if any required fields are blank
    $(`#p${page} input:required`).each(function(i){
      if(valid && $(this).val().length === 0) valid = false;
    });

    //Flag the page as invalid if any error messages are visible
    $(`#p${page} .err_msg:visible`).each(()=>{
        valid = false;
    });

    if(page == 2) {
      if($.trim($('#serviceDiscription').val()).length < 15) {
        $('#serviceDiscription_e').removeClass("valid");
        valid = false;
      }; 

      if($('#svcType').val() == "") {
        $('#serviceType_e').removeClass("valid");
        valid = false;
      };
    };

    //If validity checks pass, allow the user forward movement
    if (valid) {
      $(`#p${page}Err`).addClass("valid");
      $('#back').show();
      if(page === 2){
        $('#next').hide();
        $('#submit').show();
      };
      $(`#p${page}`).hide();
      $(`#p${++page}`).show();
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
  $('#maintReq').submit(function() {
    if($('input:checked').length < 3) {
      $(`#p${page}Err`).removeClass("valid");
      return false;
    };
    return true;
  });
  
  // //Drag select mouse behavior on table
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
