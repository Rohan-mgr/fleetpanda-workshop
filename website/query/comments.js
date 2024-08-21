export const getComments = `
   query GetComments($blogId: ID, $userId: ID) {
      blogComments(blogId: $blogId, userId: $userId) {
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

export const createComments = `
  mutation CreateComment($blogId: ID, $userId: ID, $commentInfo: CommentInput!) {
    createComment(input: {blogId: $blogId, userId: $userId, commentInfo: $commentInfo}){
      comment {
        id
        body
      }
      errors
    }
  }
`;
