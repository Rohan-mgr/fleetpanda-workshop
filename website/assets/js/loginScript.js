import { validateEmail, validatePassword } from "./validation.js";

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

let loginForm = document.querySelector("#login__form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let loginEmailErrorMsgTag = document.querySelector("#email-error-msg");
let loginPasswordErrorMsgTag = document.querySelector("#password-error-msg");

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
    // alert("Your Details: " + `\n ${JSON.stringify(data)}`);

    console.log(data);
    try {
      let response = await axios.post("/api/login", data);
      if (response.status !== 200) {
        throw new Error("Login failed!");
      }
      console.log(response, "login response>>>");
      localStorage.setItem("loginToken", response.data.token);
    } catch (error) {
      throw error;
    }

    location.href = "/website/app/blogs.html";
    // location.reload();
  }
}

let logoutBtn = document.querySelector(".logoutWrapper");
logoutBtn.addEventListener("click", logOut);
function logOut() {
  localStorage.clear();
  location.href = "/website/index.html";
}
