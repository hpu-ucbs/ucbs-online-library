import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '66431d5a00229c5bbd1f';
const collection_id = '66431dad000f2a73cc5d';

export const createUser = async (user) => {
    let { user_id, password, name, roll_no, course, year, fine, issued_book } = user;
    user_id = parseInt(user_id);
    roll_no = parseInt(roll_no);
    year = parseInt(year);
    fine = parseInt(fine);
    let result = await databases.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        {
            user_id,
            password,
            name,
            roll_no,
            course,
            year,
            fine,
            issued_book
        }
    );
    return result;
}

export const listUsers = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.limit(5000)]
    );
    return result;
}

export const deleteUser = async (DocID) => {
    const result = await databases.deleteDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}

export const updateUser = async (user) => {
    let { user_id, password, name, roll_no, course, year, fine, book, amount_paid } = user;
    user_id = parseInt(user_id);
    roll_no = parseInt(roll_no);
    year = parseInt(year);
    fine = parseInt(fine);
    const result = await databases.updateDocument(
        database_id,
        collection_id,
        user.$id,
        {
            user_id,
            password,
            name,
            roll_no,
            course,
            year,
            fine,
            amount_paid,
            book,
        }
    );
    return result;
}

export const getUser = async (DocID) => {
    const result = await databases.getDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}