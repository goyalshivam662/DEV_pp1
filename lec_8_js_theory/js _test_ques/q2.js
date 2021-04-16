//var ==> function scope
//let and const  = blocked scope
let a = 2;
{
  let a = 3;
  {
    let a = 4;
    {
      let a = 5;
      console.log(a);
    }
    console.log(a);
  }
  console.log(a);
}
console.log(a);


// all var ans - 5
//              -5
 //              -5
//               -5
//               -5



// Options: sol - A
// A)  5
//     4
//     3
//     2

// B)  Error

// C)  2
//     3
//     4
//     5

// D)  2
//     2
//     2
//     2