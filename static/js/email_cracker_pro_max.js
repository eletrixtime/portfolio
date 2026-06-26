// by chatgpt :3

(() => {
  const decode = (encoded) => {
    let r = (s, i) => parseInt(s.substr(i, 2), 16);

    let key = r(encoded, 0);
    let out = "";

    for (let i = 2; i < encoded.length; i += 2) {
      out += String.fromCharCode(r(encoded, i) ^ key);
    }

    try {
      return decodeURIComponent(escape(out));
    } catch {
      return out;
    }
  };

  const process = (root = document) => {
    root.querySelectorAll(".__cf_email__").forEach(el => {
      const cf = el.getAttribute("data-cfemail");
      if (!cf) return;

      const email = decode(cf);

      // remplacement propre
      const span = document.createElement("span");
      span.textContent = email;

      const parent = el.parentNode;
      if (parent) parent.replaceChild(span, el);
    });

    root.querySelectorAll("a[href*='/cdn-cgi/l/email-protection']").forEach(a => {
      const match = a.href.match(/email-protection#([0-9a-f]+)/i);
      if (!match) return;

      const email = decode(match[1]);
      a.href = "mailto:" + email;
      a.textContent = email;
    });
  };

  process(document);

  const obs = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) process(node);
      }
    }
  });

  obs.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();