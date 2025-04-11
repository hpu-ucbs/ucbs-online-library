import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { listUFHistory2 } from "../../../lib/user-fine-history.appwrite"
import UFHistory from "../user-fine-history/user-fine-history.component";
const PayFine = () => {
    const [userHistory, setUserHistory] = useState();
    const [curUser] = useOutletContext();
    useEffect(() => {
        curUser.$id && listUFHistory2(curUser.$id).then((data) => setUserHistory(data.documents));
    }, [curUser]);
    const {amount_paid, fine} = curUser;
    return (
        <>
            <main className="pb-4 px-4 h-full">

                    <div className="mb-4 h-full">

                        <div>
                            <div className="py-[2rem]">
                                <div className="px-[2rem]">
                                    <div>
                                        <h1 className="text-4xl font-bold">Pay Fine.</h1>
                                    </div>                  
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="px-[2rem] md:px-0 lg:px-[2rem]">

                                <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center content-center gap-4">                        
                                    <div className="block w-full p-6 bg-blue-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-white">Total Fine</h5>
                                        <p className="font-extrabold py-6 text-center text-6xl text-black dark:text-gray-400"><span>&#8377; {amount_paid}</span></p>
                                    </div>
                                    <div className="block w-full p-6 bg-red-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-white">Pending Fine</h5>
                                        <p className="font-extrabold py-6 text-center text-6xl text-black dark:text-gray-400"><span>&#8377; {fine}</span></p>
                                    </div>                       
                                </div>  

                            </div>
                        </div>
                        

                        <div>
                            <div className="py-[3rem]">
                                <div className="px-[2rem]">
                                    <div className="px-6">
                                        <ul className="list-decimal">
                                            <li>Total Fine - <span className="font-semibold">Total fine paid till date.</span></li>
                                            <li className="mt-2">Pending Fine - <span className="font-semibold">In a library management system, the concept of a "pending fine" typically refers to the amount of money a library patron owes due to overdue, lost, or damaged books.</span></li>
                                        </ul>
                                    </div>                  
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="py-[2rem]">
                                <div className="px-[2rem]">
                                    <div>
                                        <h1 className="text-4xl font-bold">Fine History.</h1>
                                    </div>                  
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="w-full px-[2rem] md:px-0 lg:px-[2rem]">   
                            <div className="relative overflow-x-auto overflow-y-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-center">
                                            <th scope="col" className="px-6 py-3">
                                                Student Name
                                            </th>                                         
                                            <th scope="col" className="px-6 py-3">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Fine Alloted On
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Fine Paid On
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {userHistory ? 
                                        userHistory.map((history) => <UFHistory key={history.$id} history={history} />)
                                        : <tr><td>Loading...</td></tr>}                                    
                                    </tbody>
                                </table>
                            </div>
                            </div> 
                        </div>

                    </div>  

            </main>
        
        </>

    )
}

export default PayFine;