import { createBlogs, getAllBlogs } from "../../query/blogs.js";
import {
  toggleNavLinks,
  logOut,
  renderBlogsCard,
  toggleHamburgerMenu,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();

const loggedInfo = JSON.parse(localStorage.getItem("loggedUser"));
const orgName = document.querySelector("#organization__name");
function getOrganizationName() {
  const org = loggedInfo.organization.name;
  orgName.innerHTML = org;
}
getOrganizationName();

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const cardsWrapper = document.querySelector(".cards__wrapper");
async function fetchPosts() {
  try {
    const organizationId = loggedInfo.organization.id;

    const query = getAllBlogs;
    const variables = { orgId: organizationId };

    let response = await axios.post("/graphql", {
      query,
      variables,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch blogs");
    }
    let { blogs } = response?.data?.data;
    console.log(blogs, "data >>>>>>");
    cardsWrapper.innerHTML = renderBlogsCard(blogs);
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

  const query = createBlogs;
  const variables = {
    blogInfo: {
      status,
      title,
      content,
      userId: +loggedInfo.loggedUser.id,
      organizationId: +loggedInfo.organization.id,
    },
  };

  try {
    let response = await axios.post("/graphql", {
      query,
      variables,
    });
    console.log(response, "blogs >>>>");
    if (response.status !== 200) {
      throw new Error("Failed to add blogs");
    }
    location.href = "/website/app/blogs.html";
  } catch (error) {
    throw error;
  }
}
