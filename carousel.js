// Specialists Carousel functionality
let currentIndex = 0;
const cards = document.querySelectorAll('.doctor-card');
const totalCards = cards.length;
const visibleCards = 3;

const carouselWrapper = document.getElementById('carouselWrapper');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

function updateCarousel() {
    if (cards.length > 0 && carouselWrapper) {
        const cardWidth = cards[0].offsetWidth + 30; // card width + gap
        const translateX = -currentIndex * cardWidth;
        carouselWrapper.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.classList.toggle('active', currentIndex > 0);
            nextBtn.classList.toggle('active', currentIndex < totalCards - visibleCards);
        }
    }
}

function nextSlide() {
    if (currentIndex < totalCards - visibleCards) {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

// Event listeners for specialists carousel
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Initial state for specialists
updateCarousel();

// Touch/swipe support for specialists carousel
let touchStartX = 0;
let touchEndX = 0;

if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
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

// Testimonials Carousel functionality
let testimonialsIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialsTotal = testimonialCards.length;

const testimonialsCarousel = document.getElementById('testimonialsCarousel');
const testimonialsPrev = document.getElementById('testimonialsPrev');
const testimonialsNext = document.getElementById('testimonialsNext');

function getTestimonialsVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function getTestimonialsGap() {
    return window.innerWidth <= 768 ? 15 : 25;
}

function updateTestimonialsCarousel() {
    if (testimonialCards.length > 0 && testimonialsCarousel) {
        const gap = getTestimonialsGap();
        const cardWidth = testimonialCards[0].offsetWidth + gap; // card width + gap
        const translateX = -testimonialsIndex * cardWidth;
        testimonialsCarousel.style.transform = `translateX(${translateX}px)`;
        
        const testimonialsVisibleCards = getTestimonialsVisibleCards();
        
        // Update button states
        if (testimonialsPrev && testimonialsNext) {
            testimonialsPrev.classList.toggle('active', testimonialsIndex > 0);
            testimonialsNext.classList.toggle('active', testimonialsIndex < testimonialsTotal - testimonialsVisibleCards);
        }
    }
}

function testimonialsNextSlide() {
    const testimonialsVisibleCards = getTestimonialsVisibleCards();
    if (testimonialsIndex < testimonialsTotal - testimonialsVisibleCards) {
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

// Reset on window resize for responsiveness
window.addEventListener('resize', () => {
    updateTestimonialsCarousel();
    if (testimonialsIndex + getTestimonialsVisibleCards() > testimonialsTotal) {
        testimonialsIndex = Math.max(0, testimonialsTotal - getTestimonialsVisibleCards());
        updateTestimonialsCarousel();
    }
});

// Event listeners for testimonials carousel
if (testimonialsPrev) testimonialsPrev.addEventListener('click', testimonialsPrevSlide);
if (testimonialsNext) testimonialsNext.addEventListener('click', testimonialsNextSlide);

// Initial state for testimonials
updateTestimonialsCarousel();

// Touch/swipe support for testimonials carousel
let testimonialsTouchStartX = 0;
let testimonialsTouchEndX = 0;

if (testimonialsCarousel) {
    testimonialsCarousel.addEventListener('touchstart', (e) => {
        testimonialsTouchStartX = e.changedTouches[0].screenX;
    });

    testimonialsCarousel.addEventListener('touchend', (e) => {
        testimonialsTouchEndX = e.changedTouches[0].screenX;
        handleTestimonialsSwipe();
    });
}

function handleTestimonialsSwipe() {
    const swipeThreshold = 50;
    const diff = testimonialsTouchStartX - testimonialsTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            testimonialsNextSlide();
        } else {
            testimonialsPrevSlide();
        }
    }
}
// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("appointmentModal");
  const openModalBtn = document.getElementById("openModal");
  const openModalBtn2 = document.getElementById("openModal2");
  const closeModalBtn = document.querySelector(".modal-close");
  const form = document.getElementById("appointmentForm");
  const phoneInput = document.getElementById("clientPhone");

  // Phone mask
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("8")) {
      value = "7" + value.substring(1);
    }
    if (!value.startsWith("7") && value.length > 0) {
      value = "7" + value;
    }

    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = "+7";
      if (value.length > 1) {
        formattedValue += " (" + value.substring(1, 4);
      }
      if (value.length >= 4) {
        formattedValue += ") " + value.substring(4, 7);
      }
      if (value.length >= 7) {
        formattedValue += "-" + value.substring(7, 9);
      }
      if (value.length >= 9) {
        formattedValue += "-" + value.substring(9, 11);
      }
    }
    e.target.value = formattedValue;
  });

  // Open modal
  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
  }

  // Event listeners
  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }

  if (openModalBtn2) {
    openModalBtn2.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();

    if (!name || !phone) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    // Here you can add your form submission logic
    // For example, send data to server via fetch API
    console.log("Form submitted:", { name, phone });

    // Show success message
    alert(
      "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время."
    );

    // Close modal and reset form
    closeModal();
  });
});

