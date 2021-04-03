const fs = require("fs");

let pendingpromise1 = fs.promises.readFile("./f1.txt");
let pendingpromise2 = fs.promises.readFile("./f2.txt");
let pendingpromise3 = fs.promises.readFile("./f3.txt");

pendingpromise1.then(function(data){
console.log(data +" ");
});

pendingpromise2.then(function(data){
    console.log(data +" "); 
    });
    
pendingpromise3.then(function(data){

    console.log(data +" ");
    
    });
    