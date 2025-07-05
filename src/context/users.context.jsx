import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { listUsers, deleteUser, getUser, createUser, updateUser } from '../lib/user.appwrite';

export const UsersContext = createContext({
    Users: null,
    setUsers: () => null,
    getThisUser: () => null,
    createThisUser: () => null,
    deleteThisUser: () => null,
    updateThisUser: () => null,
    clickedUser: {},
    setclickedUser: () => null,
    ibookclick: false,
    refreshUsers: () => null,
});

export const UsersProvider = ({ children }) => {
    const [Users, setUsers] = useState([]);
    const [clickedUser, setclickedUser] = useState({});
    const [ibookclick, setibookclick] = useState(false);
    const [loading, setLoading] = useState(false);
    const lastFetchTime = useRef(0);
    const CACHE_DURATION = 30000; // 30 seconds cache
    const isInitialized = useRef(false);
    
    const refreshUsers = useCallback(async (force = false) => {
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
            const result = await listUsers();
            setUsers(result.documents);
            lastFetchTime.current = now;
        } catch (error) {
            console.error("Failed to refresh users:", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    // Only fetch on mount, not on every refreshUsers change
    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            refreshUsers(true);
        }
    }, [refreshUsers]);

    const createThisUser = async (User) => {
        try {
            const currentUsers = await listUsers();
            const exists = currentUsers.documents.some(
                u => u.name === User.name || parseInt(u.user_id) === User.user_id
            );
            
            if (exists) return "exists";
            
            await createUser(User);
            await refreshUsers(true); // Force refresh after creation
            return "created";
        } catch (error) {
            console.error("Create user error:", error);
            return "error";
        }
    };

    const deleteThisUser = async (User) => {
        try {
            await deleteUser(User.$id);
            await refreshUsers(true); // Force refresh after deletion
            return "deleted";
        } catch (error) {
            console.error("Delete user error:", error);
            return "error";
        }
    };

    const updateThisUser = async (User) => {
        try {
            await updateUser(User);
            await refreshUsers(true); // Force refresh after update
            return "updated";
        } catch (error) {
            console.error("Update user error:", error);
            return "error";
        }
    };

    const getThisUser = useCallback((User) => {
        getUser(User.$id).then(result => setclickedUser(result));
    }, []);

    const value = {
        Users,
        setUsers,
        getThisUser,
        createThisUser,
        deleteThisUser,
        updateThisUser,
        clickedUser,
        setclickedUser,
        ibookclick,
        setibookclick,
        refreshUsers
    };

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};