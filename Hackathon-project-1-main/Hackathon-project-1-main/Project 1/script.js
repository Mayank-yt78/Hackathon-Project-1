// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('.wrapper'),
  smooth: true,
  scrollFromAnywhere: true,
  resetNativeScroll: true
});

// Get all animated images
const animatedImages = document.querySelectorAll("#animate img");

// Function to update image positions
function updateImagePositions(scrollPosition) {
  animatedImages.forEach((image, index) => {
    const speed = 0.1 + (index * 0.05); // Different speed for each image
    const yPos = scrollPosition * speed;
    image.style.transform = `translateY(${yPos}px)`;
  });
}

// Scroll event listener
scroll.on('scroll', function (instance) {
  updateImagePositions(instance.scroll.y);
});

// Scroll to top button functionality
document.getElementById('scrollToTopBtn').addEventListener('click', function(e) {
  e.preventDefault();
  
  scroll.scrollTo('top', {
    duration: 2000,
    easing: [0.25, 0.1, 0.25, 1], // Smooth easing function
    callback: () => {
      // Reset image positions after scrolling to top
      animatedImages.forEach(image => {
        image.style.transform = 'translateY(0)';
      });
    }
  });
});

// Reset positions when reaching the top
scroll.on('call', 'resetImagePositions', () => {
  animatedImages.forEach(image => {
    image.style.transform = 'translateY(0)';
  });
});

// Initialize Swiper for cards
const cardSwiper = new Swiper(".mySwiper", {
  slidesPerView: 2.3,
  spaceBetween: 10,
  freeMode: true,
});

// Initialize Swiper for product categories
const categorySwiper = new Swiper(".mySwiper-2", {
  slidesPerView: 3.7,
  spaceBetween: 10,
  freeMode: true,
});

// GSAP animation
const tl = gsap.timeline();
tl.to("#page1", {
  y: "40vh",
  scale: 0.5,
  duration: 0
})
.to("#page1", {
  y: "0vh",
  duration: 1,
  delay: 1
})
.to("#page1", {
  rotate: 360,
  scale: 1
})
.to(".page2", {
  opacity: 1
});

// Navbar slide functionality
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const nsvSlide = document.querySelector(".nsvslide");
  const slideContents = document.querySelectorAll(".nsvslide-content");
  let timeout;

  function showSlide(event) {
    clearTimeout(timeout);
    const slideId = event.target.getAttribute("data-slide");
    
    slideContents.forEach((content) => {
      content.style.display = content.id === `${slideId}-content` ? "block" : "none";
    });
    
    nsvSlide.classList.add("active");
  }

  function hideSlide() {
    timeout = setTimeout(() => {
      nsvSlide.classList.remove("active");
    }, 200);
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", showSlide);
    item.addEventListener("mouseleave", hideSlide);
  });

  nsvSlide.addEventListener("mouseenter", () => clearTimeout(timeout));
  nsvSlide.addEventListener("mouseleave", hideSlide);
});

// Update Locomotive Scroll on window resize
window.addEventListener('resize', () => {
  scroll.update();
});

// Refresh Locomotive Scroll after all content is loaded
window.addEventListener('load', () => {
  scroll.update();
});