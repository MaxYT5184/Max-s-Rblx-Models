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
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-slide-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Load models in store page
document.addEventListener('DOMContentLoaded', function() {
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
                loading.innerHTML = '<p>Error loading models. Please try again later.</p>';
            });
    }
});

function displayModels(models) {
    const modelsGrid = document.getElementById('modelsGrid');
    if (!modelsGrid) return;
    
    modelsGrid.innerHTML = '';
    
    models.forEach(model => {
        const modelCard = document.createElement('div');
        modelCard.className = 'model-card animate-slide-up';
        modelCard.style.animationDelay = `${Math.random() * 0.3}s`;
        
        const iconMap = {
            'ui': 'fa-comments',
            'gameplay': 'fa-gamepad',
            'tools': 'fa-tools',
            'environment': 'fa-tree'
        };
        
        modelCard.innerHTML = `
            <div class="model-image">
                <i class="fas ${iconMap[model.category] || 'fa-cube'}"></i>
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
                    </div>
                </div>
                <a href="${model.page || '#'}" class="btn-primary" style="width: 100%; text-align: center; margin-top: 15px;">
                    <i class="fas fa-eye"></i> View Details
                </a>
            </div>
        `;
        
        modelsGrid.appendChild(modelCard);
    });
}

// Filter functionality for store page
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

function filterModels() {
    // Implement filtering logic here
    console.log('Filter models');
}

// Search functionality for store page
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        searchModels(searchTerm);
    }, 300));
}

function searchModels(term) {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        const title = card.querySelector('.model-title').textContent.toLowerCase();
        const description = card.querySelector('.model-description').textContent.toLowerCase();
        const category = card.querySelector('.model-category').textContent.toLowerCase();
        
        if (title.includes(term) || description.includes(term) || category.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
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

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing! You will receive updates about new models.');
            this.reset();
        }
    });
}

// Add animation to elements on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
