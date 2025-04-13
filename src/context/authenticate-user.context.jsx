import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { UsersContext } from './users.context';
import { listAuthUser, createAuthUser, deleteAuthUser } from '../lib/autheticate-user.appwrite';

export const AuthUserContext = createContext({
    AuthUsers: null,
    setAuthUsers: () => null,
    CreateAuthUser: () => null,
    AcceptAuthUser: () => null,
    DeleteAuthUser: () => null,
    refreshAuthUsers: () => null,
});

export const AuthUserProvider = ({ children }) => {
    const [AuthUsers, setAuthUsers] = useState([]);
    const { createThisUser } = useContext(UsersContext);

    // Add refresh function
    const refreshAuthUsers = useCallback(async () => {
        try {
            const result = await listAuthUser();
            setAuthUsers(result.documents);
        } catch (error) {
            console.error("Failed to refresh auth users:", error);
        }
    }, []);

    // Load initial data
    useEffect(() => {
        refreshAuthUsers();
    }, [refreshAuthUsers]);

    const CreateAuthUser = async (AuthUser) => {
        if (!AuthUser) return "NoUser";

        try {
            // Check against fresh data from Appwrite
            const currentUsers = await listAuthUser();
            const exists = currentUsers.documents.some(
                curUser => curUser.user_id === parseInt(AuthUser.user_id)
            );

            if (exists) return "exists";

            // Create in Appwrite
            await createAuthUser(AuthUser);
            
            // Update local state with fresh data
            await refreshAuthUsers();
            
            return "added";
        } catch (error) {
            console.error("CreateAuthUser error:", error);
            return "error";
        }
    };

    const DeleteAuthUser = async (AuthUser) => {
        if (!AuthUser) return "NoUser";

        try {
            // Check existence
            const currentUsers = await listAuthUser();
            const exists = currentUsers.documents.some(
                curUser => curUser.user_id === parseInt(AuthUser.user_id)
            );

            if (!exists) return "User Doesn't Exist";

            // Delete from Appwrite
            await deleteAuthUser(AuthUser.$id);
            
            // Update local state
            await refreshAuthUsers();
            
            return "Deleted";
        } catch (error) {
            console.error("DeleteAuthUser error:", error);
            return "error";
        }
    };

    const AcceptAuthUser = async (AuthUser) => {
        if (!AuthUser) return "NoUser";
        return createThisUser(AuthUser);
    };

    const value = {
        AuthUsers,
        setAuthUsers,
        CreateAuthUser,
        AcceptAuthUser,
        DeleteAuthUser,
        refreshAuthUsers // Expose refresh function
    };

    return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>;
};