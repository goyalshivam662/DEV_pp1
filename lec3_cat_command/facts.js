//let value = ["shivam ","goyal",24,false]

let content = process.argv.slice(2);
//console.log(content);
let flags = [ ] ;
let files = [] ;

for(let i=0 ;i< content.length;i++){

if(content[i].startsWith('-')){

    flags.push(content[i]);
}else{

files.push(content[i]);

}


}

console.log(flags);
console.log(files);