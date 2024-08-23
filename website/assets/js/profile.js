import { getComments } from "../../query/comments.js";
import {
  createProfile,
  editProfile,
  uploadProfile,
} from "../../query/users.js";
import {
  convertImageToBase64,
  getEditGender,
  logOut,
  renderBlogComments,
  renderLoggedUserInfo,
  renderProfileDetails,
  toggleHamburgerMenu,
  toggleNavLinks,
} from "./helper.js";

axios.defaults.baseURL = "http://localhost:3000";

toggleNavLinks();
toggleHamburgerMenu();

const loggedInfo = JSON.parse(localStorage.getItem("loggedUser"));
renderLoggedUserInfo(loggedInfo.loggedUser);

const logoutBtn = document.querySelector(".logout__btn");
logoutBtn.addEventListener("click", logOut);

const profileCommentsWrapper = document.querySelector(
  ".comment__wrapper__list"
);

const userId = loggedInfo.loggedUser.id;
async function getUserProfileComments() {
  try {
    const query = getComments;
    const variables = { userId: +userId };

    const response = await axios.post("/graphql", {
      query,
      variables,
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch post comments");
    }
    const { comments } = response?.data?.data?.blogComments;
    console.log(comments, "user profile comments >>>>>");
    profileCommentsWrapper.innerHTML = renderBlogComments(comments);
  } catch (error) {
    throw error;
  }
}
getUserProfileComments();

const addProfileBtn = document.querySelector("#add__profile");
const editProfileBtn = document.querySelector("#edit__profile");

const editAddress = document.querySelector("#edit__address");
const editGender = document.querySelector("#edit__gender");
const editCountry = document.querySelector("#edit__country");
const editAge = document.querySelector("#edit__age");
const editContact = document.querySelector("#edit__contact");
const editDob = document.querySelector("#edit__dob");

const profileDetailsWrapper = document.querySelector(".profile__details");
const avatar = document.querySelector("#avatar");
async function getUserDetails() {
  try {
    let response = await axios.get(`/users/${+userId}/info`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user details`");
    }
    let { userDetails } = response?.data;
    console.log(userDetails, "user details >>>>>");
    if (userDetails.avatar) avatar.src = userDetails.avatar;
    profileDetailsWrapper.innerHTML = renderProfileDetails(
      userDetails?.profile,
      true
    );

    if (userDetails?.profile) {
      editAddress.value = userDetails?.profile.address;
      editCountry.value = userDetails?.profile.country;
      editAge.value = userDetails?.profile.age;
      editContact.value = userDetails?.profile.contact;
      editDob.value = new Date(userDetails?.profile.dob)
        .toISOString()
        .substring(0, 10);
      editGender.selectedIndex = getEditGender(userDetails?.profile.gender);
    }
    if (userDetails?.profile) {
      editProfileBtn.style.display = "block";
    } else {
      addProfileBtn.style.display = "block";
    }
  } catch (error) {
    throw error;
  }
}
getUserDetails();

const profileAddModal = document.querySelector("#my__modal__add");
const closeAddProfileModal = document.querySelector("#close__add__modal");

addProfileBtn.onclick = function () {
  profileAddModal.style.display = "block";
};
closeAddProfileModal.onclick = function () {
  profileAddModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == profileAddModal) {
    profileAddModal.style.display = "none";
  }
};

const addProfileForm = document.querySelector("#add__profile__form");
addProfileForm.addEventListener("submit", handleAddProfile);

const address = document.querySelector("#address");
const gender = document.querySelector("#gender");
const country = document.querySelector("#country");
const age = document.querySelector("#age");
const contact = document.querySelector("#contact");
const dob = document.querySelector("#dob");

async function handleAddProfile(event) {
  event.preventDefault();

  const query = createProfile;
  const variables = {
    profileInfo: {
      address: address.value,
      gender: gender.value,
      country: country.value,
      age: +age.value,
      contact: contact.value,
      dob: dob.value,
      userId: +userId,
    },
  };
  try {
    const response = await axios.post("graphql", {
      query,
      variables,
    });
    if (response.status !== 200) {
      throw new Error("Failed to add profile");
    }
    console.log(response);
    location.href = "/website/app/profile.html";
  } catch (error) {
    throw error;
  }
}

const profileEditModal = document.querySelector("#my__modal__edit");
const closeEditProfileModal = document.querySelector("#close__edit__modal");

editProfileBtn.onclick = function () {
  profileEditModal.style.display = "block";
};
closeEditProfileModal.onclick = function () {
  profileEditModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == profileEditModal) {
    profileEditModal.style.display = "none";
  }
};

const editProfileForm = document.querySelector("#edit__profile__form");
editProfileForm.addEventListener("submit", handleProfileEdit);

async function handleProfileEdit(event) {
  event.preventDefault();

  const query = editProfile;
  const variables = {
    profileInfo: {
      address: editAddress.value,
      contact: editContact.value,
      gender: editGender.value,
      age: editAge.value,
      country: editCountry.value,
      dob: editDob.value,
      userId: userId,
    },
  };
  try {
    const response = await axios.post("/graphql", {
      query,
      variables,
    });
    console.log(response, "edit profile reponse>>");
    if (response.status !== 200) {
      throw new Error("Failed to edit profile");
    }
    location.href = "/website/app/profile.html";
  } catch (error) {
    throw error;
  }
}

const uploadProfileImg = document.querySelector("#upload-photo");
uploadProfileImg.addEventListener("change", handleProfileImgUpload);

async function handleProfileImgUpload(event) {
  const file = event.target.files[0];

  try {
    let base64ImgUrl = await convertImageToBase64(file);
    const query = uploadProfile;
    const variables = {
      avatarInfo: {
        avatar: base64ImgUrl,
        userId: +userId,
      },
    };
    const response = await axios.post("/graphql", {
      query,
      variables,
    });
    if (response.status !== 200) {
      throw new Error("Failed to upload profile picture");
    }
    console.log(response, "response>>>>>>");
    location.href = "/website/app/profile.html";
    let { comments } = response?.data;
    console.log(comments, "comments >>>>>");
    profileCommentsWrapper.innerHTML = renderBlogComments(comments);
  } catch (error) {
    throw error;
  }
}
