"use strict";
function renderHeader() {
  const header = document.getElementById("header");
  fetch("/pages/header.html")
    .then(res => res.text())
    .then(html => {
      header.innerHTML = html;

      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        const nav = header.querySelector(".nav-container");
        nav.innerHTML = `
          <img  class="shopping-cart-icon"src="/img/icons/shopping-cart.png" alt="user icon" />
          <img class="header-userImg" src="${user.avatar ?? '/img/icons/user.png'}" alt="user icon" />
        `;
      }  
    })
    .catch(err => console.error("Error loading header:", err));
}
document.addEventListener("DOMContentLoaded", renderHeader);