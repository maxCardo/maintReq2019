let page = 1;

//JQuery wrap for object validation and manipulation
$(document).ready(()=>{
  //Property = Other, new Field Appears
  $('#property').change(()=>{
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

  $(`input`).change(function(event){
    let name = $(this).prop('name');
    let eMsg = $(`[name=${name}_e]`);
    let val = $(this).prop('value');
    let pattern;

    if(val.length === 0 && eMsg.attr('class') === "valid") return;
    switch (name){
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
        return;
    };
    if (pattern.test(val)){
      eMsg.addClass("valid");
      $(`#p${page}Err`).addClass("valid");
    } else {
      eMsg.removeClass("valid");
    };

  });

  $(`#serviceDate`).bind('change',()=>{
    console.log($(this).val);
    if($(this).val() > 2){
      $(`#submit`).data('valid',true);
    } else {
      $(`#submit`).data('valid',false);
    };
  });

  //Next Button Logic
  $('#next').click(()=>{
    let valid = true;

    //Flag page as invalid if any required fields are blank
    $(`#p${page} input:required`).each(function(i){
      if(valid && $(this).val().length === 0) valid = false;
    });

    //Flag the page as invalid if any error messages are visible
    $(`#p${page} .err_msg:visible`).each(()=>{
        valid = false;
    });

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
  $('#submit').bind('change', ()=> {
    console.log($(this));
    console.log($(this).data('valid'));
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
