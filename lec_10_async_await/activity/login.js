const puppeteer = require("puppeteer");
let  em = "fetodok752@ddwfzp.com" ;
let ps = "09876543";

(async function(){
    let browser = await puppeteer.launch({
    
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"],
       // slowMo : 100
    });
    let allpages = await browser.pages();
    let tab = allpages[0];
  await  tab.goto("https://www.hackerrank.com/auth/login");
  await   tab.type("#input-1",em);
  await  tab.type("#input-2",ps);
  await  tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
  await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
})();


