let fs = require("fs");
let files =["./f1.txt","./f2.txt","./f3.txt"];
let idx = 0 ;

 function getcontent(idx){

    if(idx == files.length){
        return;
    }

    fs.readFile(files[idx],function(error , data){
    console.log(data +"");
    
    getcontent(idx+1);

    });
    
}

getcontent(0);