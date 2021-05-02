let filtercolors = {
   "pink":"#FFB6C1",
   "blue":"#17c0eb",
   "green":"#32ff7e",
   "black":"#000000"
};

let ticketcontainer = document.querySelector(".tickets-container") ;
let openmodalbtn = document.querySelector(".open-modal");
let closemodalbtn =  document.querySelector(".close-ticket");
let selectedfilter ="black";


closemodalbtn.addEventListener("click",handleclosemodal);

function handleclosemodal(){

   if(document.querySelector('.modal')){
      document.querySelector('.modal').remove();
   }
}

function loadtickets(){
if(localStorage.getItem('allTickets')){

   let allTickets =  JSON.parse(localStorage.getItem('allTickets'));
   ticketcontainer.innerHTML = "";
   for(let i=0 ;i< allTickets.length ;i++){

      let {ticketId, ticketFilter,ticketContent} = allTickets[i];
      let ticketdiv =  document.createElement("div");
      ticketdiv.classList.add("ticket");
      ticketdiv.innerHTML = `<div class = "ticket-filter ${ticketFilter}"></div>
      <div class = "ticket-info">
       <div class = "ticket-id">#${ticketId}</div>
       <div class="ticket-delete" >
       <i class="fas fa-trash-alt" id =${ticketId}></i>
       </div>
     </div>
      <div class= "ticket-content">${ticketContent}</div>`

      ticketdiv.querySelector(".ticket-delete i").addEventListener("click",handleticketdelete);
      ticketdiv.querySelector(".ticket-filter").addEventListener("click", Toggleticketfilter);
      ticketcontainer.append(ticketdiv);   
   }// for end


}

} // loadticket function end 

loadtickets();
// by default selected filter cour of ticket 

function Toggleticketfilter(e){
   let filter = ["pink","green","blue","black"];
    let currentfilter = e.target.classList[1];
    let idx = filter.indexOf(currentfilter);
    idx++;
    idx = idx % filter.length;

 let currentTicket = e.target;
 currentTicket.classList.remove(currentfilter);
 currentTicket.classList.add(filter[idx]);

let allTickets = JSON.parse(localStorage.getItem("allTickets"));
let id = currentTicket.nextElementSibling.children[0].textContent.spilt('#')[1];

for(let i=0 ;i< allTickets.length;i++)
{
   if(allTickets[i].ticketId == id){
      allTickets[i] = filter[idx];
      break;
   }
}

localStorage.setItem("allTickets",JSON.stringify(allTickets));
}

 function handleticketdelete(e){
 let ticketdeleteid = e.target.id;
 let allTickets =  JSON.parse(localStorage.getItem("allTickets"));
 let filteredtickets = allTickets.filter(function(ticketobject){
    return ticketobject.ticketId != ticketdeleteid;
 });

 localStorage.setItem('allTickets',JSON.stringify(filteredtickets));
 loadtickets();
}

let allfilters = document.querySelectorAll(".ticket-filters div");
 //[ div,div,div,div]

 for(let i=0;i< allfilters.length;i++){
    allfilters[i].addEventListener("click",choosefilter);
 }
 
 function choosefilter(e){
   

if(e.target.classList.contains('active-filter')){
    // active filter already present
    e.target.classList.remove("active-filter");
    loadtickets();
    return;
}

  if(document.querySelector('.filter.active-filter')){
     document.querySelector('.filter.active-filter').classList.remove('active-filter');
  } 
 e.target.classList.add("active-filter");
 
 let ticketFilter = e.target.classList[1];
 loadSelectedtickets(ticketFilter);
 } // function end

function loadSelectedtickets(ticketFilter){
   if(localStorage.getItem('allTickets')){

      let allTickets = JSON.parse(localStorage.getItem('allTickets'));
      let Filtertickets = allTickets.filter(function(filterobject){
        
         return filterobject.ticketFilter == ticketFilter;
      });

      ticketcontainer.innerHTML =" " ;
      for(let i=0 ;i< Filtertickets.length ;i++){

         let {ticketId, ticketFilter,ticketContent} = Filtertickets[i];
         let ticketdiv =  document.createElement("div");
         ticketdiv.classList.add("ticket");
         ticketdiv.innerHTML = `<div class = "ticket-filter ${ticketFilter}"></div>
         <div class = "ticket-info">
       <div class = "ticket-id">#${ticketId}</div>
       <div class="ticket-delete" >
       <i class="fas fa-trash-alt" id =${ticketId}></i>
       </div>
     </div>
         <div class= "ticket-content">${ticketContent}</div>`
         ticketdiv.querySelector(".ticket-delete i").addEventListener("click",handleticketdelete);
         ticketdiv.querySelector(".ticket-filter").addEventListener("click", Toggleticketfilter);
         ticketcontainer.append(ticketdiv);   
      }// for end
      
   }

}


openmodalbtn.addEventListener("click",handleopenmodal);

function handleopenmodal(e)
{
let modal  = document.querySelector('.modal');
if(modal){
   return;
}
let modaldiv = document.createElement('div');
modaldiv.classList.add("modal");
modaldiv.innerHTML = `<div class="modal-textbox" data-typed= "false" contenteditable="true">
Enter your task here
</div>
<div class="modal-filter-options">
<div class="modal-filter pink"></div>
<div class="modal-filter blue"></div>
<div class="modal-filter green"></div>
<div class="modal-filter black active-filter "></div>
</div>` ;

modaldiv.querySelector('.modal-textbox').addEventListener("click",clearModalTextbox);
modaldiv.querySelector('.modal-textbox').addEventListener("keypress",addTicket);
let allmodalfilter = modaldiv.querySelectorAll(".modal-filter");

for(let i=0 ;i< allmodalfilter.length; i++){
 allmodalfilter[i].addEventListener("click",choosemodalfilter);
}
 ticketcontainer.append(modaldiv);

}// function end


function choosemodalfilter(e){
  let selectedmodalfilter = e.target.classList[1];

  if(selectedmodalfilter == selectedfilter){
     return;
  }

  selectedfilter = selectedmodalfilter;
 document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
 e.target.classList.add("active-filter");

}


function addTicket(e){

   if(e.key == "Enter"){
     
      modaltext = e.target.textContent;
      let ticketId = uid();
      let ticketdiv =  document.createElement("div");
        ticketdiv.classList.add("ticket");
        ticketdiv.innerHTML = `<div class = "ticket-filter ${selectedfilter}"></div>
        <div class = "ticket-info">
       <div class = "ticket-id">#${ticketId}</div>
       <div class="ticket-delete" >
       <i class="fas fa-trash-alt" id =${ticketId}></i>
       </div>
     </div>
        <div class= "ticket-content">${modaltext}</div>`

 ticketcontainer.append(ticketdiv);
ticketdiv.querySelector(".ticket-delete i").addEventListener("click",handleticketdelete);
ticketdiv.querySelector(".ticket-filter").addEventListener("click", Toggleticketfilter);
    e.target.parentNode.remove();
 //tickets has been append in local storage
  if(!localStorage.getItem('allTickets')){
  // first time ticket store
  let allTickets = [];

  let ticketobject = {};
  ticketobject.ticketId = ticketId;
  ticketobject.ticketFilter = selectedfilter;
  ticketobject.ticketContent = modaltext;
  allTickets.push(ticketobject);

  localStorage.setItem("allTickets",JSON.stringify(allTickets));

  }else{
   // already tickets present hi !!!
   let allTickets = JSON.parse(localStorage.getItem('allTickets'));
   let ticketobject = {};
  ticketobject.ticketId = ticketId;
  ticketobject.ticketFilter = selectedfilter;
  ticketobject.ticketContent = modaltext;
  allTickets.push(ticketobject);

  localStorage.setItem("allTickets",JSON.stringify(allTickets));

  }

//
    selectedfilter = "black";
   }
   
}


function clearModalTextbox(e){

   if(e.target.getAttribute("data-typed") == "true"){
      return;
   }
   e.target.innerHTML = "";
   e.target.setAttribute("data-typed","true");
}