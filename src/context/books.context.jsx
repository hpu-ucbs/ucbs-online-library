import { createContext, useState, useEffect, useCallback } from "react";
import { listBooks, deleteBook, getBook, createBook, updateBook } from '../lib/book.appwrite';

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
});

export const BooksProvider = ({ children }) => {
    const [Books, setBooks] = useState([]);
    const [clickedBook, setclickedBook] = useState({});

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

    const value = {
        Books,
        setBooks,
        getThisBook,
        createThisBook,
        deleteThisBook,
        updateThisBook,
        clickedBook,
        setclickedBook,
        refreshBooks
    };

    return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};