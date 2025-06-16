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
});




// document.addEventListener("DOMContentLoaded", () => {
//   const splash = document.getElementById("splash");

//   if (!localStorage.getItem("splashShown")) {
//     document.body.classList.add("splash-active");

//     setTimeout(() => {
//       splash.classList.add("hidden");
//       document.body.classList.remove("splash-active");
//       localStorage.setItem("splashShown", "true");
//     }, 4000); // Match your splash duration
//   } else {
//     splash.classList.add("hidden");
//   }

//   //slide-in animation
//     const wrappers = document.querySelectorAll('.benefits-wrapper.from-left, .benefits-wrapper.from-right');
//   const observer = new IntersectionObserver(
//     entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('in-view');
//         }
//       });
//     },
//     { threshold: 0.3 }
//   );
//   wrappers.forEach(wrapper => observer.observe(wrapper));
// });

// // Smooth Scrolling
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute("href"));
//     if (target) {
//       target.scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });

// // Update Year Automatically
// document.getElementById("year").textContent = new Date().getFullYear();

// // Dark Mode Toggle (save preference)
// const toggleDarkMode = document.getElementById("toggle-dark-mode");

// // // Load saved theme preference
// // if (localStorage.getItem("darkMode") === "true") {
// //     document.body.classList.add("dark-mode");
// // }

// // toggleDarkMode.addEventListener("click", () => {
// //     document.body.classList.toggle("dark-mode");
// //     const isDark = document.body.classList.contains("dark-mode");
// //     localStorage.setItem("darkMode", isDark.toString());
// // });


// document.addEventListener("DOMContentLoaded", () => {
//   const cards = document.querySelectorAll(".animation-card");

//   // Sequential animation trigger
//   const triggerAnimationSequence = () => {
//     // Remove animate from all cards and reset animation
//     cards.forEach((card) => {
//       card.classList.remove("animate");
//       card.style.animation = "none";
//       card.style.animationDelay = "";
//       void card.offsetWidth;
//       card.style.animation = "";
//     });

//     // Add animate back in sequence
//     cards.forEach((card, i) => {
//       setTimeout(() => {
//         card.classList.add("animate");
//       }, i * 600); // 600ms matches your SCSS delay
//     });
//   };

//   // Scroll trigger (still triggers per card)
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.remove("animate");
//           entry.target.style.animation = "none";
//           entry.target.style.animationDelay = "";
//           void entry.target.offsetWidth;
//           entry.target.style.animation = "";
//           entry.target.classList.add("animate");
//         }
//       });
//     },
//     { threshold: 0.3 }
//   );

//   cards.forEach((card) => {
//     observer.observe(card);
//   });

//   // Attach sequence trigger to all cards
//   ["click", "touchstart"].forEach((event) => {
//     cards.forEach((card) => {
//       card.addEventListener(event, triggerAnimationSequence);
//     });
//   });
// });

// // //benefits-flip
// // document.querySelectorAll('.benefits-container').forEach(container => {
// //   const items = container.querySelectorAll('.benefits-item');
// //   let index = 0;

// //   // Initialize
// //   items.forEach((item, i) => {
// //     item.classList.remove('active', 'prev');
// //     if (i === 0) item.classList.add('active');
// //   });

// //   // Flip function
// //   function flipLoop() {
// //     let delay = (index === 0) ? 3000 : 2000;

// //     setTimeout(() => {
// //       // Remove active from current, add prev
// //       items[index].classList.remove('active');
// //       items[index].classList.add('prev');

// //       // Move to next index
// //       index = (index + 1) % items.length;

// //       // Set next as active, remove prev
// //       items[index].classList.remove('prev');
// //       items[index].classList.add('active');

// //       // Continue loop
// //       flipLoop();
// //     }, delay);
// //   }

// //   flipLoop();
// // });

