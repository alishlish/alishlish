// scroll-reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    observer.observe(el);
});


// active nav link on scroll
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('nav-active'));
            link.classList.add('nav-active');
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));


// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
