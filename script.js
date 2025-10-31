// Espera o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Dicionário de Traduções (i18n)
     * ATUALIZADO com chaves de acessibilidade
     */
    const translations = {
        "en": {
            "pageTitle": "Nikolas Martins - Software Developer Portfolio",
            "menuToggleLabel": "Open Menu",
            "carouselPrevLabel": "Previous Slide",
            "carouselNextLabel": "Next Slide",
            "audioTogglePlay": "Play",
            "audioTogglePause": "Pause music",
            "navPortfolio": "Portfolio",
            "navHome": "Home",
            "navLinks": "Links",
            "navProjects": "Projects",
            "navAbout": "About Me",
            "homeTitle": "Hello! I'm <span>Nikolas</span>",
            "homeSubtitle": "Software Developer • Automation Specialist • Creative Technologist",
            "homeDescription": "Welcome to my digital space. Here you can explore my latest projects, access important links, and get to know more about my professional journey.",
            "sitesTitle": "Connect With Me",
            "sitesDescription": "Follow me on social and professional platforms to stay updated and connect directly:",
            "sitesBtnLinkedin": "LinkedIn",
            "sitesBtnGithub": "GitHub",
            "projectsTitle": "My Projects",
            "projectsDescription": "Explore some of my recent work and see what I’ve been building. Navigate through the carousel for more details!",
            "proj2Title": "Eco-Life Sustainability",
            "proj2Desc": "An interactive desktop system built with Python and PySide6, designed to encourage sustainable habits and provide users with visual feedback and personalized recommendations.",
            "proj3Title": "Multilingual Translator",
            "proj3Desc": "A cross-language translator desktop app developed in Python, utilizing the MyMemory API and a sleek PySide6 interface for quick and intuitive translation workflows.",
            "proj1Title": "Sanrio Website",
            "proj1Desc": "A static site created using HTML and CSS. It was crafted for experimentation and as a base for visual and responsive design testing.",
            "proj4Title": "Finance Tracker",
            "proj4Desc": "A simple, beautiful, and efficient finance tracker. No more spreadsheets that looked like ice-age contraptions: here, you calculate, see results, and move forward confidently.",
            "proj5Title": "BookManagement API",
            "proj5Desc": "A RESTful API for book management, built with Python and FastAPI. It demonstrates clean architecture, data validation with Pydantic, and automatic API documentation.",
            "proj6Title": "Coming Soon!",
            "proj6Desc": "...",
            "projBtnView": "View Project",
            "aboutTitle": "About Me",
            "aboutDesc1": "I am an Information Systems undergraduate student at PUC Minas (2024-2027), with a strong passion for artificial intelligence and software development.",
            "aboutDesc2": "I have an analytical and reflective profile, but I am also highly collaborative and enjoy learning from those around me.",
            "aboutDesc3": "I am driven to unite technology, creativity, and purpose, often exploring related themes such as cinematography, nature, and sustainability.",
            "aboutSkillsTitle": "Key Skills:",
            "skillPy": "Python, Django, Flask",
            "skillDb": "SQL/NoSQL",
            "skillGit": "Git & GitHub",
            "skillNet": ".NET & C#",
            "skillWeb": "HTML5 & CSS3",
            "skillJs": "JavaScript",
            "skillAi": "Artificial Intelligence (AI)"
        },
        "pt": {
            "pageTitle": "Nikolas Martins - Portfólio de Desenvolvedor",
            "menuToggleLabel": "Abrir Menu",
            "carouselPrevLabel": "Slide Anterior",
            "carouselNextLabel": "Próximo Slide",
            "audioTogglePlay": "Tocar música",
            "audioTogglePause": "Pausar música",
            "navPortfolio": "Portfólio",
            "navHome": "Início",
            "navLinks": "Links",
            "navProjects": "Projetos",
            "navAbout": "Sobre Mim",
            "homeTitle": "Olá! Eu sou o <span>Nikolas</span>",
            "homeSubtitle": "Desenvolvedor de Software • Especialista em Automação • Tecnologista Criativo",
            "homeDescription": "Bem-vindo ao meu espaço digital. Aqui você pode explorar meus projetos mais recentes, acessar links importantes e conhecer mais sobre minha jornada profissional.",
            "sitesTitle": "Conecte-se Comigo",
            "sitesDescription": "Siga-me nas plataformas sociais e profissionais para se manter atualizado e se conectar diretamente:",
            "sitesBtnLinkedin": "LinkedIn",
            "sitesBtnGithub": "GitHub",
            "projectsTitle": "Meus Projetos",
            "projectsDescription": "Explore alguns dos meus trabalhos recentes e veja o que eu tenho construído. Navegue pelo carrossel para mais detalhes!",
            "proj2Title": "Eco-Vida Sustentabilidade",
            "proj2Desc": "Um sistema desktop interativo feito com Python e PySide6, projetado para incentivar hábitos sustentáveis e fornecer aos usuários feedback visual e recomendações personalizadas.",
            "proj3Title": "Tradutor Multilíngue",
            "proj3Desc": "Um aplicativo desktop tradutor desenvolvido em Python, utilizando a API MyMemory e uma interface elegante em PySide6 para fluxos de trabalho de tradução rápidos e intuitivos.",
            "proj1Title": "Website Sanrio",
            "proj1Desc": "Um site estático criado com HTML e CSS. Foi feito para experimentação e como base para testes de design visual e responsivo.",
            "proj4Title": "Finance Tracker",
            "proj4Desc": "Um tracker de finanças simples, bonito e eficiente. Chega de planilhas que mais pareciam gambiarras da era do gelo: aqui, você calcula, vê resultados e segue confiante no dia a dia.",
            "proj5Title": "BookManagement API",
            "proj5Desc": "Uma API RESTful para gerenciamento de livros, construída com Python e FastAPI. Demonstra arquitetura limpa, validação de dados com Pydantic e documentação automática.",
            "proj6Title": "Em Breve!",
            "proj6Desc": "...",
            "projBtnView": "Ver Projeto",
            "aboutTitle": "Sobre Mim",
            "aboutDesc1": "Sou graduando em Sistemas de Informação pela PUC Minas (2024-2027), com grande interesse em inteligência artificial e desenvolvimento de software.",
            "aboutDesc2": "Tenho um perfil analítico e reflexivo, mas também sou colaborativo e gosto de aprender com as pessoas ao meu redor.",
            "aboutDesc3": "Procuro unir tecnologia, criatividade e propósito, explorando temas como cinematografia, natureza e sustentabilidade.",
            "aboutSkillsTitle": "Principais Habilidades:",
            "skillPy": "Python, Django, Flask",
            "skillDb": "SQL/NoSQL",
            "skillGit": "Git & GitHub",
            "skillNet": ".NET & C#",
            "skillWeb": "HTML5 & CSS3",
            "skillJs": "JavaScript",
            "skillAi": "Inteligência Artificial (IA)"
        }
    };

    // Define o idioma inicial
    let currentLang = 'en'; 

    /**
     * Lógica para alternar o idioma (COM ANIMAÇÃO)
     */
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    const animationDuration = 300; // Duração em ms (deve ser igual ao CSS)

    const updateLanguage = (lang) => {
        
        // 1. Inicia o "Fade Out"
        elementsToTranslate.forEach(element => {
            element.classList.add('text-fading');
        });

        // 2. Espera a animação de fade-out terminar
        setTimeout(() => {
            // 3. Atualiza todo o texto
            document.documentElement.lang = lang;
            document.title = translations[lang].pageTitle;
            
            elementsToTranslate.forEach(element => {
                const key = element.dataset.key;
                if (translations[lang][key]) {
                    // Atualiza o texto
                    if (key === 'homeTitle') {
                        element.innerHTML = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }

                    // Atualiza também os aria-labels (para acessibilidade)
                    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                        if (key === 'menuToggleLabel' || key === 'carouselPrevLabel' || key === 'carouselNextLabel' || key.startsWith('audioToggle')) {
                            element.setAttribute('aria-label', translations[lang][key]);
                        }
                    }
                }
            });

            // 4. Inicia o "Fade In"
            elementsToTranslate.forEach(element => {
                element.classList.remove('text-fading');
            });

        }, animationDuration); // Espera a transição de 300ms
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'pt' : 'en';
            updateLanguage(currentLang);
        });
    }

    // Define o idioma inicial (sem animação na primeira carga)
    const initialLoadUpdate = (lang) => {
        document.documentElement.lang = lang;
        document.title = translations[lang].pageTitle;
        elementsToTranslate.forEach(element => {
            const key = element.dataset.key;
            if (translations[lang][key]) {
                if (key === 'homeTitle') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
                // Define os aria-labels iniciais
                if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                    if (key === 'menuToggleLabel' || key === 'carouselPrevLabel' || key === 'carouselNextLabel' || key.startsWith('audioToggle')) {
                        element.setAttribute('aria-label', translations[lang][key]);
                    }
                }
            }
        });
    };
    initialLoadUpdate(currentLang);


    /**
     * Lógica para o Menu de Navegação (Scroll Suave e Ativação)
     */
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 70; 

    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            const navMenu = document.querySelector('.nav-menu');
            const menuToggleIcon = document.querySelector('.menu-toggle i');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggleIcon) {
                    menuToggleIcon.classList.remove('fa-times');
                    menuToggleIcon.classList.add('fa-bars');
                    // Atualiza o aria-label ao fechar
                    document.querySelector('.menu-toggle').setAttribute('aria-label', translations[currentLang]['menuToggleLabel']);
                }
            }
            const targetId = this.getAttribute('href'); 
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight, 
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Lógica do Scroll Spy (Atualiza o link 'active' ao rolar a página)
     */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - headerHeight - 50) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });


    /**
     * Lógica do Carrossel de Projetos
     */
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const carouselSlides = Array.from(carouselTrack.children);
        const nextButton = document.querySelector('.carousel-nav-btn.next');
        const prevButton = document.querySelector('.carousel-nav-btn.prev');

        if (carouselSlides.length === 0) return; 

        let slideWidth = carouselSlides[0].getBoundingClientRect().width;
        let slideIndex = 0;

        const moveToSlide = (targetIndex) => {
            if (targetIndex < 0) {
                targetIndex = carouselSlides.length - 1; 
            } else if (targetIndex >= carouselSlides.length) {
                targetIndex = 0; 
            }
            carouselTrack.style.transition = 'transform 0.4s ease-in-out'; 
            carouselTrack.style.transform = 'translateX(-' + targetIndex * slideWidth + 'px)';
            slideIndex = targetIndex;
        };

        window.addEventListener('resize', () => {
            slideWidth = carouselSlides[0].getBoundingClientRect().width;
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = 'translateX(-' + slideIndex * slideWidth + 'px)';
        });

        nextButton.addEventListener('click', () => {
            moveToSlide(slideIndex + 1);
        });
        prevButton.addEventListener('click', () => {
            moveToSlide(slideIndex - 1);
        });
        document.addEventListener('keydown', (e) => {
            const carouselRect = carouselTrack.getBoundingClientRect();
            const isInView = carouselRect.top < window.innerHeight && carouselRect.bottom >= 0;
            if (isInView) {
                if (e.key === 'ArrowRight') {
                    moveToSlide(slideIndex + 1);
                } else if (e.key === 'ArrowLeft') {
                    moveToSlide(slideIndex - 1);
                }
            }
        });
    }

    /**
     * Lógica do Menu Mobile (Hamburger)
     */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    // Atualiza aria-label para "Fechar Menu" (precisaria adicionar no translations)
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    // Atualiza aria-label para "Abrir Menu"
                    menuToggle.setAttribute('aria-label', translations[currentLang]['menuToggleLabel']);
                }
            }
        });
    }

    /**
     * LÓGICA: Lightbox (Modal de Imagem)
     */
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const projectImages = document.querySelectorAll('.carousel-slide .clickable-img');

    if (lightboxOverlay && lightboxImg && lightboxCloseBtn && projectImages.length > 0) {
        const openLightbox = (e) => {
            lightboxImg.src = e.target.src;
            lightboxOverlay.style.display = 'flex';
        };
        const closeLightbox = () => {
            lightboxOverlay.style.display = 'none';
            lightboxImg.src = ''; 
        };
        projectImages.forEach(img => {
            img.addEventListener('click', openLightbox);
        });
        lightboxCloseBtn.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) { 
                closeLightbox();
            }
        });
    }

    /**
     * NOVA LÓGICA: Controle de Áudio
     */
    const audio = document.getElementById('bg-music');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');

    if (audio && audioToggleBtn) {
        const audioIcon = audioToggleBtn.querySelector('i');

        audioToggleBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(error => {
                    // O play() pode falhar se o usuário não interagiu com a página
                    console.warn("Audio play failed. User interaction might be required.", error);
                });
                audioIcon.classList.remove('fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
                audioToggleBtn.setAttribute('data-key', 'audioTogglePause');
                audioToggleBtn.setAttribute('aria-label', translations[currentLang]['audioTogglePause']);
            } else {
                audio.pause();
                audioIcon.classList.remove('fa-volume-up');
                audioIcon.classList.add('fa-volume-mute');
                audioToggleBtn.setAttribute('data-key', 'audioTogglePlay');
                audioToggleBtn.setAttribute('aria-label', translations[currentLang]['audioTogglePlay']);
            }
        });
    }
});