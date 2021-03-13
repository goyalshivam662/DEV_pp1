const fs = require('fs');
const path = require('path');
let folderPath = "./../../demo";
let extent = require("./utility.js");
let extfolderpath ;

 


function checkfolder(extension){
// check extension ka ==> already folder exist or not
//.pdf
 extfolderpath = folderPath;
for(let key in extent){
// Images -> Audio
if(extent[key].includes(extension)){

 //extfolderpath = folderPath +"/"+ key; 
  // also write using string interpolation
 extfolderpath = `${folderPath}/${key}`; // ===>   ./downloads/Images
   break;
}

}//looop
return  fs.existsSync(extfolderpath);
}


/// 
function createfolder(){

fs.mkdirSync(extfolderpath);
}
//
//

function movefile(filename){
  //copy
let sourcefilepath = `${folderPath}/${filename}`;
let destinationpath = `${extfolderpath}/${filename}`;
fs.copyFileSync(sourcefilepath,destinationpath);
// delete
fs.unlinkSync(sourcefilepath);

}
//
function sortfolder(folderPath){
// get content of folder
 let content = fs.readdirSync(folderPath);
 for(let i=0 ;i<content.length;i++){
  // get gextension of each file like abc.pdf => .pdf
  let extensionname = path.extname(content[i]);

  let isfolder = checkfolder(extensionname);
  if(isfolder){

    movefile(content[i]);

  }else{
  
    createfolder();
    movefile(content[i]);

  }//else
 }
} //


sortfolder(folderPath);