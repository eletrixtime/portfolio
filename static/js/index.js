const tabCache = new Map();
let activeTab = null;
let latestLoadToken = 0;

async function loadTab(tabName) {
    if (tabCache.has(tabName)) {
        return tabCache.get(tabName);
    }

    const response = await fetch(`/tabs/${encodeURIComponent(tabName)}.html`);
    if (!response.ok) {
        throw new Error(`Failed to load tab "${tabName}"`);
    }

    const html = await response.text();
    tabCache.set(tabName, html);
    return html;
}

async function setActive(element, tabName) {
    if (!element) return false;

    document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
    });
    element.classList.add("active");

    if (activeTab === tabName) {
        return false;
    }

    const loadToken = ++latestLoadToken;

    try {
        const html = await loadTab(tabName);
        if (loadToken !== latestLoadToken) return false;

        document.getElementById("maincard").innerHTML = html;
        activeTab = tabName;
        lucide.createIcons();
    } catch (error) {
        if (loadToken !== latestLoadToken) return false;

        document.getElementById("maincard").innerHTML = "<p>Unable to load this section right now.</p>";
        console.error(error);
    }

    return false;
}

lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
    setActive(document.querySelector('.nav-item[data-tooltip="Home"]'), "home");
});
