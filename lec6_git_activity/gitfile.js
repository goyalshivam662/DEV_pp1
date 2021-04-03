let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

let url ="https://github.com/topics";
request(url,cb);

function cb(error,response,body){

    parsebody(body);
}
function parsebody(html){

    let ch = cheerio.load(html);
    let allATags = ch('.topic-box a');
    for(let i=0 ; i<allATags.length ; i++){
        let topicLink = ch(allATags[i]).attr("href");
        let completeTopicLink = "https://www.github.com"+topicLink;
        parsetopic(completeTopicLink);
    }
     
}

 function parsetopic(topiclinks){

   request(topiclinks, topicpage);    // git
 }

 function topicpage(error , response , data){
 let ch = cheerio.load(data);
 let topicname = ch('.h1-mktg').text().trim();
 // console.log(topicname);
 // get topic name  - like git 
if(!fs.existsSync(`./${topicname}`)){

  fs.mkdirSync(`./${topicname}`); 

 }
 
   let allprojectsArticles = ch('.border.rounded.color-shadow-small.color-bg-secondary.my-4');
   
  // console.log(allprojectsArticles);
   for(let i=0 ; i < 5 ;i++){
    
    workonsingleproject(allprojectsArticles[i+""],topicname);
   }

}
   
function workonsingleproject(projectaritclestags,topicname){
let projectname = cheerio(projectaritclestags).find('a.text-bold').text().trim();
   
    let allnavtags = cheerio(projectaritclestags).find('.tabnav-tabs a');
    let issuelink =  cheerio(allnavtags["1"]).attr("href");
    let completeissuelink =  "https://github.com" + issuelink;
  
     let projectpath = `./${topicname}/${projectname}` ;
     if(!fs.existsSync(projectpath)){
     fs.mkdirSync(projectpath);

    }
        request(completeissuelink, parseIssue);

        function parseIssue(error , response ,data){
          // now you are on issue page of a single project !!!!
          let ch = cheerio.load(data);
          let allIssuesATags = ch('.js-navigation-container.js-active-navigation-container .js-issue-row .flex-auto a.h4');
          for(let i=0 ; i<allIssuesATags.length ; i++){
              let issueName = ch(allIssuesATags[i+""]).text().trim();
              let issueLink = ch(allIssuesATags[i+""]).attr("href");
              issueLink = "https://www.github.com"+issueLink;
              if(!fs.existsSync(`${projectpath}/issues.json`)){
                  fs.writeFileSync(`${projectpath}/issues.json` , JSON.stringify([]));
              }
              else{
                  let issues = JSON.parse(fs.readFileSync(`${projectpath}/issues.json`));
                  let newIssue = {
                      "Issue Name":issueName,
                      "Issue Link":issueLink
                  }
                  issues.push(newIssue);
                  fs.writeFileSync(`${projectpath}/issues.json` , JSON.stringify(issues));
              }
          }
      }
  }