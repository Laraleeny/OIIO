document.addEventListener("DOMContentLoaded", () => {
  // Splash Screen
  const splash = document.getElementById("splash");
  if (splash) {
    if (!localStorage.getItem("splashShown")) {
      document.body.classList.add("splash-active");
      setTimeout(() => {
        splash.classList.add("hidden");
        document.body.classList.remove("splash-active");
        localStorage.setItem("splashShown", "true");
      }, 4000);
    } else {
      splash.classList.add("hidden");
    }
  }

  // Slide-in animation for .benefits-wrapper on scroll, with staggered delay
  const wrappers = document.querySelectorAll('.benefits-wrapper.from-left, .benefits-wrapper.from-right');
  const wrappersArr = Array.from(wrappers);
  const observer = new IntersectionObserver(
    entries => {
      // Only handle entries that are intersecting and not already animated
      const visible = entries
        .filter(entry => entry.isIntersecting && !entry.target.classList.contains('in-view'))
        .sort((a, b) => wrappersArr.indexOf(a.target) - wrappersArr.indexOf(b.target));

      visible.forEach((entry, i) => {
        setTimeout(() => {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // Unobserve so it only animates once
        }, i * 800); // 400ms delay between each wrapper
      });
    },
    { threshold: 0.3 }
  );
  wrappers.forEach(wrapper => observer.observe(wrapper));

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
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dark Mode Toggle (save preference)
  const toggleDarkMode = document.getElementById("toggle-dark-mode");
  // Uncomment below to enable dark mode toggle
  // if (localStorage.getItem("darkMode") === "true") {
  //   document.body.classList.add("dark-mode");
  // }
  // if (toggleDarkMode) {
  //   toggleDarkMode.addEventListener("click", () => {
  //     document.body.classList.toggle("dark-mode");
  //     const isDark = document.body.classList.contains("dark-mode");
  //     localStorage.setItem("darkMode", isDark.toString());
  //   });
  // }

  // Animation cards (if used elsewhere)
  const cards = document.querySelectorAll(".animation-card");
  if (cards.length) {
    const triggerAnimationSequence = () => {
      cards.forEach((card) => {
        card.classList.remove("animate");
        card.style.animation = "none";
        card.style.animationDelay = "";
        void card.offsetWidth;
        card.style.animation = "";
      });
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("animate");
        }, i * 600);
      });
    };

    const cardObserver = new IntersectionObserver(
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
      cardObserver.observe(card);
    });

    ["click", "touchstart"].forEach((event) => {
      cards.forEach((card) => {
        card.addEventListener(event, triggerAnimationSequence);
      });
    });
  }

  // animation delay
  const speed = 25; // seconds

  function updateMarqueeTrackWidth() {
    const track = document.querySelector('.marquee-track');
    const items = track.querySelectorAll('.marquee-item');
    const itemWidth = 260; // your --marquee-item-width
    const gap = 40;        // your --marquee-gap
    const totalWidth = (items.length - 1) * (itemWidth + gap);

    track.style.setProperty('--num-items', items.length);
    track.style.setProperty('--track-width', `${totalWidth}px`);

    // Set animation delay for each item
    items.forEach((item, index) => {
      const delay = -(speed / items.length) * index;
      item.style.animation = 'none'; // reset first
      item.offsetHeight; // force reflow
      item.style.animation = `scroll-left ${speed}s linear infinite`;
      item.style.animationDelay = `${delay}s`;
    });
  }
  window.addEventListener('load', updateMarqueeTrackWidth);
  window.addEventListener('resize', updateMarqueeTrackWidth);

  //switch between panel 
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.classList.remove('fade-in');
        p.classList.add('fade-out');
      });

      // Allow fade-out to finish before switching panel
      setTimeout(() => {
        panels.forEach(p => p.classList.remove('active', 'fade-out'));

        const targetPanel = document.querySelector(`.tab-panel[data-content="${target}"]`);
        targetPanel.classList.add('active');
        targetPanel.classList.add('fade-in');
      }, 300); // sync with CSS transition
    });
  });
  
});


