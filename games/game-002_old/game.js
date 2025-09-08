const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameDuration = 30 * 1000; // 30 seconds
let gameEnded = false;

// Set the initial position
moveCircleRandom();

circle.addEventListener("click", () => {
  if (gameEnded) return;

  score++;
  scoreDisplay.textContent = score;
  moveCircleRandom();
});

function moveCircleRandom() {
  const maxX = window.innerWidth - 60;
  const maxY = window.innerHeight - 60;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

setTimeout(() => {
  gameEnded = true;
  alert(`Time's up! You scored ${score} clicks.`);
}, gameDuration);
