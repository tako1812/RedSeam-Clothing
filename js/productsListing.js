"use strict";

const filterByPrice = document.querySelector(".listing-controls-filter-by-price__container");
const sortByContainer = document.querySelector(".listing-controls-sort-by__container");
const sortByBtn = document.querySelector(".listing-controls-sort-by");
const listingControlsContainer = document.querySelector(".listing-controls");



const toggleListingControls= function(e) {
    const clicked = e.target.closest(".controls-btn");
    if(!clicked) return;
    
    const container = clicked.nextElementSibling;
    container.classList.toggle("hidden");
}
listingControlsContainer.addEventListener("click", toggleListingControls);






const filterByPriceContainer = document.querySelector(".listing-controls-filter-by-price");
let minPrice=0;
let maxPrice=0;
const savePriceRange = function(e) {
    if(e.target.closest(".min-price")){
        const clicked = e.target.closest(".min-price");
        const userInput = clicked.value;
        minPrice=Number(userInput);
    }
    if(e.target.closest(".max-price")){
        const clicked = e.target.closest(".max-price");
        const userInput = clicked.value;
        maxPrice=Number(userInput);
    }
};
/*
const savePriceRange = function() {
    const minInput = filterByPriceContainer.querySelector(".min-price").value;
    const maxInput = filterByPriceContainer.querySelector(".max-price").value;

    minPrice = minInput;
    maxPrice = maxInput;

    //console.log("Min:", minPrice, "Max:", maxPrice);
};
*/

filterByPriceContainer .addEventListener("input", savePriceRange);


const selectedPriceRangeContainer = document.querySelector(".selected-price-range-container");
const btnApply = document.querySelector(".btn-apply");



const selectedPriceRange = document.querySelector(".selected-price-range");
const displaySelectedPriceRange = function() {


    if ((minPrice > 0 && maxPrice > 0) && (minPrice < maxPrice)) { 
    const html = ` 
            <div class="selected-price-range">
                <p>price: ${minPrice}-${maxPrice}</p>
                <img src="/img/icons/close-icon.png" class="close-icon">
            </div>

        `;
        selectedPriceRangeContainer.innerHTML = html;
        selectedPriceRange.classList.remove("hidden");
        filterByPrice.classList.add("hidden");
  }
  
};
btnApply.addEventListener("click", displaySelectedPriceRange);



const headingControlsContainer = document.querySelector(".heading-controls-container");



const hideSelectedPriceRangeContainer = function(e) {
    const selectedPriceRange=document.querySelector(".selected-price-range");
    
    if(e.target.classList.contains("close-icon")){
       //selectedPriceRange.remove();
       selectedPriceRange.classList.add("hidden");

    
        filterByPrice.classList.add("hidden");

        //???? need it?
        filterByPrice.querySelector(".min-price").value="";
        filterByPrice.querySelector(".max-price").value="";


    }
}
selectedPriceRangeContainer.addEventListener("click", hideSelectedPriceRangeContainer);



const switchActiveContainer = function(e) { 
    if(e.target.closest(".controls-btn-price")){
        sortByContainer.classList.add("hidden");
    }
    if(e.target.closest(".controls-btn-sort")){
        filterByPrice.classList.add("hidden");
    }
    if((!e.target.closest(".controls-btn-sort")) && (!e.target.closest(".controls-btn-price"))){
        filterByPrice.classList.add("hidden");
        sortByContainer.classList.add("hidden");
    }
    
}
headingControlsContainer.addEventListener("click", switchActiveContainer);


/*
const paginationContainer =document.querySelector(".pagination-container__pages");
let datas;
const clothingListingContainer = document.querySelector(".clothing-listing");

const renderListingWithPagination = async function () {
    clothingListingContainer.innerHTML = "";
  const res = await fetch(
    "https://api.redseam.redberryinternship.ge/api/products"
  );
  datas = await res.json();
  console.log(datas);

  datas.data.map(data => {
        const html = `
        <div class="clothing-listing__card">
            <img src="${data.cover_image}">
            <p>${data.name}</p>
            <p>$ ${data.price}</p>
        </div>
        `;
        clothingListingContainer.insertAdjacentHTML("afterbegin", html);
    });

        const html = `
            <div class="page" data-page="1">1</div>
            <div class="page" data-page="2">2</div>
            <div class="dots">...</div>
            <div class="page" data-page="${datas.meta.last_page - 1}">${datas.meta.last_page - 1}</div>
            <div class="page" data-page="${datas.meta.last_page}">${datas.meta.last_page}</div>
        `;
        paginationContainer .innerHTML = html;
};
renderListingWithPagination();



const switchPages = function() {

    let currentPage = 1; 
    //const lastPage = datas.meta.last_page; 


    const pageNum = e.target.closest(".page");
    if (!pageNum) return;
    const page = Number(pageBtn.dataset.page);
    currentPage = page;
    fetchAndRenderPage(currentPage); // call your function to fetch data for that page
}
paginationContainer.addEventListener("click", renderPaginationPages);
*/






const paginationContainer =document.querySelector(".pagination-container__pages");
let datas;
const clothingListingContainer = document.querySelector(".clothing-listing");
let currentPage = 1;
//let currentPage = 1; // keep it outside so it persists


const renderListingWithPagination = async function (page = 1) {
    clothingListingContainer.innerHTML = "";
  const res = await fetch(
    (`https://api.redseam.redberryinternship.ge/api/products?page=${page}`)
    );
  datas = await res.json();
  console.log(datas);

  datas.data.map(data => {
        const html = `
        <div class="clothing-listing__card">
            <img src="${data.cover_image}">
            <p>${data.name}</p>
            <p>$ ${data.price}</p>
        </div>
        `;
        clothingListingContainer.insertAdjacentHTML("afterbegin", html);
    });

      /* const html = `
            <div class="page" data-page="1">1</div>
            <div class="page" data-page="2">2</div>
            <div class="dots">...</div>
            <div class="page" data-page="${datas.meta.last_page - 1}">${datas.meta.last_page - 1}</div>
            <div class="page" data-page="${datas.meta.last_page}">${datas.meta.last_page}</div>
        `;
        paginationContainer .innerHTML = html;*/




    const lastPage = datas.meta.last_page;

    let html = '';
    for(let i = 1; i <= lastPage; i++) {
        html += `<div  class="page ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</div>`;

        if(i > 1 && i < lastPage - 2) {
            html += `<div class="dots">...</div>`;
            i = lastPage - 2; 
        }
    };
    
    paginationContainer.innerHTML = html;

};
renderListingWithPagination();
    
    

const switchPages = function(e) {

    let cuurrentPage = 1;
    console.log(e.target);
    
    if(e.target.classList.contains("page")){
        const pageNum = e.target;
        if (!pageNum) return;
        const page = Number(pageNum.dataset.page);
        if (page === currentPage) return;
    
        currentPage = page;
        renderListingWithPagination(currentPage);



    }
 
    
}
paginationContainer.addEventListener("click", switchPages);


