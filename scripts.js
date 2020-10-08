"use strict"
let todoList = []; //declares a new array for Your todo list

let initList = function () {
    todoList.push(
        {
            title: "Learn JS",
            description: "Create a demo application for my TODO's",
            place: "445",
            dueDate: new Date(2020,10,7)
        },
        {
            title: "Lecture test",
            description: "Quick test from the first three lectures",
            place: "F6",
            dueDate: new Date(2020,10,8)
        }
    );
}

initList();

let updateTodoList = function () {
    let todoListDiv =
        document.getElementById("todoListView");

        //remove all elements
        while (todoListDiv.firstChild) {
            todoListDiv.removeChild(todoListDiv.firstChild);
        }

        //add all elements
        for (let todo in todoList) {
            let newElement = document.createElement("div");
            let newContent = document.createTextNode(
                todoList[todo].title + " " + todoList[todo].description);
            newElement.appendChild(newContent);
            todoListDiv.appendChild(newElement);
        }
}

setInterval(updateTodoList, 1000);











