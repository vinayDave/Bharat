/* ========================================
   AVERRA INTERIORS - PREMIUM JAVASCRIPT
   Animations | Interactions | Dark/Light Mode
   ======================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ========================================
// LOADER
// ========================================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        onComplete: () => {
            loader.style.display = 'none';
        }
    });
});

// ========================================
// DARK/LIGHT MODE
// ========================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

initTheme();

// ========================================
// NAVBAR & MOBILE MENU
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// HERO ANIMATIONS (GSAP)
// ========================================

gsap.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.5
});

gsap.to('.hero-tagline', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.7
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

// Section reveal animations
const revealElements = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
};

revealElements();

// Service card animations
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

// ========================================
// PORTFOLIO FILTERING
// ========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items with animation
        const filter = btn.dataset.filter;
        
        portfolioItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                gsap.to(item, {
                    opacity: 1,
                    duration: 0.5,
                    pointerEvents: 'auto'
                });
                item.classList.remove('hidden');
            } else {
                gsap.to(item, {
                    opacity: 0.3,
                    duration: 0.5,
                    pointerEvents: 'none'
                });
                item.classList.add('hidden');
            }
        });
    });
});

// ========================================
// ADVANCED GALLERY + LIGHTBOX
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCurrent = document.getElementById('lightbox-current');
const lightboxTotal = document.getElementById('lightbox-total');

let currentImageIndex = 0;
const totalImages = galleryItems.length;

// Set total images
lightboxTotal.textContent = totalImages;

// Get all images from gallery items
function getImageUrl(index) {
    return galleryItems[index].querySelector('img').src;
}

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    const imageUrl = getImageUrl(currentImageIndex);
    lightboxImage.src = imageUrl;
    lightboxCurrent.textContent = currentImageIndex + 1;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateLightboxImage();
}

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    }
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ========================================
// ANIMATED COUNTERS
// ========================================

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
                if (target === 100) counter.textContent += '%';
            }
        };
        
        // Start animation when section is in view
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none none',
                onEnter: updateCounter
            }
        });
    });
};

animateCounters();

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Update cards
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialCards[index].classList.add('active');
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Auto rotate testimonials
setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}, 5000);

// Click dots to change testimonial
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Initialize
showTestimonial(0);

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('statusMsg');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Remove previous messages
    statusMsg.classList.remove('success', 'error');
    statusMsg.textContent = 'Sending...';
    statusMsg.style.display = 'block';
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            statusMsg.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
            statusMsg.classList.add('success');
            
            // Animate success
            gsap.from(statusMsg, {
                opacity: 0,
                y: -10,
                duration: 0.5
            });
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                gsap.to(statusMsg, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        statusMsg.style.display = 'none';
                    }
                });
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        statusMsg.textContent = '✗ Something went wrong. Please try again.';
        statusMsg.classList.add('error');
        
        gsap.from(statusMsg, {
            opacity: 0,
            y: -10,
            duration: 0.5
        });
    }
});

// ========================================
// STAGGERED TEXT ANIMATION
// ========================================

const animateText = (element) => {
    if (!element) return;
    
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        element.appendChild(span);
        
        gsap.to(span, {
            opacity: 1,
            duration: 0.05,
            delay: index * 0.05,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%'
            }
        });
    });
};

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ADVANCED ANIMATIONS ON SCROLL
// ========================================

// Parallax effect on hero
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    gsap.to(heroContent, {
        y: window.innerHeight * 0.5,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// About section animation
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    gsap.from(aboutImage, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: aboutImage,
            start: 'top 80%'
        }
    });
}

const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    gsap.from(aboutContent, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
            trigger: aboutContent,
            start: 'top 80%'
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Ensure all animations are properly initialized
    ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});