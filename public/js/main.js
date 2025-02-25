// public/js/main.js
function toggleMenu() {
  document.querySelector('.hamburger-menu').classList.toggle('menu-open');
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save the current theme preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Modal functionality for Login and Sign Up
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeLogin = document.getElementById('close-login');
const closeSignup = document.getElementById('close-signup');

if (loginBtn && loginModal) {
  loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
  });
}
if (signupBtn && signupModal) {
  signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
  });
}
if (closeLogin) {
  closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });
}
if (closeSignup) {
  closeSignup.addEventListener('click', () => {
    signupModal.style.display = 'none';
  });
}

// Close modals when clicking outside modal content
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (event.target === signupModal) {
    signupModal.style.display = 'none';
  }
});
