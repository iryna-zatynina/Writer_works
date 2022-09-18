const iconBurger = document.querySelector(".burger-icon");
const headerBlock = document.querySelector(".header__block");
const iconClose = document.querySelector(".close-icon");

if (iconBurger) {
  iconBurger.addEventListener("click", e => {
    headerBlock.classList.add("burger-active");
  });
}

if (iconClose) {
  iconClose.addEventListener("click", e => {
    headerBlock.classList.remove("burger-active");
  });
}

console.log('document ready');