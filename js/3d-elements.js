// 3D Interactive Elements
// Enhanced interactions for skill cards, service icons, and testimonials

(function () {
    'use strict';

    // Initialize all 3D interactive elements
    function init() {
        init3DSkillCards();
        init3DServiceCards();
        init3DPortfolioCards();
    }

    // 3D Skill Cards with tilt effect
    function init3DSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transformStyle = 'preserve-3d';
            });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                this.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                    scale3d(1.05, 1.05, 1.05)
                `;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0)
                    scale3d(1, 1, 1)
                `;
            });
        });
    }

    // 3D Service Cards with depth effect
    function init3DServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transformStyle = 'preserve-3d';
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'translateZ(50px) scale(1.2)';
                }
            });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;

                this.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                `;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0)
                `;
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'translateZ(0) scale(1)';
                }
            });
        });
    }

    // 3D Portfolio Cards with hover depth
    function init3DPortfolioCards() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        portfolioCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transformStyle = 'preserve-3d';
            });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-15px)
                    translateZ(20px)
                `;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0)
                    translateZ(0)
                `;
            });
        });
    }

    // Add smooth 3D perspective to testimonial cards
    function init3DTestimonialCards() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        testimonialCards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
        });
    }

    // Scroll-triggered 3D reveals for sections
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                }
            });
        }, observerOptions);

        // Observe skill cards
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotateX(-10deg)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotateX(-10deg)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe portfolio cards
        document.querySelectorAll('.portfolio-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            init3DTestimonialCards();
            initScrollAnimations();
        });
    } else {
        init();
        init3DTestimonialCards();
        initScrollAnimations();
    }
})();
