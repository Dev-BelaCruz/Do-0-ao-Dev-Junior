function newtask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    var newTask = document.createElement("li");
    newTask.textContent = taskInput.value;
    taskList.appendChild(newTask);

    taskInput.value = "";
}

function addtask(){
    let addtaskinput = document.getElementById("addtaskinput");
    let taskList = document.getElementById("taskList");
    if (addtaskinput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }
}
