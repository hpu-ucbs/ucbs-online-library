import { createContext, useState, useEffect, useCallback, useContext, useRef } from "react";
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
    const [loading, setLoading] = useState(false);
    const lastFetchTime = useRef(0);
    const CACHE_DURATION = 30000; // 30 seconds cache
    const isInitialized = useRef(false);
    
    const { refreshUsers } = useContext(UsersContext);
    
    const refreshBooks = useCallback(async (force = false) => {
        const now = Date.now();
        
        // Prevent excessive API calls with caching
        if (!force && now - lastFetchTime.current < CACHE_DURATION) {
            return;
        }
        
        // Prevent concurrent requests
        if (loading) {
            return;
        }
        
        setLoading(true);
        try {
            const result = await listBooks();
            setBooks(result.documents);
            lastFetchTime.current = now;
        } catch (error) {
            console.error("Failed to refresh books:", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    // Separate function for initial load to avoid dependency issues
    const loadInitialBooks = useCallback(async () => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            setLoading(true);
            try {
                const result = await listBooks();
                setBooks(result.documents);
                lastFetchTime.current = Date.now();
            } catch (error) {
                console.error("Failed to load initial books:", error);
            } finally {
                setLoading(false);
            }
        }
    }, []);

    // Only fetch on mount
    useEffect(() => {
        loadInitialBooks();
    }, [loadInitialBooks]);

    const createThisBook = async (book) => {
        try {
            const currentBooks = await listBooks();
            const exists = currentBooks.documents.some(
                b => b.title === book.title || parseInt(b.s_no) === book.s_no
            );
            
            if (exists) return "exists";
            
            await createBook(book);
            await refreshBooks(true); // Force refresh after creation
            return "created";
        } catch (error) {
            console.error("Create book error:", error);
            return "error";
        }
    };

    const deleteThisBook = async (book) => {
        try {
            await deleteBook(book.$id);
            await refreshBooks(true); // Force refresh after deletion
            return "deleted";
        } catch (error) {
            console.error("Delete book error:", error);
            return "error";
        }
    };

    const updateThisBook = async (book) => {
        try {
            await updateBook(book);
            await refreshBooks(true); // Force refresh after update
            return "updated";
        } catch (error) {
            console.error("Update book error:", error);
            return "error";
        }
    };

    const getThisBook = useCallback(async (book) => {
        try {
            const result = await getBook(book.$id);
            setclickedBook(result);
        } catch (error) {
            console.error("Get book error:", error);
        }
    }, []);

    const assignBookToUser = useCallback(async (bookId, userId) => {
        try {
          const book = await getBook(bookId);
          const user = await getUser(userId);
          
          if (!book || !user) {
            throw new Error("Book or User not found");
          }
          const updatedBooks = user.book ? [...user.book, book] : [book];
          const updatedUser = { ...user, book: updatedBooks };
          
          await updateUser(updatedUser);
          await refreshUsers(true); // Force refresh
          return "assigned";
        } catch (error) {
          console.error("Assignment error:", error);
          return "error";
        }
      }, [refreshUsers]);

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