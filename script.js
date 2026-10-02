// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight the current section in the navigation
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) => {
            item.classList.toggle(
              "active",
              item.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
}

// Contact form handling with Web3Forms
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (submitBtn) submitBtn.disabled = true;
    if (formStatus) formStatus.textContent = "Sending message...";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        if (formStatus) {
          formStatus.textContent =
            "✨ Message sent successfully! I will get back to you soon.";
          formStatus.style.color = "#4caf50";
        }
        contactForm.reset();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          "❌ Failed to send message. Please try again or email directly.";
        formStatus.style.color = "#f44336";
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
