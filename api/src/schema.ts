import { gql } from 'apollo-server';

export const schema = gql`
type Query {
  info: String!
  users: [User!]!
  user(name: String!): User
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String
  published: Boolean!
  author: User
  authorId: Int
}

type User {
  id: ID!
  email: String!
  name: String
  posts: [Post!]!
}
`;
