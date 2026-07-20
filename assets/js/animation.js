/**
 * animation.js
 * Handles IntersectionObserver for scroll reveals (Fade Up, Left, Right).
 */

 document.addEventListener('DOMContentLoaded', () => {
    // Define the observer options
    const observerOptions = {
        root: null, // Viewport
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits the bottom
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Create the observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger CSS animation
                entry.target.classList.add('active');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to be revealed
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    // Start observing each element
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
