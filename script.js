// ============================================
// COUNTDOWN TIMER
// ============================================

function updateCountdown() {
    const targetDate = new Date('October 17, 2026 15:00:00').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ============================================
// MAGICAL BOOK INTERACTION
// ============================================

function setupMagicalBook() {
    const book = document.getElementById('magicalBook');
    const openBtn = document.getElementById('openBtn');
    
    if (book) {
        book.addEventListener('click', activateBookMagic);
    }
    
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            activateBookMagic();
        });
    }
}

function activateBookMagic() {
    const book = document.getElementById('magicalBook');
    
    // Create magical particles
    createMagicalParticles();
    
    // Add animation class
    book.style.animation = 'none';
    setTimeout(() => {
        book.style.animation = 'bookOpen 1s ease-out forwards';
    }, 10);
    
    // Scroll to next section
    setTimeout(() => {
        document.querySelector('.fecha-section').scrollIntoView({ behavior: 'smooth' });
    }, 500);
    
    // Start music if available
    startMusic();
}

function createMagicalParticles() {
    const container = document.querySelector('.background-container');
    const book = document.getElementById('magicalBook');
    const rect = book.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + 75 + 'px';
        particle.style.top = rect.top + 100 + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.background = 'radial-gradient(circle, #ffd700, #ffed4e)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        particle.style.boxShadow = '0 0 10px #ffd700';
        
        container.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 3 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = rect.left + 75;
        let y = rect.top + 100;
        let life = 100;
        
        const animate = () => {
            x += vx;
            y += vy;
            life -= 2;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life / 100;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Add book open animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bookOpen {
        0% {
            transform: scale(1) rotateZ(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.1) rotateZ(5deg);
        }
        100% {
            transform: scale(0.8) rotateZ(-5deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// ============================================
// MUSIC CONTROL - MP3 FILE
// ============================================

let audioElement = null;
let isPlaying = false;

function initAudioElement() {
    if (!audioElement) {
        audioElement = new Audio('assets/audio/massiel-xv.mp3');
        audioElement.volume = 0.3; // Volumen suave
        audioElement.loop = true; // Loop infinito
    }
}

function startMusic() {
    initAudioElement();
    const musicBtn = document.getElementById('musicBtn');
    
    if (!isPlaying) {
        audioElement.play().then(() => {
            isPlaying = true;
            if (musicBtn) {
                musicBtn.classList.add('playing');
            }
        }).catch(error => {
            console.log('Error reproduciendo audio:', error);
        });
    }
}

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    
    if (isPlaying) {
        pauseMusic();
        if (musicBtn) {
            musicBtn.classList.remove('playing');
        }
    } else {
        startMusic();
        if (musicBtn) {
            musicBtn.classList.add('playing');
        }
    }
}

function pauseMusic() {
    if (audioElement) {
        audioElement.pause();
    }
    isPlaying = false;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Start countdown
    updateCountdown();
    
    // Setup magical book
    setupMagicalBook();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup music button
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('🎭 Invitación mágica de XV años activada ✨');
});

// ============================================
// UTILITY: Handle hash navigation
// ============================================

window.addEventListener('hashchange', () => {
    const target = document.querySelector(window.location.hash);
    if (target) {
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
});

// ============================================
// PERFORMANCE: Lazy load animations
// ============================================

if ('IntersectionObserver' in window) {
    // Already handled above
} else {
    // Fallback for older browsers
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.animationPlayState = 'running';
    });
}
