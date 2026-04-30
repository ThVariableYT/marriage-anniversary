/* ====================================
   Anniversary Website JavaScript
   Made with Love
   ==================================== */

// --- Wait for DOM to Load ---
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // 1. Floating Hearts Background
    // ====================================
    function createFloatingHearts() {
        const container = document.getElementById('hearts-container');
        const hearts = ['&#10084;', '&#128155;', '&#128525;', '&#10085;'];
        const colors = ['#e75480', '#d4af37', '#c41e3a', '#ff6b6b'];
        
        function addHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.opacity = Math.random() * 0.4 + 0.1;
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 20000);
        }
        
        // Create initial hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(addHeart, i * 500);
        }
        
        // Keep adding hearts
        setInterval(addHeart, 2000);
    }
    
    createFloatingHearts();
    
    // ====================================
    // 2. Music Player
    // ====================================
    const bgMusic = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;
    
    // Set initial volume
    volumeSlider.value = 30;
    if (bgMusic) {
        bgMusic.volume = 0.3;
    }
    
    playPauseBtn.addEventListener('click', function() {
        if (!bgMusic) return;
        
        if (isPlaying) {
            bgMusic.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                playPauseBtn.textContent = 'Pause';
            }).catch(e => {
                console.log('Audio autoplay blocked:', e);
            });
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        if (bgMusic) {
            bgMusic.volume = this.value / 100;
        }
    });
    
    // ====================================
    // 3. Typing Effect for Tagline
    // ====================================
    const taglineElement = document.querySelector('.tagline');
    const celebrationText = document.querySelector('.celebration-text');
    
    const taglineText = 'Celebrating 20 Years of Unconditional Love';
    const celebrationMessage = 'Your love story has inspired every chapter of my life. Happy 20th Anniversary, with all my heart.';
    
    let charIndex = 0;
    
    function typeTagline() {
        if (charIndex < taglineText.length) {
            taglineElement.textContent += taglineText.charAt(charIndex);
            charIndex++;
            setTimeout(typeTagline, 80);
        } else {
            // Start typing celebration text after tagline
            setTimeout(typeCelebrationText, 500);
        }
    }
    
    function typeCelebrationText() {
        let textIndex = 0;
        let elementIndex = 0;
        
        function type() {
            if (elementIndex < celebrationMessage.length) {
                celebrationText.textContent += celebrationMessage.charAt(elementIndex);
                elementIndex++;
                setTimeout(type, 50);
            }
        }
        type();
    }
    
    // Start typing after a short delay
    setTimeout(typeTagline, 1000);
    
    // ====================================
    // 4. Scroll Animations (Intersection Observer)
    // ====================================
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger fireworks on appreciation section
                if (entry.target.classList.contains('appreciation-section')) {
                    startFireworks();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ====================================
    // 5. Smooth Navigation with Active State
    // ====================================
    const navLinks = document.querySelectorAll('.navbar a');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === '#' + id ? '#d4af37' : '';
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
    
    // ====================================
    // 6. Photo Gallery Hover Effect
    // ====================================
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            const title = this.getAttribute('data-title');
            console.log('Viewing:', title);
        });
    });
    
    // ====================================
    // 7. Fireworks Animation
    // ====================================
    function startFireworks() {
        const container = document.getElementById('fireworks');
        if (!container) return;
        
        const colors = ['#e75480', '#d4af37', '#c41e3a', '#ff6b6b', '#ffd700', '#ff69b4'];
        
        function createFirework() {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2) + container.offsetTop;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.backgroundColor = color;
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                const angle = (i / 20) * Math.PI * 2;
                const velocity = Math.random() * 100 + 50;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
        }
        
        // Create multiple fireworks
        let count = 0;
        const fireworkInterval = setInterval(() => {
            createFirework();
            count++;
            if (count >= 10) {
                clearInterval(fireworkInterval);
            }
        }, 400);
    }
    
    // ====================================
    // 8. Heart Beat Animation on Page Load
    // ====================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ====================================
    // 9. Navigation Hover Effect
    // ====================================
    document.getElementById('nav').addEventListener('mouseover', function() {
        this.style.background = 'rgba(20, 10, 15, 0.95)';
    });
    
    document.getElementById('nav').addEventListener('mouseout', function() {
        this.style.background = 'rgba(20, 10, 15, 0.85)';
    });
    
    // ====================================
    // 10. Console Love Message
    // ====================================
    console.log('%c Made with all my love for Mom & Dad ', 
        'background: linear-gradient(135deg, #e75480, #d4af37); color: white; font-size: 20px; padding: 20px; border-radius: 10px;');
    
});
