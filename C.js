/ Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 41, 59, 0.98)';
    } else {
        navbar.style.background = 'rgba(30, 41, 59, 0.95)';
    }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Show success message (you would replace this with actual form submission)
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

// Video Call Booking Function
function bookVideoCall() {
    showNotification('Redirecting to video call booking...', 'info');
    // In a real application, this would integrate with a booking system like Calendly
    setTimeout(() => {
        window.open('https://calendly.com/your-booking-link', '_blank');
    }, 1000);
}

// Phone Call Booking Function
function bookPhoneCall() {
    showNotification('Redirecting to phone call scheduling...', 'info');
    // In a real application, this would integrate with a booking system
    setTimeout(() => {
        window.open('tel:+15551234567', '_self');
    }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 200; // Lower = faster

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target') || +counter.innerText.replace(/[^0-9]/g, '');
            const data = +counter.innerText.replace(/[^0-9]/g, '');
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time) + (counter.innerText.includes('+') ? '+' : '') + (counter.innerText.includes('%') ? '%' : '');
                setTimeout(animate, 1);
            } else {
                counter.innerText = value + (counter.innerText.includes('+') ? '+' : '') + (counter.innerText.includes('%') ? '%' : '');
            }
        }
        animate();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate counters when stats section comes into view
            if (entry.target.classList.contains('stats-grid')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.section-header, .stats-grid, .service-card, .team-card, .testimonial-card, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Social Media Click Handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-linkedin')) {
            showNotification('LinkedIn profile coming soon!', 'info');
        } else if (icon.classList.contains('fa-envelope')) {
            showNotification('Opening email client...', 'info');
            setTimeout(() => {
                window.location.href = 'mailto:info@chromahire.com';
            }, 1000);
        }
    });
});
