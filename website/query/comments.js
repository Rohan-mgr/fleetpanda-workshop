export function getCommentsQuery(type = "blog") {
  switch (type.toLowerCase()) {
    case "blog":
      return `
            query GetComments($blogId: ID!) {
              blogComments(blogId: $blogId) {
                comments {
                  id
                  body
                  createdAt
                  createdBy
                  commenter {
                    id
                    avatar
                    createdAt
                    fullname
                    email
                  }
                }
                errors
              }
            }
            `;
    case "user":
      return `
            query GetComments($userId: ID!) {
              blogComments(userId: $userId) {
                comments {
                  id
                  body
                  createdAt
                  createdBy
                  commenter {
                    id
                    avatar
                    createdAt
                    fullname
                    email
                  }
                }
                errors
              }
            }
        `;
    default:
      return "Invalid type!";
  }
}
