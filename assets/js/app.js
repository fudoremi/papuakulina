/**
 * app.js
 * Global initialization and page transitions.
 */

 document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Load Transition
    // Mimics SPA feel by fading in the body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 50);

    // 2. Handle outbound links for smooth exit transitions
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Allow default behavior for javascript: or mailto: links
            if (href.startsWith('javascript:') || href.startsWith('mailto:')) return;

            e.preventDefault();
            document.body.classList.remove('loaded');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500); // Matches the body transition duration in animation.css
        });
    });

    // 3. Inject current year into footer if it exists
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 4. Back to Top functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
