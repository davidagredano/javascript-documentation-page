const nav = document.getElementById("navbar");
const main = document.getElementById("main-doc");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const sections = Array.from(document.getElementsByClassName("main-section"));

const menuStateActiveAdd = () => {
  nav.classList.add("l-nav--active");
  main.style.filter = "blur(2px)";
  hamburgerMenu.innerText = "✕";
};

const menuStateActiveRemove = () => {
  nav.classList.remove("l-nav--active");
  main.style.filter = "none";
  hamburgerMenu.innerText = "☰";
};

const menuToggle = () => {
  const navIsActive = nav.classList.contains("l-nav--active");
  if (navIsActive) {
    menuStateActiveRemove();
  } else {
    menuStateActiveAdd();
  }
};

hamburgerMenu.addEventListener("click", menuToggle);

main.addEventListener("click", menuStateActiveRemove);

const navLinks = Array.from(document.getElementsByClassName("nav__link"));
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", menuStateActiveRemove);
});

window.addEventListener("resize", () => {
  const navIsActive = nav.classList.contains("l-nav--active");
  if (window.innerWidth > 768 && navIsActive) {
    menuStateActiveRemove();
  }
});

window.addEventListener("scroll", () => {
  const viewportHeight = (n) => (window.innerHeight * n) / 100;
  const currentYPosition = window.scrollY + viewportHeight(30);
  const navListItems = Array.from(
    document.getElementsByClassName("nav__list-item")
  );
  navListItems.forEach((navListItem) => {
    const sectionId = navListItem.firstElementChild.getAttribute("href");
    const section = document.querySelector(sectionId);
    const sectionYPositionStart = section.offsetTop;
    const sectionYPositionEnd = section.offsetTop + section.offsetHeight;
    if (
      sectionYPositionStart <= currentYPosition &&
      sectionYPositionEnd > currentYPosition
    ) {
      navListItem.classList.add("nav__list-item--highlight");
    } else {
      navListItem.classList.remove("nav__list-item--highlight");
    }
  });
});
