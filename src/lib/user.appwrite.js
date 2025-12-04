import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '67fabdd40004716ba175';
const collection_id = '67fac077001d4315dfa3';

export const createUser = async (user) => {
    let { user_id, password, name, roll_no, course, year } = user;
    user_id = String(user_id ?? "").trim().slice(0, 20);
    roll_no = parseInt(roll_no);
    year = parseInt(year);
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
        }
    );
    return result;
}

export const listUsers = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.limit(15)]
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
    let { user_id, password, name, roll_no, course, year, fine, book, amount_paid, email } = user;
    user_id = parseInt(user_id);
    roll_no = parseInt(roll_no);
    year = parseInt(year);
    fine = parseInt(fine);
    const result = await databases.updateDocument(
        database_id,
        collection_id,
        user.$id,
        {
            password,
            user_id,
            name,
            roll_no,
            course,
            year,
            fine,
            amount_paid,
            email,
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