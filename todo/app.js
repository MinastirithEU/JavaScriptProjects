// ? ELEMENTLER
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelector(".card-body")[0];
const secondCardBody = document.querySelector(".card-body")[1];
const clearButton = document.querySelector("clearButton");
const filterInput = document.querySelector("$todoSearch");

let todos = [];
console.log(firstCardBody);


runEvents();
function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded(){
    checkTodosFromStorage(); // değerler bağlandı
    todos.forEach(function(todo){
        addTodoToUI(todo); // metod olmasaydı spagetti olacaktı
    });
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.toLowerCase().trim()==filterValue){
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important"); //kesinlikle bunu kullan
            }
        })
    }else{
        showAlert("warning","filtreleme yapmak için en az 1 todo gereklidir");
    }
}

function allTodosEverywhere(){ // ? TÜM TODOLARI TEMİZLEME
    const todoListesi = document.querySelectorAll(".list-group-item");
    // ! EKRANDAN SİL
    if (todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
    });
    
    // ! STORAGE ÜZERİNDEN SİLME
    todos = [];
    localStorage.setItem("todos",JSON.stringify(todos));
    showAlert("success","Başarılı bir şekilde silindi");
    }else{
        showAlert("warning","silmek için en az 1 to do olmalıdır.")
    }
}

function removeTodoToUI(e){
    if(e.target.className==="fa fa-remove"){
        //ekrandan silmek
        const todo = e.targe.parentElement.partentElement;
        todo.remove();
        // storagedan silmek
        removeTodoToStorage(todo.textContent);//içindeki değer
        showAlert("success","to do başarıyla silindi");
    }
}

function addTodoToStorage(removeToDo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeToDo===todo){
            todos.splice(index,1); //indexren başla 1 değer sil
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));//güncel
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText == null || inputText == ""){
        showAlert("warning","Lütfen bir değer giriniz");
    }else{
        // Arayüze ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","todo eklendi"); // uyarı göster
    }
    // storage ekleme
    // Aynı sayfada kalmak için
    e.preventDefault(); //! Aynı sayfada kal
}

function addTodoToUI(newTodo){ // ? EVENT EKLEMEK
    const li = document.createElement("li");
    li.className = "list-group-item d-flex jutify-content-between";
    li.textContent = newTodo;
    
    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const i = document.createElement("i");
    i.className="fa fa-remove";

    // ! iç içe
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = ""; // değer boş
}

function addTodoToStorage(newTodo){
    checkTodosFromStorage(); // kontrol yap set yap
    todos.push(newTodo); // yeni içerik
    localStorage.setItem("todos",JSON.stringfy(todos)); // sabitle
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
    className="alert alert"+type;
    // div.className=`alert alert-${type}`; //litreal template
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500);
}