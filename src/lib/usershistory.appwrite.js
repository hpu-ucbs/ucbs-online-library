import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '66431d5a00229c5bbd1f';
const collection_id = '66855041001f550300d9';

export const createUBHistory = async (userid, IB) => {
    const currentDate = new Date();
    const curDate = currentDate.toISOString();
    let result = await databases.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        {
            user: userid,
            issued_book: IB,
            issue_date: curDate,
        }
    );
    return result;
}   

export const listUBHistory = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.limit(5000)]
    );
    return result;
}

export const listUBHistory2 = async (id) => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.equal("user", [id]), Query.orderAsc("issue_date"), Query.limit(5000)]
    );
    return result;
}

export const updateUBHistory = async (id) => {
    const currentDate = new Date();
    const curDate = currentDate.toISOString();
    const result = await databases.updateDocument(
        database_id,
        collection_id,
        id,
        {
            return_date: curDate
        }
    );
    alert("User History updated successfully");
    return result;
}