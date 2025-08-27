// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Car Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".car-slide");
function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
if (slides.length > 0) setInterval(nextSlide, 4000);

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (!question) return;
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((other) => other.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

// ✅ Contact Form Handling (WhatsApp & Viber) — simplified: phone-only chat
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const waBtn = contactForm.querySelector('[data-platform="whatsapp"]');
  const viberBtn = contactForm.querySelector('[data-platform="viber"]');
  const phoneField = contactForm.querySelector("#phone");

  const buildText = () => {
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const subject = formData.get("subject") || "";
    const message = formData.get("message") || "";

    return `Здравейте, казвам се ${name}.
Телефон: ${phone ? phone : "не е посочен"}
Тема: ${subject ? subject : "няма"}
Съобщение: ${message}`;
  };

  // Номерът в международен формат БЕЗ +
  const number = "359884497938"; // +359 88 449 7938

  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const phoneVal = phoneField.value.trim();
      if (!phoneVal) {
        showNotification(
          "Моля въведете телефонен номер, за да изпратите съобщение през WhatsApp.",
          "error"
        );
        return;
      }

      const text = buildText();
      const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }

  if (viberBtn) {
    viberBtn.addEventListener("click", () => {
      const phoneVal = phoneField.value.trim();
      if (!phoneVal) {
        showNotification(
          "Моля въведете телефонен номер, за да изпратите съобщение през Viber.",
          "error"
        );
        return;
      }

      const text = buildText();
      const url = `viber://chat?number=%2B${number}&text=${encodeURIComponent(
        text
      )}`;
      window.location.href = url;
    });
  }

  // Ensure phone is required for chat
  if (phoneField) phoneField.required = true;
}

// Notification system (за други съобщения)
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#28a745"
            : type === "error"
            ? "#dc3545"
            : "#007bff"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
  document.body.appendChild(notification);

  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => notification.remove());
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  }
});

// Intersection Observer
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .price-card, .feature, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
  // Ensure phone field is required for contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const phoneField = contactForm.querySelector("#phone");
    if (phoneField) phoneField.required = true;
    // ensure label-phone translation includes '*' (translations already include it)
    const phoneLabel = document.querySelector('[data-translate="label-phone"]');
    if (phoneLabel && !phoneLabel.textContent.includes("*")) {
      phoneLabel.textContent =
        (translations[document.documentElement.lang] || translations["en"])[
          "label-phone"
        ] || phoneLabel.textContent + " *";
    }
  }
});

// Back to top button
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = "back-to-top";
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

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.opacity = "1";
    backToTopButton.style.visibility = "visible";
  } else {
    backToTopButton.style.opacity = "0";
    backToTopButton.style.visibility = "hidden";
  }
});
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================
// Language Translations
// ==========================
const translations = {
  bg: {
    // Navigation
    "nav-home": "Начало",
    "nav-about": "За нас",
    "nav-services": "Услуги",
    "nav-prices": "Запитване за цена",
    "nav-contact": "Контакти",
    "nav-brand": "Luxury Transfer",
    // Hero Section
    "hero-title": "Луксозни трансфери от летище",
    "hero-subtitle":
      "Пътувайте в стил и комфорт с нашите нови премиум автомобили",
    "hero-description":
      "Превозваме от София / Пловдив до всяка точка в България + близките страни(Румъния, Гърция, Турция)",
    "btn-price-inquiry": "Запитване за цена",
    "btn-reserve": "Резервирай",
    // About Section
    "about-title": "За нас",
    "about-subtitle": "Вашият надежден партньор за луксозни трансфери",
    "about-description":
      "Специализираме се в предоставянето на премиум трансфер услуги от летище София и летище Пловдив. Нашата флотилия включва най-новите луксозни автомобили, за да гарантираме максимален комфорт и стил при всяко пътуване.",
    "feature-cars-title": "Луксозни автомобили",
    "feature-cars-desc": "от 2024 година",
    "feature-24h-title": "24/7 на разположение",
    "feature-24h-desc": "Готови сме да ви обслужим по всяко време",
    "feature-safety-title": "Безопасност",
    "feature-safety-desc": "Лицензирани шофьори с богат опит",
    "service-drink-title": "Drink&Drive",
    "service-drink-desc":
      "Не карайте пили — обадете ни се и ние ще ви върнем безопасно у дома.",
    // Services Section
    "services-title": "Нашите услуги",
    "service-sofia-title": "Трансфер от летище София",
    "service-sofia-desc":
      "Бърз и комфортен трансфер от летище София до всяка точка в града или страната",
    "service-plovdiv-title": "Трансфер от летище Пловдив",
    "service-plovdiv-desc":
      "Луксозен трансфер от летище Пловдив с професионални шофьори",
    "service-intercity-title": "Междуградски трансфери",
    "service-intercity-desc":
      "Комфортни пътувания между градовете в България и близките страни(Румъния, Гърция, Турция)",
    "service-feature-luggage": "Помощ с багажа",
    "service-feature-comfort": "Максимален комфорт",
    "service-feature-distance": "Дълги разстояния",
    "service-feature-rest": "Спиране за почивка",
    // Price Inquiry Section
    "prices-title": "Запитване за цена",
    "prices-subtitle": "Получете персонализирана оферта",
    "prices-description":
      "Всяко пътуване е уникално и заслужава перфектна цена. Свържете се с нас за персонализирана оферта според вашите нужди.",
    "feature-calc-title": "Точно изчисление",
    "feature-calc-desc": "Цена според разстоянието и броя пътници",
    "feature-fast-title": "Бърз отговор",
    "feature-fast-desc": "Получете оферта в рамките на 15 минути",
    "feature-discount-title": "Специални отстъпки",
    "feature-discount-desc": "За редовни клиенти и групови резервации",
    "call-title": "Обадете се сега",
    "call-description": "Получете незабавна оферта за вашия трансфер",
    "btn-call": "Обадете се",
    "call-note": "Безплатна консултация и оферта",
    // Footer
    "footer-about":
      "Вашият надежден партньор за луксозни трансфери от летище София и Пловдив.",
    "footer-contacts": "Контакти",
    "footer-services": "Услуги",
    "service-sofia-footer": "Трансфер от летище София",
    "service-plovdiv-footer": "Трансфер от летище Пловдив",
    "service-intercity-footer": "Междуградски трансфери",
    "service-international-footer": "Международни трансфери",
    "footer-copyright": "© 2025 Luxury Transfer. Всички права запазени.",
    // Contact page specific
    "contact-hero-title": "Свържете се с нас",
    "contact-hero-subtitle":
      "Готови сме да отговорим на всички ваши въпроси и да организираме перфектния трансфер за вас",
    "contact-info-title": "Нашите контакти",
    "contact-form-title": "Изпратете запитване",
    "contact-phone": "Телефон",
    "contact-email": "Имейл",
    "contact-address": "Адрес",
    "contact-hours": "Работно време",
    "hours-available": "24/7 на разположение",
    "hours-reservations": "Резервации онлайн - 24/7",
    "form-note":
      "За най-бърз отговор използвайте WhatsApp или Viber — попълнете име, телефон и съобщение.",
    "label-name": "Име *",
    "label-phone": "Телефон *",
    "label-subject": "Тема",
    "subject-placeholder": "Изберете тема",
    "subject-reservation": "Резервация",
    "subject-pricing": "Цени",
    "subject-service": "Услуги",
    "subject-complaint": "Жалба",
    "subject-other": "Друго",
    "label-message": "Съобщение *",
    "message-placeholder": "Опишете вашето запитване или проблем...",
    "btn-whatsapp": "Изпрати по WhatsApp",
    "btn-viber": "Изпрати по Viber",
    // FAQ
    "faq-title": "Често задавани въпроси",
    "faq-q1": "Как мога да резервирам трансфер?",
    "faq-a1":
      "Можете да резервирате трансфер чрез телефон, имейл или чрез нашата контактна форма. Препоръчваме резервацията да се направи поне 24 часа преди пътуването.",
    "faq-q2": "Колко време предварително трябва да резервирам?",
    "faq-a2":
      "За най-добро обслужване препоръчваме резервация поне 24 часа предварително. За спешни случаи обаче можем да организираме трансфер и в рамките на няколко часа.",
    "faq-q3": "Какво включва цената на трансфера?",
    "faq-a3":
      "Цената включва трансфера от точка А до точка Б, среща в летището и помощ с багажа.",
    "faq-q4": "Работите ли 24/7?",
    "faq-a4":
      "Да, нашите услуги са на разположение 24 часа на ден, 7 дни в седмицата, включително празници и почивни дни.",
    // Drink & Drive page
    "nav-drink": "Drink&Drive",
    "drink-title": "Drink & Drive",
    "drink-hero-title": "Не карайте пили",
    "drink-hero-sub":
      "Ако сте пил(а), не рискувайте — обадете ни се и ние ще ви закараме безопасно.",
    "drink-feature-1": "24/7",
    "drink-feature-2": "Професионални шофьори",
    "drink-feature-3": "Безопасен транспорт",
    "drink-note": "Ние сме тук за да ви върнем безопасно у дома.",
    "drink-steps-title": "Как работи",
    "drink-step1-title": "Обадете ни се",
    "drink-step1-desc":
      "Позвънете или натиснете бутона 'Обадете се' и ние ще сме готови да приемем заявката ви.",
    "drink-step2-title": "Пристигане",
    "drink-step2-desc":
      "Професионален шофьор ще пристигне до вас бързо и ще ви придружи до автомобила.",
    "drink-step3-title": "Безопасно вкъщи",
    "drink-step3-desc":
      "Ще ви закараме директно до вкъщи или желан адрес — безопасно и дискретно.",
  },
  en: {
    // Navigation
    "nav-home": "Home",
    "nav-about": "About",
    "nav-services": "Services",
    "nav-prices": "Price Inquiry",
    "nav-contact": "Contact",
    "nav-brand": "Luxury Transfer",
    // Hero Section
    "hero-title": "Luxury Airport Transfers",
    "hero-subtitle":
      "Travel in style and comfort with our new premium vehicles",
    "hero-description":
      "We transport from Sofia / Plovdiv to any point in Bulgaria + neighboring countries (Romania, Greece, Turkey)",
    "btn-price-inquiry": "Price Inquiry",
    "btn-reserve": "Reserve",
    // About
    "about-title": "About Us",
    "about-subtitle": "Your reliable partner for luxury transfers",
    "about-description":
      "We specialize in providing premium transfer services from Sofia Airport and Plovdiv Airport. Our fleet includes the latest luxury vehicles to ensure maximum comfort and style for every journey.",
    "feature-cars-title": "Luxury Vehicles",
    "feature-cars-desc": "from 2024",
    "feature-24h-title": "24/7 Available",
    "feature-24h-desc": "We are ready to serve you at any time",
    "feature-safety-title": "Safety",
    "feature-safety-desc": "Licensed drivers with rich experience",
    "service-drink-title": "Drink&Drive",
    "service-drink-desc":
      "Don't drive drunk — call us and we'll get you home safely.",
    // Services
    "services-title": "Our Services",
    "service-sofia-title": "Sofia Airport Transfer",
    "service-sofia-desc":
      "Fast and comfortable transfer from Sofia Airport to any point in the city or country",
    "service-plovdiv-title": "Plovdiv Airport Transfer",
    "service-plovdiv-desc":
      "Luxury transfer from Plovdiv Airport with professional drivers",
    "service-intercity-title": "Intercity Transfers",
    "service-intercity-desc":
      "Comfortable journeys between cities in Bulgaria and neighboring countries (Romania, Greece, Turkey)",
    "service-feature-luggage": "Luggage assistance",
    "service-feature-comfort": "Maximum comfort",
    "service-feature-distance": "Long distances",
    "service-feature-rest": "Rest stops",
    // Price Inquiry
    "prices-title": "Price Inquiry",
    "prices-subtitle": "Get a personalized quote",
    "prices-description":
      "Every journey is unique and deserves a perfect price. Contact us for a personalized quote according to your needs.",
    "feature-calc-title": "Accurate calculation",
    "feature-calc-desc": "Price based on distance and number of passengers",
    "feature-fast-title": "Fast response",
    "feature-fast-desc": "Get a quote within 15 minutes",
    "feature-discount-title": "Special discounts",
    "feature-discount-desc": "For regular customers and group reservations",
    "call-title": "Call Now",
    "call-description": "Get an immediate quote for your transfer",
    "btn-call": "Call Now",
    "call-note": "Free consultation and quote",
    // Footer
    "footer-about":
      "Your reliable partner for luxury transfers from Sofia and Plovdiv airports.",
    "footer-contacts": "Contacts",
    "footer-services": "Services",
    "service-sofia-footer": "Sofia Airport Transfer",
    "service-plovdiv-footer": "Plovdiv Airport Transfer",
    "service-intercity-footer": "Intercity Transfers",
    "service-international-footer": "International Transfers",
    "footer-copyright": "© 2025 Luxury Transfer. All rights reserved.",
    // Contact page specific
    "contact-hero-title": "Get in touch",
    "contact-hero-subtitle":
      "We're ready to answer your questions and arrange the perfect transfer for you",
    "contact-info-title": "Our contacts",
    "contact-form-title": "Send an inquiry",
    "contact-phone": "Phone",
    "contact-email": "Email",
    "contact-address": "Address",
    "contact-hours": "Working hours",
    "hours-available": "24/7 available",
    "hours-reservations": "Online reservations - 24/7",
    "form-note":
      "For fastest response use WhatsApp or Viber — fill name, phone and message.",
    "label-name": "Name *",
    "label-phone": "Phone *",
    "label-subject": "Subject",
    "subject-placeholder": "Choose subject",
    "subject-reservation": "Reservation",
    "subject-pricing": "Pricing",
    "subject-service": "Service",
    "subject-complaint": "Complaint",
    "subject-other": "Other",
    "label-message": "Message *",
    "message-placeholder": "Describe your inquiry or issue...",
    "btn-whatsapp": "Send via WhatsApp",
    "btn-viber": "Send via Viber",
    // FAQ
    "faq-title": "Frequently Asked Questions",
    "faq-q1": "How can I book a transfer?",
    "faq-a1":
      "You can book a transfer by phone, email or via our contact form. We recommend booking at least 24 hours in advance.",
    "faq-q2": "How far in advance should I book?",
    "faq-a2":
      "For best service we recommend booking at least 24 hours ahead. For urgent cases we can often arrange transfers within a few hours.",
    "faq-q3": "What is included in the transfer price?",
    "faq-a3":
      "The price includes the transfer from point A to point B, meeting at the airport and assistance with luggage.",
    "faq-q4": "Are you available 24/7?",
    "faq-a4":
      "Yes, our services are available 24 hours a day, 7 days a week, including holidays.",
    // Drink & Drive page
    "nav-drink": "Drink&Drive",
    "drink-title": "Drink & Drive",
    "drink-hero-title": "Don't drive drunk",
    "drink-hero-sub":
      "If you've been drinking, don't take the risk — call us and we'll get you home safely.",
    "drink-feature-1": "24/7",
    "drink-feature-2": "Professional drivers",
    "drink-feature-3": "Safe transport",
    "drink-note": "We're here to get you home safely.",
    "drink-steps-title": "How it works",
    "drink-step1-title": "Call us",
    "drink-step1-desc":
      "Call or press the 'Call Now' button and we'll be ready to accept your request.",
    "drink-step2-title": "Arrival",
    "drink-step2-desc":
      "A professional driver will arrive quickly and escort you to the vehicle.",
    "drink-step3-title": "Home safely",
    "drink-step3-desc":
      "We'll drive you to your home or chosen address — safely and discreetly.",
  },
};

// Language Selector Functionality (dropdown в навигацията)
// Desktop flag language switcher
document.querySelectorAll(".flag-btn[data-lang]").forEach((flag) => {
  flag.addEventListener("click", function (e) {
    e.preventDefault();
    const lang = flag.getAttribute("data-lang");
    applyLanguage(lang);
    showNotification(
      lang === "bg"
        ? "Езикът е променен на български"
        : "Language changed to English",
      "success"
    );
  });
});
const languageBtns = document.querySelectorAll(".language-btn");
const languageDropdowns = document.querySelectorAll(".language-dropdown");
const languageLinks = document.querySelectorAll(".language-menu a");
const currentLangElements = document.querySelectorAll(".current-lang");

// Toggle language dropdown
languageBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const dropdown = btn.closest(".language-dropdown");
    dropdown?.classList.toggle("active");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  languageDropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

// Function to change language
function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // translate placeholders (for inputs/textareas)
  const placeholders = document.querySelectorAll(
    "[data-translate-placeholder]"
  );
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-translate-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // translate option elements inside selects (explicitly)
  const optionElements = document.querySelectorAll(
    "select option[data-translate]"
  );
  optionElements.forEach((opt) => {
    const key = opt.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      opt.textContent = translations[lang][key];
    }
  });

  // Update page title
  document.title =
    lang === "bg"
      ? "Luxury Transfer - Луксозни трансфери от летище София и Пловдив"
      : "Luxury Transfer - Luxury Transfers from Sofia and Plovdiv Airports";

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update current language display
  currentLangElements.forEach((el) => {
    el.textContent = lang.toUpperCase();
  });

  // Active state in menu
  languageLinks.forEach((l) =>
    l.classList.toggle("active", l.getAttribute("data-lang") === lang)
  );

  // Save preference
  try {
    localStorage.setItem("site_lang", lang);
  } catch (e) {}
}

// Language selection click
languageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLang = link.getAttribute("data-lang");
    applyLanguage(selectedLang);
    showNotification(
      selectedLang === "bg"
        ? "Езикът е променен на български"
        : "Language changed to English",
      "success"
    );
    languageDropdowns.forEach((dd) => dd.classList.remove("active"));
  });
});

// Init language from storage or default BG (Bulgarian)
// Винаги по подразбиране да е български език
// Ако има записан език в localStorage, използвай него, иначе български
let initialLang = "bg";
try {
  const storedLang = localStorage.getItem("site_lang");
  if (storedLang === "bg" || storedLang === "en") {
    initialLang = storedLang;
  }
} catch (e) {}
applyLanguage(initialLang);

console.log("Luxury Transfer website loaded successfully!");
