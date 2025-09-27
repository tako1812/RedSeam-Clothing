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
                <p class="price">$ ${datas.price}</p>
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
                    <p class="product-description__title quantity-item">Quantity</p>
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

}
productDetailsContainer.addEventListener("click", displaySelectedOption);



const activeSelectedSize = function(e){
    const sizesContainer = document.querySelectorAll(".size");
    if(e.target.classList.contains("size")){
        sizesContainer.forEach(size => size.classList.remove("selected"));
        e.target.classList.add("selected");
    }

}
productDetailsContainer.addEventListener("click", activeSelectedSize);











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

    const clicked = e.target.closest(".selected-quentity-container");
    if(clicked){
        quantityDropdown.classList.toggle('hidden');
    }
    else if (e.target.classList.contains('quantity')) {
        selectedQuantity.textContent = e.target.textContent;
        currentSelection.quantity = Number(selectedQuantity.textContent);
        quantityDropdown.classList.add('hidden');
    }
}
productDetailsContainer.addEventListener("click", quantityDropdown);








const shoppingCartWindow = document.querySelector(".shopping-cart-window");
const overlay = document.querySelector(".overlay");



const handleAddToCartClick = async function() {
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
                //const render = await getCartData();
            } else {
                // Handle error (show error message)
                console.error('Failed to add to cart');
            }
        } catch (err) {
            console.error('Network error:', err);
        }
};

const updateQuantityData = async function(sameProduct){
    try {
        const response = await fetch(`https://api.redseam.redberryinternship.ge/api/cart/products/${sameProduct.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({quantity: sameProduct.quantity + currentSelection.quantity})
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

const renderCarts = function(cart){
    cartsContainer.innerHTML = "";

    cart.forEach(item => {
        const selectedColorIndex = item.available_colors.findIndex(color => color === item.color);
        const html = `
        <div class="product-details" data-cart=${item.id} data-color="${item.color}" data-size="${item.size}">
            <img src="${item.images[selectedColorIndex]}" alt="${item.name}">
            <div class="product-details__description">
                <div class="product-details__description__title-btn-container">
                    <p class="product-details__description-title">${item.name}</p>
                    <p class="product-details__description-price">$ ${item.price}</p>
                </div>
                <p class="product-details__description-color">${item.color}</p>
                <p class="product-details__description-size">${item.size}</p>
                <div class="product-details__description__quantity-controller-btn-container">
                    <div class="product-details__description-quantity-controller">
                        <span class="quantity-controller__minus">-</span>
                        <span class="quantity-controller__value">${item.quantity}</span>
                        <span class="quantity-controller__plus">+</span>
                    </div>
                    <button class="btn product-details__description-btn-remove">Remove</button>
                </div>
            </div>
        </div>
    `;
    //cartsContainer.innerHTML += html;
    cartsContainer.insertAdjacentHTML("beforeend", html);

    });
};

let cardsData;
const fetchCartData = async function() {
    const res = await fetch(
        `https://api.redseam.redberryinternship.ge/api/cart`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },
        }
    );
    return await res.json();
};

const getCartData = async function(e){
    const clicked = e.target.closest(".add-to-cart");
    if(!clicked) return;

    shoppingCartWindow.classList.remove("hidden"); 
    overlay.classList.remove("hidden");

    cardsData = await fetchCartData();
    console.log(cardsData);

    const sameProduct = cardsData.find(item =>
        item.product_id === currentSelection.id &&
        item.color === currentSelection.color &&
        item.size === currentSelection.size
    );

    if(sameProduct){
        await updateQuantityData(sameProduct);
    } else {
        await handleAddToCartClick();
    }
    const updatedCart = await fetchCartData();
    renderCarts(updatedCart);
};
productDetailsContainer.addEventListener("click", getCartData);


/*
<span class="quantity-controller__minus">-</span>
                        <span class="quantity-controller__value">${item.quantity}</span>
                        <span class="quantity-controller__plus">+</span>

                         currentSelection.quantity = Number(selectedQuantity.textContent);
*/
const changeQuantityFromCart = function(e){
    
    if(e.target.classList.contains("quantity-controller__minus")){
        currentSelection.quantity --;

    }
    if(e.target.classList.contains("quantity-controller__plus")){
        currentSelection.quantity ++;

    }
};


const updateQuantityWithControllers = async function(cartItem){
    try {
        const response = await fetch(`https://api.redseam.redberryinternship.ge/api/cart/products/${cartItem.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({quantity: cartItem.quantity})
        });

    } catch (err) {
        console.error('Network error:', err);
    }
}





cartsContainer.addEventListener("click", function(e){
  const cart = e.target.closest(".product-details");
  if (!cart) return;

  const cartId = Number(cart.dataset.cart);
  const cartColor = cart.dataset.color;
  const cartSize = cart.dataset.size;

  const cartItem = cardsData.find(item => item.id === cartId && item.color === cartColor && item.size === cartSize);
  
    if(e.target.classList.contains("quantity-controller__minus")){
        if(cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            updateQuantityWithControllers(cartItem);
            renderCarts(cardsData);
        }
    }
    
    if(e.target.classList.contains("quantity-controller__plus")){
        console.log(222);
        cartItem.quantity += 1;
        updateQuantityWithControllers(cartItem);
        renderCarts(cardsData);
    }
  
});















































/*

es scroptshi gadavitano
document.addEventListener('click', function(e) {
    if (!selectedContainer.contains(e.target) && !quantityDropdown.contains(e.target)) {
        quantityDropdown.classList.add('hidden');
    }
});
*/