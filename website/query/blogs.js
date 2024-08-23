export const getAllBlogs = `
      query GetBlogs($orgId: ID!) {
        blogs(organizationId: $orgId) {
          id
          title
          content
          status
        }
      }
    `;

export const createBlogs = `
  mutation CreateBlog($blogInfo: BlogInput!) {
    createBlog(input: {blogInfo: $blogInfo}) {
      blog {
        id
        title
        content
        status
      }
      errors
    }
  }  
`;

export const getBlogDetails = `
  query GetBlogDetails($blogId: ID!) {
    blogDetails(blogId: $blogId) {
      id
      title
      content
      status
      createdAt
      userId
    }
  }
`;

export const editBlog = `
  mutation EditBlog($blogId: ID!, $blogInfo: BlogInput!) {
    editBlog(input:{blogId: $blogId, blogInfo: $blogInfo}) {
      blog {
        id
        organizationId
        title
        content
        userId
      }
      errors
    }
  }
`;

export const deleteBlog = `
  mutation DeleteBlog($blogId: ID!) {
    deleteBlog(input: {blogId: $blogId}){
      message
      error
    }
  }
`;
