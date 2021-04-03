let fs = require("fs");
let extensions = require("./utility.js");
let content = "./shivam/goyal";
let folderName = "mp4";

console.log(content.split("/"));
if(extensions.hasOwnProperty(folderName)){
    
    console.log("yes");
  }else{
  console.log("no");
}