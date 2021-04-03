const fs = require("fs");


 let pendingpromise = fs.promises.readFile("./f2.txt");
console.log(pendingpromise);

pendingpromise.then(function(data){

    console.log("then 1 ");
    console.log(data+"");
    console.log(pendingpromise);

});


pendingpromise.then(function(data){
console.log("then 2");
console.log(data+"");

});

console.log("mein phele chaluga");