const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 250;
let vy = 0;
let gravity = 0.5;
let isJumping = false;

document.addEventListener("keydown", () => {
  if (!isJumping) {
    vy = -10;
    isJumping = true;
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  vy += gravity;
  y += vy;

  if (y >= 250) {
    y = 250;
    vy = 0;
    isJumping = false;
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, 50, 50);

  requestAnimationFrame(loop);
}

loop();

