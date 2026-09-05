const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    links?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation')
}));
const animateDetails = (items, exclusive = false) => {
    const panelOf = item => item.querySelector('.family-content') || item.querySelector('p');
    const close = item => {
        if (!item.open) return;
        const panel = panelOf(item);
        panel.style.height = panel.scrollHeight + 'px';
        panel.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            panel.style.height = '0px';
            panel.style.opacity = '0'
        });
        panel.addEventListener('transitionend', () => {
            if (panel.style.height === '0px') {
                item.open = false;
                panel.style.removeProperty('height');
                panel.style.removeProperty('overflow');
                panel.style.removeProperty('opacity')
            }
        }, {
            once: true
        })
    };
    items.forEach(item => {
        const panel = panelOf(item);
        if (!panel) return;
        if (item.open) panel.style.height = 'auto';
        if (!panel.classList.contains('family-content')) panel.style.transition = 'height .4s cubic-bezier(.2,.75,.25,1),opacity .25s';
        item.querySelector('summary')?.addEventListener('click', event => {
            event.preventDefault();
            if (item.open) {
                close(item);
                return
            }
            if (exclusive) items.forEach(other => {
                if (other !== item) close(other)
            });
            item.open = true;
            panel.style.height = '0px';
            panel.style.opacity = '0';
            panel.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                panel.style.height = panel.scrollHeight + 'px';
                panel.style.opacity = '1'
            });
            panel.addEventListener('transitionend', () => {
                if (item.open) {
                    panel.style.height = 'auto';
                    panel.style.removeProperty('overflow')
                }
            }, {
                once: true
            })
        })
    })
};
animateDetails([...document.querySelectorAll('.family-row')], true);
animateDetails([...document.querySelectorAll('.faq details')]);
