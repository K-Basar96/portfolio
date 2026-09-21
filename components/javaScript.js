//  menu shown and hidden
const navMenu = document.getElementById("nav-menu"),
  toggleMenu = document.getElementById("nav-toggle"),
  closeMenu = document.getElementById("nav-close");

//showing
toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Hidden
closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

// remove menu
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// scroll section active link
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const sectionsClass = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]",
    );

    if (sectionsClass) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionsClass.classList.add("active");
      } else {
        sectionsClass.classList.remove("active");
      }
    }
  });
}

// Dark / Light Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const darkThemeClass = "dark-theme";
const iconSun = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkThemeClass);
  if (themeToggle) {
    if (selectedIcon === "bx-sun") {
      themeToggle.classList.remove("bx-moon");
      themeToggle.classList.add(iconSun);
    } else {
      themeToggle.classList.remove(iconSun);
      themeToggle.classList.add("bx-moon");
    }
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle(darkThemeClass);
    const isDark = document.body.classList.contains(darkThemeClass);

    if (isDark) {
      themeToggle.classList.remove("bx-moon");
      themeToggle.classList.add(iconSun);
      // Remove inline light mode overrides so dark CSS rules take precedence
      document.documentElement.style.removeProperty("--text-color");
      document.documentElement.style.removeProperty("--first-color-light");
      document.documentElement.style.removeProperty("--first-color-darken");
    } else {
      themeToggle.classList.remove(iconSun);
      themeToggle.classList.add("bx-moon");
      applyTheme(selectedThemeIndex);
    }

    localStorage.setItem("selected-theme", isDark ? "dark" : "light");
    localStorage.setItem("selected-icon", isDark ? "bx-sun" : "bx-moon");
  });
}

// Change --first-color accent theme
const themeButton = document.getElementById("theme-button");

const colorThemes = [
  {
    firstColor: "#cc4b2c",
    firstColorDark: "#662616",
    firstColorDarken: "#290f09",
    textColor: "#54423d",
    firstColorLight: "#eae7e6",
  },
  {
    firstColor: "#2563eb",
    firstColorDark: "#1e40af",
    firstColorDarken: "#1e3a8a",
    textColor: "#334155",
    firstColorLight: "#e0e7ff",
  },
  {
    firstColor: "#059669",
    firstColorDark: "#047857",
    firstColorDarken: "#064e3b",
    textColor: "#334155",
    firstColorLight: "#d1fae5",
  },
  {
    firstColor: "#7c3aed",
    firstColorDark: "#5b21b6",
    firstColorDarken: "#4c1d95",
    textColor: "#334155",
    firstColorLight: "#ede9fe",
  },
  {
    firstColor: "#e11d48",
    firstColorDark: "#be123c",
    firstColorDarken: "#881337",
    textColor: "#334155",
    firstColorLight: "#ffe4e6",
  },
  {
    firstColor: "#d97706",
    firstColorDark: "#b45309",
    firstColorDarken: "#78350f",
    textColor: "#453523",
    firstColorLight: "#fef3c7",
  },
];

let selectedThemeIndex = localStorage.getItem("selected-theme-index")
  ? parseInt(localStorage.getItem("selected-theme-index"))
  : 0;

function applyTheme(index) {
  const theme = colorThemes[index];
  if (!theme) return;
  document.documentElement.style.setProperty("--first-color", theme.firstColor);
  document.documentElement.style.setProperty("--first-color-dark", theme.firstColorDark);

  if (!document.body.classList.contains(darkThemeClass)) {
    document.documentElement.style.setProperty("--first-color-darken", theme.firstColorDarken);
    document.documentElement.style.setProperty("--text-color", theme.textColor);
    document.documentElement.style.setProperty("--first-color-light", theme.firstColorLight);
  }
}

if (selectedThemeIndex !== 0) {
  applyTheme(selectedThemeIndex);
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    selectedThemeIndex = (selectedThemeIndex + 1) % colorThemes.length;
    applyTheme(selectedThemeIndex);
    localStorage.setItem("selected-theme-index", selectedThemeIndex);
  });
}


