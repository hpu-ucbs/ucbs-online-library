import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/users.context";
import { BooksContext } from "../../context/books.context";
import { createUBHistory, listUBHistory, updateUBHistory } from "../../lib/usershistory.appwrite";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IssuedBooks = () => {
  const { updateThisUser, clickedUser, setclickedUser } = useContext(UsersContext);
  const { clickedBook, setclickedBook } = useContext(BooksContext);
  const [books, setBooks] = useState(clickedUser?.book || []);

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
        const result = updateThisUser(updatedUser);
        if (result === "updated") {
          toast.success("Book Issued Successfully",{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
          });
        } else {
          toast.error("Error issuing book",{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
          });
        }
        setclickedUser(updatedUser);
        clickedBook.$id && createUBHistory(clickedUser.$id, clickedBook.$id);
      } else {
        toast.error("Book already issued",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
        });
      }
      setclickedBook(null);
    }
  }, [clickedBook, clickedUser, updateThisUser, setclickedUser, setclickedBook]);

  const getHistoryId = async (user_rno, book_sno) => {
    try {
      const result = await listUBHistory();
      const history = result.documents.find((h) => {
        return h.user.roll_no === user_rno && h.issued_book.s_no === book_sno;
      });
      if (history.$id){
        const hresult = await updateUBHistory(history.$id);
        if (hresult){
          return "updated";
        } else {
          return "error";
        }
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleDelete = async (book) => {
    const updatedBooks = books.filter((b) => b.s_no !== book.s_no);
    const updatedUser = { ...clickedUser, book: updatedBooks };
    const result = updateThisUser(updatedUser);
    if (result === "updated") {
      const result = await getHistoryId(clickedUser.roll_no, book.s_no);
      if (result === "updated") {
        setBooks(updatedBooks);
        setclickedUser(updatedUser);
        toast.info("Book Deleted Successfully",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
        });
      } else {
        toast.error("Error deleting book",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
        });
      }
    } else {
      toast.error("Error updating user",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
    }
    setclickedBook(null);
  };

  return (
    <>
      <div className="flex flex-col mb-4 mt-8">
        {books.length === 0 ?
          <p className="text-xl font-bold mb-4">No books isuued</p> :
          <p className="text-lg font-semibold">books issued :</p>
        }
        <ul className="text-lg list-inside list-decimal">
          {books && books.map((book) => (
            <li key={book.s_no}>
              {book.title}
              <button
                className="ml-10 text-red-500 hover:text-red-700"
                onClick={() => handleDelete(book)}
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </>
  );
};

export default IssuedBooks;