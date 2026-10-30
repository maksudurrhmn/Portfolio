const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('menu-open-icon');
const closeIcon = document.getElementById('menu-close-icon');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');

  mobileMenu.classList.toggle('hidden');
  openIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close menu after clicking a navigation link
document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    openIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Scrolling Animation
let allSection = document.querySelectorAll('.animation');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {});

allSection.forEach((el) => observer.observe(el));

// Carousel Functionality

const track = document.getElementById('project-track');
const slides = document.querySelectorAll('.project-slide');
const prevButton = document.getElementById('prev-project');
const nextButton = document.getElementById('next-project');
const dotsContainer = document.getElementById('project-dots');

let currentIndex = 0;

function getVisibleSlides() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function getMaxIndex() {
  return Math.max(0, slides.length - getVisibleSlides());
}

function createDots() {
  dotsContainer.innerHTML = '';

  for (let i = 0; i <= getMaxIndex(); i++) {
    const dot = document.createElement('button');

    dot.className = 'h-2.5 w-2.5 rounded-full bg-gray-300 transition-all';

    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;

  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === getMaxIndex();

  [...dotsContainer.children].forEach((dot, index) => {
    dot.classList.toggle('bg-gray-900', index === currentIndex);
    dot.classList.toggle('bg-gray-300', index !== currentIndex);
    dot.classList.toggle('w-6', index === currentIndex);
  });
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < getMaxIndex()) {
    currentIndex++;
    updateCarousel();
  }
});

window.addEventListener('resize', () => {
  currentIndex = Math.min(currentIndex, getMaxIndex());
  createDots();
  updateCarousel();
});

createDots();
updateCarousel();
