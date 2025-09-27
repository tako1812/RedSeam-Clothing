"use strict";
const pageId = localStorage.getItem("page-id");
const productDetailsContainer = document.querySelector(".product-details");
const cartsContainer = document.querySelector(".cards-container");
const token = localStorage.getItem("authToken");



let colorsData =[];
let sizeData =[];
let imagesData =[];
let availableColors = ""

const currentSelection = {
  id: null,
  color: null,
  image: null,
  size: null,
  quantity: 1,
  name: null,
  price: null,
  productId: null,
};


const createCardDetails = async function () {
  
    const res = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products/${pageId}`,
      
      {
        method: "GET",
        headers: {
          //Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );
    const datas = await res.json();
    console.log(datas);

    colorsData =datas.available_colors;
    sizeData =datas.available_sizes;
    imagesData=datas.images;

    currentSelection.id = pageId;
    currentSelection.name = datas.name;
    currentSelection.price = datas.price;
    currentSelection.productId = datas.id;
        
    
    
    const galleryImages = datas.images.map((url, i) => `<img class="img-options${i === 0 ? ' activeImg' : ''}" src="${url}"/>`).join('');
    availableColors = datas.available_colors.map((color,i) => `<div class="color color-${color} ${i === 0 ? 'active' : ''}" data-color="${color}" style="background-color: ${color.toLowerCase()};"></div>`).join("");
    const availableSizes = datas.available_sizes.map(size => `<div class="size" data-size="${size}">${size}</div>`).join("");
    datas.images[0]

    productDetailsContainer.innerHTML = "";
    const html = `
    <div class="product-details__container">
        <div class="product-details__gallery">
            <div class="product-details__gallery-images">
            ${galleryImages}
            </div>
            <div class="product-details__gallery-hero-image">
                <img class="hero-image" src="${datas.cover_image}">
            </div>
        </div>
        <div class="product-description">
            <div class="product-description__title-price-container">
                <h2 class="heading-secondary product-name">${datas.name}</h2>
                <p>$ ${datas.price}</p>
            </div>
            <div class="wrapper-color-size-quantity">
                <div class="product-description-colors">
                    <p class="product-description__title product-color">Color: Baby pink</p>
                    <div class="product-description-colors__content">
                        ${availableColors}
                    </div>
                </div>
            
                <div class="product-description-sizes">
                    <p class="product-description__title product-size">Size: L</p>
                    <div class="product-description-sizes__content">
                        ${availableSizes}
                    </div>
                </div>
                <div class="product-description-quantity">
                    <p class="product-description__title quantity-item">Quantity: 1</p>
                    <div class="product-description-quantity__content">
                        <div class="selected-quentity-container">
                            <span class="selected-quantity">1</span>
                            <img src="/img/icons/down-arrow.png">
                        </div>
                        <div class="product-description-quantity__container hidden">
                            <span class="quantity">1</span>
                            <span class="quantity">2</span>
                            <span class="quantity">3</span>
                            <span class="quantity">4</span>
                            <span class="quantity">5</span>
                            <span class="quantity">6</span>
                            <span class="quantity">7</span>
                            <span class="quantity">8</span>
                            <span class="quantity">9</span>
                            <span class="quantity">10</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-description-btn">
                <button class="btn add-to-cart">
                    <img src="/img/icons/shopping-cart.png">
                    <span>Add to card</span>
                </button>
            </div>
            <div class="product-description-divider"></div>
            <div class="product-description-brand-materials">
                <div>
                    <p class="title">Details</p>
                    <img src="${datas.brand.image}"/>
                </div>
                <p>Brand:  <span>${datas.brand.name}</span></p>
                <p>${datas.description}</p>
            </div>
        </div>
    </div>

    `;
    productDetailsContainer.insertAdjacentHTML("beforeend",html);
}
createCardDetails();



const displaySelectedOption = function(e){
    const productColor = document.querySelector(".product-color");
    const productSize = document.querySelector(".product-size");

    if(e.target.classList.contains("color")){
        const clicked = e.target.getAttribute('data-color');
        productColor.textContent =`Color: ${clicked}`;
        currentSelection.color = clicked;
    }
    else if(e.target.classList.contains("size")){
        const clicked = e.target.getAttribute('data-size');
        productSize.textContent =`Size: ${clicked}`;
        currentSelection.size = clicked;
    }
    else if(e.target.classList.contains("color")){
        
    }

}

productDetailsContainer.addEventListener("click", displaySelectedOption);




const handleImageColorClick = function(e){

    const heroImg = document.querySelector(".hero-image");
const imageOptions=document.querySelectorAll(".img-options");
    if(e.target.classList.contains("color")){
        document.querySelectorAll('.color').forEach(el => el.classList.remove('active'));
        e.target.classList.add("active");
        const clicked = e.target.getAttribute('data-color');
        const selectedColorIndex = colorsData.indexOf(clicked);
        const correspondingImg = imagesData[selectedColorIndex];
        imageOptions.forEach(el => el.classList.remove('activeImg'));
        imageOptions[selectedColorIndex].classList.add("activeImg");
        heroImg.src=correspondingImg;        
        currentSelection.image = correspondingImg;
    }
    else if(e.target.classList.contains("img-options")){
        imageOptions.forEach(el => el.classList.remove('activeImg'));
        e.target.classList.add("activeImg");
        const clicked = e.target.getAttribute('src');
        heroImg.src=clicked;
        const selectedImgIndex = imagesData.indexOf(clicked);
        const correspondingColor = colorsData[selectedImgIndex];
        document.querySelectorAll('.color').forEach(el => el.classList.remove('active'));
        document.querySelector(`.color-${correspondingColor}`).classList.add("active");
        
    }
}
productDetailsContainer.addEventListener("click", handleImageColorClick);




const quantityDropdown = function(e){
    const quantityDropdown = document.querySelector('.product-description-quantity__container');
    const selectedQuantity = document.querySelector('.selected-quantity');
    const quantityItem = document.querySelector(".quantity-item");

    const clicked = e.target.closest(".selected-quentity-container");
    if(clicked){
        quantityDropdown.classList.toggle('hidden');
    }
    else if (e.target.classList.contains('quantity')) {
        selectedQuantity.textContent = e.target.textContent;
        quantityItem.textContent = `Quantity: ${e.target.textContent}`;
        quantityDropdown.classList.add('hidden');
    }
}
productDetailsContainer.addEventListener("click", quantityDropdown);

/*
document.querySelector('.add-to-cart').addEventListener('click', function() {
    console.log(222);
    
});
*/
const shoppingCartWindow = document.querySelector(".shopping-cart-window");
const overlay = document.querySelector(".overlay");


const handleAddToCartClick = async function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = currentSelection.id; // or whatever identifies the product
        const cartData = {
            color: currentSelection.color,
            size: currentSelection.size,
            quantity: currentSelection.quantity,
        };

        try {
            const response = await fetch(`https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartData)
            });

            if (response.ok) {
                // Optionally update UI, show success message, etc.
                console.log('Added to cart!');
            } else {
                // Handle error (show error message)
                console.error('Failed to add to cart');
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    }
};
productDetailsContainer.addEventListener("click", handleAddToCartClick);














/*
const renderCarts = function(cart){
    cartsContainer.innerHTML="";

    const sss = cart.map(cart => (cart.color, cart.size));
    console.log(sss);
    const html =cart.map(cart => `

        <div class="product-details">
            <img src="${cart.image}" alt="${cart.name}">
            <div class="product-details__description">
                <div class="product-details__description__title-btn-container">
                    <p class="product-details__description-title">${cart.name}</p>
                        <p class="product-details__description-price">$ ${cart.price}</p>
                </div>
                <p class="product-details__description-color">${cart.color}</p>
                <p class="product-details__description-size">L</p>
                <div class="product-details__description__quantity-controller-btn-container">
                    <div class="product-details__description-quantity-controller">
                        <span class="quantity-controller__minus">-</span>
                        <span class="quantity-controller__value">${cart.quantity}</span>
                        <span class="quantity-controller__plus">+</span>
                    </div>
                    <button class="btn product-details__description-btn-remove">Remove</button>
                </div>
            </div>
        </div>

    `);
    cartsContainer.insertAdjacentHTML("beforeend", html);
};*/
/*

shoppingCartWindow.classList.remove("hidden");
        overlay.classList.remove("hidden");
        renderCarts(cart);

*/

/*
const handleAddToCartClick = function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push({...currentSelection});
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}
productDetailsContainer.addEventListener("click", handleAddToCartClick);
*/























































/*

es scroptshi gadavitano
document.addEventListener('click', function(e) {
    if (!selectedContainer.contains(e.target) && !quantityDropdown.contains(e.target)) {
        quantityDropdown.classList.add('hidden');
    }
});
*/