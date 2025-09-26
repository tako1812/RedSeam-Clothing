"use strict";

const loginForm = document.querySelector('.form-login');

const loginFields = ["email", "password"];

/*
const loginUser = async function(e) {
    e.preventDefault();

    const dataArr = [...new FormData(loginForm)];
    const data = Object.fromEntries(dataArr);
    console.log(data);
  
    
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    Clear previous errors
    loginFields.forEach(field => {
        const errorDiv = document.getElementById(`login-${field}-error`);
        if (errorDiv) errorDiv.textContent = "";
        const inputField = document.querySelector(`.login-${field}`);
        if (inputField) inputField.style.borderColor = ""; // reset border
    });

    try {
        const datas = await sendJson("https://api.redseam.redberryinternship.ge/api/login", formData);
        console.log(datas);

        if (datas.token) {
            localStorage.setItem("authToken", datas.token);
        }
        if (datas.user) {
            sessionStorage.setItem("user", JSON.stringify(datas.user));
        }
        if (window.renderHeader) window.renderHeader();
        
        window.location.href = "/index.html";
        
    } catch (err) {
        console.log("Caught error:", err); 
        if (err.errors) {
            for (const [field, messages] of Object.entries(err.errors)) {
                console.log(field,messages);
                /*const errorDiv = document.getElementById(`${field}-error`);
                const inputField = document.querySelector(`.${field}`);
                if (inputField) inputField.style.borderColor = "#FF4000";
                if (errorDiv) errorDiv.textContent = messages.join(" ");
            }
        } 
    }

};

loginForm.addEventListener("submit", loginUser);*/



const loginUser = async function(e) {
    e.preventDefault();

    const dataArr = [...new FormData(loginForm)];
    const data = Object.fromEntries(dataArr); 

    loginFields.forEach(field => {
        const errorDiv = document.getElementById(`${field}-error`);
        if (errorDiv) errorDiv.textContent = "";
        const inputField = document.querySelector(`.${field}`);
        if (inputField) inputField.style.borderColor = "";
    });

    try {
        const response = await fetch("https://api.redseam.redberryinternship.ge/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) {
            throw result; 
        }
        if (result.token) {
            localStorage.setItem("authToken", result.token);
        }
        if (result.user) {
            sessionStorage.setItem("user", JSON.stringify(result.user));
        }
        if (window.renderHeader) window.renderHeader();

        window.location.href = "/index.html";
    } catch (err) {
        console.log("Caught error:", err);

        if (err.message === "Unauthenticated.") {
            const generalErrorDiv = document.getElementById("login-general-error");
            generalErrorDiv.textContent = "Incorrect email or password. Please try again.";
            generalErrorDiv.style.color = "#FF4000";
            //generalErrorDiv.textContent ="";
        } else if (err.errors) {
            for (const [field, messages] of Object.entries(err.errors)) {
                const errorDiv = document.getElementById(`${field}-error`);
                const inputField = document.querySelector(`.${field}`);
                if (inputField) inputField.style.borderColor = "#FF4000";
                //if (inputField) inputField.classList.add("invalid");
                if (errorDiv) errorDiv.textContent = messages.join(" ");
            }
        } 
    }
};
loginForm.addEventListener("submit", loginUser);




/*
const loginFormm = document.getElementById("");

function clearFieldErrors(field) {
    // Only clear the given field's error and border
    document.getElementById(`${field}-error`).textContent = "";
    const input = loginForm.querySelector(`.${field}`);
    if (input) input.classList.remove("error");
    document.getElementById("login-general-error").textContent = "";
}

// Add input event listeners to clear errors as the user types
loginFields.forEach(field => {
    const input = loginForm.querySelector(`.${field}`);
    input.addEventListener("input", () => clearFieldErrors(field));
});

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Clear all errors at the start of submission
    loginFields.forEach(clearFieldErrors);*/


const emailInput = loginForm.querySelector(".email");
const passwordInput = loginForm.querySelector(".password");
const emailErrorDiv = document.getElementById("email-error");
const passwordErrorDiv = document.getElementById("password-error");
const generalErrorDiv = document.getElementById("login-general-error");

function clearFieldError(field) {
  if (field === "email") {
    emailErrorDiv.textContent = "";
    emailInput.style.borderColor = "";
  } else if (field === "password") {
    passwordErrorDiv.textContent = "";
    passwordInput.style.borderColor = "";
  }
  generalErrorDiv.textContent = "";
}

emailInput.addEventListener("input", () => clearFieldError("email"));
passwordInput.addEventListener("input", () => clearFieldError("password"));
