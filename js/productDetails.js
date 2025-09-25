"use strict";
const pageId = localStorage.getItem("page-id");

const productDetailsContainer = document.querySelector(".product-details");

//product-details

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
    
    const galleryImages = datas.images.map(url => `<img src="${url}"/>`).join('');
    
    const availableColors = datas.available_colors.map(color => `<div class="color-circle" style="background-color: ${color.toLowerCase()};"></div>`).join("");
    const availableSizes = datas.available_sizes.map(size => `<div>${size}</div>`).join("");

    productDetailsContainer.innerHTML = "";
    const html = `
    <div class="product-details__container">
        <div class="product-details__gallery">
            <div class="product-details__gallery-images">
            ${galleryImages}
            </div>
            <div class="product-details__gallery-hero-image">
                <img src="${datas.cover_image}">
            </div>
        </div>
        <div class="product-description">
            <div class="product-description__title-price-container">
                <h2 class="heading-secondary product-name">${datas.name}</h2>
                <p>$ ${datas.price}</p>
            </div>
            <div class="wrapper-color-size-quantity">
                <div class="product-description-colors">
                    <p class="product-description__title">Color: Baby pink</p>
                    <div class="product-description-colors__content">
                        ${availableColors}
                    </div>
                </div>
            
                <div class="product-description-sizes">
                    <p class="product-description__title">Size: L</p>
                    <div class="product-description-sizes__content">
                        ${availableSizes}
                    </div>
                </div>
                <div class="product-description-quantity">
                    <p class="product-description__title">Quantity: L</p>
                    <div class="product-description-quantity__content">
                        <div>
                            <span>1</span>
                            <img src="/img/icons/down-arrow.png">
                        </div>
                        <div class="product-description-quantity__container hidden">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
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










/*
const galleryImagesHtml = datas.images.map(url => `<img src="${url}"/>`).join('');
const html = `
<div class="product-details__gallery">
    <div class="product-details__gallery-images">
        ${galleryImagesHtml}
        <!-- Other static images here if needed -->
    </div>
    <div class="product-details__gallery-hero-image">
        <img src="/img/images/hero image.png">
    </div>
</div>
`;*/