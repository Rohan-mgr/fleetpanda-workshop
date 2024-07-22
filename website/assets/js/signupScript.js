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
