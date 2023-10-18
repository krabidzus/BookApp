import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Book } from '../model/Book';
import {
  Button,
  Form,
  InputGroup,
  Navbar,
  Col,
  Row,
  Container,
  Modal,
} from 'react-bootstrap';
import { deleteUserData, getUserData, writeUserData } from '../api/apiCalls';
import BookCard from '../components/BookCard';

export default function Home() {
  const [userState, setUserState] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [uid, setUid] = useState<string>();
  const [books, setBooks] = useState<Book[]>([]);
  const [show, setShow] = useState(false);
  const [deletedBook, setDeletedBook] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      getUserData(uid, setBooks);
    } else {
      console.log('no uid');
    }
  }, [uid]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserState(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setUid(uid);
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  const SEARCH_URI = 'https://www.googleapis.com/books/v1/volumes';

  const handleSearch = (query: string) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const handleSave = () => {
    if (selectedBook && uid) {
      writeUserData(selectedBook, uid);
      getUserData(uid, setBooks);
    } else {
      console.log(`selectedBook or uid is missing...`);
    }
  };

  const deleteBook = () => {
    if (uid) {
      deleteUserData(deletedBook, uid);
    }
    setShow(false);
  };

  const handleDelete = (bookId: string) => {
    setShow(true);
    setDeletedBook(bookId);
  };

  const filterBy = () => true;

  return (
    <main>
      <section>
        <Container className="mb-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Navbar>
                <p>
                  Welcome Home {userState?.email}
                  <span
                    style={{
                      cursor: 'pointer',
                      color: 'blue',
                      marginLeft: '10px',
                      textDecoration: 'underline',
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                  .
                </p>
              </Navbar>

              <Form.Group>
                <InputGroup>
                  <AsyncTypeahead
                    className="w-75"
                    filterBy={filterBy}
                    id="async-example"
                    isLoading={isLoading}
                    labelKey={(option: any) => {
                      return option.volumeInfo.title;
                    }}
                    minLength={3}
                    onSearch={handleSearch}
                    options={options}
                    placeholder="Search for a book..."
                    onChange={(value: any) => setSelectedBook(value[0])}
                    renderMenuItemChildren={(option: any) => (
                      <>
                        <span>{option.volumeInfo.title}</span>
                      </>
                    )}
                  />
                  <Button variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {books?.map((book: Book, i: number) => (
              <BookCard
                key={`${book.id}-${i}`}
                book={book}
                handleDelete={handleDelete}
              />
            ))}
          </Row>
        </Container>
      </section>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Porvrzení smazání</Modal.Title>
        </Modal.Header>
        <Modal.Body>Opravdu chcete tuto knihu smazat?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteBook}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
