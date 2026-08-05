const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", addTask);

function addTask() {

    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        date: date,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";

    displayTasks();
}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-info">
                <span>${task.text}</span>
                <p>📅 ${task.date || "No Date Selected"}</p>
            </div>

            <div class="actions">
                <button class="complete" onclick="toggleComplete(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete" onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);

    });

}

function toggleComplete(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function editTask(index) {

    const newTask = prompt("Edit Task", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {

        tasks[index].text = newTask.trim();

        saveTasks();

        displayTasks();
    }
}

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();
    }
}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}