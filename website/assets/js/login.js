import { validateEmail, validatePassword } from "./validation.js";
import {
  toggleNavLinks,
  logOut,
  toggleHamburgerMenu,
  renderOrganizationsDropDown,
} from "./helper.js";
import { userLogin } from "../../query/users.js";
import { getOrganizations } from "../../query/organizations.js";

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
  const query = getOrganizations;
  try {
    let response = await axios.post("/graphql", { query });
    if (response.status !== 200) {
      throw new Error("Fetching organizations failed!");
    }
    const { organizations } = response?.data?.data?.getOrganizations;
    selectOrganization.innerHTML = renderOrganizationsDropDown(organizations);
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
    try {
      const query = userLogin;
      let variables = {
        loginInfo: {
          email: email.value,
          password: password.value,
          organizationId: +selectOrganization.value,
        },
      };

      const response = await axios.post("/graphql", {
        query,
        variables,
      });
      if (response.status !== 200) {
        throw new Error("Login failed!");
      }
      console.log(response, "login resopnse >>>>>");
      const { session } = response?.data?.data;
      const sessionInfo = {
        loggedUser: session.loggedUser,
        organization: session.organization,
        token: session.token,
      };
      localStorage.setItem("loggedUser", JSON.stringify(sessionInfo));
      location.href = "/website/app/blogs.html";
    } catch (error) {
      throw error;
    }
  }
}
