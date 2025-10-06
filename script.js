function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

function showComingSoon() {
    const modal = document.getElementById('comingSoonModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('comingSoonModal');
    if (event.target === modal) {
        closeModal();
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    const downloadBox = document.querySelector('.download-box');
    if (downloadBox) {
        downloadBox.style.opacity = '0';
        downloadBox.style.transform = 'translateY(30px)';
        downloadBox.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(downloadBox);
    }
});

document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
    
    createParticles();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--secondary-color);
            border-radius: 50%;
            animation: floatParticle ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.1 + Math.random() * 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
            opacity: 0.1;
        }
        25% { 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
            opacity: 0.3;
        }
        50% { 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
            opacity: 0.1;
        }
        75% { 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(style);

console.log(`
🎮 Welcome to Creatuxy! 🎮

Thank you for visiting our website!
Creatuxy is a 2D physics sandbox game for Windows.

Website created with ❤️ for the gaming community.
`);

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

function initThemeToggle() {
    const toggleCheckbox = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('creatuxy-theme') || 'dark';
    
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        toggleCheckbox.checked = true;
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        toggleCheckbox.checked = false;
    }
    
    toggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('creatuxy-theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('creatuxy-theme', 'dark');
        }
    });
}

function initThemeToggle() {
    const toggleCheckbox = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('creatuxy-theme') || 'dark';
    
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        toggleCheckbox.checked = true;
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        toggleCheckbox.checked = false;
    }
    
    toggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('creatuxy-theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('creatuxy-theme', 'dark');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    new WeatherEffects();
});

document.addEventListener('DOMContentLoaded', function() {
    new WeatherEffects();
});

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
    
    createParticles();
});

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
    
    createParticles();
});