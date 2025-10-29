
let currentIndex = 0;
const cards = document.querySelectorAll(".doctor-card");
const totalCards = cards.length;
const visibleCards = 3;

const carouselWrapper = document.getElementById("carouselWrapper");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");

function updateSpecialistsCarousel() {
  if (cards.length === 0 || !carouselWrapper) {
    return;
  }

  const cardWidth = cards[0].offsetWidth || 300;
  const gap = 30;
  const translateX = -currentIndex * (cardWidth + gap);
  carouselWrapper.style.transform = `translateX(${translateX}px)`;

  const maxIndex = Math.max(0, totalCards - visibleCards);

  if (prevBtn && nextBtn) {
    prevBtn.classList.toggle("active", currentIndex > 0);
    nextBtn.classList.toggle("active", currentIndex < maxIndex);
  }
}

function nextSlide() {
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
    updateSpecialistsCarousel();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSpecialistsCarousel();
  }
}


if (prevBtn) prevBtn.addEventListener("click", prevSlide);
if (nextBtn) nextBtn.addEventListener("click", nextSlide);


updateSpecialistsCarousel();


let touchStartX = 0;
let touchEndX = 0;

if (carouselWrapper) {
  carouselWrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselWrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
}

function handleSwipe() {
  if (!carouselWrapper) return;

  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}


let testimonialsIndex = 0;
let testimonialCards = null;
let testimonialsTotal = 0;

function getTestimonialsVisibleCards() {
  if (window.innerWidth <= 768) {
    return 1;
  } else if (window.innerWidth <= 1024) {
    return 2;
  } else {
 
    const container = document.querySelector('.testimonials-carousel-container');
    if (container && testimonialCards && testimonialCards.length > 0) {
      const cardWidth = 480; 
      const gap = 25;
      const containerWidth = container.offsetWidth || container.clientWidth;
      
    
      if (containerWidth > 0) {
  
        const cardsThatFit = Math.floor((containerWidth + gap) / (cardWidth + gap));
      
        const availableCards = testimonialCards.length;
        return Math.min(Math.max(1, cardsThatFit), 4, availableCards);
      }
    }

    return testimonialCards && testimonialCards.length <= 3 ? testimonialCards.length : 3;
  }
}

let testimonialsCarousel = null;
let testimonialsPrev = null;
let testimonialsNext = null;

function updateTestimonialsCarousel() {
  if (
    !testimonialCards ||
    testimonialCards.length === 0 ||
    !testimonialsCarousel
  )
    return;

  let testimonialsVisibleCards = getTestimonialsVisibleCards();

  testimonialsVisibleCards = Math.min(testimonialsVisibleCards, testimonialsTotal);
  

  void testimonialCards[0].offsetWidth;
  const cardWidth = testimonialCards[0].offsetWidth || testimonialCards[0].clientWidth || testimonialCards[0].getBoundingClientRect().width || 480;
 
  const gap = window.innerWidth <= 768 ? 15 : 25;

  const maxIndex = Math.max(0, testimonialsTotal - testimonialsVisibleCards);


  if (testimonialsIndex > maxIndex) {
    testimonialsIndex = maxIndex;
  }
  if (testimonialsIndex < 0) {
    testimonialsIndex = 0;
  }

  const translateX = -testimonialsIndex * (cardWidth + gap);
  testimonialsCarousel.style.transform = `translateX(${translateX}px)`;

  if (testimonialsPrev && testimonialsNext) {

    if (testimonialsIndex > 0) {
      testimonialsPrev.classList.add("active");
    } else {
      testimonialsPrev.classList.remove("active");
    }
    
    if (testimonialsIndex < maxIndex && maxIndex > 0) {
      testimonialsNext.classList.add("active");
    } else {
      testimonialsNext.classList.remove("active");
    }
  }
}

function testimonialsNextSlide() {
  let testimonialsVisibleCards = getTestimonialsVisibleCards();
  testimonialsVisibleCards = Math.min(testimonialsVisibleCards, testimonialsTotal);
  const maxIndex = Math.max(0, testimonialsTotal - testimonialsVisibleCards);
  if (testimonialsIndex < maxIndex) {
    testimonialsIndex++;
    updateTestimonialsCarousel();
  }
}

function testimonialsPrevSlide() {
  if (testimonialsIndex > 0) {
    testimonialsIndex--;
    updateTestimonialsCarousel();
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const handleResize = debounce(() => {
  updateSpecialistsCarousel();
  const testimonialsVisibleCards = getTestimonialsVisibleCards();
  const maxIndex = Math.max(0, testimonialsTotal - testimonialsVisibleCards);
  if (testimonialsIndex > maxIndex) {
    testimonialsIndex = maxIndex;
  }
  updateTestimonialsCarousel();
}, 250);

window.addEventListener("resize", handleResize);

function initTestimonialsCarousel() {
  testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialsTotal = testimonialCards.length;
  testimonialsCarousel = document.getElementById("testimonialsCarousel");
  testimonialsPrev = document.getElementById("testimonialsPrev");
  testimonialsNext = document.getElementById("testimonialsNext");

  if (testimonialsPrev) {
    testimonialsPrev.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      testimonialsPrevSlide();
    });
  }
  if (testimonialsNext) {
    testimonialsNext.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      testimonialsNextSlide();
    });
  }


  setTimeout(() => {
    updateTestimonialsCarousel();
  }, 100);


  let startX = 0;
  let endX = 0;
  if (testimonialsCarousel) {
    testimonialsCarousel.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].screenX;
    });
    testimonialsCarousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].screenX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) testimonialsNextSlide();
        else testimonialsPrevSlide();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTestimonialsCarousel);
} else {
  initTestimonialsCarousel();
}


const burgerMenu = document.getElementById("burgerMenu");
const nav = document.querySelector(".nav");

function toggleMenu() {
  if (!burgerMenu || !nav) return;
  burgerMenu.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

function closeMenu() {
  if (!burgerMenu || !nav) return;
  burgerMenu.classList.remove("active");
  nav.classList.remove("active");
  document.body.classList.remove("menu-open");
}

if (burgerMenu && nav) {

  burgerMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });


  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target) &&
      !burgerMenu.contains(e.target)
    ) {
      closeMenu();
    }
  });
}
