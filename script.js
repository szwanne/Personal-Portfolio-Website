// ─── HAMBURGER MENU INJECTION & TOGGLE ───────────────────────────────────────

// Inject a hamburger button into every .nav-bar
document.querySelectorAll(".nav-bar").forEach((navBar) => {
  const btn = document.createElement("button");
  btn.className = "hamburger";
  btn.setAttribute("aria-label", "Toggle navigation");
  btn.innerHTML = `<span></span><span></span><span></span>`;
  navBar.prepend(btn);

  const ul = navBar.querySelector("ul");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = ul.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", isOpen);
  });
});

// Close any open menu when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".nav-bar ul.open").forEach((ul) => {
    ul.classList.remove("open");
  });
  document.querySelectorAll(".hamburger.open").forEach((btn) => {
    btn.classList.remove("open");
  });
});

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-bar ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-bar ul.open").forEach((ul) => {
      ul.classList.remove("open");
    });
    document.querySelectorAll(".hamburger.open").forEach((btn) => {
      btn.classList.remove("open");
    });
  });
});

// ─── SECTION SWITCHING ───────────────────────────────────────────────────────

const sections = {
  about: document.getElementById("about"),
  resume: document.getElementById("resume"),
  portfolio: document.getElementById("portfolio"),
  blog: document.getElementById("blog"),
  contact: document.getElementById("contact"),
};

function showSection(target) {
  Object.entries(sections).forEach(([key, el]) => {
    if (el) el.style.display = key === target ? "block" : "none";
  });

  // Update active state on all nav links across all nav-bars
  document.querySelectorAll(".nav-bar ul li a").forEach((link) => {
    link.classList.toggle("active", link.dataset.target === target);
  });
}

// Attach click handlers to all nav links
document.querySelectorAll(".nav-bar ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.target;
    if (target) showSection(target);
  });
});

// Show About by default on load
showSection("about");

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    ".right-section, .resume-container, .portfolio-container, .blog-container, .contact-container",
  );
  const navLinks = document.querySelectorAll(".nav-bar a");

  // Function to show only the target section
  function showSection(targetId) {
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  // Default view on load
  showSection("about");

  // Add event listeners to nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      showSection(target);

      // Update active link styling
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Message sent successfully!");
    } else {
      alert("Something went wrong.");
    }
  });
