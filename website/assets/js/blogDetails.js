import {
  toggleNavLinks,
  logOut,
  renderBlogDetails,
  renderBlogComments,
  toggleHamburgerMenu,
  getEditStatus,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const parsedUrl = new URL(location.href);
const blogId = parsedUrl.searchParams.get("blogId");

const editStatus = document.querySelector("#status");
const editTitle = document.querySelector("#title");
const editContent = document.querySelector("#content");

const blogDetailsWrapper = document.querySelector(".blog__details__wrapper");
const blogCommentsWrapper = document.querySelector(".comment__wrapper__list");
const blogDetailActionBtn = document.querySelector(
  ".blog__details__btn__wrapper"
);

const loggedInfo = JSON.parse(localStorage.getItem("loggedUser"));
async function getPostDetails() {
  try {
    let response = await axios.get(`/blogs/${+blogId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch blog details");
    }
    const { blog } = response?.data;
    blogDetailsWrapper.innerHTML = renderBlogDetails(blog);

    editStatus.selectedIndex = getEditStatus(blog.status);
    editTitle.value = blog.title;
    editContent.value = blog.content;

    const blogCreatorId = blog.user_id;
    const loggedUserId = loggedInfo.loggedUser.id;
    if (blogCreatorId === loggedUserId) {
      blogDetailActionBtn.style.display = "flex";
    } else {
      blogDetailActionBtn.style.display = "none";
    }
  } catch (error) {
    throw error;
  }
}
getPostDetails();
getPostComments();

async function getPostComments() {
  try {
    let response = await axios.get(`/blogs/${+blogId}/comments`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch post comments");
    }
    let { comments } = response?.data;
    console.log(comments, "comments >>>>>");
    blogCommentsWrapper.innerHTML = renderBlogComments(comments);
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

const modal = document.querySelector("#my__modal");
const btn = document.querySelector("#edit__blog__btn");
const closeEdit = document.querySelector("#close__edit__modal");
btn.onclick = function () {
  modal.style.display = "block";
};
closeEdit.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

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

const editBlogForm = document.querySelector("#edit__article");
editBlogForm.addEventListener("submit", handleBlogEdit);

async function handleBlogEdit(event) {
  event.preventDefault();

  const payload = {
    status: editStatus.value,
    title: editTitle.value,
    content: editContent.value,
    user_id: +loggedInfo.loggedUser.id,
    organization_id: +loggedInfo.organization.id,
  };

  try {
    let response = await axios.put(`/blogs/${+blogId}`, payload);
    if (response.status !== 200) {
      throw new Error("Failed to edit blog");
    }
    location.href =
      editStatus.value === "published"
        ? `/website/app/blogDetails.html?blogId=${blogId}`
        : "/website/app/blogs.html";
  } catch (error) {
    throw error;
  }
}

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
    let response = await axios.post(`/blogs/${+blogId}/comments`, payload);
    if (response.status !== 200) {
      throw new Error("Failed to edit blog");
    }
    console.log(response, "comment response >>>>>");
    location.href = `/website/app/blogDetails.html?blogId=${blogId}`;
  } catch (error) {
    throw error;
  }
}
