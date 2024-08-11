import {
  toggleNavLinks,
  logOut,
  renderBlogsCard,
  toggleHamburgerMenu,
} from "./helper.js";

toggleNavLinks();
toggleHamburgerMenu();

const orgName = document.querySelector("#organization__name");
function getOrganizationName() {
  const loggedInfo = JSON.parse(localStorage.getItem("loggedUser"));
  const org = loggedInfo.organization.name;
  orgName.innerHTML = org;
}
getOrganizationName();

const logoutBtn = document.querySelector(".logout__btn__wrapper");
logoutBtn.addEventListener("click", logOut);

axios.defaults.baseURL = "http://localhost:3000";

const cardsWrapper = document.querySelector(".cards__wrapper");

async function fetchPosts() {
  try {
    let response = await axios.get("/blogs");
    if (response.status !== 200) {
      throw new Error("Failed to fetch blogs");
    }
    let { data } = response;
    cardsWrapper.innerHTML = renderBlogsCard(data);
  } catch (error) {
    throw error;
  }
}
fetchPosts();

const modal = document.querySelector("#my__modal");
const btn = document.querySelector("#open__modal__btn");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const addNewArticleForm = document.querySelector("#add_new__article");

addNewArticleForm.addEventListener("submit", handleAddNewArticle);

async function handleAddNewArticle(event) {
  event.preventDefault();
  const status = document.querySelector("#status").value;
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;

  const payload = { status, title, content };

  try {
    let response = await axios.post("/blogs", payload);
    if (response.status !== 200) {
      throw new Error("Failed to add blogs");
    }
    location.href = "/website/app/blogs.html";
  } catch (error) {
    throw error;
  }
}
