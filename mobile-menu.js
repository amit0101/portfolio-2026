/**
 * Mobile Menu Toggle Script
 * Handles sidebar collapse/expand on mobile devices
 */

(function () {
    'use strict';

    // Create and inject hamburger menu button
    function createMobileMenuButton() {
        const button = document.createElement('button');
        button.className = 'mobile-menu-toggle';
        button.setAttribute('aria-label', 'Toggle menu');
        button.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        document.body.appendChild(button);
        return button;
    }

    // Create overlay for mobile
    function createMobileOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-sidebar-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }

    // Initialize mobile menu
    function initMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.warn('Sidebar not found, retrying...');
            setTimeout(initMobileMenu, 100);
            return;
        }

        const menuButton = createMobileMenuButton();
        const overlay = createMobileOverlay();

        // Toggle sidebar
        function toggleSidebar() {
            const isActive = sidebar.classList.toggle('mobile-active');
            menuButton.classList.toggle('active', isActive);
            overlay.classList.toggle('active', isActive);

            // Prevent body scroll when sidebar is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Close sidebar
        function closeSidebar() {
            sidebar.classList.remove('mobile-active');
            menuButton.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event listeners
        menuButton.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Close sidebar when clicking on navigation items (on mobile)
        const navItems = sidebar.querySelectorAll('.nav-item, .nav-subitem, .nav-section-title');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Only close on mobile
                if (window.innerWidth <= 1024) {
                    setTimeout(closeSidebar, 200); // Small delay for better UX
                }
            });
        });

        // Close sidebar on window resize if going to desktop size
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 1024) {
                    closeSidebar();
                }
            }, 250);
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('mobile-active')) {
                closeSidebar();
            }
        });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
