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

console.log('Luxury Transfer website loaded successfully!');
