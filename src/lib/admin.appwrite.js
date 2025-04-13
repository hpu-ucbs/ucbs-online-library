import { databases } from "./appwrite";

const database_id = '67fabdd40004716ba175';
const collection_id = '67fac3db002695adc8d1';

export const listAdmins = async () => {
    const result = await databases.listDocuments(
        database_id,
        collection_id,
    );
    return result;
}