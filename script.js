/* =================================================== */
/* ====   LÓGICA DO PORTFÓLIO - JOÃO VICTOR     ==== */
/* =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- SELETORES GERAIS ---
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");
  const scrollTopBtn = document.getElementById("scrollToTopBtn");
  const profilePhoto = document.querySelector(".profile-photo");
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const navLinksList = document.getElementById("nav-links");

  // ===========================================================
// 1. TRANSLATION DICTIONARY (PORTUGUESE <-> ENGLISH)
// ===========================================================
const translations = {
  pt: {
    // Navbar
    nav_sobre: "Sobre Mim",
    nav_projetos: "Projetos",
    nav_competencias: "Competências",
    nav_idiomas: "Idiomas",
    nav_experiencia: "Experiência",
    nav_formacao: "Formação",
    nav_contato: "Contato",

    // Hero
    hero_role:
      "Engenheiro Mecatrônico | Desenvolvedor de Sistemas | Técnico em Eletrônica",

    // Sobre
    sobre_titulo: "Sobre Mim",
    sobre_p1:
      'Olá! Sou João Victor Mian Valdomiro, estudante de <span class="highlight">Engenharia Mecatrônica na Universidade de São Paulo (USP)</span>, com foco em desenvolvimento de software e prototipagem eletrônica. Minha trajetória é marcada pela curiosidade, pela aprendizagem prática e pelo interesse em transformar ideias em soluções reais.',
    sobre_p2:
      'Possuo formação técnica em <strong>Desenvolvimento de Sistemas</strong> e <strong>Eletrônica</strong>, e acredito que o conhecimento se consolida ao <span class="highlight">colocar a mão na massa</span>. Atuo no desenvolvimento de sistemas, projetos eletrônicos e automação, sempre buscando otimizar processos, resolver problemas complexos e gerar impacto positivo. Sou proativo, organizado e comprometido com a evolução técnica e profissional contínua.',

    // Projetos
    proj_titulo: "Projetos em Destaque",
    btn_ver: '<i class="fas fa-eye"></i> Ver Projeto',

    // Truco
    truco_titulo: "Marcador de Truco com ATmega328P",
    truco_desc:
      '<strong><i class="fas fa-lightbulb"></i> Desafio:</strong> Desenvolver um placar digital portátil para jogos de truco, substituindo a marcação manual. O principal desafio técnico foi implementar a lógica de <strong>multiplexação por divisão de tempo</strong> para controlar um display de 7 segmentos duplo diretamente com o ATmega328P, utilizando transistores para a comutação dos dígitos.',
    truco_tec:
      '<strong><i class="fas fa-tools"></i> Tecnologias:</strong> Microcontrolador ATmega328P, C++ (Arduino IDE), Display de 7 Segmentos (Duplo), Transistores (multiplexação), Componentes Eletrônicos.',

    // Smart Liquid
    liquid_titulo: "Smart Liquid",
    liquid_desc:
      '<strong><i class="fas fa-lightbulb"></i> Desafio:</strong> Projetar um sistema de monitoramento IoT integrando sensores de temperatura e nível de água a um ESP32. O sistema coleta dados em tempo real e os transmite via Wi-Fi para uma plataforma web, permitindo monitoramento e controle remoto.',
    liquid_tec:
      '<strong><i class="fas fa-tools"></i> Tecnologias:</strong> ESP32 (Wi-Fi), Sensor de Temperatura (DS18B20), Sensor de Nível de Água, Servomotor (SG90), C++ (Arduino IDE), HTML, CSS, JavaScript, PHP e MySQL.',

    // Cuba
    cuba_titulo: "Cuba Automatizada",
    cuba_desc:
      '<strong><i class="fas fa-lightbulb"></i> Desafio:</strong> Desenvolver uma cuba totalmente automatizada e <em>touchless</em>, focada em higiene e eficiência. O projeto integrou sensores de presença e infravermelho para automação da iluminação, acionamento da água e do secador de mãos.',
    cuba_tec:
      '<strong><i class="fas fa-tools"></i> Tecnologias:</strong> Sensor PIR, Sensores Infravermelhos (E3F-DS30C4), Relés, Bomba d’água.',

    // Competências
    comp_titulo: "Minhas Competências",
    comp_hard: '<i class="fas fa-laptop-code"></i> Técnicas (Hard Skills)',
    skills_1:'Arduino, ESP-32, Sensores, Circuitos',
    comp_soft: '<i class="fas fa-users"></i> Comportamentais (Soft Skills)',
    soft_1:
      '<i class="fas fa-lightbulb"></i> Resolução de Problemas Complexos',
    soft_2:
      '<i class="fas fa-handshake"></i> Colaboração e Trabalho em Equipe',
    soft_3:
      '<i class="fas fa-comments"></i> Comunicação Técnica e Apresentação',
    soft_4: '<i class="fas fa-rocket"></i> Proatividade e Iniciativa',
    soft_5:
      '<i class="fas fa-brain"></i> Pensamento Crítico e Adaptabilidade',

    // Idiomas
    idiomas_titulo: "Idiomas",
    nome_pt: "Português",   // <--- NOVO
    nome_en: "Inglês",      // <--- NOVO
    nome_es: "Espanhol",    // <--- NOVO
    lang_pt: "Nativo",
    lang_en: "Intermediário",
    lang_es: "Intermediário",

    // Experiência
    exp_titulo: "Experiência Profissional",
    exp_job1_title: "Estagiário de Informática",
    exp_job1_desc:
      "Suporte técnico, manutenção de computadores e configuração de sistemas.",
    exp_job2_title: "Assistente em Refrigeração",
    exp_job2_desc:
      "Atuação em instalação, manutenção, diagnóstico e reparo de sistemas de refrigeração.",

    // Formação
    edu_titulo: "Formação Acadêmica",
    edu_usp_title: "Engenharia Mecatrônica",
    edu_usp_period: "Cursando",
    edu_usp_desc:
      "Graduação com ênfase em projetos multidisciplinares, integrando mecânica, eletrônica e computação. Foco em robótica, sistemas embarcados e automação.",
    edu_etel_title: "Técnico em Eletrônica",
    edu_etel_period: "Conclusão prevista: 2026",
    edu_etel_desc:
      "Base sólida em circuitos elétricos, sistemas digitais, microcontroladores, telecomunicações e prototipagem de hardware.",
    edu_ds_title: "Ensino Médio com Técnico em Desenvolvimento de Sistemas",
    edu_ds_period: "Conclusão prevista: 2025",
    edu_ds_desc:
      "Formação integrada com foco em lógica de programação, bancos de dados, desenvolvimento de software e sistemas web.",

    // Contato
    contato_titulo: "Vamos Conversar?",
    contato_desc:
      "Estou sempre aberto a novas ideias, projetos e oportunidades.",
    contato_cv: '<i class="fas fa-file-pdf"></i> Currículo (PDF)',

    // Footer
    footer_text:
      "&copy; 2025 João Victor Mian Valdomiro. Todos os direitos reservados.",

    // Modal
    modal_nav_hint: "Use as setas para navegar.",
  },

  en: {
    // Navbar
    nav_sobre: "About Me",
    nav_projetos: "Projects",
    nav_competencias: "Skills",
    nav_idiomas: "Languages",
    nav_experiencia: "Experience",
    nav_formacao: "Education",
    nav_contato: "Contact",

    // Hero
    hero_role:
      "Mechatronics Engineer | Software Developer | Electronics Technician",

    // About
    sobre_titulo: "About Me",
    sobre_p1:
      'Hello! I am João Victor Mian Valdomiro, a <span class="highlight">Mechatronics Engineering student at the University of São Paulo (USP)</span>, with a strong focus on software development and electronic prototyping. My profile combines engineering fundamentals, programming, and hands-on experimentation to build efficient and reliable real-world solutions.',
    sobre_p2:
      'I hold technical degrees in <strong>Software Development</strong> and <strong>Electronics</strong>. I strongly believe engineering excellence is built through <span class="highlight">hands-on experience</span>, system-level thinking, and continuous improvement. I work with embedded systems, automation, and software-driven solutions, always aiming to solve complex problems and deliver scalable, practical impact.',

    // Projects
    proj_titulo: "Featured Projects",
    btn_ver: '<i class="fas fa-eye"></i> View Project',

    // Truco
    truco_titulo: "Truco Scoreboard – ATmega328P",
    truco_desc:
      '<strong><i class="fas fa-lightbulb"></i> Challenge:</strong> Design a portable digital scoreboard to replace manual scoring. The main technical challenge was implementing <strong>time-division multiplexing</strong> to control a dual 7-segment display directly with an ATmega328P, using transistors for digit switching.',
    truco_tec:
      '<strong><i class="fas fa-tools"></i> Technologies:</strong> ATmega328P Microcontroller, C++ (Arduino IDE), Dual 7-Segment Display, Transistors, Electronic Components.',

    // Smart Liquid
    liquid_titulo: "Smart Liquid",
    liquid_desc:
      '<strong><i class="fas fa-lightbulb"></i> Challenge:</strong> Design an IoT monitoring system integrating multiple sensors with an ESP32. The system collects real-time data and transmits it via Wi-Fi to a web platform, enabling remote monitoring and control.',
    liquid_tec:
      '<strong><i class="fas fa-tools"></i> Technologies:</strong> ESP32 (Wi-Fi), DS18B20 Temperature Sensor, Water Level Sensor, SG90 Servo Motor, C++ (Arduino IDE), HTML, CSS, JavaScript, PHP, MySQL.',

    // Automated Sink
    cuba_titulo: "Automated Touchless Sink",
    cuba_desc:
      '<strong><i class="fas fa-lightbulb"></i> Challenge:</strong> Develop a fully automated, touchless sink focused on hygiene and efficiency. The system integrates presence and infrared sensors to automate lighting, water flow, and hand drying.',
    cuba_tec:
      '<strong><i class="fas fa-tools"></i> Technologies:</strong> PIR Sensor, Infrared Sensors (E3F-DS30C4), Relays, Water Pump.',

    // Skills
    comp_titulo: "My Skills",
    comp_hard: '<i class="fas fa-laptop-code"></i> Technical Skills',
    skills_1:'Arduino, ESP-32, Sensors, Circuits',
    comp_soft: '<i class="fas fa-users"></i> Soft Skills',
    soft_1: '<i class="fas fa-lightbulb"></i> Complex Problem Solving',
    soft_2: '<i class="fas fa-handshake"></i> Team Collaboration',
    soft_3:
      '<i class="fas fa-comments"></i> Technical Communication',
    soft_4: '<i class="fas fa-rocket"></i> Proactivity & Ownership',
    soft_5:
      '<i class="fas fa-brain"></i> Critical Thinking & Adaptability',

    // Languages
    idiomas_titulo: "Languages",
    nome_pt: "Portuguese",  // <--- NOVO (Mudou de Português para Portuguese)
    nome_en: "English",     // <--- NOVO (Mudou de Inglês para English)
    nome_es: "Spanish",     // <--- NOVO (Mudou de Espanhol para Spanish)
    lang_pt: "Native",
    lang_en: "Intermediate",
    lang_es: "Intermediate",

    // Experience
    exp_titulo: "Professional Experience",
    exp_job1_title: "IT Intern",
    exp_job1_desc:
      "Technical support, computer maintenance, and system configuration.",
    exp_job2_title: "Refrigeration Assistant",
    exp_job2_desc:
      "Assisted in installation, maintenance, diagnosis, and repair of refrigeration systems.",

    // Education
    edu_titulo: "Education",
    edu_usp_title: "Mechatronics Engineering",
    edu_usp_period: "In Progress",
    edu_usp_desc:
      "Undergraduate program emphasizing multidisciplinary projects integrating mechanics, electronics, and computing, with a focus on robotics, embedded systems, and advanced automation.",
    edu_etel_title: "Electronics Technician",
    edu_etel_period: "Completed – 2026",
    edu_etel_desc:
      "Strong foundation in electrical circuits, digital systems, microcontrollers, telecommunications, and hardware prototyping.",
    edu_ds_title: "High School with Technical Degree in Software Development",
    edu_ds_period: "Completed – 2025",
    edu_ds_desc:
      "Integrated program focused on programming logic, databases, software development, and web systems.",

    // Contact
    contato_titulo: "Let's Talk?",
    contato_desc:
      "I am always open to discussing new ideas, projects, and opportunities.",
    contato_cv: '<i class="fas fa-file-pdf"></i> Resume (PDF)',

    // Footer
    footer_text:
      "&copy; 2025 João Victor Mian Valdomiro. All rights reserved.",

    // Modal
    modal_nav_hint: "Use the arrows to navigate.",
  },
};


  // --- 2. LÓGICA DE TROCA DE IDIOMA ---
  const flagBtns = document.querySelectorAll(".flag-btn");

  function setLanguage(lang) {
    // Atualiza textos gerais
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key]; // innerHTML permite tags <strong>, <i>, etc.
      }
    });

    // Atualiza botões ativos
    flagBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      }
    });

    // Salva preferência
    localStorage.setItem("language", lang);
  }

  // Event Listeners para bandeiras
  flagBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  // Inicializa Idioma
  const savedLang = localStorage.getItem("language") || "pt";
  setLanguage(savedLang);

  // ===========================================================
  // 3. ROLAGEM SUAVE
  // ===========================================================
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        let navHeight = navbar.offsetHeight;
        let targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===========================================================
  // 4. SCROLL SPY (Highlight Link e Botão Topo)
  // ===========================================================
  function handleScroll() {
    let currentSectionId = "";
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 50;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute("id");
        break;
      }
    }

    const atBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
    if (atBottom) {
      currentSectionId = sections[sections.length - 1].getAttribute("id");
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
      setTimeout(() => {
        scrollTopBtn.style.opacity = "1";
      }, 10);
    } else {
      scrollTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (scrollTopBtn.style.opacity === "0")
          scrollTopBtn.style.display = "none";
      }, 300);
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===========================================================
  // 5. ANIMAÇÃO DE FADE-IN
  // ===========================================================
  const fadeElements = document.querySelectorAll(
    ".section, .projeto-card, .competencia-coluna, .timeline-item, .idioma-item",
  );
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  fadeElements.forEach((el) => sectionObserver.observe(el));

  // ===========================================================
  // 6. MODAIS
  // ===========================================================
  const modalOpenButtons = document.querySelectorAll(".open-modal-btn");
  const modalCloseButtons = document.querySelectorAll(".modal-close");
  const modalOverlays = document.querySelectorAll(".modal-overlay");

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("modal-open");
      document.body.classList.add("no-scroll");
    }
  };
  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove("modal-open");
      if (document.querySelectorAll(".modal.modal-open").length === 0) {
        document.body.classList.remove("no-scroll");
      }
    }
  };

  modalOpenButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(button.dataset.target);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal"));
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      closeModal(overlay.closest(".modal"));
    });
  });

  // ===========================================================
  // 7. CARROSSEL (COM SUPORTE A LEGENDA MULTILINGUE)
  // ===========================================================
  const initCarousel = (carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    const descriptionElement = carousel
      .closest(".modal-content")
      .querySelector(".carousel-description");

    let currentSlide = 0;

    if (slides.length <= 1) {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    }

    const showSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove("active-slide"));
      slides[index].classList.add("active-slide");
      currentSlide = index;

      // Atualiza legenda com base no idioma atual
      updateCarouselDescription();
    };

    const updateCarouselDescription = () => {
      if (!descriptionElement) return;

      const currentLang = localStorage.getItem("language") || "pt";
      const slide = slides[currentSlide];

      // Procura o atributo data-description-pt ou data-description-en
      const desc = slide.getAttribute(`data-description-${currentLang}`);

      if (desc) {
        descriptionElement.textContent = desc;
      } else {
        // Fallback para texto padrão traduzido
        descriptionElement.innerHTML =
          translations[currentLang]["modal_nav_hint"] || "";
      }
    };

    nextButton.addEventListener("click", () => {
      let nextIndex = currentSlide + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      showSlide(nextIndex);
    });

    prevButton.addEventListener("click", () => {
      let prevIndex = currentSlide - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      showSlide(prevIndex);
    });

    // Listener extra: Se o idioma mudar, atualiza a legenda do slide atual
    flagBtns.forEach((btn) => {
      btn.addEventListener("click", updateCarouselDescription);
    });

    showSlide(0);
  };

  document.querySelectorAll(".carousel").forEach(initCarousel);

  // ===========================================================
  // 8. TEMA (LIGHT/DARK)
  // ===========================================================
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = themeToggleBtn.querySelector("i");

  const setTheme = (isLight) => {
    if (isLight) {
      document.body.classList.add("light-mode");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
      if (profilePhoto) profilePhoto.src = "imagens/foto2.jpg";
    } else {
      document.body.classList.remove("light-mode");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
      if (profilePhoto) profilePhoto.src = "imagens/foto.jpg";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  let isLight = savedTheme ? savedTheme === "light" : prefersLight;

  setTheme(isLight);

  themeToggleBtn.addEventListener("click", () => {
    const currentIsLight = document.body.classList.contains("light-mode");
    setTheme(!currentIsLight);
  });

  // ===========================================================
  // 9. MENU HAMBURGER
  // ===========================================================
  const menuIcon = menuToggleBtn.querySelector("i");

  menuToggleBtn.addEventListener("click", () => {
    navLinksList.classList.toggle("active");
    if (navLinksList.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinksList.classList.contains("active")) {
        navLinksList.classList.remove("active");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  });
});
