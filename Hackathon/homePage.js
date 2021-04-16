const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const getmobile = require("./mobile.js");
// also put link best phone under - 10000

request('https://gadgets.ndtv.com/mobiles/best-phone-under-15000',cb);

function cb(error,response,body){

    parsedata(body);
}

function parsedata(html){

    let ch  = cheerio.load(html+"");
    let allmobilesTags = ch('a[data-product-category="mobiles"] ');
// create mobilefolder
     let name ="mobilefolder" ;
    let path = `./${name}` ;
    fs.mkdirSync(path);
////////

    for(let i=0;i < allmobilesTags.length ; i++){

        let moblietag  = ch(allmobilesTags[i+""]);

        let singlemobilelink = moblietag.attr("href");
        
        getmobile(singlemobilelink);
    }


}