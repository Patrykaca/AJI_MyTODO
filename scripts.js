"use strict"
let todoList = []; //declares a new array for Your todo list

let initList = function () {

    $.ajax({
        // copy Your bin identifier here. It can be obtained in the dashboard
        url: 'https://api.jsonbin.io/b/5f7f73dc65b18913fc5cd839/latest',
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': '$2b$10$mjAr/h0vcCE3LnD0ul5Oc.5a8oqPF.CIHApkOU2WIMddvY7sZDvUu'
                },
                success: (data) => {
                //console.log(data);
                todoList = data;
            },
                error: (err) => {
                console.log(err.responseJSON);
            }
                });
};

let updateJSONbin = function() {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5f7f73dc65b18913fc5cd839',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': '$2b$10$mjAr/h0vcCE3LnD0ul5Oc.5a8oqPF.CIHApkOU2WIMddvY7sZDvUu'
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
};
//

initList();

let updateTodoList = function () {

    let table = $("#todoTable").find("tbody");

    table.empty();
<<<<<<< HEAD
    
    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }
    
    //add all elements
    let filterInput = document.getElementById("inputSearch");
    for (let todo in todoList) {
        if (
            (filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value))
        ) {
            
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todo);
                });
            let newElement = document.createElement("div");
            let newContent = document.createTextNode(
                todoList[todo].title + " " + todoList[todo].description + " ");
            newElement.appendChild(newContent);
            newElement.appendChild(newDeleteButton);
            todoListDiv.appendChild(newElement);
        }
    }
=======
>>>>>>> origin/main

    for (let todo in todoList) {
        table.append(
            "<tr>" +
            "<td>" + todoList[todo].title + "</td>" +
            "<td>" + todoList[todo].description + "</td>" +
            "<td>" + todoList[todo].place + "</td>" +
            "<td>" + todoList[todo].dueDate + "</td>" +
            "<td>" + "<input class='btn btn-outline-danger' type='button' value='Delete' onclick='deleteTodo(" + todo + ")'/>" + "</td>" +
            "</tr>"
        );
    }
}

setInterval(updateTodoList, 1000);

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
    updateTodoList();
}
//$("#test").val())

let addTodo = function () {
    // //get the elements in the form
    // let inputTitle = document.getElementById("inputTitle");
    // let inputDescription = document.getElementById("inputDescription");
    // let inputPlace = document.getElementById("inputPlace");
    // let inputDate = document.getElementById("inputDate");
    // //get the values from the form
    // let newTitle = inputTitle.value;
    // let newDescription = inputDescription.value;
    // let newPlace = inputPlace.value;
    // let newDate = new Date(inputDate.value);
    //create new item
    
    let newTitle = $("#inputTitle").val();
    let newDescription = $("#inputDescription").val();
    let newPlace = $("#inputPlace").val();
    let newDate = new Date($("#inputDate").val());
    
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
    //add item to the list

    todoList.push(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateJSONbin();
    updateTodoList();
    updateJSONbin();
}







