import { createContext, useState, useEffect, Children } from "react";

export const AuthentiateUserProvider = ({Children}) => {
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        listUsers().then(result => setUsers(result.documents));
    }, [])

    const value = {Users, setUsers};

    return <AuthentiateUserContext.Provider value={value}>{Children}</AuthentiateUserContext.Provider>
}