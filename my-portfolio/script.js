/**
 * Personal Portfolio Script
 * Developer: Najrul Hoque
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================== */
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  // Read theme from localStorage or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Update button icon (☾ for Dark, ☀ for Light)
    if (theme === 'dark') {
      themeIcon.textContent = '☾';
    } else {
      themeIcon.textContent = '☀';
    }
  }


  /* ==========================================
     2. MOBILE NAVIGATION MENU
     ========================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    navMenu.classList.add('is-active');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    navMenu.classList.remove('is-active');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close mobile menu on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-active')) {
        closeMobileMenu();
      }
    });
  });

  // Close mobile menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
      closeMobileMenu();
    }
  });


  /* ==========================================
     3. SCROLL REVEAL ANIMATION (IntersectionObserver)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve element once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ==========================================
     4. NAV LINK HIGHLIGHT ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const correspondNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondNav.classList.add('active');
        } else {
          correspondNav.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);


  /* ==========================================
     5. CONTACT FORM VALIDATION (Frontend Only)
     ========================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Clear previous error states
    clearErrors();

    // Validate Name
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'nameError');
      isValid = false;
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'emailError');
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'messageError');
      isValid = false;
    }

    // If valid, display frontend success message
    if (isValid) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Thanks! This demo form is currently frontend-only. Please reach out directly via email using the button or link above.';
      contactForm.reset();
    }
  });

  function showError(inputElement, errorElementId) {
    const parentGroup = inputElement.parentElement;
    parentGroup.classList.add('has-error');
  }

  function clearErrors() {
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('has-error'));
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }


  /* ==========================================
     6. AUTOMATIC DYNAMIC FOOTER YEAR
     ========================================== */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});