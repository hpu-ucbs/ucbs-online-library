import { useContext, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { UsersContext } from "../../context/users.context";
import { BooksContext } from "../../context/books.context";
import { createUBHistory, listUBHistory, updateUBHistory } from "../../lib/usershistory.appwrite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IssuedBooks = () => {
  const { updateThisUser, clickedUser, setclickedUser, refreshUsers } = useContext(UsersContext);
  const { clickedBook, setclickedBook, assignBookToUser } = useContext(BooksContext);
  const [isProcessing, setisProcessing] = useState(false);
  const books = useMemo(() => clickedUser?.book || [], [clickedUser]);
  const isFirstRender = useRef(true);

  const handleAssignBook = useCallback(async (book) => {
    if (isProcessing) return;
    if (books.some(b => b.$id === book.$id)) {
      toast.warning("Book already assigned to this user");
      return;
    }
    try {
      setisProcessing(true);
      const result = await assignBookToUser(book.$id, clickedUser.$id);
      if (result === "assigned") {
        await createUBHistory(clickedUser.$id, book.$id);
        const updatedUser = structuredClone(clickedUser);
        updatedUser.book = [...books, book];
        setclickedUser(updatedUser);
        toast.success("Book assigned successfully");
        await refreshUsers();
        setclickedBook(null);
      } else {
        throw new Error("Assignment failed");
      }
    } catch (error) {
      toast.error("Failed to assign book");
      console.error("Assignment error:", error);
    } finally {
      setisProcessing(false);
    }
  }, [isProcessing, books, assignBookToUser, clickedUser, setclickedUser, refreshUsers, setclickedBook]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const userIsValid = clickedUser && Object.keys(clickedUser).length > 0;
    const bookIsValid = clickedBook && Object.keys(clickedBook).length > 0;

    if (userIsValid && bookIsValid) {
      handleAssignBook(clickedBook);
      setclickedBook(null);
    }
  }, [clickedBook, clickedUser, handleAssignBook, setclickedBook]);

  const getHistoryId = async (user_rno, book_sno) => {
    try {
      const result = await listUBHistory();
      const history = result.documents.find((h) => {
        return h.user.roll_no === user_rno && h.issued_book.s_no === book_sno;
      });
      
      if (history?.$id) {
        const hresult = await updateUBHistory(history.$id);
        return hresult ? "updated" : "error";
      }
      return "not_found";
    } catch (error) {
      console.error("Error fetching history:", error);
      return "error";
    }
  };

  const handleDelete = async (book) => {
    try {
      setisProcessing(true);
      const updatedBooks = books.filter((b) => b.s_no !== book.s_no);
      const updatedUser = { ...clickedUser, book: updatedBooks };
      
      const result = await updateThisUser(updatedUser);
      
      if (result === "updated") {
        const historyResult = await getHistoryId(clickedUser.roll_no, book.s_no);
        
        if (historyResult === "updated") {
          setclickedUser(updatedUser);
          toast.success("Book removed successfully");
        } else {
          throw new Error("History update failed");
        }
      } else {
        throw new Error("User update failed");
      }
    } catch (error) {
      toast.error("Error removing book");
      console.error("Deletion error:", error);
    } finally {
      setisProcessing(false);
      setclickedBook(null);
    }
  };

  return (
    <div className="flex flex-col mb-4 mt-8">
      {books.length === 0 ? (
        <p className="text-xl font-bold mb-4">No books issued</p>
      ) : (
        <>
        {isProcessing && (
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </div>
        )}
          <p className="text-lg font-semibold">Books issued:</p>
          <ul className="text-lg list-inside list-decimal">
            {books.map((book) => (
              <li key={book.$id} className="py-1">
                {book.title} by {book.author}
                <button
                  disabled={isProcessing}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(book)}
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default IssuedBooks;