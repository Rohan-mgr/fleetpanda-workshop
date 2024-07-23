import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "./validation.js";

axios.defaults.baseURL = "https://reqres.in";

if (localStorage.getItem("loginToken")) {
  document.querySelector(".loginSignUpWrapper").style.display = "none";
  document.querySelector(".blogs").style.display = "flex";
  document.querySelector(".logoutWrapper").style.display = "block";
} else {
  document.querySelector(".loginSignUpWrapper").style.display = "flex";
  document.querySelector(".logoutWrapper").style.display = "none";
  document.querySelector(".blogs").style.display = "none";
}

let logoutBtn = document.querySelector(".logoutWrapper");
logoutBtn.addEventListener("click", logOut);
function logOut() {
  localStorage.clear();
  location.href = "/website/index.html";
}

let signUpForm = document.querySelector("#signup__form");
let fullName = document.querySelector("#fullName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let nameErrorTag = document.querySelector("#name-error-msg");
let emailErrorTag = document.querySelector("#email-error-msg");
let passwordErrorTag = document.querySelector("#password-error-msg");

fullName.addEventListener("keyup", (e) =>
  validateFullName(e.target.value, nameErrorTag)
);

email.addEventListener("keyup", (e) =>
  validateEmail(e.target.value, emailErrorTag)
);
password.addEventListener("keyup", (e) =>
  validatePassword(e.target.value, passwordErrorTag)
);

signUpForm.addEventListener("submit", handleSignUpFormSubmission);

async function handleSignUpFormSubmission(e) {
  e.preventDefault();
  if (
    validateFullName(fullName.value, nameErrorTag) &&
    validateEmail(email.value, emailErrorTag) &&
    validatePassword(password.value, passwordErrorTag)
  ) {
    let data = {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
    };
    console.log(data);
    try {
      let response = await axios.post("/api/register", data);
      if (response.status !== 200) {
        throw new Error("User Registration failed!");
      }
      console.log(response, "registration successfull>>>");
    } catch (error) {
      throw error;
    }

    location.href = "/website/app/login.html";
  }
}
