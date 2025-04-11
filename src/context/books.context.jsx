import { createContext, useState, useEffect } from "react";
import { listBooks, deleteBook, getBook, createBook, updateBook } from '../lib/book.appwrite';

export const BooksContext = createContext ({
    Books: null,
    setBooks: () => null,
    getThisBook: () => null,
    createThisBook: () => null,
    deleteThisBook: () => null,
    updateThisBook: () => null,
    clickedBook: {},
    setclickedBook: () => null,
})

const CreateBook = (book, Books) => {
  if (!book){
    return console.log("no book");
  }
  let exist = false;
  Books.map((curBook) => {
    if (curBook.title === book.title || parseInt(curBook.s_no) === book.s_no) {
      exist = true;
    }
    return [];
  });

  if (exist === true){
    return alert("book already exist");
  } else{
    try{
        createBook(book);
        alert("Book created successfully");
    } catch(error){
        console.log(error);
    }
  }
}

const DeleteBook = (book) => {
  deleteBook(book.$id);
  alert("Book deleted successfully");
}

const UpdateBook = (book) => {
  updateBook(book);
  alert("Book updated successfully");
}

const GetBook = (book, setclickedBook) => {
  const result = getBook(book.$id);
  result.then(result => setclickedBook(result));
}

export const BooksProvider = ({children}) => {
    const [Books, setBooks] = useState();
    const [clickedBook, setclickedBook] = useState({});
    useEffect(()=>{
      listBooks().then(result => setBooks(result.documents));
    }, []);

    const createThisBook = (book) => {
        CreateBook(book, Books);
    }

    const deleteThisBook = (book) => {
        DeleteBook(book);
    }
    const updateThisBook = (book) => {
        UpdateBook(book);
    }
    const getThisBook = (book) => {
        GetBook(book, setclickedBook);
    }

    const value = {Books, setBooks, getThisBook, createThisBook, deleteThisBook, updateThisBook, clickedBook, setclickedBook};

    return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}