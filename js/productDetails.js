"use strict";
const pageId = localStorage.getItem("page-id");

const productDetailsContainer = document.querySelector(".product-details");

//product-details

let colorsData =[];
let sizeData =[];
let imagesData =[];
let availableColors = ""
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
    
    //const galleryImages = datas.images.map(url => `<img class="img-options" src="${url}"/>`).join('');
    
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
                    <p class="product-description__title">Quantity: L</p>
                    <div class="product-description-quantity__content">
                        <div class="selected-quentity-container">
                            <span lass="selected-quantity">1</span>
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
                <button class="btn">
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
    }
    else if(e.target.classList.contains("size")){
        const clicked = e.target.getAttribute('data-size');
        productSize.textContent =`Size: ${clicked}`;
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



