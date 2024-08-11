export function toggleNavLinks() {
  const authButtonsWrapper = document.querySelector(".auth__btns__wrapper");
  const blogsBtnWrapper = document.querySelector(".blogs");
  const logoutBtnWrapper = document.querySelector(".logout__btn__wrapper");

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser?.token) {
    authButtonsWrapper.style.display = "none";
    blogsBtnWrapper.style.display = "flex";
    logoutBtnWrapper.style.display = "block";
  } else {
    authButtonsWrapper.style.display = "flex";
    blogsBtnWrapper.style.display = "none";
    logoutBtnWrapper.style.display = "none";
  }
}

export function toggleHamburgerMenu() {
  let hamburgerMenu = document.querySelector(".hamburger__menu");
  let navLinkWrapper = document.querySelector(".nav__link__wrapper");

  hamburgerMenu.addEventListener("click", () => {
    if (navLinkWrapper.classList.contains("responsive__nav")) {
      navLinkWrapper.classList.remove("responsive__nav");
    } else {
      navLinkWrapper.classList.add("responsive__nav");
    }
  });
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
            src="https://www.shutterstock.com/image-vector/financial-news-trading-stock-impulses-600nw-2281259029.jpg"
            alt="blog-img"
          />
        </div>
        <div class="blog__details__content__wrapper">
        <div class="blog__details__header__wrapper">
        <h1>${blog.title}</h1>
        <div style="display: flex; gap: 1rem; font-weight: 600;">
          <p>Blog Created: ${blog.created_at}</p>
          <p>Status: ${blog.status}</p>
        </div>
        </div>
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
  if (blogs.length < 1) {
    return `<p>No blogs created for this organization</p>`;
  }
  return blogs
    .map((blog) => {
      if (blog.status === "published") {
        return `
        <div class="card">
          <div class="card__img__wrapper">
            <img
              src='https://www.shutterstock.com/image-vector/financial-news-trading-stock-impulses-600nw-2281259029.jpg'
              alt="card-img"
            />
          </div>
          <div class="card__content">
            <p>
              ${blog.title.substr(0, 60)}
            </p>
            <p>
              ${blog.content.substr(
                0,
                300
              )} ... <a href='/website/app/blogDetails.html?blogId=${
          blog.id
        }' id="read__more">Read More</a>
            </p>
          </div>
        </div>
        `;
      }
    })
    .join("");
}

export function renderOrganizationsDropDown(orgs) {
  return orgs.map((org) => {
    return `<option value=${org.id}>${org.name}</option>`;
  });
}
