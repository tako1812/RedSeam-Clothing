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


const savePriceRange = function() {
    const minInput = filterByPriceContainer.querySelector(".min-price").value;
    const maxInput = filterByPriceContainer.querySelector(".max-price").value;

    minPrice = minInput;
    maxPrice = maxInput;
};
filterByPriceContainer .addEventListener("input", savePriceRange);



let currentPage = 1;
let lastPage = 1;
let isFilteredMode = false;
let isSortingModeReleaseedYear = false;
let isSortingModeLowToHigh = false;
let isSortingModeHighToLow = false;

let filteredResults = [];

function getItemsForPage(data, page = 1, perPage = 10) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return data.slice(start, end);
}


const selectedPriceRangeContainer = document.querySelector(".selected-price-range-container");
const btnApply = document.querySelector(".btn-apply");

const selectedPriceRange = document.querySelector(".selected-price-range");

const displaySelectedPriceRange = async function() {
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
  
    isFilteredMode = true;
    const filteredlistingData = await filterListingsByPrice();   
    //const filteredlistingData = await fetchFilteredData();
    filteredResults = filteredlistingData;
    console.log(filteredResults);
    renderFilterWithPagination(filteredResults, undefined);

};
btnApply.addEventListener("click", displaySelectedPriceRange);



const headingControlsContainer = document.querySelector(".heading-controls-container");



const hideSelectedPriceRangeContainer = function(e) {
    const selectedPriceRange=document.querySelector(".selected-price-range");
    
    if(e.target.classList.contains("close-icon")){
    
        selectedPriceRange.classList.add("hidden");
        filterByPrice.classList.add("hidden");

        //???? need it?
        filterByPrice.querySelector(".min-price").value="";
        filterByPrice.querySelector(".max-price").value="";
        renderListingWithPagination();
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
    /*if((!e.target.closest(".controls-btn-sort")) || (!e.target.closest(".controls-btn-price")) ||
    (!e.target.closest(".min-price")) || (!e.target.closest(".max-price"))){
        filterByPrice.classList.add("hidden");
        sortByContainer.classList.add("hidden");
    };*/
    
}
headingControlsContainer.addEventListener("click", switchActiveContainer);







const paginationContainer =document.querySelector(".pagination-container__pages");
let datas;
const clothingListingContainer = document.querySelector(".clothing-listing");



const fetchDataaa = async function (UI, page = 1) {
    const res = await fetch(UI + page);
  const datas = await res.json();
  return datas;
}

const fetchData = async function (URL, page = 1) {
    const res = await fetch(`${URL}?page=${page}`);
  const datas = await res.json();
  return datas;
}


const renderListingWithPagination = async function (page = 1) {
    clothingListingContainer.innerHTML = "";
    const fetchedData = await fetchData(`https://api.redseam.redberryinternship.ge/api/products?page=`, page);
  
    fetchedData.data.map(data => {
          const html = `
          <div class="clothing-listing__card">
              <img src="${data.cover_image}">
              <p>${data.name}</p>
              <p>$ ${data.price}</p>
          </div>
          `;
          clothingListingContainer.insertAdjacentHTML("afterbegin", html);
      });

     lastPage = fetchedData.meta.last_page;

    let html = '';
    for(let i = 1; i <= lastPage; i++) {
        html += `<div  class="page ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</div>`;

        if(i > 1 && i < lastPage - 2) {
            html += `<div class="dots">...</div>`;
            i = lastPage - 2; 
        }
         //if(i > 2 && i < lastPage - 2) {
          //  const html = `
          //  <div class="page" data-page="1">1</div>
          //  <div class="page" data-page="2">${currentPage}</div>
           // `;
           // paginationContainer .insertAdjacentHTML("afterbegin", html);
    
        }
        paginationContainer.innerHTML = html;
};
renderListingWithPagination();




const renderFilterWithPagination= function (data, page = 1) {

     clothingListingContainer.innerHTML = "";


    const items = getItemsForPage(filteredResults, currentPage, 10);
    //const items = getItemsForPage(data, currentPage, 10);
 
    
    items.forEach(data => {
    const html = `
      <div class="clothing-listing__card">
          <img src="${data.cover_image}">
          <p>${data.name}</p>
          <p>$ ${data.price}</p>
      </div>
    `;
    clothingListingContainer.insertAdjacentHTML("afterbegin", html);
  });


    lastPage = filteredResults.length / 10;
    if (filteredResults.length % 10 !== 0) lastPage += 1; 

   let html = '';
    for(let i = 1; i <= lastPage; i++) {
        html += `<div  class="page ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</div>`;

        if(i > 1 && i < lastPage - 2) {
            html += `<div class="dots">...</div>`;
            i = lastPage - 2; 
        }
    }
    paginationContainer.innerHTML = html;
};


const renderSortedByReleaseYear= function (page = 1) {
    clothingListingContainer.innerHTML = "";
    const items = getItemsForPage(dataSortByReleaseYear, page, 10);
    items.forEach(data => {
    const html = `
      <div class="clothing-listing__card">
          <img src="${data.cover_image}">
          <p>${data.name}</p>
          <p>$ ${data.price}</p>
      </div>
    `;
    clothingListingContainer.insertAdjacentHTML("beforeend", html);
  });
   lastPage = allListingData.length;
   let html = '';
    for(let i = 1; i <= lastPage; i++) {
        html += `<div  class="page ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</div>`;

        if(i > 1 && i < lastPage - 2) {
            html += `<div class="dots">...</div>`;
            i = lastPage - 2; 
        }
    }
    paginationContainer.innerHTML = html;
};






const renderSortedByLowToHigh= function (page = 1) {
    clothingListingContainer.innerHTML = "";
    const items = getItemsForPage(dataSortByLowToHigh, page, 10);  
    items.forEach(data => {
    const html = `
      <div class="clothing-listing__card">
          <img src="${data.cover_image}">
          <p>${data.name}</p>
          <p>$ ${data.price}</p>
      </div>
    `;
    clothingListingContainer.insertAdjacentHTML("beforeend", html);
  });

    lastPage = allListingData.length;
   let html = '';
    for(let i = 1; i <= lastPage; i++) {
        html += `<div  class="page ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</div>`;

        if(i > 1 && i < lastPage - 2) {
            html += `<div class="dots">...</div>`;
            i = lastPage - 2; 
        }
    }
    paginationContainer.innerHTML = html;
};


const renderSortedByHighToLow= function (page = 1) {
    clothingListingContainer.innerHTML = "";
    const items = getItemsForPage(dataSortByHighToLow, page, 10);
    items.forEach(data => {
    const html = `
      <div class="clothing-listing__card">
          <img src="${data.cover_image}">
          <p>${data.name}</p>
          <p>$ ${data.price}</p>
      </div>
    `;
    clothingListingContainer.insertAdjacentHTML("beforeend", html);
  });
    lastPage = allListingData.length;
   let html = '';
    for(let i = 1; i <= lastPage; i++) {
        html += `<div  class="page ${currentPage === i ? "active" : ""}" data-page="${i}">${i}</div>`;

        if(i > 1 && i < lastPage - 2) {
            html += `<div class="dots">...</div>`;
            i = lastPage - 2; 
        }
    }
    paginationContainer.innerHTML = html;
};





const moveToNextPageWithBtn = function(e) {
    let currentPage = 1;
    console.log(e.target);
    
    if(e.target.classList.contains("page")){
        const pageNum = e.target;
        if (!pageNum) return;
        const page = Number(pageNum.dataset.page);
        if (page === currentPage) return;
        currentPage = page;
  
        if(isFilteredMode) {
        renderFilterWithPagination(undefined, currentPage);
        } else if(isSortingModeReleaseedYear) {
        renderSortedByReleaseYear(currentPage);
        }else if(isSortingModeLowToHigh) {
        renderSortedByLowToHigh(currentPage);
        }else if(isSortingModeHighToLow) {
        renderSortedByHighToLow(currentPage);
        }else {
        renderListingWithPagination(currentPage);
        }
        window.scrollTo({
                top: 0,
                behavior: "smooth"
        });
    }
}
paginationContainer.addEventListener("click", moveToNextPageWithBtn);


const NextPageBtn = document.querySelector(".pageNext");
const PrevPageBtn = document.querySelector(".pagePrev");

const moveToNextPage = function(e) {
    const secondDiv = paginationContainer.querySelector("div:nth-child(2)");
    if(e.target.classList.contains("pageNext")){
        if (currentPage === lastPage) return;
        if(currentPage < lastPage){
            currentPage++;
            
            if(isFilteredMode) {
            renderFilterWithPagination(undefined, currentPage);
            } else if(isSortingModeReleaseedYear) {
            renderSortedByReleaseYear(currentPage);
            }else if(isSortingModeLowToHigh) {
            renderSortedByLowToHigh(currentPage);
            }else if(isSortingModeHighToLow) {
            renderSortedByHighToLow(currentPage);
            }else {
            renderListingWithPagination(currentPage);
            }
            window.scrollTo({
                top: 0,
                 behavior: "smooth"
            });
        }  
    }
};
NextPageBtn.addEventListener("click", moveToNextPage);


const moveToPrevPage = function(e) {
    if(e.target.classList.contains("pagePrev")){
        if (currentPage === 0) return;
        if(currentPage > 0){
            currentPage--;
            
            if(isFilteredMode) {
            renderFilterWithPagination(undefined, currentPage);
            } else if(isSortingModeReleaseedYear) {
            renderSortedByReleaseYear(currentPage);
            }else if(isSortingModeLowToHigh) {
            renderSortedByLowToHigh(currentPage);
            }else if(isSortingModeHighToLow) {
            renderSortedByHighToLow(currentPage);
            }else {
            renderListingWithPagination(currentPage);
            }
            window.scrollTo({
                top: 0,
                 behavior: "smooth"
            });
        }  

    }
};
PrevPageBtn.addEventListener("click", moveToPrevPage);















const filterListingsByPrice = async function () {
    let listigsData = [];
    for(let i = 1; i <= lastPage; i++ ){
    
        const res = await fetch(
        (`https://api.redseam.redberryinternship.ge/api/products?page=${i}`)
        );
      datas = await res.json();
      listigsData.push(datas);
    }
    console.log(listigsData);
    const filteredlisting= listigsData.flatMap(data => {
        const result = data.data.filter(item => {
            return item.price >= minPrice && item.price <= maxPrice
        });
        return result;
     });
     console.log(filteredlisting);
        return filteredlisting;
};


const sortByOptionsContainer = document.querySelector(".listing-controls-sort-by__options");


const allListingData = [];
let dataSortByReleaseYear = [];
let dataSortByLowToHigh = [];
let dataSortByHighToLow = [];



const SortListingByPrice = async function (e, page = 1) {
    let listigsData = [];
    for(let i = 1; i <= lastPage; i++ ){
        const res = await fetch(
        (`https://api.redseam.redberryinternship.ge/api/products?page=${i}`)
        );
      datas = await res.json();
      listigsData.push(datas);
      allListingData.push(datas);
    }
        console.log(listigsData);


    if(e.target.classList.contains("listing-controls-sort-by-releasedYear")){
        const sortedData= listigsData.flatMap(obj => obj.data).sort((a,b) => Number(b.release_year) - Number(a.release_year));
        dataSortByReleaseYear = sortedData;
        isSortingModeReleaseedYear = true;
        renderSortedByReleaseYear();
    }    
    

    if(e.target.classList.contains("listing-controls-sort-by-HighToLow")){
        console.log(333);
        const sortedData= listigsData.flatMap(obj => obj.data).sort((a,b) => Number(b.price) - Number(a.price));
        dataSortByHighToLow = sortedData;
        isSortingModeHighToLow = true;
        renderSortedByHighToLow();
    }    
        
    if(e.target.classList.contains("listing-controls-sort-by-LowToHigh")){
        console.log(444);
        const sortedData= listigsData.flatMap(obj => obj.data).sort((a,b) => Number(a.price) - Number(b.price));
        dataSortByLowToHigh  = sortedData;
        isSortingModeLowToHigh = true;
        renderSortedByLowToHigh(); 
    }    
};
sortByOptionsContainer.addEventListener("click", SortListingByPrice);






