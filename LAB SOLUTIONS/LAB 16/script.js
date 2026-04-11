// Get elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearAllBtn = document.getElementById("clearAll");
const markAllBtn = document.getElementById("markAll");

// ✅ Add Task
function addTask() {
  const taskText = taskInput.value.trim();

  // Empty validation
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  // Create <li>
  const li = document.createElement("li");

  // Task text
  const text = document.createElement("span");
  text.textContent = taskText;

  // ✅ Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✅";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // ❌ Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCounter();
  });

  // Append everything
  li.appendChild(text);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  // Reset input
  taskInput.value = "";

  updateCounter();
}

// ✅ Update Counter
function updateCounter() {
  counter.textContent = "Tasks: " + taskList.children.length;
}

// ✅ Clear All
function clearAllTasks() {
  taskList.innerHTML = "";
  updateCounter();
}

// ✅ Mark All Complete
function markAllComplete() {
  const tasks = taskList.querySelectorAll("li");
  tasks.forEach(task => {
    task.classList.add("completed");
  });
}

// =====================
// 🎯 EVENT LISTENERS
// =====================

// Add button click
addBtn.addEventListener("click", addTask);

// Press Enter to add task
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Clear all
clearAllBtn.addEventListener("click", clearAllTasks);

// Mark all complete
markAllBtn.addEventListener("click", markAllComplete);