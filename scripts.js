// ─── canvas particle network background ───────────────────────────────────────
const canvas = document.getElementById('dataCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 55;
const CONNECTION_DISTANCE = 130;

const palette = ['#8FA1B3', '#9BAF9C', '#A7A1B2', '#C2A18A'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -10;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = Math.random() * 0.3 + 0.1;
        this.r = Math.random() * 2.5 + 1;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > canvas.height + 10) this.reset();
        if (this.x < -10 || this.x > canvas.width + 10) this.reset();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DISTANCE) {
                const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth = 0.8;
                ctx.globalAlpha = alpha;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateCanvas);
}

resizeCanvas();
initParticles();
animateCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});


// ─── scroll progress bar ───────────────────────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
});


// ─── rotating hero subtitle ────────────────────────────────────────────────────
const roles = ['data scientist', 'ml engineer', 'storyteller', 'dj @ kuci radio', 'matcha enthusiast'];
let roleIndex = 0;
const rotatingEl = document.getElementById('rotatingText');

function rotateText() {
    if (!rotatingEl) return;
    rotatingEl.style.opacity = '0';
    rotatingEl.style.transform = 'translateY(8px)';
    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        rotatingEl.textContent = roles[roleIndex];
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
    }, 350);
}

setInterval(rotateText, 2400);


// ─── scroll-reveal animations ──────────────────────────────────────────────────
const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    'section, .timeline-item, .project-card, .hobby-card, .leadership-card, .skill-category'
).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    observer.observe(el);
});


// ─── active nav link on scroll ─────────────────────────────────────────────────
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


// ─── smooth scroll ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
