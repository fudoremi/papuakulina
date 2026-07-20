/**
 * filter.js
 * Handles category filtering and rendering the culinary cards on kuliner.html.
 */

 document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('kuliner-grid');
    const filterContainer = document.getElementById('filter-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!gridContainer || typeof culinaryData === 'undefined') return;

    let currentCategory = 'Semua';
    let currentSearch = '';

    // Extract unique categories for filter buttons
    const categories = ['Semua', ...new Set(culinaryData.map(item => item.category))];

    // Render filter buttons
    if (filterContainer) {
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${category === 'Semua' ? 'active' : ''}`;
            btn.textContent = category;
            btn.setAttribute('aria-pressed', category === 'Semua' ? 'true' : 'false');
            
            btn.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                
                currentCategory = category;
                renderCards();
            });
            
            filterContainer.appendChild(btn);
        });
    }

    // Listen to search events from search.js
    document.addEventListener('kulinerSearch', (e) => {
        currentSearch = e.detail.query;
        renderCards();
    });

    // Helper to create card HTML
    const createCard = (item) => {
        return `
            <article class="card reveal active delay-100">
                <a href="detail.html?id=${item.id}" class="card-link" style="text-decoration: none; display: flex; flex-direction: column; height: 100%; color: inherit;">
                    <div class="card-img-wrapper">
                        <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
                        <span class="card-badge">${item.category}</span>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-region">📍 ${item.region}</p>
                        <p class="card-desc">${item.shortDescription}</p>
                        <span class="btn btn-outline" style="margin-top: auto;">Lihat Detail</span>
                    </div>
                </a>
            </article>
        `;
    };

    // Main render function
    const renderCards = () => {
        // Filter logic
        const filteredData = culinaryData.filter(item => {
            const matchCategory = currentCategory === 'Semua' || item.category === currentCategory;
            const matchSearch = item.name.toLowerCase().includes(currentSearch) || 
                                item.region.toLowerCase().includes(currentSearch) ||
                                item.shortDescription.toLowerCase().includes(currentSearch);
            return matchCategory && matchSearch;
        });

        // Render logic
        if (filteredData.length > 0) {
            gridContainer.style.display = 'grid'; // ensure it's grid (might be hidden by empty state)
            if (emptyState) emptyState.style.display = 'none';
            gridContainer.innerHTML = filteredData.map(createCard).join('');
        } else {
            gridContainer.style.display = 'none';
            gridContainer.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
        }
    };

    // Initial render
    renderCards();
});
