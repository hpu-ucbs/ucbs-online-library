import { useContext, useState } from 'react';
import { AuthUserContext } from '../../../context/authenticate-user.context';
import AuthUser from './auth-user.component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticateUsersList = () => {
    const { AuthUsers, DeleteAuthUser, AcceptAuthUser, refreshAuthUsers } = useContext(AuthUserContext);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAccept = async (Authuser) => {
        if (isProcessing) return;
        setIsProcessing(true);
        
        try {
            const result = await AcceptAuthUser(Authuser);
            
            if (result === "created") {
                await DeleteAuthUser(Authuser);
                await refreshAuthUsers()
                toast.success("User Accepted");
            } else if (result === "exists") {
                toast.error("User Already Exists");
            } else {
                toast.error("Error Occurred");
            }
        } catch (error) {
            toast.error("Operation Failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (Authuser) => {
        if (isProcessing) return;
        setIsProcessing(true);
        
        try {
            const result = await DeleteAuthUser(Authuser);
            
            if (result === "Deleted") {
                await refreshAuthUsers();
                toast.success("User Rejected");
            } else {
                toast.error("Error Occurred");
            }
        } catch (error) {
            toast.error("Operation Failed");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 py-4 px-8 bg-black dark:bg-gray-900">
                    <div className='flex gap-x-6'>
                        <div>
                            <select name="course" id="course" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="default">Choose Course</option>
                                <option value="BBA">BBA</option>
                                <option value="BCA">BCA</option>
                            </select>
                        </div>
                        <div>
                            <select name="course" id="course" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="default">Course Year</option>
                                <option value="firstYear">1st Year</option>
                                <option value="secondYear">2nd Year</option>
                                <option value="thirdYear">3rd Year</option>
                            </select>
                        </div>
                    </div>                    
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Detail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Registration No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DOB
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class Roll No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {AuthUsers && [...AuthUsers]
                            .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                            .map(user => (
                                <AuthUser 
                                    key={user.$id} 
                                    user={user} 
                                    handleAccept={handleAccept} 
                                    handleReject={handleReject}
                                    isProcessing={isProcessing}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AuthenticateUsersList;