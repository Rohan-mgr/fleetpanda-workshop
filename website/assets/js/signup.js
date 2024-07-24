import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "./validation.js";
import { toggleNavLinks, logOut } from "./helper.js";

axios.defaults.baseURL = "https://reqres.in";

toggleNavLinks();

const logoutBtn = document.querySelector(".logout__btn__wrapper");
logoutBtn.addEventListener("click", logOut);

const signUpForm = document.querySelector("#signup__form");
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const nameErrorTag = document.querySelector("#name-error-msg");
const emailErrorTag = document.querySelector("#email-error-msg");
const passwordErrorTag = document.querySelector("#password-error-msg");

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
