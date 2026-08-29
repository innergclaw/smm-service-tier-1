const questions = [
  ["01 · CURRENT REALITY", "What feels most out of order in your life right now?"],
  ["02 · ENERGY", "What has been taking more energy than it should?"],
  ["03 · PRESSURE", "What pressure are you carrying that may not belong to you?"],
  ["04 · NEEDS", "What do you need more of to feel steady?"],
  ["05 · AVOIDANCE", "What have you been putting off, and what is it costing you?"],
  ["06 · SUPPORT", "Where could asking for support make this lighter?"],
  ["07 · VALUES", "What matters to you that has not been getting enough room?"],
  ["08 · BOUNDARIES", "What needs a clearer no, limit, or ending?"],
  ["09 · POSSIBILITY", "If the next season went well, what would be different?"],
  ["10 · DIRECTION", "What is one honest direction you are ready to move in?"],
];

const state = { step: 0, answers: Array(questions.length).fill("") };
const storageKey = "sharli-life-reset-answers";
const welcome = document.querySelector("#welcome-view");
const checkin = document.querySelector("#checkin-view");
const complete = document.querySelector("#complete-view");
const form = document.querySelector("#checkin-form");
const answer = document.querySelector("#answer");
const questionNumber = document.querySelector("#question-number");
const questionKicker = document.querySelector("#question-kicker");
const questionLabel = document.querySelector("#question-label");
const progressFill = document.querySelector("#progress-fill");
const backButton = document.querySelector("#back-button");

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
  if (Array.isArray(saved) && saved.length === questions.length) state.answers = saved;
} catch (error) {
  // Private browsing or blocked storage should not interrupt the check-in.
}

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state.answers)); } catch (error) { /* no-op */ }
}

function renderQuestion() {
  const [kicker, prompt] = questions[state.step];
  questionNumber.textContent = String(state.step + 1).padStart(2, "0");
  questionKicker.textContent = kicker;
  questionLabel.textContent = prompt;
  answer.value = state.answers[state.step];
  progressFill.style.width = `${((state.step + 1) / questions.length) * 100}%`;
  backButton.disabled = state.step === 0;
  answer.focus({ preventScroll: true });
}

document.querySelector("#start-button").addEventListener("click", () => {
  welcome.hidden = true;
  checkin.hidden = false;
  renderQuestion();
});

backButton.addEventListener("click", () => {
  state.answers[state.step] = answer.value.trim();
  save();
  if (state.step > 0) { state.step -= 1; renderQuestion(); }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.answers[state.step] = answer.value.trim();
  save();
  if (state.step < questions.length - 1) { state.step += 1; renderQuestion(); return; }
  checkin.hidden = true;
  complete.hidden = false;
  document.querySelector("#first-step").focus({ preventScroll: true });
});

document.querySelector("#copy-button").addEventListener("click", async () => {
  const firstStep = document.querySelector("#first-step").value.trim() || "Choose one small action and give it a place on your calendar.";
  const plan = `Sharli / Life Reset Guide\n\nFirst small move: ${firstStep}\n\nI do not need to fix everything today. I only need one honest direction.`;
  try {
    await navigator.clipboard.writeText(plan);
    document.querySelector("#copy-button").firstChild.textContent = "COPIED ";
  } catch (error) {
    window.prompt("Copy your plan:", plan);
  }
});

document.querySelector("#restart-button").addEventListener("click", () => {
  state.step = 0;
  state.answers = Array(questions.length).fill("");
  try { localStorage.removeItem(storageKey); } catch (error) { /* no-op */ }
  complete.hidden = true;
  welcome.hidden = false;
});
