export function toggleNavLinks() {
  const authButtonsWrapper = document.querySelector(".auth__btns__wrapper");
  const blogsBtnWrapper = document.querySelector(".blogs");
  const logoutBtnWrapper = document.querySelector(".logout__btn__wrapper");

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser?.token) {
    authButtonsWrapper.style.display = "none";
    blogsBtnWrapper.style.display = "flex";
    logoutBtnWrapper.style.display = "flex";
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
  if (comments.length < 1) {
    return `<p>No comments posted yet!</p>`;
  }
  return comments
    .map((comment) => {
      return `
        <div class="comment__wrapper">
          <div class="comment__header__wrapper">
            <h3>${comment.commenter.fullname}</h3>
          </div>
          <p>
            ${comment.body}
          </p>
        </div>
      `;
    })
    .join("");
}

export function renderLoggedUserInfo(user) {
  const loggedUserContainer = document.querySelector(".profile__logged__user");
  loggedUserContainer.innerHTML = `
    <h3>${user.fullname}</h3>
    <p>${user.email}</p>
  `;
}

export function renderProfileDetails(profile, isMyProfile = false) {
  if (!profile) {
    return isMyProfile
      ? "<h2>Please add your profile details</h2>"
      : "<h2>User profile details is not available</h2>";
  }
  return `
    <h2>Gender: ${profile.gender}</h2>
    <h2>Address: ${profile.address}</h2>
    <h2>Age: ${profile.age}</h2>
    <h2>Contanct: ${profile.contact}</h2>
    <h2>Country: ${profile.country}</h2>
    <h2>Date of Birth: ${profile.dob.slice(0, 10)}</h2>
  `;
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

export function renderUserCards(users) {
  return users
    .map((user) => {
      return `
      <div class="card">
          <div class="card__img__wrapper">
            <img
              src=${
                user.avatar
                  ? user.avatar
                  : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.webp"
              }
              alt="card-img"
            />
          </div>
          <div class="card__content">
            <p>${user.fullname}</p>
            <p>${user.email}</p>
          </div>
          <a href='/website/app/usersDetails.html?user_id=${+user.id}' class="btn btn-primary">View Profile</a>
        </div>
    `;
    })
    .join("");
}

export function renderOrganizationsDropDown(orgs) {
  return orgs.map((org) => {
    return `<option value=${org.id}>${org.name}</option>`;
  });
}

export function getEditStatus(status) {
  switch (status.toLowerCase()) {
    case "published":
      return 0;
    case "hidden":
      return 1;
    case "archived":
      return 2;
    default:
      return 0;
  }
}
export function getEditGender(gender) {
  switch (gender.toLowerCase()) {
    case "male":
      return 0;
    case "female":
      return 1;
    default:
      return 0;
  }
}
