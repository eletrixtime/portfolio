


function setActive(element, i) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        fetch(`tabs/${i}.html`).then(response => response.text()).then(html => {
            document.getElementById('maincard').innerHTML = html;
            lucide.createIcons();
        });

    });
    element.classList.add('active');
}

        lucide.createIcons();
        
// wait for body load
document.addEventListener("DOMContentLoaded", () => {
    setActive(document.querySelector('.nav-item[data-tooltip="Home"]'), 'home');
    fetch("/static/cat.txt").then(response => response.text()).then(html => {
        console.log(html)

    });

});