import { useState } from "react";
const AuthUser = ({ user, handleAccept, handleReject, isProcessing }) => {
    const { user_id, password, name, roll_no, course, year, email } = user;
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <tr className="bg-[#f0f0f0] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-[#c8c8c8] dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input onChange={handleCheckboxChange} id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className='w-12 h-12' src="https://img.icons8.com/?size=120&id=85147&format=png&color=000000" alt="User Avatar"/>
                <div className="ps-3">
                    <div className="text-base font-semibold">{name}</div>
                    <div className="font-normal text-gray-500">{email}</div>
                </div>  
            </th>
            <td className="px-6 py-4">
                {user_id}
            </td>
            <td className="px-6 py-4">
                {password}
            </td>
            <td className="px-6 py-4">
                {roll_no}
            </td>
            <td className="px-6 py-4">
                {course}
            </td>
            <td className="px-6 py-4">
                {year}
            </td>
            <td className="px-6 py-4 space-x-4">
                <button
                onClick={() => handleAccept(user)}
                disabled={isProcessing}
                className={`bg-[#1b6c64] text-[#e0e1db] text-sm w-24 h-10 rounded-lg active:scale-95 transition ease-in-out duration-300 text-center ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}>ACCEPT</button>
                <button
                onClick={() => handleReject(user)}
                disabled={isProcessing}
                className={`bg-red-600 text-[#e0e1db] text-sm w-24 h-10 rounded-lg active:scale-95 transition ease-in-out duration-300 text-center ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}>REJECT</button>                               
            </td>
        </tr>
    );
}

export default AuthUser;