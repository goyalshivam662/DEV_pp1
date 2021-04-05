const fs = require("fs");
let file = ["./f1.txt","./f2.txt","./f3.txt"] ;

let pendindPromisearray = [ ];
for(let i=0 ;i <file.length;i++){

let pendingpromise = fs.promises.readFile(file[i]);
//   pendingpromise.then(function(data){
//     console.log(data+""); 
//   })
pendindPromisearray.push(pendingpromise);

}


let sbkpromise = Promise.all(pendindPromisearray);

sbkpromise.then(function(allfilekadata){

console.log(allfilekadata+"");

})