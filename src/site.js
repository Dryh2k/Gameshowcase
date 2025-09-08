// src/site.js
(async () => {
  const grid = document.getElementById("grid");
  const search = document.getElementById("search");
  const tagsWrap = document.getElementById("tags");
  const shareSiteBtn = document.getElementById("shareSite");
  const cardTmpl = document.getElementById("cardTmpl");

  // Load games metadata
  let games = [];
  try {
    const res = await fetch("games/games.json", { cache: "no-cache" });
    games = await res.json();
  } catch {
    console.error("games.json missing");
    games = [];
  }

  // Build tag cloud from all games
  const allTags = Array.from(
    new Set(games.flatMap((g) => g.tags || []))
  ).sort();
  const activeTags = new Set();

  function renderTags() {
    tagsWrap.innerHTML = "";
    allTags.forEach((t) => {
      const b = document.createElement("button");
      b.className = "tag";
      b.textContent = `#${t}`;
      b.onclick = () => {
        if (activeTags.has(t)) activeTags.delete(t);
        else activeTags.add(t);
        b.classList.toggle("active");
        renderGrid();
      };
      tagsWrap.appendChild(b);
    });
  }

  function filterGames() {
    const q = (search.value || "").toLowerCase().trim();
    return games.filter((g) => {
      const byText =
        !q ||
        `${g.title} ${g.description} ${(g.tags || []).join(" ")}`
          .toLowerCase()
          .includes(q);
      const byTags =
        activeTags.size === 0 || (g.tags || []).some((t) => activeTags.has(t));
      return byText && byTags;
    });
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return "";
    }
  }

  function renderGrid() {
    const list = filterGames();
    grid.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("div");
      empty.style.gridColumn = "1 / -1";
      empty.style.textAlign = "center";
      empty.style.color = "#9aa3b2";
      empty.textContent = "Nessun gioco trovato. Prova altri tag o parole 😉";
      grid.appendChild(empty);
      return;
    }
    list.forEach((g) => {
      const node = cardTmpl.content.cloneNode(true);
      const card = node.querySelector(".card");
      const thumb = node.querySelector(".thumb");
      const title = node.querySelector(".title");
      const desc = node.querySelector(".desc");
      const dur = node.querySelector(".duration");
      const upd = node.querySelector(".updated");
      const chips = node.querySelector(".chips");
      const play = node.querySelector(".btn.play");
      const share = node.querySelector(".btn.mini.share");

      title.textContent = g.title;
      desc.textContent = g.description;
      dur.textContent = `⏱️ ${g.duration}`;
      upd.textContent = `🗓️ ${formatDate(g.updated)}`;

      // Thumbnail: emoji stack
      thumb.textContent = g.thumb || "🎮";

      (g.tags || []).forEach((t) => {
        const c = document.createElement("span");
        c.className = "chip";
        c.textContent = `#${t}`;
        chips.appendChild(c);
      });

      play.href = g.path; // open the game subfolder index.html
      share.onclick = async () => {
        const text = `Gioca a "${g.title}" — ${g.duration}. Puoi battere il mio score?`;
        const url = new URL(g.path, location.href).href;
        try {
          if (navigator.share)
            await navigator.share({ title: g.title, text, url });
          else {
            await navigator.clipboard.writeText(`${text} ${url}`);
            alert("Link copiato! 🧃");
          }
        } catch {}
      };

      grid.appendChild(node);
    });
  }

  // Share site
  shareSiteBtn.onclick = async () => {
    try {
      if (navigator.share)
        await navigator.share({
          title: "Gen Z Arcade",
          text: "Mini-giochi fresh ogni settimana ✨",
          url: location.href,
        });
      else {
        await navigator.clipboard.writeText(location.href);
        alert("Link copiato! 🧃");
      }
    } catch {}
  };

  // Debounced search
  let t = null;
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(renderGrid, 120);
  });

  renderTags();
  renderGrid();
})();
