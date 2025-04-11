import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const database_id = '66431d5a00229c5bbd1f';
const collection_id = '669e194d0003997a1c1d';

export const createUFHistory = async (userid, amount) => {
    const currentDate = new Date();
    const curDate = currentDate.toISOString();
    const amt = parseInt(amount);
    let result = await databases.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        {
            amount: amt,
            fine_alloted_on: curDate,
            user: userid
        }
    );
    return result;
}

export const listUFHistory = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.limit(5000)]
    );
    return result;
}

export const listUFHistory2 = async (id) => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
        [Query.equal("user", [id]), Query.orderAsc("fine_alloted_on"), Query.limit(5000)]
    );
    return result;
}


export const updateUFHistory = async (id) => {
    const currentDate = new Date();
    const curDate = currentDate.toISOString();
    const result = await databases.updateDocument(
        database_id,
        collection_id,
        id,
        {
            fine_paid_on: curDate
        }
    );
    console.log(result);
    return result;
}