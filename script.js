/**
 * Axl Bien Meñoza — Curriculum Vitae Interactive Logic
 * Features:
 * - Theme Engine (Dark/Light with localStorage persistence)
 * - Active Scrollspy Navigation
 * - Skill Matrix Category Filter
 * - Interactive Project Deep-Dive Modal
 * - Copy-to-Clipboard with Toast Notifications
 * - Print / PDF Export Handler
 * - Mobile Navigation Drawer Toggle
 * - Interactive Contact Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initScrollSpy();
    initSkillFilters();
    initProjectModals();
    initClipboard();
    initPrintCV();
    initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const STORAGE_KEY = 'axl_cv_theme';

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            showToast(`Theme switched to ${newTheme.toUpperCase()} mode.`);
        });
    }

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        
        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#f8fafc');
        }
    }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* --------------------------------------------------------------------------
   3. Active ScrollSpy Navigation
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSectionId) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Skill Matrix Filtering Tabs
   -------------------------------------------------------------------------- */
function initSkillFilters() {
    const tabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const filterValue = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.transition = 'all 200ms ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Interactive Project Deep-Dive Modal
   -------------------------------------------------------------------------- */
const PROJECT_SPECS = {
    vista: {
        title: "VISTA: AI-Powered Citizen Inquiry Chatbot for LGU Services",
        badge: "DNSC Senior Capstone Research Project · 2024–Present",
        preview: "assets/vista-preview.svg",
        role: "Lead Systems Analyst & Full-Stack Developer",
        overview: "Project VISTA (Virtual Information & Service Ticket Assistant) is an ongoing senior capstone system engineered for Local Government Units (such as LGU Panabo City). It addresses the chronic bottleneck of citizen counter inquiries by providing an automated, 24/7 conversational assistant capable of answering complex public service requirements in English and Cebuano.",
        problem: "Citizens frequently travel to municipal halls only to be turned away due to missing prerequisites for business permits, civil registry certificates, or indigent assistance. VISTA eliminates wasted trips by pre-validating requirements and providing step-by-step checklists.",
        architecture: [
            "<strong>Conversational Engine:</strong> Natural Language Intent parsing with regional Davao/Cebuano dialect keyword mapping.",
            "<strong>Relational Storage:</strong> MySQL database schema logging citizen query patterns, service popularity, and unhandled inquiries for continuous model training.",
            "<strong>Client Interface:</strong> Lightweight, accessible mobile-first responsive web client with high contrast and voice-friendly text hierarchy.",
            "<strong>Security & Privacy:</strong> Strict zero-storage policy for confidential identification data to comply with the Philippine Data Privacy Act of 2012."
        ],
        techStack: ["JavaScript (ES6+)", "MySQL", "NLP API Integration", "RESTful Architecture", "HTML5 & CSS3", "Figma Prototyping"],
        github: "https://github.com/menozaaxlbien-sudo/My-cv"
    },
    tourease: {
        title: "TourEase: Smart Travel & Eco-Tourism Discovery Platform",
        badge: "Web Application Development · 2024",
        preview: "assets/tourease-preview.svg",
        role: "Frontend Developer & UI/UX Designer",
        overview: "TourEase is a responsive web application designed to spotlight scenic travel spots across Davao Region (Davao del Norte, Samal Island, Davao de Oro, and Davao Oriental). Built to promote local eco-tourism and sustainable travel.",
        problem: "Tourist information for regional spots outside major cities is often fragmented across outdated social media pages without reliable itineraries, travel tips, or emergency hotlines.",
        architecture: [
            "<strong>Interactive Destination Filter:</strong> Real-time category filtering by island beach, mountain trail, cultural landmark, and culinary hub.",
            "<strong>Client-Side Trip Planner:</strong> Saved itinerary storage using browser LocalStorage for offline consultation during travel.",
            "<strong>Safety & Directory Module:</strong> Quick-dial municipal emergency contacts (PNP, MDRRMO, Red Cross, Coast Guard).",
            "<strong>Visual Performance:</strong> Optimized SVG vector graphics and CSS Grid layouts ensuring sub-second load times on 3G/4G connections."
        ],
        techStack: ["HTML5 Semantic", "CSS Grid & Flexbox", "Vanilla JavaScript", "Browser LocalStorage API", "Responsive UI"],
        github: "https://github.com/menozaaxlbien-sudo"
    },
    labmanager: {
        title: "DNSC Computer Lab Asset & Diagnostics Manager",
        badge: "Academic Systems Utility · 2023–2024",
        preview: "assets/lab-manager-preview.svg",
        role: "Systems Developer & Computer Technician",
        overview: "A lightweight administrative tool developed for academic computer laboratories at Davao del Norte State College. Helps student technicians and lab custodians maintain 40+ workstations per room, cataloging specifications, IP assignments, and maintenance logs.",
        problem: "Manual paper logs for hardware defects and IP collision tracking in college labs resulted in recurring downtime and slow turnaround times for student laboratory classes.",
        architecture: [
            "<strong>Hardware Specification Tracker:</strong> Centralized inventory of workstation CPU models, RAM capacities, SSD health, and peripheral status.",
            "<strong>Static IP & Network Mapper:</strong> Visual node map preventing IP address conflicts across academic subnet ranges.",
            "<strong>Maintenance Ticketing:</strong> Simple status tagging (Operational, Maintenance Required, Offline) with automated audit report export.",
            "<strong>Printable Audit Sheets:</strong> Formatted print output for submission to laboratory custodians."
        ],
        techStack: ["JavaScript (ES6+)", "JSON Data Schema", "CSS Print Modules", "Network Diagnostic Concepts", "Hardware Auditing"],
        github: "https://github.com/menozaaxlbien-sudo"
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalContent = document.getElementById('modal-content-area');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    if (!modal || !modalContent) return;

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = btn.getAttribute('data-project');
            const data = PROJECT_SPECS[projectKey];
            if (!data) return;

            renderModal(data);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    function renderModal(data) {
        modalContent.innerHTML = `
            <span class="modal-badge">${data.badge}</span>
            <h2 class="modal-title" id="modal-title">${data.title}</h2>
            <p style="color: var(--primary); font-weight: 600; margin-bottom: 1.25rem;">Role: ${data.role}</p>
            
            <img src="${data.preview}" alt="${data.title} preview" class="modal-preview-img" width="700" height="420" loading="lazy">

            <h3 class="modal-section-title">📌 System Overview</h3>
            <p class="modal-text">${data.overview}</p>

            <h3 class="modal-section-title">🎯 The Problem It Solves</h3>
            <p class="modal-text">${data.problem}</p>

            <h3 class="modal-section-title">⚙️ Technical Architecture Highlights</h3>
            <ul style="list-style: none; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                ${data.architecture.map(item => `<li style="position: relative; padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;"><span style="position: absolute; left: 0; color: var(--primary);">✓</span> ${item}</li>`).join('')}
            </ul>

            <h3 class="modal-section-title">🛠️ Core Technologies</h3>
            <div class="modal-tech-list">
                ${data.techStack.map(t => `<span class="tech-tag" style="background: var(--bg-surface-elevated); padding: 0.35rem 0.75rem; font-size: 0.8rem;">${t}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
                <button type="button" class="btn btn-secondary btn-sm" onclick="window.print();">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    <span>Print Specification</span>
                </button>
                <button type="button" class="btn btn-outline btn-sm" id="modal-footer-close-btn">
                    <span>Close</span>
                </button>
            </div>
        `;

        const footerClose = document.getElementById('modal-footer-close-btn');
        if (footerClose) {
            footerClose.addEventListener('click', closeModal);
        }
    }
}

/* --------------------------------------------------------------------------
   6. Copy-to-Clipboard & Toast Engine
   -------------------------------------------------------------------------- */
function initClipboard() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied "${textToCopy}" to clipboard! ✓`);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast(`Copied "${textToCopy}" to clipboard! ✓`);
            });
        });
    });
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-emerald);">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 260);
    }, 3000);
}

/* --------------------------------------------------------------------------
   7. Print / PDF Export Handler
   -------------------------------------------------------------------------- */
function initPrintCV() {
    const printBtns = document.querySelectorAll('.print-cv-btn, .print-cv-mobile');

    printBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Preparing executive print layout...');
            setTimeout(() => {
                window.print();
            }, 300);
        });
    });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handler
   -------------------------------------------------------------------------- */
window.handleFormSubmit = function(form) {
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const messageInput = form.querySelector('[name="message"]');
    const submitBtn = document.getElementById('submit-btn');
    const statusBox = document.getElementById('form-status');

    if (!nameInput || !emailInput || !messageInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : 'Inquiry';

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

        if (statusBox) {
            statusBox.className = 'form-status success';
            statusBox.style.display = 'block';
            statusBox.innerHTML = `
                ✓ <strong>Thank you, ${name}!</strong> Your message regarding <em>"${subject}"</em> has been recorded. Axl Bien Meñoza will get back to you at <strong>${email}</strong> promptly.
            `;
        }

        form.reset();
        showToast(`Message from ${name} drafted successfully!`);
    }, 700);
};

/* --------------------------------------------------------------------------
   9. Keyboard Accessibility Shortcuts
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Toggle theme with 'T' (when not inside inputs)
        if (e.key === 't' || e.key === 'T') {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag !== 'input' && activeTag !== 'textarea') {
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
            }
        }
    });
}
