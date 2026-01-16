// Fade-in animation for sections on scroll
const fadeInSections = document.querySelectorAll('.fade-in-section');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

fadeInSections.forEach(section => {
  fadeInObserver.observe(section);
});

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-level');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBar = entry.target;
      const targetWidth = skillBar.getAttribute('data-width');
      
      // Add a small delay for a more natural feel
      setTimeout(() => {
        skillBar.style.width = targetWidth + '%';
      }, 200);
      
      // Only animate once
      skillObserver.unobserve(skillBar);
    }
  });
}, {
  threshold: 0.5
});

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Smooth scroll for navigation links (extra enhancement)
document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});