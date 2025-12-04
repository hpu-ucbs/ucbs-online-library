import { createContext, useState, useEffect, useContext, useCallback, useRef } from "react";
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
    const [loading, setLoading] = useState(false);
    const lastFetchTime = useRef(0);
    const CACHE_DURATION = 30000; // 30 seconds cache
    const isInitialized = useRef(false);
    
    const { createThisUser } = useContext(UsersContext);

    const refreshAuthUsers = useCallback(async (force = false) => {
        const now = Date.now();
        
        // Prevent excessive API calls with caching
        if (!force && now - lastFetchTime.current < CACHE_DURATION) {
            return;
        }
        
        // Prevent concurrent requests
        if (loading) {
            return;
        }
        
        setLoading(true);
        try {
            const result = await listAuthUser();
            setAuthUsers(result.documents);
            lastFetchTime.current = now;
        } catch (error) {
            console.error("Failed to refresh auth users:", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    // Only fetch on mount, not on every refreshAuthUsers change
    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            refreshAuthUsers(true);
        }
    }, [refreshAuthUsers]);

    const CreateAuthUser = async (AuthUser) => {
        if (!AuthUser) return "NoUser";

        try {
             AuthUser.user_id = String(AuthUser.user_id).trim().slice(0, 10);
            // Check against fresh data from Appwrite
            const currentUsers = await listAuthUser();
            const exists = currentUsers.documents.some(
                curUser => String(curUser.user_id) === String(AuthUser.user_id)
            );

            if (exists) return "exists";

            // Create in Appwrite
            await createAuthUser(AuthUser);
            
            // Update local state with fresh data
            await refreshAuthUsers(true); // Force refresh
            
            return "added";
        } catch (error) {
            console.error("CreateAuthUser error:", error);
            return "error";
        }
    };

    const DeleteAuthUser = async (AuthUser) => {
        if (!AuthUser) return "NoUser";
 AuthUser.user_id = String(AuthUser.user_id).trim().slice(0, 10);
        try {
            // Check existence
            const currentUsers = await listAuthUser();
            const exists = currentUsers.documents.some(
                curUser => String(curUser.user_id) === String(AuthUser.user_id)
            );

            if (!exists) return "User Doesn't Exist";

            // Delete from Appwrite
            await deleteAuthUser(AuthUser.$id);
            
            // Update local state
            await refreshAuthUsers(true); // Force refresh
            
            return "Deleted";
        } catch (error) {
            console.error("DeleteAuthUser error:", error);
            return "error";
        }
    };

    const AcceptAuthUser = useCallback(async (AuthUser) => {
        if (!AuthUser) return "NoUser";
        return createThisUser(AuthUser);
    }, [createThisUser]);

    const value = {
        AuthUsers,
        setAuthUsers,
        CreateAuthUser,
        AcceptAuthUser,
        DeleteAuthUser,
        refreshAuthUsers
    };

    return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>;
};