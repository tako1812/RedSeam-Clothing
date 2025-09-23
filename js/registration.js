
const inputFile = document.querySelector(".image-upload");
    const previewConatiner = document.getElementById("imagePreview");
    const imagePreview = previewConatiner.querySelector(".image-preview--image");
    const imagePrevInitial = previewConatiner.querySelector(".image-preview--initialImg");
    const defaultText = previewConatiner.querySelector(".default-text-upload");
    const defaultTextNew = previewConatiner.querySelector(".default-text-new");
    
    const remove = document.querySelector(".text-remove");
    
    
    
    
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

/*
form.addEventListener("reset", function() {
    // Hide preview and show default text again
    imagePreview.style.display = "none";
    imagePreview.removeAttribute("src"); // clear old image
    defaultTextImage.style.display = "block";
});
*/




/*
   <div class="user-auth__input-wrapper">
                <div>
                  <input type="text" placeholder="Username" />
                  <span class="icon icon__password">*</span>
                </div>
                <div class="error-message" id="username-error"></div>
              </div>
              <div class="user-auth__input-wrapper">
                <div>
                  <input type="text" placeholder="Email" />
                  <span class="icon">*</span>
                </div>
                <div class="error-message" id="email-error"></div>
              </div>
              <div class="user-auth__input-wrapper">
                <div>
                  <input type="text" placeholder="Password" />
                  <span class="icon icon__password">*</span>
                </div>
                <img class="icon__eye" src="/img/icons/eye.png">
                <div class="error-message" id="password-error"></div>
              </div>



*/