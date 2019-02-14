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
