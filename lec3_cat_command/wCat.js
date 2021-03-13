let content = process.argv.slice(2);
let fs = require("fs");

let files = [];
let flags = [] ;

for(let i=0 ;i<content.length;i++){

    if(content[i].startsWith('-')){
        flags.push(content[i]);
    }else{
        files.push(content[i]);
    }
}


// for files output
let fileKaData = "";
for(let i=0 ; i< files.length ; i++){
    // f1.txt => f2.txt
    fileKaData = fileKaData + fs.readFileSync( files[i] )  ;
}

console.log(fileKaData);













