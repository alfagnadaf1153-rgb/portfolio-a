document.addEventListener("DOMContentLoaded", () => {

  // ================= NAVBAR SCROLL EFFECT =================

  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  // ================= MOBILE MENU =================

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {

    const toggleMenu = () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("overflow-hidden");
    };

    hamburger.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          toggleMenu();
        }
      });
    });

  }


  // ================= HERO TYPING ANIMATION =================

  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const textArray = [
    "AI & Data Science Student",
    "Python Learner",
    "C Learner",
    "Machine Learning Enthusiast",
    "Software Development Enthusiast"
  ];

  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;

  let textArrayIndex = 0;
  let charIndex = 0;


  function type() {

    if (!typedTextSpan) {
      return;
    }

    if (charIndex < textArray[textArrayIndex].length) {

      if (cursorSpan && !cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }

      typedTextSpan.textContent +=
        textArray[textArrayIndex].charAt(charIndex);

      charIndex++;

      setTimeout(type, typingDelay);

    } else {

      if (cursorSpan) {
        cursorSpan.classList.remove("typing");
      }

      setTimeout(erase, newTextDelay);

    }

  }


  function erase() {

    if (!typedTextSpan) {
      return;
    }

    if (charIndex > 0) {

      if (cursorSpan && !cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }

      typedTextSpan.textContent =
        textArray[textArrayIndex].substring(0, charIndex - 1);

      charIndex--;

      setTimeout(erase, erasingDelay);

    } else {

      if (cursorSpan) {
        cursorSpan.classList.remove("typing");
      }

      textArrayIndex++;

      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0;
      }

      setTimeout(type, typingDelay + 500);

    }

  }


  if (textArray.length && typedTextSpan) {
    setTimeout(type, newTextDelay);
  }


  // ================= REVEAL ANIMATIONS =================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // ================= SKILLS PROGRESS BAR =================

  const skillCards = document.querySelectorAll(".skill-card");

  if ("IntersectionObserver" in window) {

    const skillObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const progressBar =
              entry.target.querySelector(".skill-progress");

            const percentage =
              entry.target.getAttribute("data-percent");

            if (progressBar && percentage) {
              progressBar.style.width = percentage + "%";
            }

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.1
      }
    );

    skillCards.forEach((card) => {
      skillObserver.observe(card);
    });

  }


  // ================= ACTIVE NAVBAR LINK =================

  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    let current = "";

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }

    });


    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }

    });

  });


  // ================= CONTACT FORM =================

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const name =
        document.getElementById("name").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const subject =
        document.getElementById("subject").value.trim();

      const message =
        document.getElementById("message").value.trim();


      // Check empty fields

      if (!name || !email || !subject || !message) {

        showStatus(
          "Please fill in all fields.",
          "error"
        );

        return;
      }


      // Check email

      if (!validateEmail(email)) {

        showStatus(
          "Please enter a valid email address.",
          "error"
        );

        return;
      }


      // Open user's email application

      const emailBody =
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`;


      const mailtoLink =
        `mailto:alfagnadaf1153@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(emailBody)}`;


      window.location.href = mailtoLink;


      showStatus(
        "Your email application is opening...",
        "success"
      );

    });

  }


  // ================= EMAIL VALIDATION =================

  function validateEmail(email) {

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email.toLowerCase());

  }


  // ================= STATUS MESSAGE =================

  function showStatus(message, type) {

    if (!formStatus) {
      return;
    }

    formStatus.textContent = message;

    formStatus.className =
      "form-status " + type;


    setTimeout(() => {

      formStatus.style.opacity = "0";

      setTimeout(() => {

        formStatus.className =
          "form-status";

        formStatus.style.opacity = "1";

      }, 300);

    }, 5000);

  }

});