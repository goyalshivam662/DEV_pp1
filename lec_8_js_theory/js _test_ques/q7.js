// let a = "This only works if and only if";

// let b = a.slice(a.indexOf("only"));

// let c = b.lastIndexOf("only");

// b[c] = "i";

// console.log(a);
// console.log(b);

// Options: 
// A)
// Error

// B)
// This only works if and only if
// only works if and only if

// C)
// This only works if and only if
// only works if and inly if

// D)
// This only works if and only if
// This only works if and only if

let a = "This only works if and only if";

 let b = a.slice(a.indexOf("only"));

 let c = b.lastIndexOf("only");
 //18


 b[c] = "i";
// not allow strings are immutable
 console.log(a);
console.log(b);
console.log(c);