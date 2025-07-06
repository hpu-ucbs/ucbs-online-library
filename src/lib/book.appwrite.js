import { ID, Query } from "appwrite";
import { databases } from "./appwrite";
import { createBooksHistory } from './bookshistory.appwrite';

const database_id = '67fabdd40004716ba175';
const collection_id = '67fac22100268ffd9567';

export const createBook = async (book) => {
    let { s_no, book_no, image_URL, author, title, edition, year, pages, stock, course, description } = book;
    s_no = parseInt(s_no);
    book_no = parseInt(book_no);
    year = parseInt(year);
    pages = parseInt(pages);
    stock = parseInt(stock);
    let result = await databases.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        {
            s_no,
            book_no,
            image_URL,
            author,
            title,
            edition,
            year,
            pages,
            stock,
            course,
            description
        }
    );
    createBooksHistory(result.$id);
    return result;
}

export const listBooks = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [
            Query.limit(150)
        ]
    );
    return result;
}

export const deleteBook = async (DocID) => {
    const result = await databases.deleteDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}

export const updateBook = async (book) => {
    let { s_no, book_no, image_url, author, title, edition, year, pages, stock, course, description } = book;
    s_no = parseInt(s_no);
    book_no = parseInt(book_no);
    year = parseInt(year);
    pages = parseInt(pages);
    stock = parseInt(stock);
    const result = await databases.updateDocument(
        database_id,
        collection_id,
        book.$id,
        {
            s_no,
            book_no,
            image_url,
            author,
            title,
            edition,
            year,
            pages,
            stock,
            course,
            description
        }
    );
    return result;
}

export const getBook = async (DocID) => {
    const result = await databases.getDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}