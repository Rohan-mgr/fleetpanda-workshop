import { validateEmail, validatePassword } from "./validation.js";
import { toggleNavLinks, logOut } from "./helper.js";

axios.defaults.baseURL = "https://reqres.in";

toggleNavLinks();

const logoutBtn = document.querySelector(".logout__btn__wrapper");
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
    };

    try {
      let response = await axios.post("/api/login", data);
      if (response.status !== 200) {
        throw new Error("Login failed!");
      }
      localStorage.setItem("loginToken", response.data.token);
    } catch (error) {
      throw error;
    }

    location.href = "/website/app/blogs.html";
  }
}
