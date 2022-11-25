const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID
    image: String
    description: String
    link: String
    authors: String
    title: String
}

type User {
    _id: ID
    email: String
    username: String
    saveBooks: [Book]
    bookCount: Int
}

type Query {
    me: User
}

type Book {
    bookId: String
    authors: String
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login (email: String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String!): Auth
    saveBook (book: ID!): User
    removeBook (bookId: ID!): User
}
`;

module.exports = typeDefs;