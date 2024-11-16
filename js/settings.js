const themeToggle = document.getElementById("theme-toggle");
const fontSizeSelect = document.getElementById("font-size");
const languageSelect = document.getElementById("language");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

fontSizeSelect.addEventListener("change", () => {
    document.documentElement.style.fontSize = fontSizeSelect.value === "small" ? "14px" : fontSizeSelect.value === "large" ? "18px" : "16px";
    localStorage.setItem("fontSize", fontSizeSelect.value);
});

languageSelect.addEventListener("change", () => {
    alert(`Language changed to ${languageSelect.value === "en" ? "English" : languageSelect.value === "jp" ? "Japanese" : "Spanish"}`);
    localStorage.setItem("language", languageSelect.value);
});

document.addEventListener("DOMContentLoaded", () => {
    // Restore settings from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") document.body.classList.add("light-mode");

    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) fontSizeSelect.value = savedFontSize;

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) languageSelect.value = savedLanguage;
});
