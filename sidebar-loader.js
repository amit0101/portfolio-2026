/**
 * Sidebar Component Loader
 * Loads sidebar HTML and sets active navigation based on current page
 */

// 1. SIDEBAR CONTENT (Injects into #sidebar-placeholder)
const SIDEBAR_CONTENT = `
    <div class="sidebar-header">
        <h2 class="sidebar-name">Amit Kumar</h2>
        <p class="sidebar-title">Full-Stack AI Engineer</p>
    </div>

    <nav class="sidebar-nav">
        <!-- Home nav item removed - Projects now serves as homepage -->
        <!-- <a href="index.html#home" class="nav-item" data-page="index.html" data-section="home">
            <i data-lucide="home" class="nav-icon"></i>
            <span class="nav-text">Home</span>
        </a> -->

        <div class="nav-section">
            <a href="index.html" class="nav-section-title" data-page="index.html" data-section="projects"
                style="text-decoration: none;">
                <i data-lucide="briefcase" class="nav-icon"></i>
                <span class="nav-text">Projects</span>
            </a>
            <div class="nav-subitems">
                <a href="project-operations.html" class="nav-subitem" data-page="project-operations.html">
                    <i data-lucide="truck" class="nav-icon"></i>
                    <span>Operations SaaS</span>
                </a>
                <a href="project-marketing.html" class="nav-subitem" data-page="project-marketing.html">
                    <i data-lucide="brain" class="nav-icon"></i>
                    <span>AI Marketing SaaS</span>
                </a>
                <a href="project-geo.html" class="nav-subitem" data-page="project-geo.html">
                    <i data-lucide="search" class="nav-icon"></i>
                    <span>GEO Platform</span>
                </a>
                <a href="project-audio.html" class="nav-subitem" data-page="project-audio.html">
                    <i data-lucide="audio-lines" class="nav-icon"></i>
                    <span>Audio Generation</span>
                </a>
                <a href="project-blood.html" class="nav-subitem" data-page="project-blood.html">
                    <i data-lucide="file-heart" class="nav-icon"></i>
                    <span>Medical Extraction</span>
                </a>
            </div>
        </div>

        <a href="resume.html" target="_blank" class="nav-item" data-page="resume.html">
            <i data-lucide="file-text" class="nav-icon"></i>
            <span class="nav-text">Resume</span>
        </a>

        <a href="mailto:amit.kr.py@gmail.com" class="nav-item">
            <i data-lucide="mail" class="nav-icon"></i>
            <span class="nav-text">Contact</span>
        </a>
    </nav>

    <!-- Video Walkthrough Mini Screen (only on index page) -->
    <div class="video-preview-container" id="videoPreviewContainer">
        <div class="video-preview-screen" id="videoPreviewTrigger">
            <div class="screen-glare"></div>
            <div class="preview-content">
                <div class="preview-play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                </div>
                <span class="preview-label">Projects Walkthrough</span>
            </div>
            <div class="screen-reflection"></div>
        </div>
    </div>

    <div class="sidebar-footer">
        <a href="https://linkedin.com/in/amitkrpy" target="_blank" rel="noopener noreferrer" class="social-link"
            title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        </a>
        <a href="https://github.com/amit0101" target="_blank" rel="noopener noreferrer" class="social-link"
            title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path
                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-.1.56-.2.84-.3-.08 1.25-.5 2.5-1 3.5.28.1.56.2.84.3-1 1.5-1 3.5-1 3.5s3 2 6 5.5c-1 1.5-2.5 2.5-4 2.5" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
        </a>
    </div>
`;

// 2. HINGE CONNECTORS (Injects into body)
const HINGE_HTML = `<div class="hinge-connectors"></div>`;

// 3. FLUBBER CHAT (Injects into body)
const FLUBBER_HTML = `
<div class="flubber-container" id="flubber-chat-trigger">
    <div class="flubber-pulse-ring"></div>
    <canvas id="flubber-canvas"></canvas>
    <span class="flubber-tooltip">
        <i data-lucide="sparkles"></i>
        <span>Hi! How can I help?</span>
    </span>
</div>
`;

async function loadSidebar() {
    try {
        // 1. Handle Sidebar Injection (FASTEST PATH)
        const placeholder = document.getElementById('sidebar-placeholder');
        if (placeholder) {
            // Keep the placeholder node, just fill content
            placeholder.innerHTML = SIDEBAR_CONTENT;
            placeholder.classList.add('loaded'); // Optional hook for CSS
        } else {
            // Fallback: Create sidebar if missing
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = `<aside class="sidebar">${SIDEBAR_CONTENT}</aside>`;
            document.body.insertAdjacentElement('afterbegin', tempDiv.firstElementChild);
        }

        // 2. Inject Other Components (Hinge & Flubber)
        // Insert them after the sidebar to maintain DOM order
        // We use insertAdjacentHTML for max performance (no parsing needed)

        // Check if they already exist to prevent duplicates (hot reload safety)
        if (!document.querySelector('.hinge-connectors')) {
            document.body.insertAdjacentHTML('beforeend', HINGE_HTML);
        }

        // Flubber chat trigger - commented out for production
        // if (!document.getElementById('flubber-chat-trigger')) {
        //     document.body.insertAdjacentHTML('beforeend', FLUBBER_HTML);
        // }

        // Set active navigation items
        setActiveNavForCurrentPage();

        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }

        // Load all required scripts dynamically
        await loadRequiredScripts();

    } catch (error) {
        console.error('Error loading sidebar:', error);
    }
}

function loadRequiredScripts() {
    return new Promise((resolve) => {
        // Stylesheets - commented out flubber-actions for production
        const stylesheets = [
            // 'flubber-actions.css'
        ];

        stylesheets.forEach(href => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
            }
        });

        // Load scripts in order
        const scripts = [
            'video-modal.js',
            'contact-modal.js'
            // Flubber scripts commented out for production
            // 'flubber-context.js',
            // 'flubber-navigator.js',
            // 'flubber.js',
            // 'flubber-chat.js'
        ];

        let loadedCount = 0;

        scripts.forEach(src => {
            // Check if script already exists
            if (document.querySelector(`script[src="${src}"]`)) {
                loadedCount++;
                if (loadedCount === scripts.length) {
                    resolve();
                }
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                loadedCount++;
                if (loadedCount === scripts.length) {
                    resolve();
                }
            };
            script.onerror = () => {
                console.error(`Failed to load script: ${src}`);
                loadedCount++;
                if (loadedCount === scripts.length) {
                    resolve();
                }
            };
            document.body.appendChild(script);
        });
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

function setActiveNavForCurrentPage() {
    const currentPage = getCurrentPage();

    // Remove all active classes first
    document.querySelectorAll('.nav-item, .nav-subitem, .nav-section-title').forEach(item => {
        item.classList.remove('active');
    });

    // Set active based on current page
    if (currentPage === 'index.html' || currentPage === '') {
        // Home page - activate Projects nav section
        const projectsSection = document.querySelector('.nav-section-title[data-page="index.html"]');
        if (projectsSection) {
            projectsSection.classList.add('active');
        }
    } else if (currentPage.startsWith('project-')) {
        // Project page - only activate the specific project subitem (not Projects section)
        const projectItem = document.querySelector(`.nav-subitem[data-page="${currentPage}"]`);
        if (projectItem) {
            projectItem.classList.add('active');
        }
    } else if (currentPage === 'resume.html') {
        // Resume page
        const resumeItem = document.querySelector('.nav-item[data-page="resume.html"]');
        if (resumeItem) {
            resumeItem.classList.add('active');
        }
    }
}

// Load sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
    loadSidebar();
}

// Setup context change listener for dynamic tooltips
function setupFlubberContextListener() {
    let lastHintUpdate = 0;
    const MIN_HINT_INTERVAL = 5000; // Don't update hints more than once every 5 seconds

    document.addEventListener('flubber-context-change', (e) => {
        const now = Date.now();

        // Update tooltip with context-aware hint (throttled)
        if (window.flubber && window.flubberContext && (now - lastHintUpdate > MIN_HINT_INTERVAL)) {
            const hint = window.flubberContext.getContextualHint();
            window.flubber.updateTooltip(hint);
            lastHintUpdate = now;
        }
    });

    // Initial tooltip update after scripts load
    setTimeout(() => {
        if (window.flubber && window.flubberContext) {
            const hint = window.flubberContext.getContextualHint();
            window.flubber.updateTooltip(hint);
        }
    }, 1000);
}

// Call setup after a short delay to ensure all scripts are loaded
setTimeout(setupFlubberContextListener, 500);
