"use strict";

const loginForm = document.querySelector('.form-login');

const loginFields = ["email", "password"];

const loginUser = async function(e) {
    e.preventDefault();

    const dataArr = [...new FormData(loginForm)];
    const data = Object.fromEntries(dataArr);
    console.log(data);
  
    
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    /*// Clear previous errors
    loginFields.forEach(field => {
        const errorDiv = document.getElementById(`login-${field}-error`);
        if (errorDiv) errorDiv.textContent = "";
        const inputField = document.querySelector(`.login-${field}`);
        if (inputField) inputField.style.borderColor = ""; // reset border
    });*/

    try {
        const datas = await sendJson("https://api.redseam.redberryinternship.ge/api/login", formData);

        if (datas.token) {
            localStorage.setItem("authToken", datas.token);
        }
        if (datas.user) {
            sessionStorage.setItem("user", JSON.stringify(datas.user));
        }
        if (window.renderHeader) window.renderHeader();
        
        window.location.href = "/index.html";
        
    } catch (err) {
        if (err.errors) {
            for (const [field, messages] of Object.entries(err.errors)) {
                const errorDiv = document.getElementById(`${field}-error`);
                const inputField = document.querySelector(`.${field}`);
                if (inputField) inputField.style.borderColor = "#FF4000";
                if (errorDiv) errorDiv.textContent = messages.join(" ");
            }
        } 
    }

};

loginForm.addEventListener("submit", loginUser);