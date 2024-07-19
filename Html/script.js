let nameErrorMsg = "";
let contactErrorMsg = "";
let emailErrorMsg = "";
let messageErrorMsg = "";

const fullName = document.querySelector("#name");
const contactNumber = document.querySelector("#phone");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const nameErrorTag = document.querySelector("#name-error-msg");
const contactErrorTag = document.querySelector("#contact-error-msg");
const emailErrorTag = document.querySelector("#email-error-msg");
const messageErrorTag = document.querySelector("#message-error-msg");

function validateFullName(event) {
  let inputFullName = fullName.value;
  if (inputFullName.trim() === "") {
    nameErrorMsg = "Please enter your full name";
    nameErrorTag.innerHTML = nameErrorMsg;
    return false;
  } else if (inputFullName.length <= 2) {
    nameErrorMsg = "Name should be more than two characters";
    nameErrorTag.innerHTML = nameErrorMsg;
    return false;
  } else {
    nameErrorMsg = "";
    nameErrorTag.innerHTML = nameErrorMsg;
    return true;
  }
}

function validateContact(event) {
  let inputContact = contactNumber.value;
  if (inputContact.length < 1 || inputContact.trim() === "") {
    contactErrorMsg = "Please enter your contact number";
    contactErrorTag.innerHTML = contactErrorMsg;
    return false;
  } else if (!/(\+977)?[9][6-9]\d{8}/g.test(inputContact)) {
    contactErrorMsg = "Please enter valid number";
    contactErrorTag.innerHTML = contactErrorMsg;
    return false;
  } else {
    contactErrorMsg = "";
    contactErrorTag.innerHTML = contactErrorMsg;
    return true;
  }
}

function validateEmail(event) {
  let inputEmail = email.value;
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (inputEmail.trim() === "") {
    emailErrorMsg = "Please enter your email";
    emailErrorTag.innerHTML = emailErrorMsg;
    return false;
  } else if (!emailRegex.test(inputEmail)) {
    emailErrorMsg = "Please enter valid email";
    emailErrorTag.innerHTML = emailErrorMsg;
    return false;
  } else {
    emailErrorMsg = "";
    emailErrorTag.innerHTML = emailErrorMsg;
    return true;
  }
}

function validateMessage(event) {
  let inputMsg = message.value;
  if (inputMsg.trim() === "") {
    messageErrorMsg = "Please enter your message";
    messageErrorTag.innerHTML = messageErrorMsg;
    return false;
  } else if (inputMsg.trim().length < 5) {
    messageErrorMsg = "Message must be at least of 5 characters";
    messageErrorTag.innerHTML = messageErrorMsg;
    return false;
  } else {
    messageErrorMsg = "";
    messageErrorTag.innerHTML = messageErrorMsg;
    return true;
  }
}

fullName.addEventListener("keyup", validateFullName);
contactNumber.addEventListener("keyup", validateContact);
email.addEventListener("keyup", validateEmail);
message.addEventListener("keyup", validateMessage);

function handleFormSubmission(e) {
  e.preventDefault();
  if (
    validateFullName() &&
    validateContact() &&
    validateEmail() &&
    validateMessage()
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
