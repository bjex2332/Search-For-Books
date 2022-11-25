import gql from 'graphql-tag';

export const ADD_USER = gql`
mutation addUser (username: String!, password: String!, email: String!): Auth
addUser ( $username: $username, password: $password, email: $email) {
    token
    user {
        _id
        username
        }
    }
}`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: ID!) {
    saveBook(book: $book) {
      email
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      bookCount
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        email
        username
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
        bookCount
      }
    }
  `;