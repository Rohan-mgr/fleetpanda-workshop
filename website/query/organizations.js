export const getOrganizations = `
    query GetOrganizations {
        getOrganizations {
          organizations {
            id
            name
            createdAt
          }
          error
        }
    }
`;
