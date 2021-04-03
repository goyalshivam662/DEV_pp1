// const num = 5;
// console.log(num + 5);
// let a = 6;
// a = a + num;
// console.log(num - a);
// ans  --> 10
//         > -6

// let a = 2;
// {
//   let a = 3;
//   {
//     let a = 4;
//     {
//       let a = 5;
//       console.log(a);
//     }
//     console.log(a);
//   }
//   console.log(a);
// }
// console.log(a);
// ans 5 4 3 2

let obj = {"concept":""};


console.log(
    JSON.parse(
    JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12) ).concept
);

function cb( ){


}
