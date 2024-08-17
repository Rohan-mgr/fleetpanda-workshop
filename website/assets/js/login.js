import { validateEmail, validatePassword } from "./validation.js";
import {
  toggleNavLinks,
  logOut,
  toggleHamburgerMenu,
  renderOrganizationsDropDown,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();
fetchOrganization();

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const loginForm = document.querySelector("#login__form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const loginEmailErrorMsgTag = document.querySelector("#email-error-msg");
const loginPasswordErrorMsgTag = document.querySelector("#password-error-msg");

email.addEventListener("keyup", (e) =>
  validateEmail(e.target.value, loginEmailErrorMsgTag)
);
password.addEventListener("keyup", (e) =>
  validatePassword(e.target.value, loginPasswordErrorMsgTag)
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

loginForm.addEventListener("submit", handleLoginFormSubmission);
async function handleLoginFormSubmission(e) {
  e.preventDefault();
  if (
    validateEmail(email.value, loginEmailErrorMsgTag) &&
    validatePassword(password.value, loginPasswordErrorMsgTag)
  ) {
    let data = {
      email: email.value,
      password: password.value,
      organization_id: +selectOrganization.value,
    };

    try {
      let response = await axios.post("/users/sign_in", data);
      if (response.status !== 200) {
        throw new Error("Login failed!");
      }
      console.log(response, "login resopnse >>>>>");
      localStorage.setItem("loggedUser", JSON.stringify(response.data));
    } catch (error) {
      throw error;
    }

    location.href = "/website/app/blogs.html";
  }
}
