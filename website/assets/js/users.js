import {
  logOut,
  renderUserCards,
  toggleHamburgerMenu,
  toggleNavLinks,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();

const loggedInfo = JSON.parse(localStorage.getItem("loggedUser"));

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const orgName = document.querySelector("#organization__name");
function getOrganizationName() {
  const org = loggedInfo.organization.name;
  orgName.innerHTML = org;
}
getOrganizationName();

const userCardsWrapper = document.querySelector(".cards__wrapper");
async function fetchOrganizationUsers() {
  try {
    const organizationId = loggedInfo.organization.id;
    let response = await axios.get(`/organizations/${+organizationId}/users`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch users");
    }
    let { users } = response?.data;
    console.log(users, "users......");
    const filteredUser = users.filter(
      (user) => user.id != +loggedInfo.loggedUser.id
    );
    userCardsWrapper.innerHTML = renderUserCards(filteredUser);
  } catch (error) {
    throw error;
  }
}
fetchOrganizationUsers();
