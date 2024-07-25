import {
  toggleNavLinks,
  logOut,
  renderBlogsCard,
  toggleHamburgerMenu,
} from "./helper.js";

toggleNavLinks();
toggleHamburgerMenu();

const logoutBtn = document.querySelector(".logout__btn__wrapper");
logoutBtn.addEventListener("click", logOut);

axios.defaults.baseURL = "https://jsonplaceholder.org";

const cardsWrapper = document.querySelector(".cards__wrapper");

async function fetchPosts() {
  try {
    let response = await axios.get("/posts");
    if (response.status !== 200) {
      throw new Error("Failed to fetch posts");
    }
    let { data } = response;
    cardsWrapper.innerHTML = renderBlogsCard(data);
  } catch (error) {
    throw error;
  }
}
fetchPosts();
