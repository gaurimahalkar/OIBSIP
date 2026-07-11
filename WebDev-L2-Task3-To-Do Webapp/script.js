const titleInput = document.getElementById("taskTitle");
const descInput = document.getElementById("taskDescription");
const dateInput = document.getElementById("taskDateTime");

const addBtn = document.getElementById("addTaskBtn");

const pendingBox = document.getElementById("pendingList");
const completedBox = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingMsg = document.getElementById("pendingMessage");
const completedMsg = document.getElementById("completedMessage");

const pendingTab = document.getElementById("pendingTab");
const completedTab = document.getElementById("completedTab");

const pendingSection = document.getElementById("pendingSection");
const completedSection = document.getElementById("completedSection");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task counter
function updateCounter() {

    let pending = tasks.filter(task => !task.completed).length;
    let completed = tasks.filter(task => task.completed).length;

    pendingCount.textContent = pending;
    completedCount.textContent = completed;

    pendingMsg.style.display = pending ? "none" : "block";
    completedMsg.style.display = completed ? "none" : "block";
}

// Display all tasks
function showTasks() {

    pendingBox.innerHTML = "";
    completedBox.innerHTML = "";

    tasks.forEach((task, index) => {

        const card = document.createElement("div");
        card.className = "task";

        if (task.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${task.title}</h3>

            <div class="date">
                📅 ${task.dateTime || "No Date & Time"}
            </div>

            <p>${task.description || "No description provided."}</p>

            <div class="task-buttons">
                ${task.completed ? "" : `<button class="complete-btn">Complete</button>`}
                <button class="delete-btn">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedBox.appendChild(card);
        } else {
            pendingBox.appendChild(card);
        }

        const completeBtn = card.querySelector(".complete-btn");
        const deleteBtn = card.querySelector(".delete-btn");

        if (completeBtn) {
            completeBtn.addEventListener("click", function () {
                tasks[index].completed = true;
                saveTasks();
                showTasks();
                updateCounter();
            });
        }

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
            updateCounter();
        });

    });
}

// Add task
addBtn.addEventListener("click", function () {

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const dateTime = dateInput.value;

    if (!title) {
        alert("Please enter task title.");
        return;
    }

    tasks.push({
        title: title,
        description: description,
        dateTime: dateTime,
        completed: false
    });

    saveTasks();
    showTasks();
    updateCounter();

    titleInput.value = "";
    descInput.value = "";
    dateInput.value = "";

});

// Pending tab
pendingTab.addEventListener("click", function () {

    pendingTab.classList.add("active");
    completedTab.classList.remove("active");

    pendingSection.classList.remove("hidden");
    completedSection.classList.add("hidden");

});

// Completed tab
completedTab.addEventListener("click", function () {

    completedTab.classList.add("active");
    pendingTab.classList.remove("active");

    completedSection.classList.remove("hidden");
    pendingSection.classList.add("hidden");

});

showTasks();
updateCounter();