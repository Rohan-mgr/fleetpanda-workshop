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
