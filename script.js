const menuToggle = () => {
  const btn = document.querySelector("#menu-btn");
  const menu = document.querySelector("#menu");

  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
};

document.querySelector("#menu-btn").addEventListener("click", menuToggle);