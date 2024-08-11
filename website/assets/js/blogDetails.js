import {
  toggleNavLinks,
  logOut,
  renderBlogDetails,
  renderBlogComments,
  toggleHamburgerMenu,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();

const logoutBtn = document.querySelector(".logout__btn__wrapper");
logoutBtn.addEventListener("click", logOut);

const parsedUrl = new URL(location.href);
const blogId = parsedUrl.searchParams.get("blogId");

const blogDetailsWrapper = document.querySelector(".blog__details__wrapper");
const blogCommentsWrapper = document.querySelector(".comment__wrapper__list");

async function getPostDetails() {
  try {
    let response = await axios.get(`/blogs/${+blogId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch blog details");
    }
    console.log(response, ">>>>>");
    let { blog } = response?.data;
    blogDetailsWrapper.innerHTML = renderBlogDetails(blog);
  } catch (error) {
    throw error;
  }
}
getPostDetails();
getPostComments();

async function getPostComments() {
  try {
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${+blogId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch post comments");
    }
    let { data } = response;
    blogCommentsWrapper.innerHTML = renderBlogComments(data);
  } catch (error) {
    throw error;
  }
}

const blogDeleteBtn = document.querySelector("#delete_blog__btn");
blogDeleteBtn.addEventListener("click", handleBlogDelete);

async function handleBlogDelete() {
  console.log("delete btn clicked;");
  try {
    let response = await axios.delete(`/blogs/${+blogId}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete blog");
    }
    console.log(response, ">>>>>");
    location.href = "/website/app/blogs.html";
  } catch (error) {
    throw error;
  }
}
