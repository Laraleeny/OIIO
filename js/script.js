document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  if (!localStorage.getItem("splashShown")) {
    document.body.classList.add("splash-active");

    setTimeout(() => {
      splash.classList.add("hidden");
      document.body.classList.remove("splash-active");
      localStorage.setItem("splashShown", "true");
    }, 4000); // Match your splash duration
  } else {
    splash.classList.add("hidden");
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Update Year Automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Dark Mode Toggle (save preference)
const toggleDarkMode = document.getElementById("toggle-dark-mode");

// // Load saved theme preference
// if (localStorage.getItem("darkMode") === "true") {
//     document.body.classList.add("dark-mode");
// }

// toggleDarkMode.addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");
//     const isDark = document.body.classList.contains("dark-mode");
//     localStorage.setItem("darkMode", isDark.toString());
// });


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".animation-card");

  // Sequential animation trigger
  const triggerAnimationSequence = () => {
    // Remove animate from all cards and reset animation
    cards.forEach((card) => {
      card.classList.remove("animate");
      card.style.animation = "none";
      card.style.animationDelay = "";
      void card.offsetWidth;
      card.style.animation = "";
    });

    // Add animate back in sequence
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("animate");
      }, i * 600); // 600ms matches your SCSS delay
    });
  };

  // Scroll trigger (still triggers per card)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("animate");
          entry.target.style.animation = "none";
          entry.target.style.animationDelay = "";
          void entry.target.offsetWidth;
          entry.target.style.animation = "";
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  // Attach sequence trigger to all cards
  ["click", "touchstart"].forEach((event) => {
    cards.forEach((card) => {
      card.addEventListener(event, triggerAnimationSequence);
    });
  });
});

//benefits-flip
document.querySelectorAll('.benefits-container').forEach(container => {
  const items = container.querySelectorAll('.benefits-item');
  let index = 0;

  // Initialize
  items.forEach((item, i) => {
    item.classList.remove('active', 'prev');
    if (i === 0) item.classList.add('active');
  });

  // Flip function
  function flipLoop() {
    let delay = (index === 0) ? 3000 : 2000;

    setTimeout(() => {
      // Remove active from current, add prev
      items[index].classList.remove('active');
      items[index].classList.add('prev');

      // Move to next index
      index = (index + 1) % items.length;

      // Set next as active, remove prev
      items[index].classList.remove('prev');
      items[index].classList.add('active');

      // Continue loop
      flipLoop();
    }, delay);
  }

  flipLoop();
});

