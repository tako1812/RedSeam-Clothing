
const inputFile = document.querySelector(".image-upload");
    const previewConatiner = document.getElementById("imagePreview");
    const imagePreview = previewConatiner.querySelector(".image-preview--image");
    const imagePrevInitial = previewConatiner.querySelector(".image-preview--initialImg");
    const defaultText = previewConatiner.querySelector(".default-text-upload");
    const defaultTextNew = previewConatiner.querySelector(".default-text-new");
    const remove = document.querySelector(".text-remove");    
    const inputsContainer = document.querySelector(".inputs-container");


    

    
imagePreview.style.display = "none";
inputFile.addEventListener("change", function() {
    const file = this.files[0];
    console.log(file);

    if(file) {
        const reader = new FileReader();

        defaultText.style.display = "none";
        defaultTextNew.style.display = "block";
        imagePrevInitial.style.display = "none";
        imagePreview.style.display ="block";
    
        reader.addEventListener("load", function(){
            imagePreview.setAttribute("src", this.result);

        })
        reader.readAsDataURL(file);
    }
});

const form = document.querySelector("form");

remove.addEventListener("click", function(e) {
        e.preventDefault();
    imagePreview.style.display = "none";
    imagePreview.removeAttribute("src"); 
    imagePrevInitial.style.display = "block";
    defaultTextNew.style.display = "none";
    defaultText.style.display = "block"; 
    //imageContainer.classList.remove("validInput");

        inputFile.value = "";

});



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



const registrationform = document.querySelector(".form-registration")


const headerContainer = document.querySelector("header")


const uploadData = async function(e) {
    e.preventDefault();
   const userFile = document.querySelector(".image-upload").files[0];
    const dataArr = [...new FormData(registrationform)];
    const data = Object.fromEntries(dataArr);

    const formData = new FormData(); 
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("avatar", userFile);
   
    



    const fields = ["username", "email", "password", "password_confirmation"];

    try {
        const datas = await sendJson("https://api.redseam.redberryinternship.ge/api/register", formData);

        if (datas.token) {
            localStorage.setItem("authToken", datas.token);
        }
        if (datas.user) {
            sessionStorage.setItem("user", JSON.stringify(datas.user));
        }

        if (window.renderHeader) window.renderHeader();


    }catch (err) {
        fields.forEach(field => {
            const errorDiv = document.getElementById(`${field}-error`);
            if (errorDiv) errorDiv.textContent = "";
        });

        if (err.errors) {
            for (const [field, messages] of Object.entries(err.errors)) {
                const errorDiv = document.getElementById(`${field}-error`);
                const inputField = document.querySelector(`.${field}`);
                inputField.style.borderColor = "#FF4000";
                if (errorDiv) errorDiv.textContent = messages.join(" ");
            }
        }
    }


};
  registrationform.addEventListener("submit",uploadData);




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


const switchPasswordVisibility= function(e){
    if (e.target.classList.contains("icon__eye")) {
        const passwordInput = e.target.previousElementSibling.firstElementChild;
        if(passwordInput.type === "password") passwordInput.type = "text";
        else passwordInput.type = "password";
    }
}
inputsContainer.addEventListener("click", switchPasswordVisibility);
