import { createContext, useState, useEffect, useCallback } from "react";
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
    
    const refreshUsers = useCallback(async () => {
        try {
            const result = await listUsers();
            setUsers(result.documents);
        } catch (error) {
            console.error("Failed to refresh users:", error);
        }
    }, []);

    useEffect(() => {
        refreshUsers();
    }, [refreshUsers]);

    const createThisUser = async (User) => {
        try {
            const currentUsers = await listUsers();
            const exists = currentUsers.documents.some(
                u => u.name === User.name || parseInt(u.user_id) === User.user_id
            );
            
            if (exists) return "exists";
            
            await createUser(User);
            await refreshUsers();
            return "created";
        } catch (error) {
            console.error("Create user error:", error);
            return "error";
        }
    };

    const deleteThisUser = async (User) => {
        try {
            await deleteUser(User.$id);
            await refreshUsers();
            return "deleted";
        } catch (error) {
            console.error("Delete user error:", error);
            return "error";
        }
    };

    const updateThisUser = async (User) => {
        try {
            await updateUser(User);
            await refreshUsers();
            return "updated";
        } catch (error) {
            console.error("Update user error:", error);
            return "error";
        }
    };

    const getThisUser = (User) => {
        getUser(User.$id).then(result => setclickedUser(result));
    };

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