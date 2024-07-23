axios.defaults.baseURL = "https://jsonplaceholder.org";

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

console.log("this is blog detail scripts");
const parsedUrl = new URL(location.href);
const postId = parsedUrl.searchParams.get("postId");
console.log(postId);

let blogDetailsWrapper = document.querySelector(".blog__details__wrapper");
let postCommentsWrapper = document.querySelector(".comment__wrapper__list");

async function getPostDetails() {
  console.log(postId, typeof postId);
  try {
    let response = await axios.get(`/posts/${+postId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch post details");
    }
    let { data } = response;
    console.log(data);
    blogDetailsWrapper.innerHTML = `
    <div class="blogs__details__card">
        <div class="blog__details__img__wrapper">
          <img
            src="${data.image}"
            alt="blog-img"
          />
        </div>
        <div class="blog__details__content__wrapper">
        <div class="blog__details__header__wrapper">
        <h1>${data.title}</h1>
        <div style="display: flex; gap: 1rem; font-weight: 600;">
          <p>Updated At: ${data.updatedAt}</p>
          <p>Status: ${data.status}</p>
        </div>
        </div>
          <p style="font-weight: 600; margin-bottom: 1rem;">Category: ${data.category}</p>
          <p>${data.content}</p>
        </div>
      </div>
    `;
  } catch (error) {
    throw error;
  }
}
getPostDetails();
getPostComments();

async function getPostComments() {
  console.log(postId, typeof postId);
  try {
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${+postId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch post comments");
    }
    let { data } = response;
    console.log(data, "comments respnose...");
    postCommentsWrapper.innerHTML = data
      .map((post) => {
        return `
        <div class="comment__wrapper">
          <div class="comment__header__wrapper">
            <h3>${post.name}</h3>
          </div>
          <p>
            ${post.body}
          </p>
          <p>- ${post.email}</p>
        </div>
      `;
      })
      .join("");
  } catch (error) {
    throw error;
  }
}
