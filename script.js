document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    ".right-section, .resume-container, .portfolio-container, .blog-container, .contact-container"
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
