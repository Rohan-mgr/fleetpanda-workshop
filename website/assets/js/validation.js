export function validateFullName(inputFullName, nameErrorTag) {
  let nameErrorMsg = "";
  inputFullName = inputFullName.trim();
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

export function validateEmail(inputEmail, emailErrorTag) {
  let emailErrorMsg = "";
  inputEmail = inputEmail.trim();
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

export function validateContact(inputContact, contactErrorTag) {
  let contactErrorMsg = "";
  inputContact = inputContact.trim();
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

export function validateMessage(inputMsg, messageErrorTag) {
  let messageErrorMsg = "";
  inputMsg = inputMsg.trim();
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

export function validatePassword(inputPassword, passwordErrorTag) {
  let passwordErrorMsg = "";
  inputPassword = inputPassword.trim();
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (inputPassword.trim() === "") {
    passwordErrorMsg = "Please enter your password";
    passwordErrorTag.innerHTML = passwordErrorMsg;
    return false;
  } else if (!passwordRegex.test(inputPassword)) {
    passwordErrorMsg = "Please enter strong password";
    passwordErrorTag.innerHTML = passwordErrorMsg;
    return false;
  } else {
    passwordErrorMsg = "";
    passwordErrorTag.innerHTML = passwordErrorMsg;
    return true;
  }
}

export function validateConfirmPassword(
  inputPassword,
  confirmPasswordErrorTag,
  previousPassword
) {
  let confirmPasswordErrorMsg = "";
  inputPassword = inputPassword.trim();
  if (inputPassword.trim() === "") {
    confirmPasswordErrorMsg = "Please enter your password";
    confirmPasswordErrorTag.innerHTML = confirmPasswordErrorMsg;
    return false;
  } else if (inputPassword !== previousPassword) {
    confirmPasswordErrorMsg = "Password do not match";
    confirmPasswordErrorTag.innerHTML = confirmPasswordErrorMsg;
    return false;
  } else {
    confirmPasswordErrorMsg = "";
    confirmPasswordErrorTag.innerHTML = confirmPasswordErrorMsg;
    return true;
  }
}
