const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearAllBtn = document.getElementById("clearAll");
const markAllBtn = document.getElementById("markAll");

// Add Task
function addTask() {
  const taskText = taskInput.value.trim();

  // Validation
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  // Create elements
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  // Buttons container
  const btnDiv = document.createElement("div");
  btnDiv.classList.add("task-buttons");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    updateCounter();
  };

  // Append
  btnDiv.appendChild(completeBtn);
  btnDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnDiv);

  taskList.appendChild(li);

  // Reset input
  taskInput.value = "";

  updateCounter();
}

// Update counter
function updateCounter() {
  const total = taskList.children.length;
  counter.textContent = "Tasks: " + total;
}

// Clear all tasks
function clearAllTasks() {
  taskList.innerHTML = "";
  updateCounter();
}

// Mark all complete
function markAllComplete() {
  const tasks = taskList.querySelectorAll("li");
  tasks.forEach(task => {
    task.classList.add("completed");
  });
}

// Event Listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

clearAllBtn.addEventListener("click", clearAllTasks);
markAllBtn.addEventListener("click", markAllComplete);