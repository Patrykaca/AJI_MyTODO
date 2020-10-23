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







