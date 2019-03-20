let page = 1;
let checked = [];

//JQuery wrap for object validation and manipulation
$(document).ready(()=>{

  //-------------------------------Object validation-------------------------------
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

  //ServiceDiscription = Checks for adequate length
  $('#serviceDiscription').keyup(function(){
    if ($(this).val().length > 15){
      $('#serviceDiscription_e').addClass("valid");
    };
  });

  //------------------------------Pattern Validation---------------------------------
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
      case 'VendorNum':
        pattern = /^([2-9][0-9]{2}[\-]{0,1}){2}[0-9]{4}$/;
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

  //------------------------------Navigation Validation---------------------------------
  //ServiceType = If not selected prevents forward movement
  $('#serviceType').change(function() {
    $('#svcType').val($('#serviceType').val());
    $('#serviceType_e').addClass("valid");
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

  //MaintReq Submission Validation
  $('#maintReq').submit(function() {
    if($('input:checked').length < 3) {
      $(`#p${page}Err`).removeClass("valid");
      return false;
    };
    return true;
  });

  //reqSch/maintResp Submission Validation
  $('#maintResp').submit(function() {
      let valid = $('div[id^=avail]' > $('input[type=radio]:checked')).length > 0;
      console.log(valid);
      if (valid) {
        $('#maintResp').attr('action','/confirmation');
      } else {
        $('SubmitButton_e').removeClass('valid');
      };
  });
});