(async function () {
  const res = await fetch("/static/map.json");
  const map_json = await res.json();
  const GIFS = map_json.gifs || [];

  document.title = "~ eletrix.fr is loading ~";

  const style = document.createElement("style");
  style.textContent = `
    #__loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    }
    #__loader-overlay.fade-out { opacity: 0; pointer-events: none; }
    #__loader-gif { max-width: min(320px, 80vw); max-height: min(320px, 80vh); }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "__loader-overlay";

  const img = document.createElement("img");
  img.id = "__loader-gif";

  if (GIFS.length > 0) {
    img.src = GIFS[Math.floor(Math.random() * GIFS.length)];
  }

  overlay.appendChild(img);

  document.documentElement.style.overflow = "hidden";
  document.body.appendChild(overlay);

  function dismiss() {
    overlay.classList.add("fade-out");
    document.documentElement.style.overflow = "";
    document.title = "~ EletrixTime ~";

    overlay.addEventListener("transitionend", () => {
      overlay.remove();
      style.remove();
    }, { once: true });
  }

  window.addEventListener("load", () => setTimeout(dismiss, 1800));
  setTimeout(dismiss, 3000); // force dismiss after 3 seconds
})();