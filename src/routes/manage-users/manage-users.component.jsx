import { useContext } from "react";
import { UsersContext } from "../../context/users.context";
import UserList from "../../components/Users/users-list/users-list.component";
import UpdateNewUser from "../../components/Users/user-update/update-user.component";
import BooksList from "../../components/Books/books-list/books-list.component";
const ManageUsers = () => {
    const { ibookclick } = useContext(UsersContext);
    return(
        <>
            {ibookclick ?
            <div>
                <div className="grid grid-cols-2 gap-0 w-full">
                    <div>
                        <UpdateNewUser/>
                    </div>
                    <div>
                       <BooksList/> 
                    </div>
                </div>
            </div>
             :
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
                    <div className="col-span-2">
                        <UpdateNewUser/>
                    </div>
                    <div>
                       <UserList/> 
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ManageUsers;