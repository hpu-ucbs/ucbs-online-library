import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/users.context";
import { BooksContext } from "../../context/books.context";
import { createUBHistory, listUBHistory, updateUBHistory } from "../../lib/usershistory.appwrite";

const IssuedBooks = () => {
  const { updateThisUser, clickedUser, setclickedUser } = useContext(UsersContext);
  const { clickedBook, setclickedBook } = useContext(BooksContext);
  const [books, setBooks] = useState(clickedUser?.book || []);
  const [historyId, setHistoryId] = useState();

  useEffect(() => {
    if (historyId) {
      updateUBHistory(historyId);
      setHistoryId(null);
    }
  }, [historyId]);

  useEffect(() => {
    if (clickedUser?.book) {
      setBooks([...clickedUser.book]);
    }
  }, [clickedUser]);

  useEffect(() => {
    if (clickedBook && clickedUser?.book && clickedBook.s_no) {
      const existingBook = clickedUser.book.find((b) => b.s_no === clickedBook.s_no);
      if (!existingBook) {
        const updatedBooks = [...clickedUser.book, clickedBook];
        const updatedUser = { ...clickedUser, book: updatedBooks };
        updateThisUser(updatedUser);
        setclickedUser(updatedUser);
        clickedBook.$id && createUBHistory(clickedUser.$id, clickedBook.$id);
      }
    }
  }, [clickedBook, clickedUser, updateThisUser, setclickedUser]);

  const getHistoryId = async (user_rno, book_sno) => {
    try {
      const result = await listUBHistory();
      const history = result.documents.find((h) => h.user.roll_no === user_rno && h.issued_book.s_no === book_sno);
      setHistoryId(history ? history.$id : null);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleDelete = async (book) => {
    const updatedBooks = books.filter((b) => b.s_no !== book.s_no);
    setBooks(updatedBooks);
    const updatedUser = { ...clickedUser, book: updatedBooks };
    updateThisUser(updatedUser);
    setclickedUser(updatedUser);
    setclickedBook(null);
    await getHistoryId(clickedUser.roll_no, book.s_no);
  };

  return (
    <>
      <div className="flex flex-col mb-4 mt-8">
        <p className="text-4xl font-bold mb-4">Issued Books.</p>
        <ul className="text-lg list-inside list-decimal">
          {books && books.map((book) => (
            <li key={book.s_no}>
              {book.title}
              <button
                className="ml-10 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(book)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IssuedBooks;