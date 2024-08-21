import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateConfirmPassword,
} from "./validation.js";
import {
  toggleNavLinks,
  logOut,
  toggleHamburgerMenu,
  renderOrganizationsDropDown,
} from "./helper.js";
import { createUser } from "../../query/users.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();
fetchOrganization();

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const signUpForm = document.querySelector("#signup__form");
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const nameErrorTag = document.querySelector("#name-error-msg");
const emailErrorTag = document.querySelector("#email-error-msg");
const passwordErrorTag = document.querySelector("#password-error-msg");
const confirmPasswordErrorTag = document.querySelector(
  "#confirm-password-error-msg"
);

fullName.addEventListener("keyup", (e) =>
  validateFullName(e.target.value, nameErrorTag)
);
email.addEventListener("keyup", (e) =>
  validateEmail(e.target.value, emailErrorTag)
);
password.addEventListener("keyup", (e) =>
  validatePassword(e.target.value, passwordErrorTag)
);
confirmPassword.addEventListener("keyup", (e) =>
  validateConfirmPassword(
    confirmPassword.value,
    confirmPasswordErrorTag,
    password.value
  )
);

const selectOrganization = document.querySelector("#organization");
async function fetchOrganization() {
  try {
    let response = await axios.get("/organizations");
    if (response.status !== 200) {
      throw new Error("Fetching organizations failed!");
    }
    const { data } = response;
    selectOrganization.innerHTML = renderOrganizationsDropDown(data);
  } catch (error) {
    throw error;
  }
}

signUpForm.addEventListener("submit", handleSignUpFormSubmission);

async function handleSignUpFormSubmission(e) {
  e.preventDefault();
  if (
    validateFullName(fullName.value, nameErrorTag) &&
    validateEmail(email.value, emailErrorTag) &&
    validatePassword(password.value, passwordErrorTag) &&
    validateConfirmPassword(
      confirmPassword.value,
      confirmPasswordErrorTag,
      password.value
    )
  ) {
    const query = createUser;
    const variables = {
      userInfo: {
        fullname: fullName.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: confirmPassword.value,
        organizationId: +selectOrganization.value,
      },
    };
    try {
      const response = await axios.post("/graphql", {
        query,
        variables,
      });
      if (response.status !== 200) {
        throw new Error("User Registration failed!");
      }
      console.log(response, "registration successfull>>>");
      location.href = "/website/app/login.html";
    } catch (error) {
      throw error;
    }
  }
}
