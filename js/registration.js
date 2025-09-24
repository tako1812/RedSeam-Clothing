
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
    const data = await fetchData.json();
    return data;
    }catch (err){
        throw err;
    }
};
const registrationform = document.querySelector(".form-registration")


const uploadData = async function(e) {
    e.preventDefault();
   const userFile = document.querySelector(".image-upload").files[0];

    console.log(222);
    const dataArr = [...new FormData(registrationform)];
    const data = Object.fromEntries(dataArr);

    const formData = new FormData();  //password_confirmation

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("avatar", userFile);

    console.log(formData);
    const datas = await sendJson("https://api.redseam.redberryinternship.ge/api/register",formData);
    
    if (datas.token) {
        localStorage.setItem("authToken", datas.token);
        console.log("Token saved:", datas.token);
    }  
    if (datas.user) {
        localStorage.setItem("user", JSON.stringify(datas.user));
    }
    const token = localStorage.getItem("authToken");
      const token2 = localStorage.getItem("user");
  
      console.log(token,token2);
  };
  registrationform.addEventListener("submit",uploadData);



   /*
   
   {"username":"biko","email":"biko@gmail.com","avatar":"https://api.redseam.redberryinternship.ge/storage/avatars/MG3NTMTXhm1gc4boR19pg5wlek1t8uafkfhCjLqQ.png","id":685}

   */
    
 const renderUser = function(data){

    const html = `
     <div class="header-container">
        <a href="/index.html">
          <img class="logo"src="/img/images/Logo.png" alt="RedSeam Clothing logo" />
        </a>
        <nav class="nav-container">
          <img src="/img/icons/user.png" alt="user icon" />
          <a class="btn" href="#">Log in</a>
        </nav>
      </div>
    
    `
 }






  /*
  
  "user": {
    "username": "tako18",
    "email": "tako18@redberry.ge",
    "avatar": "https://api.redseam.redberryinternship.ge/storage/avatars/dipbax2DAy4cBEerAdDqDL2DutSvwlupXv9uOEJd.jpg",
    "id": 669
  },
  "token": "3090|BYzlsBELyobqDieedqRJcNRJLD2Hggv3qQ4SPd9T62174cca"
}
  
  
  */