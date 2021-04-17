let todoInput  = document.querySelector(".todo-input");
let addtodobutton = document.querySelector(".add-todo");
let todolist = document.querySelector(".todos-list");

function addtodo(){
    let todo = todoInput.value;
 if(todo){
 let listItem = document.createElement("li");
 listItem.classList.add("todo-item");
 //<li class= "todo-item"></li>
let ptag = document.createElement("p");
ptag.classList.add("todo");
ptag.innerHTML= todo;
// <p class = "todo"></p>

let deletebutton = document.createElement("button");
deletebutton.classList.add("delete-task");
deletebutton.innerHTML= "DELETE";
// <button clas = "delete-task"></button>


deletebutton.addEventListener("click",function(event){
 event.target.parentNode.remove();
})
listItem.append(ptag);

listItem.append(deletebutton);


todolist.append(listItem);

todoInput.value = " ";
} //if
} //function end


addtodobutton.addEventListener("click",function(){
  addtodo();
    });



todoInput.addEventListener("keypress",function(event){
 if(event.key == "Enter"){
     addtodo();
 }
 });