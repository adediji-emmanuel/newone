// Theme toggle logic
const toggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  if (toggle) toggle.checked = true;
}

// Handle toggle click
if (toggle) {
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Background birthday audio autoplay
window.addEventListener('DOMContentLoaded', () => {
  const audio = new Audio('assets/audio/birthday.mp3');
  audio.loop = true;
  audio.volume = 0.3; // soft volume
  audio.play().catch(() => {
    // Handle autoplay restriction (browsers may block)
    console.warn("Audio autoplay blocked until user interacts.");
  });
});
