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

axios.defaults.baseURL = "https://jsonplaceholder.org";

let cardsWrapper = document.querySelector(".cards__wrapper");

async function fetchPosts() {
  try {
    let response = await axios.get("/posts");
    if (response.status !== 200) {
      throw new Error("Failed to fetch posts");
    }
    let { data } = response;
    cardsWrapper.innerHTML = data.map((post) => {
      return `
        <div class="card">
          <div class="card__img__wrapper">
            <img
              src='${post.image}'
              alt="card-img"
            />
          </div>
          <div class="card__content">
            <p>
              ${post.title.substr(0, 20)}
            </p>
            <p>
              ${post.content.substr(
                0,
                200
              )} ... <a href='/website/app/blogDetails.html?postId=${
        post.id
      }' id="read__more">Read More</a>
            </p>
          </div>
        </div>
        `;
    });
    console.log(response);
  } catch (error) {
    throw error;
  }
}
fetchPosts();
