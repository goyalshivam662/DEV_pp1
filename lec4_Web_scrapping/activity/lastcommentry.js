const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

request(url ,cb);

function cb(error,response,body){

parseBody(body);
}


function parseBody(html){

let ch = cheerio.load(html);

let data =  ch('div[itemprop="articleBody"]>p');
let finaldata = ch(data['0']).text();
console.log(finaldata);
}