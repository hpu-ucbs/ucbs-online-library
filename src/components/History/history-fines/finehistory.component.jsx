import { useState, useEffect } from "react";
import { listUFHistory } from '../../../lib/user-fine-history.appwrite';

const FineHistory = () => {
    const [usersHistory, setUsersHistory] = useState();

    useEffect(() => {
        listUFHistory().then((data) => setUsersHistory(data.documents));
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Fine History</h2>
            <div className="flex justify-evenly items-center border border-gray-300 rounded-md w-3/4 m-auto mb-6 p-4 bg-gray-100 shadow-md">
                <p className="font-bold w-1/4 text-center">User</p>
                <p className="font-bold w-1/4 text-center">Pending Fine</p>
                <p className="font-bold w-1/4 text-center">Fine Allotted On</p>
                <p className="font-bold w-1/4 text-center">Fine Paid On</p>
            </div>
            {usersHistory && usersHistory.sort((a, b) => new Date(b.fine_alloted_on) - new Date(a.fine_alloted_on)).map((item) => {
                return (
                    <div key={item.$id} className="flex justify-evenly items-center border border-gray-300 rounded-md w-3/4 m-auto mb-4 p-4 bg-white shadow-md transition-transform duration-200 transform hover:scale-105">
                        <p className="w-1/4 text-center">{item.user.name}</p>
                        <p className="w-1/4 text-center">{item.amount ? item.amount : 0}</p>
                        <p className="w-1/4 text-center">{new Date(item.fine_alloted_on).toLocaleDateString()}</p>
                        <p className="w-1/4 text-center">{item.fine_paid_on ? new Date(item.fine_paid_on).toLocaleDateString() : 'Not Paid'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default FineHistory;