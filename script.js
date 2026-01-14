// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.querySelector('i').classList.toggle('fa-bars');
    navToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.remove('fa-times');
        navToggle.querySelector('i').classList.add('fa-bars');
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Submission
const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan membalas ke email ${email} dalam waktu 1x24 jam.`);
    
    // Reset form
    messageForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '15px 0';
    }
});

// Initialize with active link for home
window.addEventListener('DOMContentLoaded', () => {
    // Set home link as active initially
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(item => item.classList.remove('active'));
        homeLink.classList.add('active');
    }
    
    // Add animation to stats counter
    const statNumbers = document.querySelectorAll('.stat h4');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetValue = stat.textContent;
                
                // If it's a number, animate it
                if (!isNaN(parseInt(targetValue))) {
                    animateCounter(stat, parseInt(targetValue));
                }
                
                // Stop observing after animation
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
});

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Service card hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});