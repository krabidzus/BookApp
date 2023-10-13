import { Book } from '../model/Book';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';

/**
 * Fetches user's book data from the database and updates the state with the retrieved books.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {(books: Book[]) => void} setBooks - A callback function to update the state with the retrieved books.
 */
export function getUserData(userId: string, setBooks: (books: Book[]) => void) {
  const db = getDatabase();
  const booksRef = ref(db, `users/${userId}/books`);

  onValue(booksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setBooks(Object.values(data));
    }
  });
}

/**
 * Writes book data to the user's database node.
 *
 * @param {Book} book - The book data to be written to the database.
 * @param {string} userId - The unique identifier of the user.
 */
export async function writeUserData(book: Book, userId: string) {
  const db = getDatabase();
  const bookRef = ref(db, `users/${userId}/books/${book.id}`);

  try {
    await set(bookRef, { ...book });
    console.log('Book data written successfully');
  } catch (error) {
    console.error('Error writing book data:', error);
  }
}

/**
 * Deletes book data from the user's database node.
 *
 * @param {string} bookId - The unique identifier of the book to be deleted.
 * @param {string} userId - The unique identifier of the user.
 */
export async function deleteUserData(bookId: string, userId: string) {
  const db = getDatabase();
  const bookRef = ref(db, `users/${userId}/books/${bookId}`);

  try {
    await remove(bookRef);
    console.log('Book deleted successfully');
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}
