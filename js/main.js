// Main JavaScript for Portfolio Website
// Handles navigation, smooth scroll, testimonials carousel, contact form, and more

(function () {
    'use strict';

    // ==========================================
    // NAVIGATION
    // ==========================================

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // TESTIMONIALS CAROUSEL
    // ==========================================

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('testimonialDots');

    let currentTestimonial = 0;
    let testimonialInterval;

    // Create dots
    if (dotsContainer && testimonialCards.length > 0) {
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        resetTestimonialInterval();
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetTestimonialInterval();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetTestimonialInterval();
        });
    }

    // Auto-rotate testimonials
    if (testimonialCards.length > 0) {
        startTestimonialInterval();

        // Pause on hover
        const testimonialCarousel = document.querySelector('.testimonials-carousel');
        if (testimonialCarousel) {
            testimonialCarousel.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });

            testimonialCarousel.addEventListener('mouseleave', () => {
                startTestimonialInterval();
            });
        }
    }

    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Basic validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');

                // Reset form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        });
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================

    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animations
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // PORTFOLIO FILTER (Optional Enhancement)
    // ==========================================

    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('click', function () {
            // You can add modal/lightbox functionality here
            console.log('Portfolio card clicked:', this.querySelector('h3').textContent);
        });
    });

    // ==========================================
    // CURSOR GLOW EFFECT (Optional Enhancement)
    // ==========================================

    function createCursorGlow() {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(125, 207, 255, 0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
            display: none;
        `;
        document.body.appendChild(cursorGlow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.display = 'block';
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;

            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';

            requestAnimationFrame(animateGlow);
        }

        animateGlow();

        // Expand glow on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .skill-card, .service-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.width = '40px';
                cursorGlow.style.height = '40px';
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.width = '20px';
                cursorGlow.style.height = '20px';
            });
        });
    }

    // Enable cursor glow on desktop only
    if (window.innerWidth > 768) {
        createCursorGlow();
    }

    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================
    // INITIALIZE
    // ==========================================

    console.log('%c✨ Ebrahim Reyan Portfolio Loaded ✨', 'color: #7dcfff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with HTML, CSS, JavaScript & Three.js', 'color: #bb9af7; font-size: 12px;');

})();
