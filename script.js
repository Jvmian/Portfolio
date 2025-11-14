/* =================================================== */
/* ====   LÓGICA DO PORTFÓLIO - JOÃO VICTOR     ==== */
/* =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES GERAIS ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    const profilePhoto = document.querySelector('.profile-photo');
    
    // --- SELETORES DO MENU HAMBURGER (NOVOS) ---
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navLinksList = document.getElementById('nav-links'); // O <ul>

    // --- 1. ROLAGEM SUAVE ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                let targetPosition = targetSection.offsetTop;
                let navHeight = navbar.offsetHeight;
                let finalPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. LÓGICA DE SCROLL (LINK ATIVO E BOTÃO TOPO) ---
    function handleScroll() {
        let currentSectionId = '';
        const navHeight = navbar.offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 50;

        // Itera de trás para frente para encontrar a seção correta
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;

            if (scrollPosition >= sectionTop) {
                currentSectionId = section.getAttribute('id');
                break; 
            }
        }
        
        // CORREÇÃO: Força a seleção do último item se o scroll
        // estiver no final da página (ou muito perto).
        const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5; // 5px de margem
        
        if (atBottom) {
            currentSectionId = sections[sections.length - 1].getAttribute('id');
        }

        // Atualiza a classe 'active' no link correspondente
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Mostra ou esconde o botão "Voltar ao Topo"
        if (window.scrollY > 300) {
            if (!scrollTopBtn.style.display || scrollTopBtn.style.display === 'none') {
                scrollTopBtn.style.display = 'block';
                setTimeout(() => { scrollTopBtn.style.opacity = '1'; }, 10);
            }
        } else {
            if (scrollTopBtn.style.display === 'block') {
                scrollTopBtn.style.opacity = '0';
                setTimeout(() => { scrollTopBtn.style.display = 'none'; }, 300); // Espera a transição
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chama no carregamento

    // --- 3. BOTÃO DE VOLTAR AO TOPO ---
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 4. ANIMAÇÃO DE FADE-IN AO ROLAR ---
    const fadeElements = document.querySelectorAll('.section, .projeto-card, .competencia-coluna, .timeline-item, .idioma-item');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1 // 10% visível
    });

    fadeElements.forEach(el => {
        sectionObserver.observe(el);
    });

    // --- 5. LÓGICA DE ABERTURA E FECHAMENTO DO MODAL ---
    const modalOpenButtons = document.querySelectorAll('.open-modal-btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('modal-open');
            document.body.classList.add('no-scroll');
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('modal-open');
            if (document.querySelectorAll('.modal.modal-open').length === 0) {
                document.body.classList.remove('no-scroll');
            }
        }
    };

    modalOpenButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModalId = button.dataset.target;
            openModal(targetModalId);
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });

    // --- 6. LÓGICA DO CARROSSEL (COM LEGENDA DINÂMICA) ---
    const initCarousel = (carousel) => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        
        const descriptionElement = carousel.closest('.modal-content').querySelector('.carousel-description');
        const defaultDescription = descriptionElement ? descriptionElement.textContent : "";
        
        let currentSlide = 0;

        if (slides.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }

        const showSlide = (index) => {
            slides.forEach((slide) => {
                slide.classList.remove('active-slide');
            });
            slides[index].classList.add('active-slide');
            currentSlide = index;

            const newDescription = slides[index].dataset.description;

            if (descriptionElement) {
                if (newDescription) {
                    descriptionElement.textContent = newDescription;
                } else {
                    descriptionElement.textContent = defaultDescription;
                }
            }
        };

        nextButton.addEventListener('click', () => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            showSlide(prevIndex);
        });

        showSlide(0);
    };

    document.querySelectorAll('.carousel').forEach(initCarousel);


    // --- 7. LÓGICA DO TEMA (LIGHT/DARK) ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');

    const setTheme = (isLight) => {
        if (isLight) {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
            
            // --- LÓGICA DA FOTO (INÍCIO) ---
            if (profilePhoto) {
                profilePhoto.src = 'imagens/foto2.jpg';
            }
            // --- LÓGICA DA FOTO (FIM) ---

        } else {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
            
            // --- LÓGICA DA FOTO (INÍCIO) ---
            if (profilePhoto) {
                profilePhoto.src = 'imagens/foto.jpg';
            }
            // --- LÓGICA DA FOTO (FIM) ---
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    let isLight;

    if (savedTheme) {
        isLight = (savedTheme === 'light');
    } else {
        isLight = prefersLight; 
    }

    setTheme(isLight);

    themeToggleBtn.addEventListener('click', () => {
        const currentIsLight = document.body.classList.contains('light-mode');
        setTheme(!currentIsLight);
    });

    // --- 8. LÓGICA DO MENU HAMBURGER (NOVO) ---
    const menuIcon = menuToggleBtn.querySelector('i');

    menuToggleBtn.addEventListener('click', () => {
        navLinksList.classList.toggle('active'); // Mostra/esconde o <ul>

        // Troca o ícone
        if (navLinksList.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Fecha o menu ao clicar em um link (essencial para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList.classList.contains('active')) {
                navLinksList.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

}); // Fim do DOMContentLoaded