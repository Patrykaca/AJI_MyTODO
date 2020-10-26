"use strict"
let todoList = []; //declares a new array for Your todo list
let todoList2 = [];

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

let updateJSONbin = function () {
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


initList();

let checkSearch = function (search, item) {
    if (
        item.value == "" ||
        item.title.includes(search) ||
        item.description.includes(search) ||
        item.place.includes(search)
    ) {
        return true;
    }
    return false;
};


let updateTodoList = function () {

    $("#todoTable").find("tbody").empty();

    const dateFrom = $("#inputDateFrom");
    const dateTo = $("#inputDateTo");
    let startDate = new Date(dateFrom.val()).getTime();
    let endDate = new Date(dateTo.val()).getTime();
    let search = $("#inputSearch").val();
    let searchList = [];

    for (let item in todoList) {
        if (
            checkSearch(search, todoList[item])
            &&
            (dateFrom.val() == "" || startDate <= new Date(todoList[item].dueDate).getTime())
            &&
            (dateTo.val() == "" || endDate >= new Date(todoList[item].dueDate).getTime())
        ) {
            searchList.push(todoList[item]);
        }
    }

    //alert(startDate + " " + endDate);

    for (let todo in searchList) {

            let newRow = document.createElement("tr");

            let newTittleElement = document.createElement("td");
            newTittleElement.appendChild(document.createTextNode(searchList[todo].title))

            let newDescriptionElement = document.createElement("td");
            newDescriptionElement.appendChild(document.createTextNode(searchList[todo].description));

            let newPlaceElement = document.createElement("td");
            newPlaceElement.appendChild(document.createTextNode(searchList[todo].place))

            let newDateElement = document.createElement("td");
            newDateElement.appendChild(document.createTextNode(searchList[todo].dueDate))

            //alert(todoList[todo].title + getTimeFromDate(todoList[todo]));

            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "Delete";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todo);
                });
            let newDeleteButtonCell = document.createElement("td");
            newDeleteButtonCell.appendChild(newDeleteButton);

            newRow.append(newTittleElement);
            newRow.appendChild(newDescriptionElement);
            newRow.appendChild(newPlaceElement);
            newRow.appendChild(newDateElement);
            newRow.appendChild(newDeleteButtonCell);

            $("#tbodyTable").append(newRow);

        }

};

setInterval(updateTodoList, 1000);

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
    updateTodoList();
};

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
};

let getTimeFromDate = function (x) {
    return new Date(x.dueDate).getTime();
};


let updateTodoList2 = function () {
    alert("ehhehe");
};

let checkDate = function (obj, startDate, endDate) {
    if (getTimeFromDate(obj.dueDate) >= startDate &&
        getTimeFromDate(obj.dueDate) <= endDate
    ) {
        todoList2.push(obj);
    }
};



