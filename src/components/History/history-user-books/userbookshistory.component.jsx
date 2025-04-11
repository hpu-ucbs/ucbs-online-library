import { useState, useEffect } from "react";
import { listUBHistory } from './../../../lib/usershistory.appwrite';

const UserBooksHistory = () => {
    const [usersHistory, setUsersHistory] = useState();

    useEffect(() => {
        listUBHistory().then((data) => setUsersHistory(data.documents));
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Issued and Returned Books History</h2>
            <div className="flex justify-evenly items-center border border-gray-300 rounded-md w-3/4 m-auto mb-6 p-4 bg-gray-100 shadow-md">
                <p className="font-bold w-1/4 text-center">User</p>
                <p className="font-bold w-1/4 text-center">Issued Book</p>
                <p className="font-bold w-1/4 text-center">Issue Date</p>
                <p className="font-bold w-1/4 text-center">Return Date</p>
            </div>
            {usersHistory && usersHistory.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date)).map((item) => {
                return (
                    <div key={item.$id} className="flex justify-evenly items-center border border-gray-300 rounded-md w-3/4 m-auto mb-4 p-4 bg-white shadow-md transition-transform duration-200 transform hover:scale-105">
                        <p className="w-1/4 text-center">{item.user.name}</p>
                        <p className="w-1/4 text-center">{item.issued_book ? item.issued_book.title.slice(0, 10) + (item.issued_book.title.length > 10 ? '...' : '') : 'N/A'}</p>
                        <p className="w-1/4 text-center">{new Date(item.issue_date).toLocaleDateString()}</p>
                        <p className="w-1/4 text-center">{item.return_date ? (new Date(item.return_date).toLocaleDateString()) : 'Not returned'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default UserBooksHistory;