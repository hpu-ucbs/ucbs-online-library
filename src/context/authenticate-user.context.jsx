import { createContext, useState, useEffect, useContext } from "react";
import { UsersContext } from './users.context';
import { listAuthUser, createAuthUser, deleteAuthUser } from '../lib/autheticate-user.appwrite';

export const AuthUserContext = createContext ({
    AuthUsers: null,
    setAuthUsers: () => null,
    CreateAuthUser: () => null,
    AcceptAuthUser: () => null,
    DeleteAuthUser: () => null,
})

const AcceptThisAuthUser = (AuthUser, createThisUser) => {
    if (!AuthUser) {
        return "NoUser";
    }
    return createThisUser(AuthUser);
}

const DeleteThisAuthUser = (AuthUser, AuthUsers, deleteThisUser) => {
    if (!AuthUser) {
        return "NoUser";
    }
    let exist = false;
    AuthUsers && AuthUsers.map((curUser) => {
        if (curUser.user_id === parseInt(AuthUser.user_id)) {
            exist = true;
        }
        return [];
    });

    if (exist === true){
        const result = deleteThisUser(AuthUser.$id);
        if (result) {
            return "Deleted";
        } else{
            return "error";
        }
    } else{
        return "User Doesn't Exist";
    }
}
const CreateThisAuthUser = (AuthUser, Users, setAuthUsers) => {
    if (!AuthUser) {
        return "NoUser";
    }
    let exist = false;
    Users && Users.map((curUser) => {
        if (curUser.user_id === parseInt(AuthUser.user_id)) {
            exist = true;
        }
        return [];
    });

    if (exist === true){
        return "exists";
    } else{
        const result = createAuthUser(AuthUser);
        if (result) {
            setAuthUsers((prevUsers) => [...prevUsers, AuthUser]);
            return "added";
        } else{
            return "error";
        }
    }
}

export const AuthUserProvider = ({children}) => {
    const [AuthUsers, setAuthUsers] = useState([]);
    const { createThisUser } = useContext(UsersContext);

    useEffect(() => {
        listAuthUser().then(result => setAuthUsers(result.documents));
    }, [])

    const CreateAuthUser = (AuthUser) => {
        return CreateThisAuthUser(AuthUser, AuthUsers, setAuthUsers);
    }

    const DeleteAuthUser = (AuthUser) => {
        return DeleteThisAuthUser(AuthUser, AuthUsers, deleteAuthUser);
    }

    const AcceptAuthUser = (AuthUser) => {
        return AcceptThisAuthUser(AuthUser, createThisUser);
    }
    
    const value = {AuthUsers, setAuthUsers, CreateAuthUser, AcceptAuthUser, DeleteAuthUser};
    return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>
}