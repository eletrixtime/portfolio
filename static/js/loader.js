  (function () {
  const GIFS = [
    "/static/gifs/little-trolling.gif",
    "/static/gifs/cat.gif",
    "/static/gifs/reaction.gif",
    "/static/gifs/finger.gif",
    "/static/gifs/ishowmeat.gif",
  ];
  // change document title
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

    #__loader-overlay.fade-out {
      opacity: 0;
      pointer-events: none;
    }

    #__loader-gif {
      max-width: min(320px, 80vw);
      max-height: min(320px, 80vh);
      object-fit: contain;
      display: block;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "__loader-overlay";

  const img = document.createElement("img");
  img.id = "__loader-gif";
  img.src = GIFS[Math.floor(Math.random() * GIFS.length)];
  img.alt = "";

  overlay.appendChild(img);

  document.documentElement.style.overflow = "hidden";

  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(overlay);
    });
  }

  function dismiss() {
    overlay.classList.add("fade-out");
    document.documentElement.style.overflow = "";
    document.title = "~ EletrixTime ~";
    
    overlay.addEventListener("transitionend", () => {
      overlay.remove();
      style.remove();
      document.getElementById("main-content").style.display = "block";
    }, { once: true });
    
  }

  if (document.readyState === "complete") {
    setTimeout(dismiss, 1000);
  } else {
    window.addEventListener("load", () => {
      setTimeout(dismiss, 1800);
    });
  }
})();




let k = [];addEventListener("keyup", e => {
  k.push(e.key.toLowerCase());
  k = k.slice(-10);

  if (k.join("").endsWith("pd")) {
    new Audio("/static/audio/achievement.mp3").play();
    document.getElementById("ascii_art").textContent = `  _                          __               _                 
 | |               ______   / _|             | |                
 | | _____  __ _  |______| | |_ ___ _ __ ___ | |__   ___  _   _ 
 | |/ / _ \\/ _\` |  ______  |  _/ _ \\ '_ \` _ \\| '_\\/ _ \\| | | |
 |   <  __/ (_| | |______| | ||  __/ | | | | | |_) | (_) | |_| |
 |_|\\_\\___|\__,_|          |_| \\___|_| |_| |_|_.__/ \\___/ \\__, |
                                                           __/ |
                                                          |___/  `;
  }
  else if (k.join("").endsWith("caca")) {
    new Audio("/static/audio/achievement.mp3").play();

  }
});