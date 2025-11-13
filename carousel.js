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
