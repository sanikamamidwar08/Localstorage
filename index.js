var todoArray = [];

function saveMytodo(){
    var title = document.getElementById("input").value;
    todoArray.push(title);
    document.getElementById("input").value = "";
    localStorage.setItem("todos", todoArray.toString());
    fetchTodos();
}

function fetchTodos() {
    var str = localStorage.getItem("todos");
    todoArray = str.split(",");
    var htmlString = `
    <tr>
        <th> Sr. No. </th>
        <th> Title </th>
        <th> Actions </th>
    <tr>
    `;
    todoArray.forEach((ele, index) => {
        htmlString += `
        <tr>
            <td> ${ index + 1 } </td>
            <td> ${ ele } </td>
            <td>
                <button class="btn btn-outline-warning" onclick="editTodo(${index})"> 
                    Edit 
                </button>
                <button class="btn btn-outline-danger" onclick="deleteTodo(${index})"> 
                    Delete 
                </button>
            </td>
        </tr>
        `
    })


    document.getElementById("todo-table").innerHTML = htmlString;
}

function editTodo(index) {
    var newValue = prompt("do you want to edit?", todoArray[index]);
    if(newValue != "" && newValue != null){
        todoArray[index] = newValue;
        localStorage.setItem("todos", todoArray.toString());
        fetchTodos();
    }
}

function deleteTodo(index) {
    if(confirm("Do you want to delete?")) {
        todoArray.splice(index, 1);
        localStorage.setItem("todos", todoArray.toString());
        fetchTodos();
    }
}

function deleteAllTodos() {
    localStorage.removeItem("todos");
    todoArray = [];
    document.getElementById("todo-table").innerHTML = "";
}