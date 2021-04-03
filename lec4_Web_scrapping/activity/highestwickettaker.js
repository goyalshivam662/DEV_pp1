//"https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard"

const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
 let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-sunrisers-hyderabad-qualifier-2-1237180/full-scorecard " ;

request(url,cb);

function cb(error ,response,body){

parseBody(body);

}

let highestwickettaker = {} ;


function parseBody(html){
let highestwicket = 0;
let highestwicketname;
let economy;
    
   let ch = cheerio.load(html);
  let Bothbowlertabledata = ch('.Collapsible .table.bowler');
  // { 0: {} ,1: {}  }

for(let i =0 ;i<Bothbowlertabledata.length ; i++){

       let bowlwertable = ch(Bothbowlertabledata[`${i}`]);  
       let alltrs  = ch(bowlwertable).find("tbody tr");

       // { 0:{}, 1:{}, ... 6:{} }
     for(let j=0 ;j< alltrs.length ;j++){
         let alltds = ch(alltrs[j]).find("td");
   // 0 tds, 4 tds, 5tds of one person
     let wickets = ch(alltds['4']).text();
     if(highestwicket < wickets){
     highestwicket = wickets;
    highestwicketname = ch(alltds['0']).text();
    economy= ch(alltds['5']).text();
     }
     } //j


}//for table 1 =>2

 highestwickettaker.name = highestwicketname;
 highestwickettaker.wicket =  highestwicket;
 highestwickettaker.ecomy =  economy; 
 console.log(highestwickettaker);
  }  // parsebody
