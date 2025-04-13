import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { listUBHistory2 } from "../../lib/usershistory.appwrite";
import UBHistory from "../History/user-book-history/user-book-history.component";

const UserNotifications = () => {
    const [userHistory, setUserHistory] = useState();
    const [curUser] = useOutletContext();
    useEffect(() => {
        curUser.$id && listUBHistory2(curUser.$id).then((data) => setUserHistory(data.documents));
    }, [curUser]);
    return(
        <>
            <main className="pb-4 px-4 h-full">

                <div className="mb-4 h-full">

                    <div>
                        <div className="py-4 sm:py-[2rem]">
                            <div className="px-0 sm:px-[2rem]">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold">Book Issued <br className="sm:hidden" /> & Returned History.</h1>
                                </div>                  
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:px-[2rem] md:px-0 lg:px-[2rem]">   
                        <div className="relative overflow-x-auto overflow-y-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-center font-bold">
                                    <td className="px-2 sm:px-6 py-4 border-gray-700 border">
                                        <p>Name</p>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 border-gray-700 border ">
                                        <p>Book</p>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 border-gray-700 border">
                                        <p>Issue Date</p>
                                    </td>
                                    <td className="px-2 sm:px-6 py-4 border-gray-700 border">
                                        <p>Return Date</p>
                                    </td>
                                </tr>  
                                </thead>
                                <tbody>
                                    {userHistory && userHistory.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date)).map((history) => <UBHistory key={history.$id} history={history} />)}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>

            </main>
        </>
    )
}

export default UserNotifications;