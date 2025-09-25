"use strict";

const inputsContainer = document.querySelector(".inputs-container");
const switchPasswordVisibility= function(e){
    if (e.target.classList.contains("icon__eye")) {
        const passwordInput = e.target.previousElementSibling.firstElementChild;
        if(passwordInput.type === "password") passwordInput.type = "text";
        else passwordInput.type = "password";
    }
}
inputsContainer.addEventListener("click", switchPasswordVisibility);


const activeInputFiels = (input) => input.trim().length >= 1;
const removePlacehoderFromActiveField = function(e){
    const inputclasses = ["username", "email", "password", "password_confirmation"];
    
    if (inputclasses.some(cls => e.target.classList.contains(cls))) {
        const placeholder = e.target.nextElementSibling;
        if (activeInputFiels(e.target.value)) {
            placeholder.classList.add("hidden");
        } else {
            placeholder.classList.remove("hidden");
        }
    }
}
inputsContainer.addEventListener("input", removePlacehoderFromActiveField);

const sendJson = async function(url, uploadData) {
    try{
        const fetchData = await fetch(url,{
            method:"POST",
            headers:{
                //Authorization: `Bearer ${token}`,
                accept:"application/json",
            },
            body: uploadData,
        }
    );
        if (!fetchData.ok) {
            let errorData;
            try {
                errorData = await fetchData.json();
            } catch {
                errorData = { message: fetchData.statusText };
            }
            throw errorData;
        }
    const data = await fetchData.json();
    return data;
    }catch (err){
        throw err;
    }
};