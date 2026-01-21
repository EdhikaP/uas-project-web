// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        if (navToggle) {
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
let isScrolling = false;

window.addEventListener('scroll', () => {
    // Debounce scroll event untuk performa
    if (!isScrolling) {
        isScrolling = true;
        
        setTimeout(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (current && link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            isScrolling = false;
        }, 100);
    }
    
    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Contact Form Submission
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values dengan null check
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        // Validasi sederhana
        if (!name || !email || !message) {
            alert('Mohon isi semua field yang wajib diisi!');
            return;
        }
        
        // Validasi email sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Mohon masukkan alamat email yang valid!');
            return;
        }
        
        // Simulasi pengiriman
        alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim.\nKami akan membalas ke email ${email} dalam waktu 1x24 jam.`);
        
        // Reset form
        messageForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize with active link for home
document.addEventListener('DOMContentLoaded', () => {
    // Set home link as active initially
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(item => item.classList.remove('active'));
        homeLink.classList.add('active');
    }
    
    // Add animation to stats counter
    const statNumbers = document.querySelectorAll('.stat h4');
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const targetValue = stat.textContent.trim();
                    
                    // If it's a number, animate it
                    const numValue = parseInt(targetValue);
                    if (!isNaN(numValue) && numValue > 0) {
                        animateCounter(stat, numValue);
                    }
                    
                    // Stop observing after animation
                    observer.unobserve(stat);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
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
    
    // Preload gambar untuk performa yang lebih baik
    preloadImages();
});

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 detik
    const increment = target / (duration / 30);
    const startTime = Date.now();
    
    const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function untuk animasi lebih smooth
        current = target * easeOutQuad(progress);
        
        if (progress >= 1) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, 30);
}

// Easing function untuk animasi yang lebih smooth
function easeOutQuad(t) {
    return t * (2 - t);
}

// Fungsi untuk preload gambar
function preloadImages() {
    const images = [
        'unnamed.jpg',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Form validation untuk input real-time
const formInputs = document.querySelectorAll('#messageForm input, #messageForm textarea');
if (formInputs.length > 0) {
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#2ecc71';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '#3498db';
        });
    });
}

// Back to top button (opsional)
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inisialisasi back to top button
addBackToTopButton();

// CSS untuk back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .back-to-top:hover {
        background-color: #2980b9;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    }
    
    .back-to-top:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);