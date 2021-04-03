const fs = require("fs");


function ApnaPromise(filepath){
 return new Promise(function(resolve,reject){
      fs.readFile(filepath,function(error,data){
        //    if(error)
        //    { reject(error);}
        //    else
        //      { resolve(data);}

     if(data){
         //data of file get
         //resolve will invoke scb;
         resolve(data);
     }else{
         // data failed
         // reject  will invoke fcb;
         reject(error);
     }

        
         }) // read

    }); // promise

}// anpna


//fs.promises.readFile("./f1.txt");
let pendingpromise = ApnaPromise("./f2.txt");

pendingpromise.then(function(data){
console.log(data+"");

})
pendingpromise.catch(function(error){

console.log(error);
})
    