const request = require("request");
let cheerio = require("cheerio");
let obj = require("./allMatches.js"); 
//let getallmatches =  require("./allMatches.js")

url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);
function cb(error,response,body){
parsebody(body);

}

function parsebody(html){

let ch = cheerio.load(html);
 let atag = ch('.widget-items.cta-link a');
 //console.log(atag.attr("href"));
let link = atag["0"]["attribs"]["href"]  ;

// https://www.espncricinfo.com/series/ipl-2020-21-1210595
let completelink = "https://www.espncricinfo.com"+link;
obj.raja(completelink); // getallmatches(completelink);


}
