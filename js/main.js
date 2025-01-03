// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Switching
document.addEventListener('DOMContentLoaded', () => {
    // Apply the saved theme immediately before DOM is fully loaded to prevent flash
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return; // Exit if toggle button is not found

    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;

    // Update the icon to match current theme
    updateThemeIcon(savedTheme === 'dark');

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme === 'dark');

        // Animate icon
        themeIcon.style.transition = 'transform 0.3s ease';
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'none';
        }, 300);
    }

    function updateThemeIcon(isDark) {
        if (isDark) {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
        }
    }

    // Simple Dropdown Menu
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        // Toggle dropdown on click
        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
            dropdownLink.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                dropdownLink.classList.remove('active');
            }
        });

        // Handle desktop hover if not on mobile
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                dropdownMenu.classList.add('show');
            });

            dropdown.addEventListener('mouseleave', () => {
                dropdownMenu.classList.remove('show');
                dropdownLink.classList.remove('active');
            });
        }
    }
});

// Initialize Lightbox options
if (typeof lightbox !== 'undefined') {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2',
        'fadeDuration': 300,
        'imageFadeDuration': 300
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Lazy load images in gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
}); 
