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
  mutation CreateBlog($title: String!, $status: BlogStatusEnum!, $content: String!, $user_id: ID!, $organization_id: ID!) {
    createBlog(input:{status: $status, title: $title, content: $content, userId: $user_id, organizationId: $organization_id}) {
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
