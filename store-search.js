// Store Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        let allModels = [];
        
        // Load models from JSON
        fetch('store/data/data.json')
            .then(response => response.json())
            .then(data => {
                allModels = data.models;
            })
            .catch(error => {
                console.error('Error loading models:', error);
            });
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            const filteredModels = allModels.filter(model => 
                model.name.toLowerCase().includes(searchTerm) ||
                model.description.toLowerCase().includes(searchTerm) ||
                model.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            
            displaySearchResults(filteredModels, searchTerm);
        });
        
        // Close results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }
});

function displaySearchResults(models, searchTerm) {
    const searchResults = document.getElementById('searchResults');
    
    if (!models.length) {
        searchResults.innerHTML = `
            <div class="search-result-item no-results">
                <i class="fas fa-search"></i>
                <div>
                    <div class="search-result-title">No results found</div>
                    <div class="search-result-desc">Try different keywords</div>
                </div>
            </div>
        `;
        searchResults.style.display = 'block';
        return;
    }
    
    let html = '';
    
    models.slice(0, 5).forEach(model => {
        const highlightedName = highlightText(model.name, searchTerm);
        const highlightedDesc = highlightText(model.description, searchTerm);
        
        html += `
            <a href="${model.page || '#'}" class="search-result-item">
                <div class="search-result-icon">
                    <i class="fas fa-cube"></i>
                </div>
                <div class="search-result-content">
                    <div class="search-result-title">${highlightedName}</div>
                    <div class="search-result-desc">${highlightedDesc}</div>
                    <div class="search-result-meta">
                        <span class="search-result-category">${model.category}</span>
                        <span class="search-result-price">${model.price === 'free' ? 'FREE' : '$' + model.price}</span>
                    </div>
                </div>
            </a>
        `;
    });
    
    if (models.length > 5) {
        html += `
            <div class="search-result-more">
                <a href="store.html">View all ${models.length} results</a>
            </div>
        `;
    }
    
    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
}

function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Add CSS for search results
const searchStyle = document.createElement('style');
searchStyle.textContent = `
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        margin-top: 10px;
        max-height: 400px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
    }
    
    .search-result-item {
        display: flex;
        align-items: center;
        padding: 15px;
        text-decoration: none;
        color: inherit;
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.2s;
    }
    
    .search-result-item:hover {
        background: #f8fafc;
    }
    
    .search-result-item.no-results {
        color: #64748b;
    }
    
    .search-result-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        color: white;
    }
    
    .search-result-content {
        flex: 1;
    }
    
    .search-result-title {
        font-weight: 600;
        margin-bottom: 5px;
        color: #1e293b;
    }
    
    .search-result-title mark {
        background: #fef3c7;
        color: #92400e;
        padding: 2px 4px;
        border-radius: 4px;
    }
    
    .search-result-desc {
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 8px;
        line-height: 1.4;
    }
    
    .search-result-desc mark {
        background: #fef3c7;
        color: #92400e;
        padding: 1px 3px;
        border-radius: 3px;
    }
    
    .search-result-meta {
        display: flex;
        gap: 10px;
        font-size: 0.8rem;
    }
    
    .search-result-category {
        background: #e0e7ff;
        color: #3730a3;
        padding: 3px 8px;
        border-radius: 50px;
    }
    
    .search-result-price {
        color: #059669;
        font-weight: 600;
    }
    
    .search-result-more {
        text-align: center;
        padding: 15px;
    }
    
    .search-result-more a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
    }
    
    .search-result-more a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(searchStyle);
