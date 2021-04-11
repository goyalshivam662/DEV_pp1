const request = require("request");
const cheerio = require("cheerio");
const getmatche = require("./match.js");
function getallmatches(link)
{
    request(link,cb);
}

function cb(error,response,body){

parsedata(body);

}

function parsedata(html)
{

    let ch = cheerio.load(html);
    let alltags = ch('a[data-hover= "Scorecard"]');
 // 0:{}, 1:{} , .... 60:{}
 for(let i=0 ;i<alltags.length;i++){
      let link = alltags[i];
      let scorelinks ="https://www.espncricinfo.com"+ ch(link).attr("href");
      getmatche(scorelinks);
 }
    


}

//module.exports = getallmatches;
module.exports.raja = getallmatches;
