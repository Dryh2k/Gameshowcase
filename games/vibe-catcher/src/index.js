// games/vibe-catcher/src/index.js
// (uguale alla versione inviata in precedenza; incolla il file completo)
(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const startBtn = document.getElementById("startBtn");
  const soundBtn = document.getElementById("soundBtn");
  const shareBtn = document.getElementById("shareBtn");
  const boardBtn = document.getElementById("boardBtn");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");
  const timeEl = document.getElementById("time");
  const livesEl = document.getElementById("lives");
  const scoreEl = document.getElementById("score");
  const bestEl = document.getElementById("best");
  const modal = document.getElementById("modal");
  const modalMsg = document.getElementById("modalMsg");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const leaderboard = document.getElementById("leaderboard");
  const scoresList = document.getElementById("scoresList");
  const closeBoardBtn = document.getElementById("closeBoardBtn");
  const clearScoresBtn = document.getElementById("clearScoresBtn");

  let soundOn = true;
  function beep(type = "good") {
    if (!soundOn || !window.AudioContext) return;
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g);
    g.connect(ac.destination);
    o.type = "sine";
    o.frequency.value = type === "good" ? 720 : 220;
    g.gain.value = 0.001;
    o.start();
    g.gain.exponentialRampToValueAtTime(0.00001, ac.currentTime + 0.12);
    o.stop(ac.currentTime + 0.12);
  }

  const W = canvas.width,
    H = canvas.height;
  const lanes = 5,
    laneWidth = W / lanes;
  const trendEmojis = [
    "✅",
    "🔥",
    "💅",
    "💫",
    "🫡",
    "🧠",
    "🕺",
    "🎯",
    "🧃",
    "✨",
  ];
  const cringeEmojis = ["❌", "💀", "🤡", "📉", "🗿", "🥴", "🤳", "🫠"];

  let player = { lane: 2, y: H - 70, size: 26 };
  let objects = [];
  let score = 0;
  let best = Number(localStorage.getItem("vc_best") || "0");
  let lives = 3;
  let timeLeft = 60;
  let speed = 2.2;
  let running = false;
  let spawnTimer = 0;
  const keys = new Set();
  let touchLeftHeld = false,
    touchRightHeld = false;
  let last = 0;
  let timerId = null;
  const timeElUpdate = () => {
    timeEl.textContent = String(timeLeft);
    livesEl.textContent = String(lives);
    scoreEl.textContent = String(score);
    bestEl.textContent = String(best);
  };
  timeElUpdate();

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function resetGame() {
    player.lane = 2;
    objects = [];
    score = 0;
    lives = 3;
    timeLeft = 60;
    speed = 2.2;
    spawnTimer = 0;
    timeElUpdate();
  }
  function spawnObject() {
    const lane = randInt(0, lanes - 1);
    const good = Math.random() < 0.65;
    const emoji = good
      ? trendEmojis[randInt(0, trendEmojis.length - 1)]
      : cringeEmojis[randInt(0, cringeEmojis.length - 1)];
    const size = good ? randInt(20, 30) : randInt(22, 34);
    const obj = {
      lane,
      y: -20,
      good,
      emoji,
      size,
      vy: speed + Math.random() * 1.4,
    };
    objects.push(obj);
  }
  function drawLaneGrid() {
    const c = ctx;
    c.save();
    c.strokeStyle = "rgba(255,255,255,.06)";
    c.lineWidth = 1;
    for (let i = 1; i < lanes; i++) {
      const x = Math.floor(i * laneWidth) + 0.5;
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, H);
      c.stroke();
    }
    c.restore();
  }
  function drawPlayer() {
    const x = player.lane * laneWidth + laneWidth / 2;
    const c = ctx;
    c.save();
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `bold ${player.size}px system-ui, emoji`;
    c.shadowColor = "rgba(79,70,229,.5)";
    c.shadowBlur = 16;
    c.fillText("😎", x, player.y);
    c.restore();
  }
  function drawObjects() {
    const c = ctx;
    c.save();
    c.textAlign = "center";
    c.textBaseline = "middle";
    for (const o of objects) {
      const x = o.lane * laneWidth + laneWidth / 2;
      c.font = `bold ${o.size}px system-ui, emoji`;
      c.shadowColor = o.good ? "rgba(34,211,238,.5)" : "rgba(239,68,68,.5)";
      c.shadowBlur = 12;
      c.fillText(o.emoji, x, o.y);
    }
    c.restore();
  }
  function stepObjects(dt) {
    for (const o of objects) {
      o.y += o.vy * dt;
    }
    objects = objects.filter((o) => o.y < H + 40);
  }
  function collide() {
    const px = player.lane * laneWidth + laneWidth / 2,
      py = player.y;
    for (let i = objects.length - 1; i >= 0; i--) {
      const o = objects[i];
      const ox = o.lane * laneWidth + laneWidth / 2,
        oy = o.y;
      const dist = Math.hypot(px - ox, py - oy);
      if (dist < (player.size + o.size) * 0.55) {
        if (o.good) {
          score += 10;
          speed = Math.min(speed + 0.05, 6);
          beep("good");
        } else {
          lives -= 1;
          beep("bad");
          if (lives <= 0) endGame();
        }
        objects.splice(i, 1);
      }
    }
    timeElUpdate();
  }
  function endGame() {
    running = false;
    best = Math.max(best, score);
    localStorage.setItem("vc_best", String(best));
    addToLeaderboard(score);
    timeElUpdate();
    openModal(`Score: ${score} · Best: ${best} · Vibe: ${getVibeLabel(score)}`);
  }
  function getVibeLabel(s) {
    if (s >= 250) return "Ultra based 🔥";
    if (s >= 180) return "Certified slay 💅";
    if (s >= 120) return "Valid 🫡";
    if (s >= 60) return "Not mid 😌";
    return "Lowkey cringe 💀";
  }
  function getScores() {
    try {
      return JSON.parse(localStorage.getItem("vc_scores") || "[]");
    } catch {
      return [];
    }
  }
  function setScores(a) {
    localStorage.setItem("vc_scores", JSON.stringify(a.slice(0, 10)));
  }
  function addToLeaderboard(s) {
    const a = getScores();
    a.push({ s, t: Date.now() });
    a.sort((x, y) => y.s - x.s);
    setScores(a);
  }
  function renderScores() {
    const a = getScores();
    scoresList.innerHTML = "";
    a.forEach((it, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${it.s} — ${new Date(
        it.t
      ).toLocaleDateString()}`;
      scoresList.appendChild(li);
    });
  }

  async function shareRun() {
    const text = `I scored ${score} in Vibe Catcher ✨ (${getVibeLabel(
      score
    )}). Can you beat me?`;
    const url = location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Vibe Catcher — Trend Dash",
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        alert("Link copiato! 🧃");
      }
    } catch {}
  }

  window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "a", "A"].includes(e.key)) keys.add("left");
    if (["ArrowRight", "d", "D"].includes(e.key)) keys.add("right");
  });
  window.addEventListener("keyup", (e) => {
    if (["ArrowLeft", "a", "A"].includes(e.key)) keys.delete("left");
    if (["ArrowRight", "d", "D"].includes(e.key)) keys.delete("right");
  });
  leftBtn.addEventListener(
    "touchstart",
    () => {
      touchLeftHeld = true;
    },
    { passive: true }
  );
  leftBtn.addEventListener("touchend", () => {
    touchLeftHeld = false;
  });
  rightBtn.addEventListener(
    "touchstart",
    () => {
      touchRightHeld = true;
    },
    { passive: true }
  );
  rightBtn.addEventListener("touchend", () => {
    touchRightHeld = false;
  });

  function loop(ts) {
    if (!running) return;
    const dt = Math.min(16, ts - last) / 16;
    last = ts;
    spawnTimer += dt;
    if (spawnTimer > Math.max(0.45, 1.2 - speed * 0.15)) {
      spawnObject();
      spawnTimer = 0;
    }
    if (keys.has("left") || touchLeftHeld)
      player.lane = Math.max(0, player.lane - 1);
    if (keys.has("right") || touchRightHeld)
      player.lane = Math.min(lanes - 1, player.lane + 1);
    stepObjects(dt);
    collide();
    const c = ctx;
    c.clearRect(0, 0, W, H);
    drawLaneGrid();
    drawObjects();
    drawPlayer();
    requestAnimationFrame(loop);
  }
  function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (!running) return;
      timeLeft -= 1;
      timeElUpdate();
      if (timeLeft <= 0) {
        clearInterval(timerId);
        endGame();
      }
    }, 1000);
  }

  function openModal(msg) {
    document.getElementById("modalMsg").textContent = msg;
    document.getElementById("modal").classList.remove("hidden");
  }
  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }
  function openBoard() {
    renderScores();
    document.getElementById("leaderboard").classList.remove("hidden");
  }
  function closeBoard() {
    document.getElementById("leaderboard").classList.add("hidden");
  }

  document.getElementById("startBtn").addEventListener("click", () => {
    resetGame();
    running = true;
    last = performance.now();
    startTimer();
    requestAnimationFrame(loop);
  });
  document.getElementById("soundBtn").addEventListener("click", () => {
    soundOn = !soundOn;
    document.getElementById("soundBtn").textContent = soundOn
      ? "🔊 Sound: On"
      : "🔇 Sound: Off";
  });
  document.getElementById("shareBtn").addEventListener("click", shareRun);
  document.getElementById("boardBtn").addEventListener("click", openBoard);
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    closeModal();
    document.getElementById("startBtn").click();
  });
  document
    .getElementById("closeModalBtn")
    .addEventListener("click", closeModal);
  document
    .getElementById("closeBoardBtn")
    .addEventListener("click", closeBoard);
  document.getElementById("clearScoresBtn").addEventListener("click", () => {
    localStorage.removeItem("vc_scores");
    renderScores();
  });

  timeElUpdate();
})();
