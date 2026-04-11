// =======================
// STATE
// =======================
let tasks = [];
let filter = "all";
let sortBy = "date";

// =======================
// ELEMENTS
// =======================
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const stats = document.getElementById("stats");
const counter = document.getElementById("counter");

// =======================
// ADD TASK
// =======================
function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!text) {
    alert("Enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text,
    completed: false,
    priority,
    date: new Date()
  };

  tasks.push(task);

  taskInput.value = "";
  renderTasks();
}

// =======================
// RENDER TASKS
// =======================
function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // SORT
  if (sortBy === "priority") {
    const order = { high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  } else {
    filtered.sort((a, b) => b.date - a.date);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.classList.add(task.priority);
    if (task.completed) li.classList.add("completed");

    li.dataset.id = task.id;

    // Text
    const span = document.createElement("span");
    span.textContent =
      task.priority === "high"
        ? "⚠️ " + task.text
        : task.text;

    // Buttons
    const btns = document.createElement("div");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.dataset.action = "complete";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.dataset.action = "delete";

    btns.appendChild(completeBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btns);

    taskList.appendChild(li);
  });

  updateStats(filtered.length);
}

// =======================
// EVENT DELEGATION
// =======================
taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  const task = tasks.find(t => t.id === id);

  if (e.target.dataset.action === "complete") {
    task.completed = !task.completed;
  }

  if (e.target.dataset.action === "delete") {
    tasks = tasks.filter(t => t.id !== id);
  }

  renderTasks();
});

// =======================
// FILTER
// =======================
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    renderTasks();
  });
});

// =======================
// SORT
// =======================
document.querySelectorAll("[data-sort]").forEach(btn => {
  btn.addEventListener("click", () => {
    sortBy = btn.dataset.sort;
    renderTasks();
  });
});

// =======================
// STATS
// =======================
function updateStats(visibleCount) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  const percent = total
    ? Math.round((completed / total) * 100)
    : 0;

  stats.textContent =
    `Total: ${total} | Active: ${active} | Completed: ${completed} | ${percent}% done`;

  counter.textContent =
    `Showing ${visibleCount} of ${total} tasks`;
}

// =======================
// EVENTS
// =======================
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});