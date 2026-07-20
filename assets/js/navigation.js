/**
 * navigation.js
 * Handles sticky navbar, mobile menu toggle, and smooth scrolling for anchors.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // 1. Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initial check in case page loads part-way down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Create Overlay for mobile menu dynamically
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Function to close mobile menu
    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    // 2. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');

            // Toggle aria-expanded for accessibility
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }

    // 3. Close mobile menu when clicking outside (on the overlay)
    overlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when a nav link is clicked (with slight delay for mobile navigation safety)
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Let the browser handle the navigation first, then close the menu
            setTimeout(() => {
                closeMobileMenu();
            }, 50);
        });
    });

    // 4. Highlight active nav link based on current page URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Re-use navItems array

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        } else {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
        }
    });
});
