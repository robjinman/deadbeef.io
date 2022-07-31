import { gql } from 'apollo-server';

export const schema = gql`
interface Document {
  id: ID!
  content: String!
  files: [File!]!
}

type Query {
  info: String!
  publishedArticles(tags: [ID!], skip: Int, take: Int, filter: String): [Article!]!
  allArticles(skip: Int, take: Int): [Article!]!
  article(id: ID!): Article
  page(name: String!): Page
  pages: [Page!]!
  files(documentId: ID!): [File!]!
  comments(skip: Int, take: Int): [Comment!]!
  users(skip: Int, take: Int): [User!]!
  user(name: String!): User
  allTags: [Tag!]!
  usedTags: [Tag!]!
  tag(id: ID!): Tag
}

type Mutation {
  signup(email: String!, password: String!, name: String!, captcha: String!): AuthPayload
  activateAccount(id: ID!, code: String!): Boolean
  sendActivationEmail: Boolean
  login(email: String!, password: String!, captcha: String): AuthPayload
  postArticle(title: String!, summary: String!, content: String!, tags: [ID!]!): Article!
  updateArticle(id: ID!, title: String!, summary: String!, content: String!, tags: [ID!]!): Article!
  publishArticle(id: ID!, publish: Boolean!): Article!
  deleteArticle(id: ID!): Article!
  postComment(articleId: ID!, content: String!, captcha: String!): Comment!
  deleteComment(id: ID!): Comment
  postPage(name: String!, content: String!): Page!
  updatePage(name: String!, content: String!): Page!
  deletePage(name: String!): Page
  uploadFile(documentId: ID!, data: String!, name: String!, extension: String!): File!
  deleteFile(id: ID!): File!
  updateUser(currentPw: String!, id: ID!, name: String!, email: String!, newPw: String!): User!
  deleteUser(id: ID!): User!
  sendEmail(email: String!, subject: String!, message: String!, captcha: String!): Boolean
  postTag(name: String!): Tag!
}

type File {
  id: ID!
  name: String!
  extension: String!
  document: Document!
}

type Subscription {
  newArticle: Article
  newComment: Comment
}

type Page implements Document {
  id: ID!
  name: String!
  content: String!
  files: [File!]!
}

type Article implements Document {
  id: ID!
  draft: Boolean!
  createdAt: String!
  modifiedAt: String!
  publishedAt: String
  title: String!
  summary: String!
  content: String!
  files: [File!]!
  tags: [Tag!]!
  comments: [Comment!]!
}

type Tag {
  id: ID!
  name: String!
  articles: [Article!]!
}

type AuthPayload {
  token: String
  user: User
}

enum Role {
  ADMIN
  USER
}

type User {
  id: ID!
  createdAt: String!
  name: String!
  email: String!
  comments: [Comment!]!
  role: Role!
  activated: Boolean!
}

type Comment {
  id: ID!
  createdAt: String!
  content: String!
  user: User
  article: Article!
}
`;
