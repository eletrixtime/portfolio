(() => {
    const socket = io('https://backend-production-37d2.up.railway.app');
    const cursors = new Map();
    const colors = {};
    let lastSent = 0;
    let lastClient = null;
    let timer = null;

    const width = () => document.documentElement.clientWidth;

    const pathOf = (node) => {
        const parts = [];
        let el = node;
        while (el && el.nodeType === 1 && el !== document.body && el !== document.documentElement) {
            if (el.id) {
                parts.unshift('#' + CSS.escape(el.id));
                return parts.join('>');
            }
            const p = el.parentElement;
            const i = p ? Array.prototype.indexOf.call(p.children, el) + 1 : 1;
            parts.unshift(`${el.tagName.toLowerCase()}:nth-child(${i})`);
            el = p;
        }
        parts.unshift('body');
        return parts.join('>');
    };

    const emitPos = () => {
        lastSent = performance.now();
        timer = null;
        if (!lastClient) return;
        const [cx, cy] = lastClient;
        const payload = { x: cx + scrollX - width() / 2, y: cy + scrollY };
        const el = document.elementFromPoint(cx, cy);
        if (el) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
                payload.s = pathOf(el);
                payload.rx = (cx - r.left) / r.width;
                payload.ry = (cy - r.top) / r.height;
            }
        }
        socket.emit('move', payload);
    };

    const send = (cx, cy) => {
        lastClient = [cx, cy];
        const wait = 30 - (performance.now() - lastSent);
        if (wait <= 0) emitPos();
        else if (!timer) timer = setTimeout(emitPos, wait);
    };

    const createCursor = (id) => {
        const el = document.createElement('div');
        el.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;z-index:99999;will-change:transform;transform:translate(-100px,-100px)';
        el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))"><path d="M3 2l7 19 2.5-8L21 10z" fill="${colors[id] || '#fff'}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
        document.body.appendChild(el);
        const c = { el, x: 0, y: 0, s: null, rx: 0, ry: 0, node: null, key: '', ready: false };
        cursors.set(id, c);
        return c;
    };

    const removeCursor = (id) => {
        const c = cursors.get(id);
        if (c) c.el.remove();
        cursors.delete(id);
        delete colors[id];
    };

    const resolve = (c) => {
        if (c.s) {
            if (!c.node || !c.node.isConnected) {
                try {
                    c.node = document.querySelector(c.s);
                } catch (e) {
                    c.node = null;
                }
            }
            if (c.node) {
                const r = c.node.getBoundingClientRect();
                return [r.left + scrollX + c.rx * r.width, r.top + scrollY + c.ry * r.height];
            }
        }
        return [c.x + width() / 2, c.y];
    };

    const frame = () => {
        const w = width();
        cursors.forEach((c) => {
            const [px, py] = resolve(c);
            const x = Math.max(0, Math.min(w - 20, px)) - 3;
            const y = py - 2;
            const key = x + ',' + y;
            if (key !== c.key) {
                c.key = key;
                c.el.style.transform = `translate(${x}px,${y}px)`;
            }
            if (!c.ready) {
                c.ready = true;
                requestAnimationFrame(() => {
                    c.el.style.transition = 'transform .08s linear';
                });
            }
        });
        requestAnimationFrame(frame);
    };

    socket.on('init', (data) => {
        Object.assign(colors, data.users);
    });

    socket.on('user_joined', (data) => {
        colors[data.id] = data.color;
    });

    socket.on('move', (data) => {
        const c = cursors.get(data.id) || createCursor(data.id);
        if (data.s !== c.s) c.node = null;
        c.x = data.x;
        c.y = data.y;
        c.s = data.s || null;
        c.rx = data.rx || 0;
        c.ry = data.ry || 0;
    });

    socket.on('user_left', removeCursor);

    socket.on('disconnect', () => {
        [...cursors.keys()].forEach(removeCursor);
    });

    window.addEventListener('pointermove', (e) => send(e.clientX, e.clientY), { passive: true });
    window.addEventListener('scroll', () => {
        if (lastClient) send(lastClient[0], lastClient[1]);
    }, { passive: true });

    requestAnimationFrame(frame);
})();
