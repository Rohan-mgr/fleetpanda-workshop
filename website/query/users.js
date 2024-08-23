export const createUser = `
    mutation CreateUser($userInfo: UserRegistrationInput!) {
        createUser(input:{userInfo: $userInfo}){
          user {
            id
            fullname
            email
            avatar
            createdAt
          }
          errors
        }
    }
`;

export const userLogin = `
  query UserLogin($loginInfo: UserLoginInput!) {
    session(loginInfo: $loginInfo) {
      loggedUser {
        id,
        fullname
        email
        createdAt
      }
      token
      organization {
        id
        name
      }
      errors
    }
  }
`;

export const createProfile = `
  mutation CreateProfile($profileInfo: ProfileInput!) {
    createProfile(input: {profileInfo: $profileInfo}) {
      profile {
        id
        userId
        gender
        address
        dob
      }
      errors
    }
  }
`;

export const uploadProfile = `
  mutation UploadAvatar($avatarInfo: AvatarInput!) {
    uploadAvatar(input: {avatarInfo: $avatarInfo}) {
    	avatarUrl
      errors
    }
  }
`;

export const editProfile = `
  mutation EditProfile($profileInfo: ProfileInput!) {
    editProfile(input: {profileInfo: $profileInfo}) {
      profile{
        id
        gender
        address
        contact
        age
        dob
        country
      }
      errors
    }
  }
`;

export const fetchOrgUsers = `
  query FetchUser($organizationId: ID!){
    organizationUsers(organizationId: $organizationId) {
      users {
        id
        avatar
        fullname
        email
        createdAt
      }
      errors
    }
  }
`;
