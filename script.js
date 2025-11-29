// script.js - Полный исправленный код
document.addEventListener('DOMContentLoaded', function() {
    // Анимация чисел в статистике - ИСПРАВЛЕННАЯ ВЕРСИЯ
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const values = ['8.7M', '88K', '1150+', '5'];
        
        statNumbers.forEach((stat, index) => {
            if (index < values.length) {
                const targetValue = values[index];
                animateNumber(stat, targetValue, 2000);
            }
        });
    }

    function animateNumber(element, finalValue, duration) {
        // Для числовых значений с суффиксами
        const numericMatch = finalValue.match(/(\d+\.?\d*)(.*)/);
        if (numericMatch) {
            const number = parseFloat(numericMatch[1]);
            const suffix = numericMatch[2] || '';
            let startTimestamp = null;
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentValue = Math.floor(progress * number);
                element.textContent = currentValue + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = finalValue; // Финальное значение
                }
            };
            window.requestAnimationFrame(step);
        } else {
            element.textContent = finalValue;
        }
    }

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

    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);

    fadeElements.forEach((element, index) => {
        element.setAttribute('data-delay', index * 100);
        fadeObserver.observe(element);
    });

    // Параллакс эффект для героя
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

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
    const cards = document.querySelectorAll('.culture-card, .place-card, .food-card, .fact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    function initLoadingScreen() {
        if (loadingScreen) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
            });
        }
    }

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    function initMobileMenu() {
        if (mobileMenuBtn && navLinksContainer) {
            mobileMenuBtn.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navLinksContainer.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }

    // Анимация иконок при скролле
    const icons = document.querySelectorAll('.culture-card i, .fact-card i');
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'iconBounce 1s ease';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
            }
        });
    }, { threshold: 0.5 });

    icons.forEach(icon => {
        iconObserver.observe(icon);
    });

    // Добавляем стили для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) scale(1);
            }
            40% {
                transform: translateY(-10px) scale(1.1);
            }
            60% {
                transform: translateY(-5px) scale(1.05);
            }
        }
        
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

        /* Loading Screen Styles */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }

        .loading-content {
            text-align: center;
        }

        .flag-loader {
            width: 80px;
            height: 60px;
            margin: 0 auto 20px;
            position: relative;
            overflow: hidden;
            border-radius: 8px;
        }

        .flag-red, .flag-blue, .flag-white {
            position: absolute;
            width: 100%;
            height: 33.33%;
            left: 0;
        }

        .flag-red {
            top: 0;
            background: #c6363c;
            animation: slideDown 1.5s ease-in-out infinite;
        }

        .flag-blue {
            top: 33.33%;
            background: #0c4076;
            animation: slideDown 1.5s ease-in-out infinite 0.5s;
        }

        .flag-white {
            top: 66.66%;
            background: #ffffff;
            animation: slideDown 1.5s ease-in-out infinite 1s;
        }

        @keyframes slideDown {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }

        /* Mobile Menu Styles */
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
        }

        .mobile-menu-btn span {
            width: 25px;
            height: 3px;
            background: #d4af37;
            margin: 3px 0;
            transition: 0.3s;
        }

        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 1rem 0;
                border-top: 1px solid rgba(212, 175, 55, 0.3);
            }
            
            .nav-links.active {
                display: flex;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);

    // Инициализация всех функций
    function init() {
        initStatsAnimation();
        setActiveSection();
        toggleBackToTop();
        initLoadingScreen();
        initMobileMenu();
        
        // Слушатели событий
        window.addEventListener('scroll', function() {
            setActiveSection();
            headerScroll();
            toggleBackToTop();
            parallaxEffect();
        });

        window.addEventListener('resize', setActiveSection);
        
        // Запускаем начальные анимации
        setTimeout(() => {
            const hero = document.querySelector('.hero');
            if (hero) hero.classList.add('active');
        }, 500);
    }

    // Запускаем инициализацию
    init();

    // Дополнительные анимации для интерактивности
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

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('main-content');
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                setTimeout(() => target.removeAttribute('tabindex'), 1000);
            }
        });
    }
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

// Анимация для счетчиков (альтернативный вариант)
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
