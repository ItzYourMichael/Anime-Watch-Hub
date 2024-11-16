// Theme Toggle
const themeToggleBtn = document.getElementById("theme-toggle-btn");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("darkTheme", isDark);
});

// Load Theme on Page Load
document.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkTheme") === "true";
  if (isDark) {
    document.body.classList.add("dark-theme");
  }
});
