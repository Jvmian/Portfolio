// Initialize Lucide icons
lucide.createIcons();

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = '<i data-lucide="moon"></i>';
const sunIcon = '<i data-lucide="sun"></i>';

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = sunIcon;
    lucide.createIcons();
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
    lucide.createIcons();
});

// Modal functionality
const loginModal = document.getElementById('loginModal');
const developerModal = document.getElementById('developerModal');
const loginButton = document.getElementById('loginButton');
const developerButton = document.getElementById('developerButton');
const closeModals = document.querySelectorAll('.close-modal');
const loginForm = document.getElementById('loginForm');

// Open modal
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunc(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modal === loginModal) {
        loginForm.reset(); // Reset form on close
    }
}

// Event listeners for modals
loginButton.addEventListener('click', () => openModal(loginModal));
developerButton.addEventListener('click', () => openModal(developerModal));

closeModals.forEach(button => {
    button.addEventListener('click', () => {
        if (loginModal.classList.contains('active')) {
            closeModalFunc(loginModal);
        } else if (developerModal.classList.contains('active')) {
            closeModalFunc(developerModal);
        }
    });
});

// Close modal when clicking outside
[loginModal, developerModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc(modal);
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (loginModal.classList.contains('active')) {
            closeModalFunc(loginModal);
        } else if (developerModal.classList.contains('active')) {
            closeModalFunc(developerModal);
        }
    }
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Simulate login API call
    try {
        // Show loading state
        const submitButton = loginForm.querySelector('.login-btn');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Signing in...';
        lucide.createIcons();

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate successful login
        console.log('Login attempt:', { email, password, remember });
        submitButton.innerHTML = '<i data-lucide="check"></i> Success!';
        submitButton.style.backgroundColor = 'var(--success)';
        lucide.createIcons();

        // Close modal after success
        setTimeout(() => {
            closeModalFunc(loginModal);
            submitButton.innerHTML = 'Sign In';
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 1000);
    } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
        const submitButton = loginForm.querySelector('.login-btn');
        submitButton.innerHTML = '<i data-lucide="alert-circle"></i> Error';
        submitButton.style.backgroundColor = 'var(--error)';
        lucide.createIcons();

        // Reset button after error
        setTimeout(() => {
            submitButton.innerHTML = 'Sign In';
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 2000);
    }
});

// Filter functionality for language cards
const filterButtons = document.querySelectorAll('.filter-btn');
const languageCards = document.querySelectorAll('.language-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Update active button with animation
        filterButtons.forEach((btn) => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(0.95)';
        });
        button.classList.add('active');
        button.style.transform = 'scale(1.05)';

        // Reset button scale after animation
        setTimeout(() => {
            button.style.transform = '';
        }, 200);

        // Filter cards with animation
        const filter = button.dataset.filter;
        languageCards.forEach((card, index) => {
            setTimeout(() => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            }, index * 50); // Staggered animation
        });
    });
});

// Add hover effects to language cards
languageCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = 'var(--shadow-lg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});