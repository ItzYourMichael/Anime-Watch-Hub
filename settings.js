// Apply saved theme color on load
document.addEventListener("DOMContentLoaded", () => {
  const savedColor = localStorage.getItem("themeColor") || "#ffcc00";
  document.documentElement.style.setProperty("--theme-color", savedColor);
  document.getElementById("themeColor").value = savedColor;
});

// Change theme color and save to localStorage
function changeThemeColor() {
  const newColor = document.getElementById("themeColor").value;
  document.documentElement.style.setProperty("--theme-color", newColor);
  localStorage.setItem("themeColor", newColor);
}
