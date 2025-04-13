import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { listBooks, deleteBook, getBook, createBook, updateBook } from '../lib/book.appwrite';
import { UsersContext } from "./users.context";
import { getUser, updateUser } from "../lib/user.appwrite";

export const BooksContext = createContext({
    Books: null,
    setBooks: () => null,
    getThisBook: () => null,
    createThisBook: () => null,
    deleteThisBook: () => null,
    updateThisBook: () => null,
    clickedBook: {},
    setclickedBook: () => null,
    refreshBooks: () => null,
    assignBookToUser: () => null,
});

export const BooksProvider = ({ children }) => {
    const [Books, setBooks] = useState([]);
    const [clickedBook, setclickedBook] = useState({});
    const { refreshUsers } = useContext(UsersContext);
    const refreshBooks = useCallback(async () => {
        try {
            const result = await listBooks();
            setBooks(result.documents);
        } catch (error) {
            console.error("Failed to refresh books:", error);
        }
    }, []);

    useEffect(() => {
        refreshBooks();
    }, [refreshBooks]);

    const createThisBook = async (book) => {
        try {
            const currentBooks = await listBooks();
            const exists = currentBooks.documents.some(
                b => b.title === book.title || parseInt(b.s_no) === book.s_no
            );
            
            if (exists) return "exists";
            
            await createBook(book);
            await refreshBooks();
            return "created";
        } catch (error) {
            console.error("Create book error:", error);
            return "error";
        }
    };

    const deleteThisBook = async (book) => {
        try {
            await deleteBook(book.$id);
            await refreshBooks();
            return "deleted";
        } catch (error) {
            console.error("Delete book error:", error);
            return "error";
        }
    };

    const updateThisBook = async (book) => {
        try {
            await updateBook(book);
            await refreshBooks();
            return "updated";
        } catch (error) {
            console.error("Update book error:", error);
            return "error";
        }
    };

    const getThisBook = async (book) => {
        try {
            const result = await getBook(book.$id);
            setclickedBook(result);
        } catch (error) {
            console.error("Get book error:", error);
        }
    };

    const assignBookToUser = async (bookId, userId) => {
        try {
          const book = await getBook(bookId);
          const user = await getUser(userId);
          
          if (!book || !user) {
            throw new Error("Book or User not found");
          }
          const updatedBooks = user.book ? [...user.book, book] : [book];
          const updatedUser = { ...user, book: updatedBooks };
          
          await updateUser(updatedUser);
          await refreshUsers();
          return "assigned";
        } catch (error) {
          console.error("Assignment error:", error);
          return "error";
        }
      };

    const value = {
        Books,
        setBooks,
        getThisBook,
        createThisBook,
        deleteThisBook,
        updateThisBook,
        clickedBook,
        setclickedBook,
        refreshBooks,
        assignBookToUser
    };

    return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};