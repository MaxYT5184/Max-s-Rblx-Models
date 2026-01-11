// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-slide-up').forEach(el => {
    observer.observe(el);
});

// Animated counter for stats
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                if (target % 1 === 0) { // Integer
                    counter.textContent = Math.floor(current);
                } else { // Decimal
                    counter.textContent = current.toFixed(1);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target % 1 === 0) {
                    counter.textContent = target;
                } else {
                    counter.textContent = target.toFixed(1);
                }
            }
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
        
        counterObserver.observe(counter);
    });
}

// Create floating particles
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 5 and 20px
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        heroSection.appendChild(particle);
    }
}

// Typing effect for hero text
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = ["Roblox Models", "Free Assets", "Custom Systems", "UI Elements"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            // Continue typing/deleting
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after initial animation
    setTimeout(type, 3500);
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            if (validateEmail(email)) {
                // Simulate submission
                const submitBtn = this.querySelector('button');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for subscribing! You will receive updates about new models.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    emailInput.value = '';
                }, 1500);
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Parallax effect for floating shapes
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Load models for store page
function loadModels() {
    const modelsGrid = document.getElementById('modelsGrid');
    const loading = document.getElementById('loading');
    
    if (modelsGrid && loading) {
        fetch('store/data/data.json')
            .then(response => response.json())
            .then(data => {
                loading.style.display = 'none';
                displayModels(data.models);
            })
            .catch(error => {
                console.error('Error loading models:', error);
                loading.innerHTML = `
                    <div style="color: #f56565;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                        <p>Error loading models. Please try again later.</p>
                        <button onclick="loadModels()" class="btn-secondary" style="margin-top: 20px;">
                            <i class="fas fa-redo"></i> Retry
                        </button>
                    </div>
                `;
            });
    }
}

// Display models in grid
function displayModels(models) {
    const modelsGrid = document.getElementById('modelsGrid');
    if (!modelsGrid) return;
    
    modelsGrid.innerHTML = '';
    
    models.forEach((model, index) => {
        const modelCard = document.createElement('div');
        modelCard.className = 'model-card animate-slide-up';
        modelCard.style.animationDelay = `${index * 0.1}s`;
        
        const iconMap = {
            'ui': 'fa-comments',
            'gameplay': 'fa-gamepad',
            'tools': 'fa-tools',
            'environment': 'fa-tree'
        };
        
        modelCard.innerHTML = `
            <div class="model-image">
                <i class="fas ${iconMap[model.category] || 'fa-cube'}"></i>
                ${model.featured ? '<span class="featured-badge">FEATURED</span>' : ''}
            </div>
            <div class="model-content">
                <span class="model-category">${model.category.toUpperCase()}</span>
                <h3 class="model-title">${model.name}</h3>
                <p class="model-description">${model.description}</p>
                <div class="model-meta">
                    <div class="model-price">${model.price === 'free' ? 'FREE' : '$' + model.price}</div>
                    <div class="model-rating">
                        <i class="fas fa-star"></i>
                        <span>${model.rating}</span>
                        <span class="downloads">(${model.downloads.toLocaleString()})</span>
                    </div>
                </div>
                <div class="model-actions">
                    <a href="${model.page || '#'}" class="btn-secondary">
                        <i class="fas fa-eye"></i> Details
                    </a>
                    ${model.robloxUrl ? `
                    <a href="${model.robloxUrl}" target="_blank" class="btn-primary">
                        <i class="fas fa-download"></i> Get
                    </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        modelsGrid.appendChild(modelCard);
    });
}

// Filter models in store
function filterModels() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const activeTag = document.querySelector('.filter-tag.active');
    
    if (!categoryFilter || !sortFilter) return;
    
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    const tag = activeTag ? activeTag.textContent.toLowerCase() : 'all';
    
    fetch('store/data/data.json')
        .then(response => response.json())
        .then(data => {
            let filteredModels = data.models;
            
            // Filter by category
            if (category !== 'all') {
                filteredModels = filteredModels.filter(model => model.category === category);
            }
            
            // Filter by tag
            if (tag !== 'all') {
                filteredModels = filteredModels.filter(model => 
                    model.tags.some(t => t.toLowerCase().includes(tag))
                );
            }
            
            // Sort models
            filteredModels.sort((a, b) => {
                switch (sortBy) {
                    case 'newest':
                        return b.id.localeCompare(a.id);
                    case 'popular':
                        return b.downloads - a.downloads;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            });
            
            displayModels(filteredModels);
        });
}

// Initialize store page features
function initStorePage() {
    // Initialize filters
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const filterTags = document.querySelectorAll('.filter-tag');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterModels);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterModels);
    }
    
    if (filterTags) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                filterModels();
            });
        });
    }
    
    // Load models
    loadModels();
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            fetch('store/data/data.json')
                .then(response => response.json())
                .then(data => {
                    const filtered = data.models.filter(model =>
                        model.name.toLowerCase().includes(searchTerm) ||
                        model.description.toLowerCase().includes(searchTerm) ||
                        model.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                    );
                    
                    displaySearchResults(filtered, searchTerm);
                });
        }, 300));
        
        // Close results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }
}

// Display search results
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

// Highlight search terms in text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize page based on current page
function initPage() {
    // Common initializations
    animateCounter();
    createParticles();
    initTypingEffect();
    initParallax();
    
    // Page-specific initializations
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('store.html')) {
        initStorePage();
        initSearch();
    }
    
    // Add loaded class for animations
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove scroll indicator after first scroll
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.visibility = 'hidden';
                }
            }, { once: true });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

// Export functions for global use
window.loadModels = loadModels;
window.filterModels = filterModels;
window.initSearch = initSearch;
