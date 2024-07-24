export function toggleNavLinks() {
  const authButtonsWrapper = document.querySelector(".auth__btns__wrapper");
  const blogsBtnWrapper = document.querySelector(".blogs");
  const logoutBtnWrapper = document.querySelector(".logout__btn__wrapper");
  if (localStorage.getItem("loginToken")) {
    authButtonsWrapper.style.display = "none";
    blogsBtnWrapper.style.display = "flex";
    logoutBtnWrapper.style.display = "block";
  } else {
    authButtonsWrapper.style.display = "flex";
    blogsBtnWrapper.style.display = "none";
    logoutBtnWrapper.style.display = "none";
  }
}

export function logOut() {
  localStorage.clear();
  location.href = "/website/index.html";
}

export function renderBlogDetails(blog) {
  return `
    <div class="blogs__details__card">
        <div class="blog__details__img__wrapper">
          <img
            src="${blog.image}"
            alt="blog-img"
          />
        </div>
        <div class="blog__details__content__wrapper">
        <div class="blog__details__header__wrapper">
        <h1>${blog.title}</h1>
        <div style="display: flex; gap: 1rem; font-weight: 600;">
          <p>Updated At: ${blog.updatedAt}</p>
          <p>Status: ${blog.status}</p>
        </div>
        </div>
          <p style="font-weight: 600; margin-bottom: 1rem;">Category: ${blog.category}</p>
          <p>${blog.content}</p>
        </div>
      </div>
    `;
}

export function renderBlogComments(comments) {
  return comments
    .map((comment) => {
      return `
        <div class="comment__wrapper">
          <div class="comment__header__wrapper">
            <h3>${comment.name}</h3>
          </div>
          <p>
            ${comment.body}
          </p>
          <p>- ${comment.email}</p>
        </div>
      `;
    })
    .join("");
}

export function renderBlogsCard(blogs) {
  return blogs.map((blog) => {
    return `
        <div class="card">
          <div class="card__img__wrapper">
            <img
              src='${blog.image}'
              alt="card-img"
            />
          </div>
          <div class="card__content">
            <p>
              ${blog.title.substr(0, 20)}
            </p>
            <p>
              ${blog.content.substr(
                0,
                200
              )} ... <a href='/website/app/blogDetails.html?postId=${
      blog.id
    }' id="read__more">Read More</a>
            </p>
          </div>
        </div>
        `;
  });
}
