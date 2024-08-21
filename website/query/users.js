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
