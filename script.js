// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Car Slider on Hero Section
let currentSlide = 0;
const slides = document.querySelectorAll('.car-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 4 seconds
if (slides.length > 0) {
    setInterval(nextSlide, 4000);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Моля попълнете всички задължителни полета.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Моля въведете валиден имейл адрес.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Изпращане...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would normally send the data to your server
            console.log('Form data:', {
                name,
                email,
                phone,
                subject,
                message
            });
            
            showNotification('Съобщението е изпратено успешно! Ще се свържем с вас скоро.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .price-card, .feature, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Call button functionality
const callButton = document.getElementById('callButton');
if (callButton) {
    callButton.addEventListener('click', () => {
        const phoneNumber = '+359888123456';
        
        // Check if it's a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Open phone dialer on mobile
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // Show phone number modal on desktop
            showPhoneModal(phoneNumber);
        }
    });
}

// Phone modal functionality
function showPhoneModal(phoneNumber) {
    // Remove existing modal
    const existingModal = document.querySelector('.phone-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'phone-modal';
    modal.innerHTML = `
        <div class="phone-modal-overlay">
            <div class="phone-modal-content">
                <div class="phone-modal-header">
                    <h3>Обадете се сега</h3>
                    <button class="phone-modal-close">&times;</button>
                </div>
                <div class="phone-modal-body">
                    <div class="phone-number">
                        <i class="fas fa-phone"></i>
                        <span>${phoneNumber}</span>
                    </div>
                    <p>Натиснете на номера за да го копирате</p>
                    <button class="btn btn-primary copy-phone" data-phone="${phoneNumber}">
                        <i class="fas fa-copy"></i>
                        Копирай номера
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles to CSS
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .phone-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        }
        
        .phone-modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.3s ease;
        }
        
        .phone-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .phone-modal-header h3 {
            margin: 0;
            color: #1a1a1a;
            font-size: 1.5rem;
        }
        
        .phone-modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .phone-modal-close:hover {
            color: #007bff;
        }
        
        .phone-number {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .phone-number:hover {
            background: #e9ecef;
        }
        
        .phone-number i {
            font-size: 1.5rem;
            color: #007bff;
        }
        
        .phone-number span {
            font-size: 1.3rem;
            font-weight: 600;
            color: #1a1a1a;
        }
        
        .phone-modal-body p {
            color: #666;
            margin-bottom: 1.5rem;
        }
        
        .copy-phone {
            width: 100%;
            padding: 12px 20px;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Close modal functionality
    const closeButton = modal.querySelector('.phone-modal-close');
    const overlay = modal.querySelector('.phone-modal-overlay');
    
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
    
    // Copy phone number functionality
    const copyButton = modal.querySelector('.copy-phone');
    const phoneSpan = modal.querySelector('.phone-number span');
    
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            copyButton.innerHTML = '<i class="fas fa-check"></i> Копиран!';
            copyButton.style.background = '#28a745';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i> Копирай номера';
                copyButton.style.background = '#007bff';
            }, 2000);
        });
    });
    
    phoneSpan.addEventListener('click', () => {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            phoneSpan.textContent = 'Копиран!';
            phoneSpan.style.color = '#28a745';
            setTimeout(() => {
                phoneSpan.textContent = phoneNumber;
                phoneSpan.style.color = '#1a1a1a';
            }, 2000);
        });
    });
}

// Price card hover effects (if they still exist)
document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('featured')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// Loading animation for images - only for car slider images
document.querySelectorAll('.car-slide img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    // Only apply opacity animation if image is not already loaded
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    }
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-3px)';
    backToTopButton.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.4)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';
});

// Language translations
const translations = {
    bg: {
        // Navigation
        'nav-home': 'Начало',
        'nav-about': 'За нас',
        'nav-services': 'Услуги',
        'nav-prices': 'Запитване за цена',
        'nav-contact': 'Контакти',
        
        // Hero Section
        'hero-title': 'Луксозни трансфери от летище',
        'hero-subtitle': 'Пътувайте в стил и комфорт с нашите нови премиум автомобили',
        'hero-description': 'Превозваме от София / Пловдив до всяка точка в България + близките страни(Румъния, Гърция, Турция)',
        'btn-price-inquiry': 'Запитване за цена',
        'btn-reserve': 'Резервирай',
        
        // About Section
        'about-title': 'За нас',
        'about-subtitle': 'Вашият надежден партньор за луксозни трансфери',
        'about-description': 'Специализираме се в предоставянето на премиум трансфер услуги от летище София и летище Пловдив. Нашата флотилия включва най-новите луксозни автомобили, за да гарантираме максимален комфорт и стил при всяко пътуване.',
        'feature-cars-title': 'Луксозни автомобили',
        'feature-cars-desc': 'от 2024 година',
        'feature-24h-title': '24/7 на разположение',
        'feature-24h-desc': 'Готови сме да ви обслужим по всяко време',
        'feature-safety-title': 'Безопасност',
        'feature-safety-desc': 'Лицензирани шофьори с богат опит',
        
        // Services Section
        'services-title': 'Нашите услуги',
        'service-sofia-title': 'Трансфер от летище София',
        'service-sofia-desc': 'Бърз и комфортен трансфер от летище София до всяка точка в града или страната',
        'service-plovdiv-title': 'Трансфер от летище Пловдив',
        'service-plovdiv-desc': 'Луксозен трансфер от летище Пловдив с професионални шофьори',
        'service-intercity-title': 'Междуградски трансфери',
        'service-intercity-desc': 'Комфортни пътувания между градовете в България и близките страни(Румъния, Гърция, Турция)',
        'service-feature-luggage': 'Помощ с багажа',
        'service-feature-comfort': 'Максимален комфорт',
        'service-feature-distance': 'Дълги разстояния',
        'service-feature-rest': 'Спиране за почивка',
        
        // Price Inquiry Section
        'prices-title': 'Запитване за цена',
        'prices-subtitle': 'Получете персонализирана оферта',
        'prices-description': 'Всяко пътуване е уникално и заслужава перфектна цена. Свържете се с нас за персонализирана оферта според вашите нужди.',
        'feature-calc-title': 'Точно изчисление',
        'feature-calc-desc': 'Цена според разстоянието и броя пътници',
        'feature-fast-title': 'Бърз отговор',
        'feature-fast-desc': 'Получете оферта в рамките на 15 минути',
        'feature-discount-title': 'Специални отстъпки',
        'feature-discount-desc': 'За редовни клиенти и групови резервации',
        'call-title': 'Обадете се сега',
        'call-description': 'Получете незабавна оферта за вашия трансфер',
        'btn-call': 'Обадете се',
        'call-note': 'Безплатна консултация и оферта',
        
        // Footer
        'footer-about': 'Вашият надежден партньор за луксозни трансфери от летище София и Пловдив.',
        'footer-contacts': 'Контакти',
        'footer-services': 'Услуги',
        'service-sofia-footer': 'Трансфер от летище София',
        'service-plovdiv-footer': 'Трансфер от летище Пловдив',
        'service-intercity-footer': 'Междуградски трансфери',
        'service-international-footer': 'Международни трансфери',
        'footer-copyright': '© 2025 Luxury Transfer. Всички права запазени.'
    },
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-services': 'Services',
        'nav-prices': 'Price Inquiry',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Luxury Airport Transfers',
        'hero-subtitle': 'Travel in style and comfort with our new premium vehicles',
        'hero-description': 'We transport from Sofia / Plovdiv to any point in Bulgaria + neighboring countries (Romania, Greece, Turkey)',
        'btn-price-inquiry': 'Price Inquiry',
        'btn-reserve': 'Reserve',
        
        // About Section
        'about-title': 'About Us',
        'about-subtitle': 'Your reliable partner for luxury transfers',
        'about-description': 'We specialize in providing premium transfer services from Sofia Airport and Plovdiv Airport. Our fleet includes the latest luxury vehicles to ensure maximum comfort and style for every journey.',
        'feature-cars-title': 'Luxury Vehicles',
        'feature-cars-desc': 'from 2024',
        'feature-24h-title': '24/7 Available',
        'feature-24h-desc': 'We are ready to serve you at any time',
        'feature-safety-title': 'Safety',
        'feature-safety-desc': 'Licensed drivers with rich experience',
        
        // Services Section
        'services-title': 'Our Services',
        'service-sofia-title': 'Sofia Airport Transfer',
        'service-sofia-desc': 'Fast and comfortable transfer from Sofia Airport to any point in the city or country',
        'service-plovdiv-title': 'Plovdiv Airport Transfer',
        'service-plovdiv-desc': 'Luxury transfer from Plovdiv Airport with professional drivers',
        'service-intercity-title': 'Intercity Transfers',
        'service-intercity-desc': 'Comfortable journeys between cities in Bulgaria and neighboring countries (Romania, Greece, Turkey)',
        'service-feature-luggage': 'Luggage assistance',
        'service-feature-comfort': 'Maximum comfort',
        'service-feature-distance': 'Long distances',
        'service-feature-rest': 'Rest stops',
        
        // Price Inquiry Section
        'prices-title': 'Price Inquiry',
        'prices-subtitle': 'Get a personalized quote',
        'prices-description': 'Every journey is unique and deserves a perfect price. Contact us for a personalized quote according to your needs.',
        'feature-calc-title': 'Accurate calculation',
        'feature-calc-desc': 'Price based on distance and number of passengers',
        'feature-fast-title': 'Fast response',
        'feature-fast-desc': 'Get a quote within 15 minutes',
        'feature-discount-title': 'Special discounts',
        'feature-discount-desc': 'For regular customers and group reservations',
        'call-title': 'Call Now',
        'call-description': 'Get an immediate quote for your transfer',
        'btn-call': 'Call Now',
        'call-note': 'Free consultation and quote',
        
        // Footer
        'footer-about': 'Your reliable partner for luxury transfers from Sofia and Plovdiv airports.',
        'footer-contacts': 'Contacts',
        'footer-services': 'Services',
        'service-sofia-footer': 'Sofia Airport Transfer',
        'service-plovdiv-footer': 'Plovdiv Airport Transfer',
        'service-intercity-footer': 'Intercity Transfers',
        'service-international-footer': 'International Transfers',
        'footer-copyright': '© 2025 Luxury Transfer. All rights reserved.'
    }
};

// Language Selector Functionality
const languageBtns = document.querySelectorAll('.language-btn');
const languageDropdowns = document.querySelectorAll('.language-dropdown');
const languageMenus = document.querySelectorAll('.language-menu');
const currentLangElements = document.querySelectorAll('.current-lang');

// Toggle language dropdown
languageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.closest('.language-dropdown');
        dropdown.classList.toggle('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    languageDropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Language selection
const languageLinks = document.querySelectorAll('.language-menu a');
languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = link.getAttribute('data-lang');
        
        // Update active state
        languageLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update current language display
        currentLangElements.forEach(el => {
            el.textContent = selectedLang.toUpperCase();
        });
        
        // Close dropdowns
        languageDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Change language
        changeLanguage(selectedLang);
        
        // Show notification
        const notificationText = selectedLang === 'bg' ? 'Езикът е променен на български' : 'Language changed to English';
        showNotification(notificationText, 'success');
    });
});

// Function to change language
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update page title
    const title = lang === 'bg' ? 'Luxury Transfer - Луксозни трансфери от летище София и Пловдив' : 'Luxury Transfer - Luxury Transfers from Sofia and Plovdiv Airports';
    document.title = title;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

console.log('Luxury Transfer website loaded successfully!');

