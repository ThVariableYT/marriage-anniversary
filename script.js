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
// 2. Music Player with Synced Lyrics
// ====================================

// ┌─────────────────────────────────────────────┐
// │  CONFIGURATION — Edit these 3 values only   │
// └─────────────────────────────────────────────┘
const MUSIC_CONFIG = {
  GITHUB_USER: 'ThVariableYT',
  REPO_NAME:   'your-repo-name',  // ← Change to your GitHub repo name
  BRANCH:      'main',
  LYRICS_FILE: 'lyrics.lrc'       // ← Change ONLY this to your .lrc filename
};
// ──────────────────────────────────────────────

const bgMusic      = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const volumeSlider = document.getElementById('volume-slider');
const btnIcon      = playPauseBtn.querySelector('.btn-icon');
const lyricPrev    = document.getElementById('lyric-prev');
const lyricCurrent = document.getElementById('lyric-current');
const lyricNext    = document.getElementById('lyric-next');
let isPlaying = false;
let lrcLines  = [];

// Initial volume
volumeSlider.value = 30;
if (bgMusic) bgMusic.volume = 0.3;

// --- Play / Pause ---
playPauseBtn.addEventListener('click', function () {
  if (!bgMusic) return;
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    btnIcon.textContent = '▶';
  } else {
    bgMusic.play()
      .then(() => { isPlaying = true; btnIcon.textContent = '⏸'; })
      .catch(e => console.log('Audio autoplay blocked:', e));
  }
});

bgMusic.addEventListener('ended', () => {
  isPlaying = false;
  btnIcon.textContent = '▶';
});

// --- Volume ---
volumeSlider.addEventListener('input', function () {
  if (bgMusic) bgMusic.volume = this.value / 100;
});

// --- LRC Parser ---
function parseLRC(text) {
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
  const result = [];
  for (const line of text.split('\n')) {
    const matches = [...line.matchAll(timeRegex)];
    const lyricText = line.replace(timeRegex, '').trim();
    if (!lyricText || !matches.length) continue;
    for (const m of matches) {
      const time = parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3].padEnd(3,'0')) / 1000;
      result.push({ time, text: lyricText });
    }
  }
  return result.sort((a, b) => a.time - b.time);
}

// --- Fetch Lyrics from GitHub Raw ---
const lyricsURL = `https://raw.githubusercontent.com/${MUSIC_CONFIG.GITHUB_USER}/${MUSIC_CONFIG.REPO_NAME}/${MUSIC_CONFIG.BRANCH}/${MUSIC_CONFIG.LYRICS_FILE}`;

lyricCurrent.textContent = '♪ Loading lyrics…';
fetch(lyricsURL)
  .then(r => r.ok ? r.text() : Promise.reject())
  .then(text => {
    lrcLines = parseLRC(text);
    lyricCurrent.textContent = '♪ Hover while playing';
  })
  .catch(() => {
    lyricCurrent.textContent = '♪ Lyrics unavailable';
  });

// --- Sync Lyrics on timeupdate ---
function getCurrentIndex(t) {
  let idx = 0;
  for (let i = 0; i < lrcLines.length; i++) {
    if (lrcLines[i].time <= t) idx = i; else break;
  }
  return idx;
}

bgMusic.addEventListener('timeupdate', function () {
  if (!lrcLines.length) return;
  const idx = getCurrentIndex(this.currentTime);
  lyricPrev.textContent    = idx > 0                    ? lrcLines[idx - 1].text : '';
  lyricCurrent.textContent = lrcLines[idx].text;
  lyricNext.textContent    = idx < lrcLines.length - 1  ? lrcLines[idx + 1].text : '';
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
