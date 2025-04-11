import { createContext } from "react";
import { listUBHistory } from '../lib/usershistory.appwrite';

export const UsersHistoryContext = createContext ({
    listUsersHistory: () => {},
});

export const UsersHistoryProvider = ({ children }) => {

    const listUsersHistory = async () => {
        const result = await listUBHistory();
        return result;
    };

    return (
        <UsersHistoryContext.Provider value={{ listUsersHistory }}>{children}</UsersHistoryContext.Provider>
    );
}