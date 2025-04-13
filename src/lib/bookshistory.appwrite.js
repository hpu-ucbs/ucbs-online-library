import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '67fabdd40004716ba175';
const collection_id = '67fac5ae000b39d44623';

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
        [Query.limit(15)]
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