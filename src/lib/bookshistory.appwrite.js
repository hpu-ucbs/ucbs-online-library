import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '66431d5a00229c5bbd1f';
const collection_id = '66855032002ff367fbf7';

export const createBooksHistory = async (bookid) => {
    const currentDate = new Date();
    const curDate = currentDate.toISOString();
    if(bookid) {
        let result = await databases.createDocument(
            database_id,
            collection_id,
            ID.unique(),
            {
                added_book: bookid,
                date: curDate
            }
        );
        return result;
    }
}

export const listBooksHistory = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.limit(5000)]
    );
    return result;
}

export const deleteBooksHistory = async (DocID) => {
    const result = await databases.deleteDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}

export const getBooksHistory = async (DocID) => {
    const result = await databases.getDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}