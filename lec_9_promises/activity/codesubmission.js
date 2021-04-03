// name= raja Goyal
const puppeteer = require("puppeteer");
let  em = "fetodok752@ddwfzp.com" ;
let ps = "09876543";
let tab ;
let idx;
let gcode ;
  //  all function of pupppter is promified give pending promise 

// open new browser instance
let browseropenPromise = puppeteer.launch({
    
    headless : false,
    defaultViewport : null,
    args : ["--start-maximized"],
   // slowMo : 100
});

browseropenPromise.then(function(browser){

console.log("browser open !!");
let allpromisepages = browser.pages();
return allpromisepages;
})

.then(function(pages){
 tab = pages[0];
 let pageopenpromises =   tab.goto("https://www.hackerrank.com/auth/login");
return pageopenpromises;

})

.then(function(){
let idtypePromise = tab.type("#input-1",em);
return idtypePromise;

})
.then(function(){

   let pstypePromise = tab.type("#input-2",ps);
   return pstypePromise; 
})
.then(function(){

    let logintypePromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return logintypePromise;
    // nagivation pages - tab.click
 })

//   .then(function(){
//  let waitpromise = tab.waitForSelector('#base-card-1-link',{visible : true});
//  return waitpromise;

//  })

// .then(function(){

//     let intkitpromise = tab.click('#base-card-1-link');
//     return intkitpromise;
// })
.then(function(){

    let waitandclickpromise = waitAndClick('#base-card-1-link');
    return waitandclickpromise;
    })

// .then(function(){

//     let waitpromise = tab.waitForSelector('a[data-attr1="warmup"]',{visible : true});
// return waitpromise;
// })
// .then(function(){

//     let warmpromise = tab.click('a[data-attr1="warmup"]');
// return warmpromise ;
// })
.then(function(){

    let waitandclickpromise = waitAndClick('a[data-attr1="warmup"]');
    return waitandclickpromise;
    })

  .then(function(){
      let waitpromise = tab.waitForSelector('.js-track-click.challenge-list-item',{visible : true});
      return waitpromise;

  })  

  .then(function(){
let allquesAtag = tab.$$('.js-track-click.challenge-list-item');
return allquesAtag;
  })

.then(function(allQuesTags){
let allLinkpromise = [];
for(let i=0 ;i< allQuesTags.length ;i++){
let aTag = allQuesTags[i];
let linkpromise = tab.evaluate(function(elem){

    return elem.getAttribute("href");
} , aTag) ;
allLinkpromise.push(linkpromise);
}

let sbklinkpromise = Promise.all(allLinkpromise);
return sbklinkpromise;
//
})
.then(function(allLinks){
    // [link ,link,link]
    let completelinks = allLinks.map(function(link){
        return "https://www.hackerrank.com"+link;
    });
 // console.log(completelinks);
 let onequespromise = solveQuestion(completelinks[0]);

 return onequespromise;
})


 .then(function(){
     console.log("one question solved successfully");
 })

.catch(function(error){

console.log(error);

})


function solveQuestion(qlink){
return new Promise(function(resolve,reject){
//
let gotopromise = tab.goto(qlink);
gotopromise.then(function(){

    let waitandclickpromise = waitAndClick('div[data-attr2="Editorial"]');
    return waitandclickpromise;
})
.then(function(){

    let codePromise = getcode();
    return codePromise;
})
.then(function(){
let pasetcodePromise = pastecode();
return pasetcodePromise;

})
.then(function(){
let clicksubmitcodepromise = tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
return clicksubmitcodepromise;
})
.then(function(){
    resolve();
})
.catch(function(error){
reject(error);
})
//
}) //new promise

} // solveQuestion()


/// apna promisefied  function  waitAndClick

function waitAndClick(selector)
 {   
        return new Promise(function (resolve,reject){
                     ///
                   //apna code
               let waitpromise = tab.waitForSelector(selector,{visible : true});
               waitpromise.then(function(){
               let clickpromise = tab.click(selector);
               return clickpromise ;
               })
              .then(function(){
               // wait and click sucessfully done
               resolve();  // resolve function  call the scb of the next then function 
               })
               .catch(function(){
               reject(); // reject function call the fcb of the catch();
 
               })

                  ///
        }); //constructor function

}  //function end


function getcode(){
return new Promise(function(resolve,reject){
let waitpromise = tab.waitForSelector('.hackdown-content h3');
  waitpromise.then(function(){
 let allcodelementPromise =  tab.$$('.hackdown-content h3');
 return allcodelementPromise;
  })
.then(function(allcodeElements){

   let allcodeNamePromise = [];
    for(let i=0;i< allcodeElements.length;i++){

 let codeNamePromise = tab.evaluate( function(elm){  return elm.textContent;   },allcodeElements[i]);
 allcodeNamePromise.push(codeNamePromise);
    }
let sbkPromise = Promise.all(allcodeNamePromise);
return sbkPromise;

})
.then(function(codeNames){
  
for(let i=0 ;i< codeNames.length ;i++)
{
 if(codeNames[i] == 'C++'){
     idx = i;
     break;
 }
} 

let allcodedivPormise = tab.$$('.hackdown-content .highlight'); 
return allcodedivPormise;
})
.then(function(allcodediv){

 let codePromise = tab.evaluate( function(elem){ return elem.textContent;
  },allcodediv[idx]);

  return codePromise;
})
.then(function(code){
 gcode = code;
 resolve();
})
.catch(function(error){
    reject(error);
})


}) // promise

} // getcode

function pastecode(){
return new  Promise(function(resolve,reject){

let problemclickpromise = tab.click('div[data-attr2="Problem"]');
 problemclickpromise.then(function(){
let waitForSelec = waitAndClick('.custom-input-checkbox');
return waitForSelec;
 })
.then(function(){
    let waittextboxpromise = tab.waitForSelector('.custominput');
    return waittextboxpromise;
})

.then(function(){

    let codetypepromise = tab.type('.custominput',gcode);
    return codetypepromise;
})
.then(function(){
    let controlkeydownpromise = tab.keyboard.down("Control");
    return controlkeydownpromise;
})
.then(function(){
    let Xkeypromise = tab.keyboard.press("A");
    return Xkeypromise;
})
.then(function(){
    let Xkeypromise = tab.keyboard.press("X");
    return Xkeypromise;
})
.then(function(){
    let clickoncodeboxpromise = tab.click('.monaco-editor.no-user-select.vs');
    return clickoncodeboxpromise;
})

.then(function(){
    let Akeypromise = tab.keyboard.press("A");
    return Akeypromise;
}).then(function(){
    let Vkeypromise = tab.keyboard.press("V");
    return Vkeypromise;
})
.then(function(){
    let controlkeyuppromise = tab.keyboard.up("Control");
    return controlkeyuppromise;
})
.then(function(){
resolve();
})
.catch(function(error){
reject(error);

})

}) // new promise

} //pastecode()