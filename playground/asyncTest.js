
// const async = async () => {
//
//   const answer = () => {
//     return 1+1;
//   };
//   console.log('log 1');
//
//   await setTimeout(() => {
//     console.log('answer1',answer());
//   }, 2000);
//
//    console.log('answer2',answer());
// }
//
// async()


// //callback example
// var cbTest = (callback) => {
//   console.log('first log');
//   setTimeout(callback, 1000);
// }
//
// cbTest(() => {
//   console.log('second log');
// });
//
// console.log('third log');

//promise example

var promTest = new Promise((res,rej) => {
  res('yo yo yo');
})

promTest.then((value) => {
  console.log(value);
})
