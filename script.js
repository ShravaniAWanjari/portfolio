/* ============================================
   PORTFOLIO — INTERACTIVE SCRIPTS
   Smooth scroll · Clock · Scroll effects
   ============================================ */

(function () {
    'use strict';

    // ===== LIVE CLOCK =====
    function updateClock() {
        const el = document.getElementById('live-clock');
        if (!el) return;
        const now = new Date();
        const opts = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Kolkata',
            hour12: false
        };
        el.textContent = now.toLocaleTimeString('en-IN', opts) + ' IST';
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== NAV BACKGROUND ON SCROLL =====
    var nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                nav.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
            } else {
                nav.style.borderBottom = '1px solid transparent';
            }
        });
    }

    // ===== INTERSECTION OBSERVER — Fade in cards =====
    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all bento cards
    document.querySelectorAll('.bento-card').forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });

    // Add staggered delays
    document.querySelectorAll('.bento-grid').forEach(function (grid) {
        var cards = grid.querySelectorAll('.bento-card');
        cards.forEach(function (card, i) {
            card.style.transitionDelay = (i * 0.08) + 's';
        });
    });

    // Style for visible
    var style = document.createElement('style');
    style.textContent = '.bento-card.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // ===== SECTION HEADER ANIMATION =====
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-header').forEach(function (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateX(-20px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(header);
    });

    var sectionStyle = document.createElement('style');
    sectionStyle.textContent = '.section-header.section-visible { opacity: 1 !important; transform: translateX(0) !important; }';
    document.head.appendChild(sectionStyle);

    // ===== SUBTLE PARALLAX ON BLOBS =====
    var blobs = document.querySelectorAll('.ambient-blob');
    if (blobs.length > 0 && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY;
            blobs.forEach(function (blob, i) {
                var speed = 0.02 + (i * 0.01);
                blob.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
            });
        }, { passive: true });
    }

})();
