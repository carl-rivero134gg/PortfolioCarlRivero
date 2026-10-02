import './sass/main.scss';
import canvasDots from './heroCanvas.js';
import canvasDotsBg from './bgCanvas.js';

window.onload = function () {
  canvasDotsBg();
  canvasDots();
};

// Section observer for triggering fade-in animations on scroll
function sectionFadeIn(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && document.body.scrollWidth > 1300) {
      const target = entry.target;

      // Fade in bio if profile exists within the intersecting section
      const profile = target.querySelector('.profile');
      if (profile) {
        profile.classList.add('profile__fade-in');
      }

      // Dynamically fade in skill/certification items relative to the section
      const items = target.querySelectorAll('.skills__item, .certifications__badge-img, .certifications__container');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('skills__item-fade-in');
          item.style.opacity = '1';
          item.style.visibility = 'visible';
        }, 300 + index * 100);
      });
    }
  });
}

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

let options2 = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
};

let observer = new IntersectionObserver(sectionFadeIn, options);

const aboutSection = document.querySelector('#about');
const certsSection = document.querySelector('#certifications');

if (aboutSection) observer.observe(aboutSection);
if (certsSection) observer.observe(certsSection);

// navigation items in nav bar
const navLinks = document.querySelectorAll('.navigation__item');

// change highlighted nav link depending on page position
function navFadeIn(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove('navigation__item--active');
      });

      const navTarget = document.querySelector(`#nav-${entry.target.id}`);
      if (navTarget) {
        navTarget.classList.add('navigation__item--active');
      }
    }
  });
}

function navFadeInProjects(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove('navigation__item--active');
      });

      const navTarget = document.querySelector(`#nav-${entry.target.id}`);
      if (navTarget) {
        navTarget.classList.add('navigation__item--active');
      }
    }
  });
}

let observerNav = new IntersectionObserver(navFadeIn, options);

const heroSection = document.querySelector('#hero');
const contactSection = document.querySelector('#contact');

if (heroSection) observerNav.observe(heroSection);
if (aboutSection) observerNav.observe(aboutSection);
if (certsSection) observerNav.observe(certsSection);
if (contactSection) observerNav.observe(contactSection);

let observerNavProjects = new IntersectionObserver(navFadeInProjects, options2);

const projectsSection = document.querySelector('#projects');
if (projectsSection) observerNavProjects.observe(projectsSection);

// Form validation logic
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const submitBtn = document.querySelector('#form-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const unameInput = document.querySelector('.contact__form-name');
    const emailInput = document.querySelector('.contact__form-email');
    const msgInput = document.querySelector('.contact__form-message');

    const uname = unameInput.value;
    const email = emailInput.value;
    const msg = msgInput.value;

    const unameError = document.querySelector('.form-error__name');
    const emailError = document.querySelector('.form-error__email');
    const msgError = document.querySelector('.form-error__msg');

    let validUname = false;
    let validEmail = false;
    let validMsg = false;

    if (!uname) {
      validUname = false;
      unameInput.classList.add('input-error');
      unameError.style.display = 'block';
    } else {
      validUname = true;
      unameInput.classList.remove('input-error');
      unameError.style.display = 'none';
    }

    if (!email.match(re)) {
      validEmail = false;
      emailInput.classList.add('input-error');
      emailError.style.display = 'block';
    } else {
      validEmail = true;
      emailInput.classList.remove('input-error');
      emailError.style.display = 'none';
    }

    if (!msg) {
      validMsg = false;
      msgInput.classList.add('input-error');
      msgError.style.display = 'block';
    } else {
      validMsg = true;
      msgInput.classList.remove('input-error');
      msgError.style.display = 'none';
    }

    if (validUname && validEmail && validMsg) {
      document.querySelector('.contact__form').submit();

      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      sleep(1500).then(() => {
        document.querySelector('.contact__form').reset();
      });
    }
  });
}