import {listAdmins} from "../lib/admin.appwrite";
import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext({
    admins: [],
})

export const AdminProvider = ({children}) => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        listAdmins().then(result => setAdmins(result.documents));
    }, [])

    const value = {admins};
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}