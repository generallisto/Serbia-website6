// script.js - Упрощенный и рабочий
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll для навигации
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Активное состояние секций и точек навигации
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');

    function setActiveSection() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Обновляем активную точку навигации
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            }
        });
    }

    // Клик по точкам навигации
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация хедера при скролле
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    function headerScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }

    // Кнопка "Наверх"
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Вернуться наверх');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4af37, #f7ef8a);
        border: none;
        border-radius: 50%;
        color: #0a0a0a;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(backToTop);

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Показ/скрытие кнопки "Наверх"
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }

    // Анимация карточек при наведении
    const cards = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Анимация для кнопки CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Параллакс эффект для героя
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card, .stat-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Изначально скрываем элементы
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        fadeObserver.observe(element);
    });

    // Инициализация всех функций
    function init() {
        setActiveSection();
        toggleBackToTop();
        
        // Слушатели событий
        window.addEventListener('scroll', function() {
            setActiveSection();
            headerScroll();
            toggleBackToTop();
            parallaxEffect();
        });

        window.addEventListener('resize', setActiveSection);
    }

    // Запускаем инициализацию
    init();

    // Добавляем стили для анимаций
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top:hover {
            animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-5px);
            }
            60% {
                transform: translateY(-2px);
            }
        }

        /* Плавное появление элементов */
        .culture-card,
        .place-card, 
        .food-card,
        .fact-card,
        .stat-card {
            transition: all 0.6s ease !important;
        }
    `;
    document.head.appendChild(style);
});

// Дополнительные утилиты
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Анимация для чисел (если понадобится)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
