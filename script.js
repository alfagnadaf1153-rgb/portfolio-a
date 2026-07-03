document.addEventListener('DOMContentLoaded', () => {
  // --- NAVBAR SCROLL EFFECT ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE MENU TOGGLE ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // --- HERO TYPING ANIMATION ---
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');

  const textArray = ["AI & Data Science Student", "Machine Learning Enthusiast", "Python Developer", "Data Analyst", "AI & Data Science Student | IoT Developer"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  // Start the typing animation
  if (textArray.length) setTimeout(type, newTextDelay);

  // --- INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- SKILLS PROGRESS BAR ANIMATION ON VIEW ---
  const skillCards = document.querySelectorAll('.skill-card');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        const percentage = entry.target.getAttribute('data-percent');
        if (progressBar) {
          progressBar.style.width = percentage + '%';
        }
      }
    });
  }, {
    threshold: 0.1
  });

  skillCards.forEach(card => skillObserver.observe(card));

  // --- ACTIVE NAVBAR LINKS ON SCROLL ---
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150; // offset for nav header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

  // --- CONTACT FORM HANDLING ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate sending email
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;
        showStatus('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    
    // Auto hide status message after 5 seconds if success
    if (type === 'success') {
      setTimeout(() => {
        formStatus.style.opacity = '0';
        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.style.opacity = '1';
        }, 300);
      }, 5000);
    }
  }
});
