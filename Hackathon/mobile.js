const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

 function getmobile(link){
 
     request(link ,cb);
 }

//request('https://gadgets.ndtv.com/xiaomi-redmi-note-10-price-in-india-100480',cb)
function cb(error ,response,data){

    parseBody(data);
}

function parseBody(html){

    let ch = cheerio.load(html+"");
    let movbilecontentdiv = ch('._st-wrp ._gry-bg._spctbl._ovfhide');
   let alltrs = ch(movbilecontentdiv['0']).find('tbody tr');
   
   let rhside = [];
    for(let i=0 ;i< alltrs.length ;i++){
   let alltds = ch(alltrs[i+""]).find("td");
   let lhs = ch(alltds['0']).text().trim();
   let rhs = ch(alltds['1']).text().trim(); 
   rhside.push(rhs);
  }

  
let obj = {
    Brand : "",
    Model :"",
    PriceinIndia: "",
    Release_date: "",
    Launched_in_India : "",
    Form_factor :"",
    Dimensions : "" ,
    Weight: "" ,
    Battery_capacity :"",
    Fast_charging : "",
    Colours :"",

}

    obj.Brand = rhside[0];
    obj.Model= rhside[1];
    obj.PriceinIndia = rhside[2];
    obj.Release_date= rhside[3];
    obj.Launched_in_India= rhside[4];
    obj.Form_factor = rhside[5];
    obj.Dimensions = rhside[6];
    obj.Weight = rhside[7];
    obj.Battery_capacity = rhside[8];
    obj.Fast_charging = rhside[9];
    obj.Colours = rhside[10];

    

    
let isfile = checkfile(obj);
if(isfile){

    upadatefile(obj);

}else{

    createfile(obj);
}


function checkfile(obj){

  let mobliefilepath = `./mobilefolder/${obj.Brand}.json` ;
  return fs.existsSync(mobliefilepath); 
}

function createfile(obj){
let mobliefilepath = `./mobilefolder/${obj.Brand}.json` ;
let mobilefile = [];
let mobilecontent = {
    Brand : obj.Brand,
    Model : obj.Model,
    PriceinIndia: obj.PriceinIndia,
    Release_date: obj.Release_date,
    Launched_in_India : obj.Launched_in_India,
    Form_factor : obj.Form_factor,
    Dimensions : obj.Dimensions ,
    Weight: obj.Weight,
    Battery_capacity : obj.Battery_capacity,
    Fast_charging : obj.Fast_charging,
    Colours : obj.Fast_charging,
} // mobilecontent []

mobilefile.push(mobilecontent);

let stringfiedata = JSON.stringify(mobilefile);
fs.writeFileSync(mobliefilepath,stringfiedata);
} //createfile()

function upadatefile(obj){

    let mobliefilepath = `./mobilefolder/${obj.Brand}.json` ;
    let stringfiedata =  fs.readFileSync(mobliefilepath);
    let mobilefile = JSON.parse(stringfiedata);
    let mobilecontent = {
        Brand : obj.Brand,
        Model : obj.Model,
        PriceinIndia: obj.PriceinIndia,
        Release_date: obj.Release_date,
        Launched_in_India : obj.Launched_in_India,
        Form_factor : obj.Form_factor,
        Dimensions : obj.Dimensions ,
        Weight: obj.Weight,
        Battery_capacity : obj.Battery_capacity,
        Fast_charging : obj.Fast_charging,
        Colours : obj.Fast_charging,
    } // mobilecontent []
    mobilefile.push(mobilecontent);

    let upadtaestringfiedata = JSON.stringify(mobilefile);
    fs.writeFileSync(mobliefilepath,upadtaestringfiedata);
}

} //parseBody()

module.exports = getmobile ;

// Brand	Xiaomi
// Model	Redmi Note 10
// Price in India	₹11,999
// Release date	4th March 2021
// Launched in India	Yes
// Form factor	Touchscreen
// Dimensions (mm)	160.46 x 74.50 x 8.30
// Weight (g)	178.80
// Battery capacity (mAh)	5000
// Fast charging	Proprietary
// Colours





 

