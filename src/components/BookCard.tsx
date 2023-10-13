import React, { ReactElement } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { truncateText } from '../utils/helpers';
import { Book } from '../model/Book';

const MAX_LENGTH_AUTHOR = 20;
const MAX_LENGTH_TITLE = 30;

type BookCardProps = {
  book: Book;
  handleDelete: (bookId: string) => void;
};

export default function BookCard({
  book,
  handleDelete,
}: BookCardProps): ReactElement {
  return (
    <Col sm={4} style={{ marginBottom: '15px' }}>
      <Card style={{ width: '100%' }}>
        <Card.Body style={{ height: '150px' }}>
          <Card.Title>
            {truncateText(
              book?.volumeInfo?.authors?.[0] ?? '-',
              MAX_LENGTH_AUTHOR
            )}
          </Card.Title>
          <Card.Text>
            {truncateText(book?.volumeInfo?.title ?? '-', MAX_LENGTH_TITLE)}
          </Card.Text>
          <Button variant="primary" onClick={() => handleDelete(book.id)}>
            delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
