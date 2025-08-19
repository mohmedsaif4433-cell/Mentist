// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const langButtons = document.querySelectorAll('.lang-btn');

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // هنا يمكن إضافة منطق البحث الفعلي لاحقاً
        alert(`البحث عن: ${searchTerm}\n\nهذه الميزة ستكون متاحة قريباً!`);
        console.log('Searching for:', searchTerm);
    }
}

// Event listeners for search
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Language switching functionality
langButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang');
        
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Switch language content
        switchLanguage(selectedLang);
    });
});

function switchLanguage(lang) {
    if (lang === 'en') {
        // Switch to English
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.body.style.textAlign = 'left';
        
        // Update content to English (basic example)
        document.title = 'Mentist - Home';
        document.querySelector('.hero-title').textContent = 'Your Gateway to Dental Medicine';
        document.querySelector('.hero-subtitle').textContent = 'Comprehensive educational platform for dental students and professionals - references, research, educational videos and more';
        document.querySelector('.search-input').placeholder = 'Search references, articles, videos...';
        document.querySelector('.search-button').innerHTML = '<i class="fas fa-search"></i> Search';
        
        // Update navigation
        const navLinks = document.querySelectorAll('.main-nav a');
        const englishNavTexts = ['Home', 'Digital Library', 'Disease Encyclopedia', 'News', 'Entertainment', 'Blog'];
        navLinks.forEach((link, index) => {
            if (englishNavTexts[index]) {
                link.textContent = englishNavTexts[index];
            }
        });
        
        // Update quick access cards
        const quickCards = document.querySelectorAll('.quick-card');
        const englishCardTitles = ['Digital Library', 'Disease Encyclopedia', 'News', 'Entertainment'];
        const englishCardDescriptions = [
            'References, books and educational videos',
            'Comprehensive guide to oral and dental diseases',
            'Latest updates in dental medicine',
            'Educational and entertaining games'
        ];
        
        quickCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            if (title && englishCardTitles[index]) {
                title.textContent = englishCardTitles[index];
            }
            if (description && englishCardDescriptions[index]) {
                description.textContent = englishCardDescriptions[index];
            }
        });
        
    } else {
        // Switch to Arabic
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.body.style.textAlign = 'right';
        
        // Restore Arabic content
        document.title = 'Mentist - الرئيسية';
        document.querySelector('.hero-title').textContent = 'بوابتك الأولى لعالم طب الأسنان';
        document.querySelector('.hero-subtitle').textContent = 'منصة تعليمية شاملة للطلاب والمهتمين بطب الأسنان - مراجع، أبحاث، فيديوهات تعليمية وأكثر';
        document.querySelector('.search-input').placeholder = 'ابحث في المراجع، المقالات، الفيديوهات...';
        document.querySelector('.search-button').innerHTML = '<i class="fas fa-search"></i> بحث';
        
        // Restore Arabic navigation
        const navLinks = document.querySelectorAll('.main-nav a');
        const arabicNavTexts = ['الرئيسية', 'المكتبة الرقمية', 'موسوعة الأمراض', 'الأخبار', 'قسم الترفيه', 'المدونة'];
        navLinks.forEach((link, index) => {
            if (arabicNavTexts[index]) {
                link.textContent = arabicNavTexts[index];
            }
        });
        
        // Restore Arabic quick access cards
        const quickCards = document.querySelectorAll('.quick-card');
        const arabicCardTitles = ['المكتبة الرقمية', 'موسوعة الأمراض', 'الأخبار', 'قسم الترفيه'];
        const arabicCardDescriptions = [
            'مراجع وكتب وفيديوهات تعليمية',
            'دليل شامل لأمراض الفم والأسنان',
            'آخر المستجدات في عالم طب الأسنان',
            'ألعاب تعليمية وترفيهية'
        ];
        
        quickCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            if (title && arabicCardTitles[index]) {
                title.textContent = arabicCardTitles[index];
            }
            if (description && arabicCardDescriptions[index]) {
                description.textContent = arabicCardDescriptions[index];
            }
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to search button
function showSearchLoading() {
    const searchButton = document.getElementById('searchBtn');
    const originalContent = searchButton.innerHTML;
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';
    searchButton.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
        searchButton.innerHTML = originalContent;
        searchButton.disabled = false;
    }, 2000);
}

// Enhanced search with loading
function handleSearchWithLoading() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        showSearchLoading();
        // هنا يمكن إضافة منطق البحث الفعلي لاحقاً
        setTimeout(() => {
            alert(`البحث عن: ${searchTerm}\n\nهذه الميزة ستكون متاحة قريباً!`);
        }, 2000);
    }
}

// Update search event listeners to use loading version
searchBtn.removeEventListener('click', handleSearch);
searchBtn.addEventListener('click', handleSearchWithLoading);

// Add fade-in animation on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects to content items
document.querySelectorAll('.content-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

console.log('Mentist website loaded successfully!');

