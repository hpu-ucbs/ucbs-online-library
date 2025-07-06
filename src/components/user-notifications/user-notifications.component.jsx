import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { listUBHistory2 } from "../../lib/usershistory.appwrite";
import UBHistory from "../History/user-book-history/user-book-history.component";

const UserNotifications = () => {
    const [userHistory, setUserHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [curUser] = useOutletContext();

    useEffect(() => {
        const fetchUserHistory = async () => {
            if (!curUser?.$id) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const data = await listUBHistory2(curUser.$id);
                setUserHistory(data.documents || []);
            } catch (err) {
                console.error('Error fetching user history:', err);
                setError('Failed to load book history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserHistory();
    }, [curUser?.$id]); // Only depend on curUser.$id, not the entire curUser object

    // Memoize sorted history to avoid re-sorting on every render
    const sortedUserHistory = useMemo(() => {
        return userHistory.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date));
    }, [userHistory]);

    const handleRetry = () => {
        if (curUser?.$id) {
            setLoading(true);
            setError(null);
            
            listUBHistory2(curUser.$id)
                .then((data) => {
                    setUserHistory(data.documents || []);
                })
                .catch((err) => {
                    console.error('Error fetching user history:', err);
                    setError('Failed to load book history. Please try again later.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    if (loading) {
        return (
            <main className="pb-4 px-4 h-full">
                <div className="mb-4 h-full">
                    <div className="py-4 sm:py-[2rem]">
                        <div className="px-0 sm:px-[2rem]">
                            <h1 className="text-3xl sm:text-4xl font-bold">Book Issued <br className="sm:hidden" /> & Returned History.</h1>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="pb-4 px-4 h-full">
                <div className="mb-4 h-full">
                    <div className="py-4 sm:py-[2rem]">
                        <div className="px-0 sm:px-[2rem]">
                            <h1 className="text-3xl sm:text-4xl font-bold">Book Issued <br className="sm:hidden" /> & Returned History.</h1>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={handleRetry} 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

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
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" aria-label="User book history">
                                <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="text-center font-bold">
                                    <th className="px-2 sm:px-6 py-4 border-gray-700 border">
                                        <p>Name</p>
                                    </th>
                                    <th className="px-2 sm:px-6 py-4 border-gray-700 border ">
                                        <p>Book</p>
                                    </th>
                                    <th className="px-2 sm:px-6 py-4 border-gray-700 border">
                                        <p>Issue Date</p>
                                    </th>
                                    <th className="px-2 sm:px-6 py-4 border-gray-700 border">
                                        <p>Return Date</p>
                                    </th>
                                </tr>  
                                </thead>
                                <tbody>
                                    {sortedUserHistory.length > 0 ? (
                                        sortedUserHistory.map((history) => {
                                            return(
                                            <UBHistory key={history.$id} history={history} />
                                        )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                No book history found.
                                            </td>
                                        </tr>
                                    )}
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