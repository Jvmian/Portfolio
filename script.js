// Initialize Lucide icons
lucide.createIcons();

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = '<i data-lucide="moon"></i>';
const sunIcon = '<i data-lucide="sun"></i>';

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = sunIcon;
    lucide.createIcons();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
    lucide.createIcons();
});

// Modal functionality
const modal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('loginForm');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

loginButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalFunc();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Here you would typically handle the login logic
    console.log('Login attempt:', { email, password, remember });
    
    // Simulate login success
    alert('Login successful!');
    closeModalFunc();
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const languageCards = document.querySelectorAll('.language-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter cards
        const filter = button.dataset.filter;
        languageCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});