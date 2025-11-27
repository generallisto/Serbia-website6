// script.js - Enhanced JavaScript for Serbia website

document.addEventListener('DOMContentLoaded', function() {
    // Основные элементы DOM
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Функция плавной прокрутки к секции
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
    
    // Обновление активной точки навигации
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
    
    // Обработчики для точек навигации
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            scrollToSection(this.dataset.section);
        });
    });
    
    // Обработчики для ссылок навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Intersection Observer для анимаций появления
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Добавляем задержку для последовательного появления
                if (entry.target.classList.contains('stagger')) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.animation = `fadeInUp 0.6s ease-out ${delay}ms both`;
                    }, delay);
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Интерактивная карта регионов
    const regions = document.querySelectorAll('.region');
    regions.forEach(region => {
        region.addEventListener('mouseenter', function() {
            this.classList.add('active');
            // Анимация пульсации для активного региона
            this.style.animation = 'regionPulse 2s infinite';
        });
        
        region.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            this.style.animation = '';
        });
        
        region.addEventListener('click', function() {
            // Показать дополнительную информацию о регионе
            showRegionInfo(this.dataset.region);
        });
    });
    
    // Функция показа информации о регионе
    function showRegionInfo(regionId) {
        const regionData = {
            'vojvodina': {
                title: 'Воеводина',
                capital: 'Нови-Сад',
                population: '1.9 млн',
                area: '21,506 км²',
                description: 'Автономный край на севере Сербии, известный плодородными равнинами, многонациональным населением и богатой культурой.'
            },
            'central-serbia': {
                title: 'Центральная Сербия',
                capital: 'Белград',
                population: '5.1 млн',
                area: '55,968 км²',
                description: 'Историческое ядро страны с столицей Белградом, многочисленными монастырями и горными массивами.'
            },
            'western-serbia': {
                title: 'Западная Сербия',
                capital: 'Ужице',
                population: '1.2 млн',
                area: '26,483 км²',
                description: 'Горный регион с национальными парками Тара и Златибор, идеален для экотуризма и активного отдыха.'
            },
            'southern-serbia': {
                title: 'Южная Сербия',
                capital: 'Ниш',
                population: '1.8 млн',
                area: '15,523 км²',
                description: 'Регион с влиянием средиземноморского климата, известный виноделием, фруктовыми садами и термальными источниками.'
            }
        };
        
        const region = regionData[regionId];
        if (region) {
            // Создаем модальное окно с информацией
            showModal(`
                <h3>${region.title}</h3>
                <div class="region-modal-content">
                    <div class="region-stats">
                        <div class="region-stat">
                            <strong>Столица:</strong> ${region.capital}
                        </div>
                        <div class="region-stat">
                            <strong>Население:</strong> ${region.population}
                        </div>
                        <div class="region-stat">
                            <strong>Площадь:</strong> ${region.area}
                        </div>
                    </div>
                    <p>${region.description}</p>
                </div>
            `);
        }
    }
    
    // Функция показа модального окна
    function showModal(content) {
        // Удаляем существующее модальное окно
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Создаем новое модальное окно
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        // Анимация появления
        setTimeout(() => {
            modalOverlay.classList.add('active');
        }, 10);
        
        // Обработчики закрытия
        const closeBtn = modalOverlay.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            closeModal(modalOverlay);
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal(modalOverlay);
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal(modalOverlay);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // Функция закрытия модального окна
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Калькулятор бюджета
    const budgetCalculator = {
        prices: {
            hostel: 2000,
            hotel3: 5500,
            hotel5: 15000,
            food: 1200,
            transport: 500,
            entertainment: 800
        },
        
        init() {
            const calculateBtn = document.getElementById('calculate-btn');
            if (calculateBtn) {
                calculateBtn.addEventListener('click', () => this.calculate());
            }
            
            // Автоматический расчет при изменении значений
            const inputs = document.querySelectorAll('#days, #travelers, #accommodation');
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    if (this.autoCalculate) {
                        this.calculate();
                    }
                });
            });
        },
        
        calculate() {
            const days = parseInt(document.getElementById('days').value) || 7;
            const travelers = parseInt(document.getElementById('travelers').value) || 2;
            const accommodationType = document.getElementById('accommodation').value;
            
            const accommodationPrice = this.prices[accommodationType];
            const dailyFood = this.prices.food * travelers;
            const dailyTransport = this.prices.transport * travelers;
            const dailyEntertainment = this.prices.entertainment * travelers;
            
            const totalAccommodation = accommodationPrice * days;
            const totalFood = dailyFood * days;
            const totalTransport = dailyTransport * days;
            const totalEntertainment = dailyEntertainment * days;
            
            const totalRSD = totalAccommodation + totalFood + totalTransport + totalEntertainment;
            const totalEUR = Math.round(totalRSD / 117);
            const totalRUB = Math.round(totalRSD / 1.3);
            
            this.displayResult(totalRSD, totalEUR, totalRUB, days, travelers);
        },
        
        displayResult(rsd, eur, rub, days, travelers) {
            const resultDiv = document.getElementById('calculator-result');
            resultDiv.innerHTML = `
                <h4>💰 Расчетный бюджет</h4>
                <p><strong>${days} дней на ${travelers} ${this.getTravelerText(travelers)}</strong></p>
                <div class="budget-breakdown">
                    <div class="budget-total">
                        <span class="currency">RSD:</span> ${this.formatNumber(rsd)} динар
                    </div>
                    <div class="budget-total">
                        <span class="currency">EUR:</span> ≈ ${this.formatNumber(eur)} €
                    </div>
                    <div class="budget-total">
                        <span class="currency">RUB:</span> ≈ ${this.formatNumber(rub)} ₽
                    </div>
                </div>
                <div class="budget-tip">
                    💡 <em>Включает проживание, питание, транспорт и развлечения</em>
                </div>
            `;
            
            // Анимация результата
            resultDiv.style.animation = 'calculatorPop 0.5s ease-out';
        },
        
        getTravelerText(count) {
            if (count === 1) return 'человека';
            if (count >= 2 && count <= 4) return 'человека';
            return 'человек';
        },
        
        formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    };
    
    // Инициализация калькулятора
    budgetCalculator.init();
    
    // Параллакс эффект для героя
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }
    
    // Анимация счетчиков статистики
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Интерактивные карточки еды
    function initFoodCards() {
        const foodCards = document.querySelectorAll('.food-card');
        foodCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px) scale(1)';
                this.style.zIndex = '1';
            });
        });
    }
    
    // Анимация заголовка
    function initTitleAnimation() {
        const title = document.querySelector('.hero-content h1');
        if (title) {
            const text = title.textContent;
            title.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.1}s`;
                span.classList.add('title-char');
                title.appendChild(span);
            });
        }
    }
    
    // Темная/светлая тема (дополнительная функция)
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Переключить тему';
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
        
        // Добавляем кнопку в навигацию
        const nav = document.querySelector('nav');
        if (nav) {
            nav.appendChild(themeToggle);
        }
    }
    
    // Предзагрузка изображений
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            const image = new Image();
            image.src = src;
            image.onload = () => {
                img.src = src;
                img.classList.add('loaded');
            };
        });
    }
    
    // Анимация прокрутки "вверх"
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Наверх';
        document.body.appendChild(scrollBtn);
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
    }
    
    // Инициализация всех функций
    function init() {
        initParallax();
        initCounters();
        initFoodCards();
        initTitleAnimation();
        initThemeToggle();
        initScrollToTop();
        preloadImages();
        
        // Добавляем CSS для анимаций
        addAnimationStyles();
    }
    
    // Динамическое добавление стилей анимаций
    function addAnimationStyles() {
        const styles = `
            <style>
                /* Анимация для символов заголовка */
                .title-char {
                    display: inline-block;
                    opacity: 0;
                    animation: titleCharFade 0.5s ease-out forwards;
                }
                
                @keyframes titleCharFade {
                    from {
                        opacity: 0;
                        transform: translateY(20px) rotate(10deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) rotate(0);
                    }
                }
                
                /* Анимация пульсации регионов */
                @keyframes regionPulse {
                    0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
                }
                
                /* Модальное окно */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .modal-overlay.active {
                    opacity: 1;
                }
                
                .modal-content {
                    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                    padding: 2rem;
                    border-radius: 16px;
                    border: 2px solid #d4af37;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    transform: scale(0.7);
                    transition: transform 0.3s ease;
                }
                
                .modal-overlay.active .modal-content {
                    transform: scale(1);
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: #d4af37;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    background: rgba(212, 175, 55, 0.1);
                }
                
                .region-modal-content {
                    margin-top: 1rem;
                }
                
                .region-stats {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .region-stat {
                    padding: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                }
                
                /* Кнопка переключения темы */
                .theme-toggle {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #f5f5f5;
                    padding: 0.5rem;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    margin-left: 1rem;
                }
                
                .theme-toggle:hover {
                    background: rgba(212, 175, 55, 0.2);
                    border-color: #d4af37;
                }
                
                /* Светлая тема */
                .light-theme {
                    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #d4d4d4 100%);
                    color: #333;
                }
                
                .light-theme .section-title,
                .light-theme .fact-card h3,
                .light-theme .culture-card h3 {
                    color: #333;
                }
                
                .light-theme .section-subtitle,
                .light-theme .fact-card p,
                .light-theme .culture-card p {
                    color: #666;
                }
                
                /* Кнопка прокрутки вверх */
                .scroll-to-top {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: #d4af37;
                    color: #0a0a0a;
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s ease;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .scroll-to-top.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .scroll-to-top:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
                }
                
                /* Анимация для карточек бюджета */
                .budget-breakdown {
                    margin: 1rem 0;
                }
                
                .budget-total {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .budget-total:last-child {
                    border-bottom: none;
                }
                
                .currency {
                    color: #d4af37;
                    font-weight: 600;
                }
                
                .budget-tip {
                    font-size: 0.8rem;
                    color: #b0b0b0;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* Анимация загрузки изображений */
                img[data-src] {
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                
                img.loaded {
                    opacity: 1;
                }
                
                /* Последовательная анимация */
                .stagger {
                    opacity: 0;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    // Инициализация при загрузке
    init();
    
    // Обработчики событий
    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot();
    
    // Оптимизация производительности
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveDot, 100);
    });
    
    // Предотвращение быстрых кликов
    let lastClickTime = 0;
    document.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < 300) {
            e.preventDefault();
            e.stopPropagation();
        }
        lastClickTime = currentTime;
    }, true);
    
    console.log('🇷🇸 Сербия - сайт успешно загружен!');
});

// Дополнительные утилиты
class SerbiaUtils {
    // Форматирование чисел
    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // Конвертация валют
    static convertCurrency(amount, from, to) {
        const rates = {
            'RSD': { 'EUR': 0.0085, 'RUB': 0.77, 'USD': 0.0092 },
            'EUR': { 'RSD': 117, 'RUB': 90, 'USD': 1.08 },
            'RUB': { 'RSD': 1.3, 'EUR': 0.011, 'USD': 0.012 },
            'USD': { 'RSD': 108, 'EUR': 0.92, 'RUB': 83 }
        };
        
        if (rates[from] && rates[from][to]) {
            return amount * rates[from][to];
        }
        return amount;
    }
    
    // Получение текущего курса
    static async getExchangeRate() {
        try {
            // Здесь можно добавить API для получения актуальных курсов
            console.log('Загрузка актуальных курсов валют...');
            return {
                EUR: 117,
                RUB: 1.3,
                USD: 108
            };
        } catch (error) {
            console.warn('Не удалось загрузить курсы валют, используются стандартные значения');
            return {
                EUR: 117,
                RUB: 1.3,
                USD: 108
            };
        }
    }
}

// Экспорт для использования в консоли (для отладки)
window.SerbiaUtils = SerbiaUtils;