import {
  validateEmail,
  validateFullName,
  validateContact,
  validateMessage,
} from "./validation.js";

if (localStorage.getItem("loginToken")) {
  document.querySelector(".loginSignUpWrapper").style.display = "none";
  document.querySelector(".blogs").style.display = "flex";
  document.querySelector(".logoutWrapper").style.display = "block";
} else {
  document.querySelector(".loginSignUpWrapper").style.display = "flex";
  document.querySelector(".logoutWrapper").style.display = "none";
  document.querySelector(".blogs").style.display = "none";
}

const fullName = document.querySelector("#name");
const contactNumber = document.querySelector("#phone");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const nameErrorTag = document.querySelector("#name-error-msg");
const contactErrorTag = document.querySelector("#contact-error-msg");
const emailErrorTag = document.querySelector("#email-error-msg");
const messageErrorTag = document.querySelector("#message-error-msg");

fullName.addEventListener("keyup", (e) =>
  validateFullName(e.target.value, nameErrorTag)
);
contactNumber.addEventListener("keyup", (e) =>
  validateContact(e.target.value, contactErrorTag)
);
email.addEventListener("keyup", (e) =>
  validateEmail(e.target.value, emailErrorTag)
);
message.addEventListener("keyup", (e) =>
  validateMessage(e.target.value, messageErrorTag)
);

let contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", handleFormSubmission);

function handleFormSubmission(e) {
  e.preventDefault();
  if (
    validateFullName(fullName.value, nameErrorTag) &&
    validateContact(contactNumber.value, contactErrorTag) &&
    validateEmail(email.value, emailErrorTag) &&
    validateMessage(message.value, messageErrorTag)
  ) {
    let data = {
      name: fullName.value,
      phone: contactNumber.value,
      email: email.value,
      message: message.value,
    };
    alert("Your Details: " + `\n ${JSON.stringify(data)}`);
    location.reload();
  }
}

let logoutBtn = document.querySelector(".logoutWrapper");
logoutBtn.addEventListener("click", logOut);
function logOut() {
  localStorage.clear();
  location.href = "/website/index.html";
}
