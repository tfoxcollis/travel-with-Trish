import './css/signin.css';


let signinButton = document.querySelector("#signinButton");
let formUserName = document.querySelector("#formUserName");
let formPassword = document.querySelector("#formPassword");

const validateUserName = (event) => {
  if(!formUserName.value.includes("traveler")){
    event.preventDefault();
    toggleErrorMessage();
  }
}

const validatePassword = (event) => {
 if(!formPassword.value.includes("traveler")){
   event.preventDefault();
   toggleErrorMessage();
 }
}

const toggleErrorMessage = (event) => {
  let errorMessage = document.querySelector(".form-message-error");
  errorMessage.classList.remove("hidden");
}

signinButton.addEventListener("click", (event) => {
  validateUserName(event);
  validatePassword(event);
})