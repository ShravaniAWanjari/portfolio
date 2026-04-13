/* ============================================
   PORTFOLIO — BLOOMBERG TERMINAL SCRIPTS
   Live clock · Simulated tickers · Animations
   ============================================ */

(function () {
    'use strict';

    // ===== LIVE CLOCK =====
    function updateClock() {
        var clockEl = document.getElementById('live-clock');
        var dateEl = document.getElementById('live-date');
        if (!clockEl) return;

        var now = new Date();
        var timeOpts = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Kolkata',
            hour12: false
        };
        clockEl.textContent = now.toLocaleTimeString('en-IN', timeOpts);

        if (dateEl) {
            var dateOpts = {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                timeZone: 'Asia/Kolkata'
            };
            dateEl.textContent = now.toLocaleDateString('en-IN', dateOpts).toUpperCase();
        }
    }
    updateClock();
    setInterval(updateClock, 1000);


    // ===== SMOOTH SCROLL =====
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

    // ===== NAV SCROLL EFFECT =====
    var nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                nav.style.boxShadow = '0 1px 20px rgba(0,0,0,0.5)';
            } else {
                nav.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ===== INTERSECTION OBSERVER — Fade in cards =====
    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.bento-card').forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Staggered delays per grid
    document.querySelectorAll('.bento-grid').forEach(function (grid) {
        var cards = grid.querySelectorAll('.bento-card');
        cards.forEach(function (card, i) {
            card.style.transitionDelay = (i * 0.06) + 's';
        });
    });

    // Visible style
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
        header.style.transform = 'translateX(-12px)';
        header.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        sectionObserver.observe(header);
    });

    var sectionStyle = document.createElement('style');
    sectionStyle.textContent = '.section-header.section-visible { opacity: 1 !important; transform: translateX(0) !important; }';
    document.head.appendChild(sectionStyle);

    // ===== SKILL BAR ANIMATION =====
    var skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(function (fill) {
                    var target = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(function () {
                        fill.style.width = target;
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-bars').forEach(function (block) {
        skillObserver.observe(block);
    });

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function (e) {
        var keyMap = {
            'F1': '#about',
            'F2': '#experience',
            'F3': '#research',
            'F4': '#skills',
            'F5': '#contact'
        };

        if (keyMap[e.key]) {
            e.preventDefault();
            var target = document.querySelector(keyMap[e.key]);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // ===== MOBILE DOUBLE-TAP HOVER FOR CARDS =====
    document.querySelectorAll('a.card-project, .private-project').forEach(function (card) {
        card.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                if (!this.classList.contains('mobile-active')) {
                    e.preventDefault(); 
                    document.querySelectorAll('.mobile-active').forEach(function(c) {
                        c.classList.remove('mobile-active');
                    });
                    this.classList.add('mobile-active');
                }
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('a.card-project') && !e.target.closest('.private-project')) {
                document.querySelectorAll('.mobile-active').forEach(function(c) {
                    c.classList.remove('mobile-active');
                });
            }
        }
    });

})();
