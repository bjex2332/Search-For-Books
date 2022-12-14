const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String!
    _id: ID!
    image: String!
    description: String!
    link: String!
    authors: [String!]!
    title: String!
}

type User {
    _id: ID
    email: String
    username: String
    savedBooks: [Book]
    bookCount: Int
}

input BookInput {
    bookId: String!
    authors: [String!]!
    description: String!
    title: String!
    image: String!
    link: String!
}

type Query {
    me: User
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login (email: String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String!): Auth
    saveBook (book: BookInput!): User
    removeBook (bookId: ID!): User
}
`;

module.exports = typeDefs;