import { useState, useEffect } from "react";
import { listBooksHistory } from './../../../lib/bookshistory.appwrite';

const UserBooksHistory = () => {
    const [bookHistory, setBookHistory] = useState();

    useEffect(() => {
        listBooksHistory().then((data) => setBookHistory(data.documents));
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Books History</h2>
            <div className="flex justify-evenly items-center border border-gray-300 rounded-md w-3/4 m-auto mb-6 p-4 bg-gray-100 shadow-md">
                <p className="font-bold w-1/4 text-center">Book</p>
                <p className="font-bold w-1/4 text-center">Author</p>
                <p className="font-bold w-1/4 text-center">Stock</p>
                <p className="font-bold w-1/4 text-center">Date</p>
            </div>
            {bookHistory && bookHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item) => {
                return (
                    <div key={item.$id} className="flex justify-evenly items-center border border-gray-300 rounded-md w-3/4 m-auto mb-4 p-4 bg-white shadow-md transition-transform duration-200 transform hover:scale-105">
                        <p className="w-1/4 text-center">{item.added_book ? item.added_book.title.slice(0, 10) + (item.added_book.title.length > 10 ? '...' : '') : 'N/A'}</p>
                        <p className="w-1/4 text-center">{item.added_book ? item.added_book.author.slice(0, 10) + (item.added_book.author.length > 10 ? '...' : '') : 'N/A'}</p>
                        <p className="w-1/4 text-center">{item.added_book ? item.added_book.stock : 'N/A'}</p>
                        <p className="w-1/4 text-center">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default UserBooksHistory;