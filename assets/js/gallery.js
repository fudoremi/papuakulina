/**
 * gallery.js
 * Lightbox functionality and dynamic data injection for detail.html
 */

 document.addEventListener('DOMContentLoaded', () => {
    // Only execute on detail page (handles both detail.html and /detail on Netlify)
    const path = window.location.pathname;
    const isDetailPage = path.includes('detail') || window.location.search.includes('id=');
    if (!isDetailPage) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id || typeof culinaryData === 'undefined') {
        window.location.href = '/404.html';
        return;
    }

    const foodItem = culinaryData.find(item => item.id === id);

    if (!foodItem) {
        window.location.href = '/404.html';
        return;
    }

    // 1. Inject Data into DOM
    document.title = `${foodItem.name} - Papua`;
    
    // Using simple selectors assuming the HTML has these IDs
    const elements = {
        name: document.getElementById('detail-name'),
        heroImg: document.getElementById('detail-hero-img'),
        region: document.getElementById('detail-region'),
        category: document.getElementById('detail-category'),
        history: document.getElementById('detail-history'),
        philosophy: document.getElementById('detail-philosophy'),
        ingredients: document.getElementById('detail-ingredients'),
        steps: document.getElementById('detail-steps'),
        facts: document.getElementById('detail-facts')
    };

    if(elements.name) elements.name.textContent = foodItem.name;
    if(elements.heroImg) {
        elements.heroImg.src = foodItem.image;
        elements.heroImg.alt = foodItem.name;
    }
    if(elements.region) elements.region.textContent = foodItem.region;
    if(elements.category) elements.category.textContent = foodItem.category;
    if(elements.history) elements.history.textContent = foodItem.history;
    if(elements.philosophy) elements.philosophy.textContent = foodItem.philosophy;

    if(elements.ingredients) {
        elements.ingredients.innerHTML = foodItem.ingredients.map(ing => `<li>${ing}</li>`).join('');
    }
    if(elements.steps) {
        elements.steps.innerHTML = foodItem.steps.map(step => `<li>${step}</li>`).join('');
    }
    if(elements.facts) {
        elements.facts.innerHTML = foodItem.facts.map(fact => `<li>${fact}</li>`).join('');
    }

    // 2. Lightbox functionality (if gallery exists)
    // Minimal Lightbox implementation
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    if (modal && modalImg && closeBtn) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                closeBtn.focus(); // Accessibility: Trap focus
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
