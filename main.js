const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
const navbar = document.querySelector('.navbar');

// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.offsetTop - navbar.offsetHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        // Close mobile menu
        navUl.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form submission
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (name && email && message) {
        if (!/\S+@\S+\.\S+/.test(email)) {
            statusMsg.textContent = "Please enter a valid email.";
            statusMsg.style.color = "red";
            return;
        }

        // Submit via Formspree using fetch for AJAX (no page reload)
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                statusMsg.textContent = "Thank you! We will contact you soon.";
                statusMsg.style.color = "green";
                form.reset();
            } else {
                statusMsg.textContent = "Oops! There was a problem submitting your form.";
                statusMsg.style.color = "red";
            }
        } catch (error) {
            statusMsg.textContent = "Oops! There was a problem submitting your form.";
            statusMsg.style.color = "red";
        }
    } else {
        statusMsg.textContent = "Please fill out all fields.";
        statusMsg.style.color = "red";
    }
});
