// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2000
    });

    // Age Calculator
    function updateAge() {
        const birthday = new Date('2005-02-13');
        const now = new Date();
        
        let years = now.getFullYear() - birthday.getFullYear();
        let months = now.getMonth() - birthday.getMonth();
        let days = now.getDate() - birthday.getDate();
        
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
        
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, birthday.getDate());
            days = Math.floor((now - prevMonth) / (1000 * 60 * 60 * 24));
        }
        
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
    }
    
    updateAge();
    setInterval(updateAge, 1000 * 60 * 60 * 24); // Update daily

    // Matrix Rain Effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.querySelector('.matrix-bg');
    matrixBg.appendChild(canvas);

    canvas.width = matrixBg.offsetWidth;
    canvas.height = matrixBg.offsetHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Animation
    gsap.from('#navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    // Hero Content Animation
    gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power4.out'
    });

    // Section Titles Animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });
    });

    // Skills Animation
    gsap.utils.toArray('.skill').forEach(skill => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });

    // Timeline Animation
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: item.classList.contains('right') ? 100 : -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });
    });

    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateHackingSimulation();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateHackingSimulation() {
        const terminal = document.createElement('div');
        terminal.classList.add('hacking-terminal');
        terminal.innerHTML = `
            <div class="terminal-content">
                <p>INITIATING HACK SEQUENCE...</p>
                <p>BYPASSING MAINFRAME...</p>
                <p>ACCESS GRANTED!</p>
            </div>
        `;
        document.body.appendChild(terminal);

        setTimeout(() => {
            terminal.remove();
        }, 3000);
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Glitch Text Effect
function createGlitchEffect(element) {
    const text = element.textContent;
    let glitchInterval;

    element.addEventListener('mouseover', () => {
        clearInterval(glitchInterval);
        glitchInterval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (Math.random() < 0.1) {
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    }
                    return char;
                })
                .join('');
        }, 50);
    });

    element.addEventListener('mouseout', () => {
        clearInterval(glitchInterval);
        element.textContent = text;
    });
}

// Apply glitch effect to titles
document.querySelectorAll('.section-title').forEach(createGlitchEffect);
