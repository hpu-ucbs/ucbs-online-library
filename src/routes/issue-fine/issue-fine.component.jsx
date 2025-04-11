import UserList from "../../components/Users/users-list/users-list.component";
import UpdateIssueFine from "../../components/Users/user-issue-fine/user-issue-fine.component";
const ManageIssueFine = () => {
    return(
        <>
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <UpdateIssueFine/>
                </div>
                <div>
                    <UserList/>
                </div>
            </div>
        </>
    )
}

export default ManageIssueFine;