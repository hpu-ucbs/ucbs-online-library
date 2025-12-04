import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '67fabdd40004716ba175';
const collection_id = '67fabe3400007379401a';

export const createAuthUser = async (authUser) => {
    let { user_id, password, name, roll_no, course, year, email } = authUser;
    user_id = String(user_id ?? "").trim().slice(0, 10);
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
            email
        }
    );
    return result;
}

export const deleteAuthUser = async (DocID) => {
    const result = await databases.deleteDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}

export const listAuthUser = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.limit(15)]
    );
    return result;
}

export const getAuthUser = async (DocID) => {
    const result = await databases.getDocument(
        database_id,
        collection_id,
        DocID,
    );
    return result;
}