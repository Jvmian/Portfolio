// Modo claro/escuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se o modo escuro está ativado no localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i> Modo Claro'
        : '<i class="fas fa-moon"></i> Modo Escuro';
});

// Filtro de linguagens
const filterButtons = document.querySelectorAll('.filter-btn');
const languageCards = document.querySelectorAll('.language-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        languageCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Adicionando animação de fadeIn
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);