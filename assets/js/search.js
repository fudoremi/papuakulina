/**
 * search.js
 * Handles text input search on the kuliner directory page.
 */

 document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    
    // We will trigger a custom event on the document when search happens,
    // so filter.js and the main renderer can listen and update the UI.
    // This maintains modularity.
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // Dispatch a custom event with the search query
            const searchEvent = new CustomEvent('kulinerSearch', {
                detail: { query: query }
            });
            document.dispatchEvent(searchEvent);
        });
    }
});
