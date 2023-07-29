export const typeDefs = `#graphql
  input InputUser {
    firtName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type User {
    id: String
    firtName: String
    lastName: String
    email: String
  }
`;