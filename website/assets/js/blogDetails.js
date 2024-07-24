import {
  toggleNavLinks,
  logOut,
  renderBlogDetails,
  renderBlogComments,
} from "./helper.js";

axios.defaults.baseURL = "https://jsonplaceholder.org";

toggleNavLinks();

const logoutBtn = document.querySelector(".logout__btn__wrapper");
logoutBtn.addEventListener("click", logOut);

const parsedUrl = new URL(location.href);
const postId = parsedUrl.searchParams.get("postId");

const blogDetailsWrapper = document.querySelector(".blog__details__wrapper");
const blogCommentsWrapper = document.querySelector(".comment__wrapper__list");

async function getPostDetails() {
  try {
    let response = await axios.get(`/posts/${+postId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch post details");
    }
    let { data } = response;
    blogDetailsWrapper.innerHTML = renderBlogDetails(data);
  } catch (error) {
    throw error;
  }
}
getPostDetails();
getPostComments();

async function getPostComments() {
  try {
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${+postId}`
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
