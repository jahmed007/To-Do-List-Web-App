document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    document.querySelector('#newTaskAdd').onclick = function () {
        if (document.querySelector('#newTask input').value.length == 0) {
            alert("New Task Field Cannot Be Empty");
        } else {
            addTask(document.querySelector('#newTask input').value);
            document.querySelector("#newTask input").value = "";
            saveTasks();
        }
    };
});
function addTask(taskName) {
    document.querySelector('#allTasks').innerHTML += `
        <div class="currentTask">
            <span class="taskName">${taskName}</span>
            <button class="deleteTask"><i class="far fa-trash-alt"></i></button>
        </div>
    `;
    bindTaskEvents();
}
function bindTaskEvents() {
    let deleteButton = document.querySelectorAll(".deleteTask");
    deleteButton.forEach(button => {
        button.onclick = function () {
            this.parentNode.remove();
            saveTasks();
        };
    });
    let tasks = document.querySelectorAll(".currentTask");
    tasks.forEach(task => {
        task.onclick = function () {
            this.classList.toggle('completedTask');
            saveTasks();
        };
    });
}
function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.currentTask').forEach(taskElement => {
        tasks.push({
            name: taskElement.querySelector('.taskName').textContent,
            completed: taskElement.classList.contains('completedTask')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTask(task.name);
            if (task.completed) {
                let addedTaskElements = document.querySelectorAll('.currentTask');
                let addedTaskElement = addedTaskElements[addedTaskElements.length - 1];
                addedTaskElement.classList.add('completedTask');
            }
        });
    }
}
