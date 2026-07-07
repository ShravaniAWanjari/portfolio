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

    // ===== THEME TOGGLE =====
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check local storage
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☾ DARK';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '☾ DARK';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀ LIGHT';
            }
        });
    }

    // ===== SKILL DETAIL MODAL =====
    var skillsData = null;
    var modalOverlay = document.getElementById('skill-modal-overlay');
    var modalContainer = document.getElementById('skill-modal');

    // Fetch skills data
    fetch('skillsData.json')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            skillsData = data;
            initSkillChips();
        })
        .catch(function(err) {
            console.warn('Could not load skillsData.json:', err);
        });

    function initSkillChips() {
        document.querySelectorAll('.skill-chip[data-skill]').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var skillId = this.getAttribute('data-skill');
                openSkillModal(skillId);
            });
        });
    }

    function openSkillModal(skillId) {
        if (!skillsData || !skillsData.skills[skillId]) return;

        var skill = skillsData.skills[skillId];
        var totalProjects = skill.projects.length;

        // Map project IDs to actual project objects
        var projects = skill.projects
            .map(function(id) { return skillsData.projects[id]; })
            .filter(Boolean);

        // Build modal HTML
        var html = '';

        // Corner bracket elements (bottom)
        html += '<div class="skill-modal-bottom-left"></div>';
        html += '<div class="skill-modal-bottom-right"></div>';

        // Header
        html += '<div class="skill-modal-header">';
        html += '  <span class="skill-modal-name">' + skill.name + '</span>';
        html += '  <button class="skill-modal-close" id="skill-modal-close">&times;</button>';
        html += '</div>';

        // Dynamic project count
        html += '<p class="skill-modal-count"><span class="check">✓</span> Used in ' + totalProjects + ' project' + (totalProjects !== 1 ? 's' : '') + '</p>';

        // Divider
        html += '<div class="skill-modal-divider"></div>';

        // Project list
        if (projects.length > 0) {
            html += '<ul class="skill-modal-list">';
            projects.forEach(function(project) {
                html += '<li class="skill-modal-project">';
                if (project.githubUrl) {
                    html += '<a href="' + project.githubUrl + '" target="_blank" rel="noopener noreferrer" class="skill-modal-project-title">' + project.title + '</a>';
                } else {
                    html += '<span class="skill-modal-project-title no-link">' + project.title + '</span>';
                }
                html += '<p class="skill-modal-project-desc">' + project.description + '</p>';
                html += '</li>';
            });
            html += '</ul>';
        } else {
            html += '<div class="skill-modal-empty">NO PORTFOLIO PROJECTS YET</div>';
        }

        // Footer
        html += '<div class="skill-modal-footer">';
        html += '  <a href="#research" class="skill-modal-view-all" id="skill-modal-view-projects">View Projects →</a>';
        html += '</div>';

        modalContainer.innerHTML = html;

        // Show modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Close button
        document.getElementById('skill-modal-close').addEventListener('click', closeSkillModal);

        // "View Projects" link closes modal and scrolls
        document.getElementById('skill-modal-view-projects').addEventListener('click', function(e) {
            e.preventDefault();
            closeSkillModal();
            var target = document.querySelector('#research');
            if (target) {
                setTimeout(function() {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 350);
            }
        });
    }

    function closeSkillModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeSkillModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeSkillModal();
        }
    });

    // ===== PROJECTS PAGE TABS =====
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var targetId = this.getAttribute('data-target');

                // Remove active from all tabs
                tabBtns.forEach(function(b) { b.classList.remove('active'); });
                // Add active to clicked tab
                this.classList.add('active');

                // Hide all contents
                tabContents.forEach(function(content) {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });

                // Show target content
                var targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = ''; // relies on CSS `.tab-content.active { display: grid; }`
                }
            });
        });
    }

})();
