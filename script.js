 // Auto-play background music immediately
  window.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("backgroundMusic");
    music.volume = 0.3; // Set volume to 30%

    // Try to autoplay immediately
    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("🎵 Background music started automatically!");
        })
        .catch((error) => {
          console.log("Autoplay blocked by browser - will play on first interaction");
          
          // Play music on first user interaction (click anywhere)
          document.addEventListener("click", function playOnClick() {
            music.play()
              .then(() => console.log("Music started after user click"))
              .catch((e) => console.log("Play failed:", e));
          }, { once: true });
        });
    }
  });

// STARS
const starsContainer = document.getElementById("starsContainer");
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

// ELEMENTS
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const enterBtn = document.getElementById("enterBtn");
const errorEl = document.getElementById("error");
const card = document.querySelector(".card");
const birthdayMsg = document.getElementById("birthdayMsg");

// TIMER
function getBirthdayTime() {
  const now = new Date();
  let birthday = new Date(now.getFullYear(), 11, 31, 0, 0, 0);
  if (now > birthday) birthday = new Date(now.getFullYear() + 1, 11, 31);
  return birthday.getTime();
}

function updateTimer() {
  const diff = getBirthdayTime() - Date.now();

  if (diff <= 0) {
    birthdayMsg.style.display = "block";
    createConfetti();
    return;
  }

  daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2,"0");
  hoursEl.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2,"0");
  minutesEl.textContent = String(Math.floor(diff / 60000) % 60).padStart(2,"0");
  secondsEl.textContent = String(Math.floor(diff / 1000) % 60).padStart(2,"0");
}

setInterval(updateTimer, 1000);
updateTimer();

// CONFETTI
function createConfetti() {
  const colors = ["#ff4d6d","#ffd93d","#6bcf7f","#4d9fff"];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "%";
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}

// PASSWORD
const passwordInput = document.getElementById("password");

// RANDOM MOVING PLACEHOLDER
const placeholders = [
  "🔐 Enter password",
  "🎂 Unlock the surprise",
  "🎁 What's the magic word?",
  "🔑 Try the password",
  "✨ Enter secret code",
  "🎉 Guess the password",
  "💝 Birthday password here",
  "🎈 Type the secret",
];

let placeholderIndex = 0;
let placeholderInterval;

function changePlaceholder() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * placeholders.length);
  } while (newIndex === placeholderIndex);

  placeholderIndex = newIndex;

  // Reset animation (important)
  passwordInput.classList.remove("jiggle");
  void passwordInput.offsetWidth; // force reflow

  // Apply jiggle
  passwordInput.classList.add("jiggle");

  // Change placeholder slightly after jiggle starts
  setTimeout(() => {
    passwordInput.placeholder = placeholders[placeholderIndex];
  }, 150);
}

// Change placeholder every 3 seconds
placeholderInterval = setInterval(changePlaceholder, 3000);

// Stop animation when user focuses on input
passwordInput.addEventListener("focus", () => {
  clearInterval(placeholderInterval);
  passwordInput.placeholder = "🔐 Enter password";
  errorEl.textContent = "";
});

// Resume animation when user leaves input (if empty)
passwordInput.addEventListener("blur", () => {
  if (passwordInput.value === "") {
    placeholderInterval = setInterval(changePlaceholder, 3000);
  }
});

// Enter key support
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    enterBtn.click();
  }
});

// Hint system
let attempts = 0;

enterBtn.addEventListener("click", () => {
  const password = passwordInput.value.trim();
  
  // Disable button during processing
  enterBtn.disabled = true;
  enterBtn.style.opacity = "0.6";
  enterBtn.textContent = "🔄 Checking...";
  
  // Simulate processing delay for better UX
  setTimeout(() => {
    if (password === "dhruve") {
      // SUCCESS
      clearInterval(placeholderInterval); // Stop placeholder animation
      errorEl.style.color = "#6bcf7f";
      errorEl.textContent = "🎉 Access Granted!";
      errorEl.style.fontSize = "18px";
      errorEl.style.fontWeight = "bold";
      
      // Visual feedback
      card.style.transform = "scale(1.05)";
      card.style.transition = "transform 0.3s ease";
      
      // Button success state
      enterBtn.style.background = "linear-gradient(135deg, #6bcf7f, #4ade80)";
      enterBtn.textContent = "✓ Unlocked!";
      
      // Multiple confetti bursts
      createConfetti();
      setTimeout(createConfetti, 300);
      setTimeout(createConfetti, 600);
      
      // Hide password input
      passwordInput.style.opacity = "0";
      passwordInput.style.transform = "translateY(-10px)";
      
      // Redirect with fade out
      setTimeout(() => {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";
      }, 1200);
      
      setTimeout(() => {
        window.location.href = "next.html";
      }, 1700);
      
    } else {
      // FAILURE
      errorEl.style.color = "#ff6b6b";
      errorEl.style.fontSize = "16px";
      
      // Track attempts for hint
      if (password !== "") {
        attempts++;
        if (attempts === 3) {
          errorEl.style.color = "#ffd93d";
          errorEl.textContent = "💡 Hint: It's the birthday person's name (lowercase)";
          attempts = 0;
        } else {
          // Different messages for variety
          const failMessages = [
            "❌ Wrong password",
            "🚫 Access Denied",
            "❌ Try again",
            "🔒 Incorrect password"
          ];
          errorEl.textContent = failMessages[Math.floor(Math.random() * failMessages.length)];
        }
      }
      
      // Shake animation
      card.classList.add("shake");
      
      // Button error state
      enterBtn.style.background = "linear-gradient(135deg, #ff4d6d, #ff6b6b)";
      enterBtn.textContent = "❌ Try Again";
      
      // Flash red border on input
      passwordInput.style.borderColor = "#ff4d6d";
      passwordInput.style.boxShadow = "0 0 20px rgba(255, 77, 109, 0.6)";
      
      // Clear input with delay
      setTimeout(() => {
        passwordInput.value = "";
        passwordInput.focus();
        passwordInput.style.borderColor = "rgba(255, 255, 255, 0.25)";
        passwordInput.style.boxShadow = "none";
      }, 800);
      
      // Reset animations
      setTimeout(() => {
        card.classList.remove("shake");
        enterBtn.disabled = false;
        enterBtn.style.opacity = "1";
        enterBtn.textContent = "🔐 Unlock Surprise";
        enterBtn.style.background = "linear-gradient(135deg, rgba(255, 77, 109, 0.85), rgba(255, 138, 155, 0.85))";
      }, 1200);
    }
  }, 600); // Processing delay
});