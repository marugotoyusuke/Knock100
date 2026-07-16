const storageKey = "kamiyama-basic-programming-100-knocks";
const cards = Array.from(document.querySelectorAll(".problem-card, .answer-card"));
const checks = Array.from(document.querySelectorAll("[data-check]"));
const search = document.querySelector("#search");
const progress = document.querySelector("#progress");
const doneCount = document.querySelector("#done-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

let activeFilter = "all";
let completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

function saveCompleted() {
  localStorage.setItem(storageKey, JSON.stringify([...completed].sort()));
}

function updateProgress() {
  checks.forEach((check) => {
    check.checked = completed.has(check.dataset.check);
  });
  if (doneCount) {
    doneCount.textContent = completed.size;
  }
  if (progress) {
    progress.value = completed.size;
  }
}

function applyFilters() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const groupMatch = activeFilter === "all" || card.dataset.group === activeFilter;
    const queryMatch = query === "" || card.dataset.search.includes(query);
    const shouldShow = groupMatch && queryMatch;
    card.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

checks.forEach((check) => {
  check.addEventListener("change", () => {
    if (check.checked) {
      completed.add(check.dataset.check);
    } else {
      completed.delete(check.dataset.check);
    }
    saveCompleted();
    updateProgress();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilters();
  });
});

if (search) {
  search.addEventListener("input", applyFilters);
}

updateProgress();
applyFilters();
