// ============================================
// AUTO-PLAY AUDIO ON PAGE LOAD
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('voiceNote');
  audio.volume = 1.0;
  const playAttempt = audio.play();
  
  if (playAttempt !== undefined) {
    playAttempt
      .then(() => {
        console.log("Audio started playing automatically! 🎵");
      })
      .catch(error => {
        console.log("Autoplay blocked by browser policy");
        setTimeout(() => {
          audio.play().catch(e => {
            console.log("Second autoplay attempt failed - user interaction needed");
          });
        }, 500);
      });
  }
});

document.addEventListener('click', function playOnFirstClick() {
  const audio = document.getElementById('voiceNote');
  if (audio.paused) {
    audio.play().catch(e => console.log("Play attempt failed"));
  }
  document.removeEventListener('click', playOnFirstClick);
}, { once: true });

// ============================================
// GENERATE STARRY BACKGROUND
// ============================================
const starsContainer = document.getElementById("starsContainer");

for (let i = 0; i < 200; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.className = "shooting-star";
  shootingStar.style.left = Math.random() * 100 + "%";
  shootingStar.style.top = Math.random() * 50 + "%";
  shootingStar.style.animationDuration = (2 + Math.random() * 1.5) + "s";
  starsContainer.appendChild(shootingStar);

  setTimeout(() => {
    shootingStar.remove();
  }, 3000);
}

setInterval(createShootingStar, 2000);

for (let i = 0; i < 3; i++) {
  setTimeout(createShootingStar, i * 1500);
}

// ============================================
// IMAGE SOURCES AND MEMORY DESCRIPTIONS
// ============================================
const imageData = [
  {
    src: 'four.jpeg',
    text: 'our first photo - Us pal ki tasveer… jab main bas muskurati thi, bina jaane ki yeh yaadein ek din itni keemti ho jaayengi.'
  },
  {
    src: 'eight.jpeg',
    text: 'pitne vaale kaaamc👋👋👋😂'
  },
  {
    src: 'three.jpeg',
    text: 'Adventures together, creating memories that last a lifetime 🌈'
  },
  {
    src: 'one.jpeg',
    text: 'Best memory 😌✨ (dying to recreate 😭👋)'
  },
  {
    src: 'twelve.jpeg',
    text: 'aapko help chiye?? Lao main drink pakad leti hoonAapko help chahiye? 😌 Lao, main drink pakad leti hoon… baaki aap sambhaal lena 👋💀'
  },
  {
    src: 'six.jpeg',
    text: 'Through thick and thin, always together 🤝'
  },
  {
    src: 'seven.jpeg',
    text: 'Celebrating the little things that mean everything 🎉'
  },
  {
    src: 'two.jpeg',
    text: 'Your kindness touches everyone around you 💝'
  },
  {
    src: 'nine.jpeg',
    text: 'Creating magic in ordinary moments ✨'
  },
  {
    src: 'ten.jpeg',
    text: 'bhaiiiiiiiiiiiii 🫂🫂🫂'
  },
  {
    src: 'eleven.jpeg',
    text: 'Our first Holi together 😌🌈 — officially colourful chaos begins 💀👋'
  },
  {
    src: 'five.jpeg',
    text: 'Your spirit inspires everyone you meet 🦋'
  },
  {
    src: 'thirteen.jpeg',
    text: 'Our first outing 😏💛 — officially the start of many more memories.'
  },
  {
    src: 'fourteen.jpeg',
    text: 'You make the world a better place just by being you 🌍'
  },
  {
    src: 'fifteen.jpeg',
    text: 'Here\'s to many more beautiful memories together! 🥂'
  }
];

// ============================================
// CREATE SLIDESHOW WITH MEMORY TEXT
// ============================================
const slideshowContainer = document.getElementById('slideshowContainer');

imageData.forEach((data, index) => {
  const slide = document.createElement('div');
  slide.className = 'slide';
  
  const img = document.createElement('img');
  img.src = data.src;
  img.alt = `Memory ${index + 1}`;
  
  const textDiv = document.createElement('div');
  textDiv.className = 'memory-text';
  textDiv.textContent = data.text;
  
  slide.appendChild(img);
  slide.appendChild(textDiv);
  slideshowContainer.appendChild(slide);
});

// ============================================
// SLIDESHOW LOGIC WITH TEXT-FIRST ANIMATION
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  const slide = slides[index];
  const img = slide.querySelector('img');
  const text = slide.querySelector('.memory-text');
  
  // Remove active from all slides
  slides.forEach(s => {
    s.classList.remove('active');
    s.querySelector('img').classList.remove('show');
    s.querySelector('.memory-text').classList.remove('show');
  });
  
  // Add active to current slide
  slide.classList.add('active');
  
  // Show text first
  setTimeout(() => {
    text.classList.add('show');
  }, 100);
  
  // Then show image after text fades
  setTimeout(() => {
    text.classList.remove('show');
  }, 2000);
  
  setTimeout(() => {
    img.classList.add('show');
  }, 2500);
}

showSlide(0);

const slideInterval = setInterval(() => {
  currentSlide++;
  
  if (currentSlide < slides.length) {
    showSlide(currentSlide);
  } else {
    clearInterval(slideInterval);
    // Automatically transition to card section after slideshow
    setTimeout(() => {
      showSection('cardSection');
    }, 1000);
  }
}, 5000); // 5 seconds per slide to accommodate text + image

// ============================================
// CREATE FLOATING TEXT MESSAGE
// ============================================
const quote = "Some people don't just add years to life, they add life to every year.";
const words = quote.split(" ");
const floatingText = document.getElementById("floatingText");

words.forEach((word, index) => {
  const span = document.createElement("span");
  span.className = "word";
  span.textContent = word;
  span.style.animationDelay = `${index * 0.15}s`;
  span.style.animationDuration = `${3 + (index % 3) * 0.5}s`;
  floatingText.appendChild(span);
});

// ============================================
// CREATE GALLERY WITH ZOOM FUNCTIONALITY
// ============================================
const galleryGrid = document.getElementById("galleryGrid");

imageData.forEach((data, index) => {
  const div = document.createElement("div");
  div.className = "gallery-item";
  
  const img = document.createElement("img");
  img.src = data.src;
  img.alt = `Gallery Image ${index + 1}`;
  
  // Add click event for zoom
  div.addEventListener('click', () => {
    openImageModal(data.src, data.text);
  });
  
  div.appendChild(img);
  galleryGrid.appendChild(div);
});

// ============================================
// IMAGE ZOOM MODAL
// ============================================
function openImageModal(imageSrc, imageText) {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">&times;</button>
      <img src="${imageSrc}" alt="Zoomed image">
      <p class="modal-text">${imageText}</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Trigger animation
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
  
  // Close on button click
  modal.querySelector('.modal-close').addEventListener('click', () => {
    closeModal(modal);
  });
  
  // Close on ESC key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeModal(modal) {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.remove();
  }, 300);
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(sectionId);
  
  setTimeout(() => {
    targetSection.classList.add('active');
  }, 50);
  
  // DON'T restart audio - let it continue playing
  if (sectionId === 'cardSection') {
    const audio = document.getElementById('voiceNote');
    // Only play if audio hasn't started yet
    if (audio.paused && audio.currentTime === 0) {
      setTimeout(() => {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio playing successfully!");
            })
            .catch(e => {
              console.log("Autoplay blocked. Click audio controls to play.");
              alert("Please click the play button on the audio player to hear the special message! 🎧");
            });
        }
      }, 800);
    }
  }
  
  if (sectionId === 'gallerySection') {
    targetSection.scrollTop = 0;
  }
}

// ============================================
// SCROLL TO TOP BUTTON FUNCTIONALITY
// ============================================
const scrollTopBtn = document.getElementById('scrollTopBtn');
const gallerySection = document.getElementById('gallerySection');

gallerySection.addEventListener('scroll', () => {
  if (gallerySection.scrollTop > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  gallerySection.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('seeMoreBtn').addEventListener('click', () => {
  showSection('gallerySection');
});

document.getElementById('celebrateBtn').addEventListener('click', () => {
  window.location.href = 'temp.html';
});

document.getElementById('celebrateBtn2').addEventListener('click', () => {
  window.location.href = 'temp.html';
});