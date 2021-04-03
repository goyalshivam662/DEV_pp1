const fs = require("fs");


let pending1 = fs.promises.readFile("./f1.txt");

pending1.then(function(data){
console.log(data+"");
let pending2 = fs.promises.readFile("./f2.txt");

pending2.then(function(data){
console.log(data+"");

let pending3 = fs.promises.readFile("./f3.txt");

pending3.then(function(data){
console.log(data+"");
});

});

});

