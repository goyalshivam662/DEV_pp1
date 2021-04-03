const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

// get detail of one match

 function getmatche(link){
 request(link, cb);
 }


// url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" ;


// request(url ,cb);

function cb(error,response,body){

    parseData(body);
}

function parseData(html){
 
    let ch = cheerio.load(html+"");
    let bothinnings = ch('.Collapsible');
 //  fs.writeFileSync("./raja.html",bothinnings+"");  
   for(let i = 0 ;i < bothinnings.length ;i++){
       
 let inning  = ch(bothinnings[i+""]);  // (batsman - bowler inning kkr )==> (batsman-bowler inning rri)
     
     let teamname = inning.find("h5").text() ;
      teamname =   teamname.split("INNINGS");
      teamname = teamname['0'].trim();
    console.log(teamname);
       let batmantable = inning.find('.table.batsman');
       let alltrs = batmantable.find("tbody tr");
     for(let j = 0 ; j < alltrs.length ;j++){

        let alltds = ch(alltrs[j+""]).find("td");
      if(alltds.length > 1){

        let batsmanname = ch(alltds['0']).text() ;
        let runs = ch(alltds['2']).text() ;
        let balls = ch(alltds['3']).text() ;
        let fours = ch(alltds['5']).text() ;
        let sixs = ch(alltds['6']).text() ;
        let strikerate = ch(alltds['7']).text() ;
   processbatsmanfile(batsmanname,teamname,runs ,balls,fours,sixs,strikerate);
 }//if
 } //trs
    
    console.log("________________new team");

   } // bothinnings
 
}

function checkteamfolder(teamname){
let teampath = `./IPL/${teamname}`;
return fs.existsSync(teampath);

}
function checkbatsmanfile(batsmanname,teamname,runs ,balls,fours,sixs,strikerate){
  let teampathbatsman = `./IPL/${teamname}/${batsmanname}.json`;
  return fs.existsSync(teampathbatsman);
}
 function filebatsmanupdate(batsmanname,teamname,runs ,balls,fours,sixs,strikerate){
  let teampathbatsman = `./IPL/${teamname}/${batsmanname}.json`;
  let stringified =  fs.readFileSync(teampathbatsman);

  let batsmanfile  = JSON.parse(stringified);
  let innnngs ={
   
    Runs : runs,
    Balls : balls,
    Four : fours,
    Sixs : sixs,
    Strikerate : strikerate

   }

   batsmanfile.push(innnngs);

 fs.writeFileSync(teampathbatsman, JSON.stringify(batsmanfile));


 }
function createbatsmanfile(batsmanname,teamname,runs ,balls,fours,sixs,strikerate)
{ 
  let teampathbatsman = `./IPL/${teamname}/${batsmanname}.json`;
   let batsmanfile = [ ];
   let innnngs ={
   
    Runs : runs,
    Balls : balls,
    Four : fours,
    Sixs : sixs,
    Strikerate : strikerate

   }

   batsmanfile.push(innnngs);
   fs.writeFileSync(teampathbatsman, JSON.stringify(batsmanfile));  //[object] ==> [ {}]

}
function createteamfolder(teamname){
  let teampath = `./IPL/${teamname}`;
  fs.mkdirSync(teampath);

}


function  processbatsmanfile(batsmanname,teamname,runs ,balls,fours,sixs,strikerate){
let isfolder = checkteamfolder(teamname);
if(isfolder){
let isbatsfile = checkbatsmanfile(batsmanname,teamname);
if(isbatsfile){

  filebatsmanupdate(batsmanname,teamname,runs ,balls,fours,sixs,strikerate);
}else{
createbatsmanfile(batsmanname,teamname,runs ,balls,fours,sixs,strikerate);

}

}else{
 createteamfolder(teamname); 
createbatsmanfile(batsmanname,teamname,runs ,balls,fours,sixs,strikerate);

}


} //

module.exports = getmatche;