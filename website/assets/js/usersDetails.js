import { getCommentsQuery } from "../../query/comments.js";
import {
  logOut,
  renderBlogComments,
  renderProfileDetails,
  toggleHamburgerMenu,
  toggleNavLinks,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();

const loggedInfo = JSON.parse(localStorage.getItem("loggedUser"));

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const profileCommentsWrapper = document.querySelector(
  ".comment__wrapper__list"
);

const parsedUrl = new URL(location.href);
const userId = parsedUrl.searchParams.get("user_id");

const userFullname = document.querySelector(".user__fullname");
const userEmail = document.querySelector(".user__email");
const profileDetailsWrapper = document.querySelector(".profile__details");

const avatar = document.querySelector("#avatar");
async function getUserDetails() {
  try {
    let response = await axios.get(`/users/${+userId}/info`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user details");
    }
    const { userDetails } = response?.data;
    console.log(userDetails);
    if (userDetails?.avatar) avatar.src = userDetails?.avatar;
    userFullname.innerHTML = userDetails.fullname;
    userEmail.innerHTML = userDetails.email;
    profileDetailsWrapper.innerHTML = renderProfileDetails(
      userDetails?.profile
    );
  } catch (error) {
    throw error;
  }
}
getUserDetails();

async function getUserProfileComments() {
  try {
    const query = getCommentsQuery("user");
    const variables = { userId: +userId };

    const response = await axios.post("/graphql", {
      query,
      variables,
    });
    const { comments } = response?.data?.data?.blogComments;
    console.log(comments, "user details comments >>>>>");
    profileCommentsWrapper.innerHTML = renderBlogComments(comments);
  } catch (error) {
    throw error;
  }
}
getUserProfileComments();

const commentModal = document.querySelector("#my__modal__comment");
const addCommentBtn = document.querySelector("#add__blog__comment");
const closeComment = document.querySelector("#close__comment__modal");

addCommentBtn.onclick = function () {
  commentModal.style.display = "block";
};
closeComment.onclick = function () {
  commentModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == commentModal) {
    commentModal.style.display = "none";
  }
};

const addCommentForm = document.querySelector("#add_new__comment");
const comment = document.querySelector("#comment");
addCommentForm.addEventListener("submit", handleAddComment);

async function handleAddComment(event) {
  event.preventDefault();

  const payload = {
    body: comment.value,
    commenterId: +loggedInfo.loggedUser.id,
  };

  console.log(payload, "comment payload .....");
  try {
    let response = await axios.post(`/users/${+userId}/comments`, payload);
    if (response.status !== 200) {
      throw new Error("Failed to edit blog");
    }
    console.log(response, "comment response >>>>>");
    location.href = `/website/app/usersDetails.html?user_id=${+userId}`;
  } catch (error) {
    throw error;
  }
}
