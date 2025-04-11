import { databases } from "./appwrite";

const database_id = '66431d5a00229c5bbd1f';
const collection_id = '6695d2d50008da86f1e0';

export const listAdmins = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
    );
    return result;
}