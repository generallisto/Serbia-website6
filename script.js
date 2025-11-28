// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Анимация чисел
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        animateNumber(stat, 0, target, 2000, suffix);
    });

    function animateNumber(element, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer для анимаций
    const observers = {};
    
    const animationTypes = ['slide-in-left', 'slide-in-right', 'slide-in-up', 
                           'fade-in-up', 'zoom-in', 'bounce-in', 'flip-in', 'rotate-in'];
    
    animationTypes.forEach(type => {
        observers[type] = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = entry.target.style.animationDelay || '0s';
                    entry.target.classList.add('animate-' + type);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.' + type).forEach(el => {
            observers[type].observe(el);
        });
    });

    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Существующий код навигации...
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active');
            });
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 300);
        }
    }
    
    function updateActiveDot() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            }
        });
    }
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            scrollToSection(this.dataset.section);
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot();
});
// Анимация для новых элементов
const newElementsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Наблюдаем за новыми элементами
document.querySelectorAll('.tip-item, .fact').forEach(el => {
    newElementsObserver.observe(el);
});

// Плавная прокрутка для всех ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация чисел в статистике (если хочешь добавить)
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Запускаем анимацию чисел при загрузке
window.addEventListener('load', animateNumbers);
