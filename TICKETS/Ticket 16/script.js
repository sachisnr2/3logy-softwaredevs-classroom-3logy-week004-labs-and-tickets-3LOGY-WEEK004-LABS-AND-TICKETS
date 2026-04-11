// ======================
// STATE
// ======================
let cards = [];

// ======================
// LOAD FROM STORAGE
// ======================
function loadCards() {
  const data = localStorage.getItem("cards");

  // Handle null
  if (data) {
    cards = JSON.parse(data);
  } else {
    cards = [];
  }
}

// ======================
// SAVE TO STORAGE
// ======================
function saveCards() {
  localStorage.setItem("cards", JSON.stringify(cards));
}

// ======================
// ADD CARD
// ======================
function addCard() {
  const term = document.getElementById("term").value.trim();
  const definition = document.getElementById("definition").value.trim();

  if (!term || !definition) {
    alert("Fill all fields");
    return;
  }

  const card = {
    id: Date.now(),
    term,
    definition,
    mastered: false,
    reviewCount: 0
  };

  cards.push(card);

  saveCards();
  renderCards();

  document.getElementById("term").value = "";
  document.getElementById("definition").value = "";
}

// ======================
// RENDER CARDS
// ======================
function renderCards() {
  const list = document.getElementById("cardList");
  list.innerHTML = "";

  cards.forEach(card => {
    const li = document.createElement("li");

    if (card.mastered) {
      li.classList.add("mastered");
    }

    li.dataset.id = card.id;

    const text = document.createElement("span");
    text.textContent = `${card.term} - ${card.definition} (Reviews: ${card.reviewCount})`;

    const btns = document.createElement("div");

    const masterBtn = document.createElement("button");
    masterBtn.textContent = "✔️";
    masterBtn.dataset.action = "master";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.dataset.action = "delete";

    btns.appendChild(masterBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(btns);

    list.appendChild(li);
  });

  updateStats();
}

// ======================
// EVENT DELEGATION
// ======================
document.getElementById("cardList").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  const card = cards.find(c => c.id === id);

  if (e.target.dataset.action === "master") {
    card.mastered = !card.mastered;
  }

  if (e.target.dataset.action === "delete") {
    cards = cards.filter(c => c.id !== id);
  }

  saveCards();
  renderCards();
});

// ======================
// QUIZ MODE
// ======================
function startQuiz() {
  const quizBox = document.getElementById("quizBox");

  const available = cards.filter(c => !c.mastered);

  if (available.length === 0) {
    quizBox.textContent = "All cards mastered 🎉";
    return;
  }

  const randomCard = available[Math.floor(Math.random() * available.length)];

  quizBox.innerHTML = "";

  const term = document.createElement("h3");
  term.textContent = randomCard.term;

  const showBtn = document.createElement("button");
  showBtn.textContent = "Show Answer";

  const answer = document.createElement("p");

  const correctBtn = document.createElement("button");
  correctBtn.textContent = "Got it";

  const wrongBtn = document.createElement("button");
  wrongBtn.textContent = "Need review";

  showBtn.onclick = () => {
    answer.textContent = randomCard.definition;
  };

  correctBtn.onclick = () => {
    randomCard.mastered = true;
    randomCard.reviewCount++;
    saveCards();
    renderCards();
    startQuiz();
  };

  wrongBtn.onclick = () => {
    randomCard.reviewCount++;
    saveCards();
    renderCards();
    startQuiz();
  };

  quizBox.appendChild(term);
  quizBox.appendChild(showBtn);
  quizBox.appendChild(answer);
  quizBox.appendChild(correctBtn);
  quizBox.appendChild(wrongBtn);
}

// ======================
// STATS
// ======================
function updateStats() {
  const total = cards.length;
  const mastered = cards.filter(c => c.mastered).length;

  const percent = total
    ? Math.round((mastered / total) * 100)
    : 0;

  document.getElementById("stats").textContent =
    `Total: ${total} | Mastered: ${mastered}`;

  document.getElementById("progress").style.width =
    percent + "%";
}

// ======================
// EVENTS
// ======================
document.getElementById("addCard").addEventListener("click", addCard);
document.getElementById("startQuiz").addEventListener("click", startQuiz);

// ======================
// INIT
// ======================
loadCards();
renderCards();