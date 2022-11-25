import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import Container from 'react-bootstrap/Container';
// import CardColumns from 'react-bootstrap/CardColumns';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import { GET_ME } from '../utils/queries';
// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

const SavedBooks = () => {
  const [removeBook] = useMutation(REMOVE_BOOK);
  const {loading, data} = useQuery (GET_ME);
  const userData = data?.me || [];

  if(!userData?.username) {
    return (
      <h4>
        Please Log in!
      </h4>
    );
  }

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn()?Auth.getToken():null;
    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: {bookId: bookId},
        update: cache => {
          const data = cache.readQuery({ query: GET_ME });
          const userCache = data.me;
          const savedCache = userCache.savedBooks;
          const updatedCache = savedCache.filter((book) => book.bookId !== bookId);
          data.me.savedBooks = updatedCache;
          cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedBooks}}})
        }
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
