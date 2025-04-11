import { useContext, useState } from 'react';
import { UsersContext } from '../../../context/users.context';
import User from '../user/user.component';


const AuthenticateUsersList = () => {
    const { Users } = useContext(UsersContext);
    const [userSearch, setuserSearch] = useState("");
    const [course, setcourse] = useState("");

    const handleChange = ({ target: { value } }) => setuserSearch(value);
    const handleCourse = ({target: {value}}) => setcourse(value);
    const filteredList = Users && Users.filter(user => user.name.toLowerCase().includes(userSearch.toLowerCase())).filter(user => user.course.toLowerCase().includes(course.toLowerCase()));
  return (
    
    <>
           
            {/* <div className="bg-[#F0F0F0] w-full rounded-b-2xl overflow-y-auto h-[40rem] py-5 px-5">
                {filteredList && filteredList.sort((a, b) => a.name.localeCompare(b.name)).map(user => <User key={user.user_id} user_item={user} />)}
            </div> */}

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 py-4 px-8 bg-black dark:bg-gray-900">
                    <div className='flex gap-x-6'>
                        <div>
                            <select name="course" id="course" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="defaukt">Choose Course</option>
                                <option value="BBA">BBA</option>
                                <option value="BCA">BCA</option>
                            </select>
                        </div>
                        <div>
                            <select name="course" id="course" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="defaukt">Course Year</option>
                                <option value="firstYear">1st Year</option>
                                <option value="secondYear">2nd Year</option>
                                <option value="thirdYear">3rd Year</option>
                            </select>
                        </div>
                    </div>                    
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                    </div>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User Detail
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Registration No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                DOB
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Class Roll No.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Course Year
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-[#f0f0f0] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-[#c8c8c8] dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className='w-12 h-12' src="https://img.icons8.com/?size=120&id=85147&format=png&color=000000" alt="User Avatar"/>
                                <div class="ps-3">
                                    <div class="text-base font-semibold">Neil Sims</div>
                                    <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>  
                            </th>
                            <td class="px-6 py-4">
                                477258369
                            </td>
                            <td class="px-6 py-4">
                                30/12/2003
                            </td>
                            <td class="px-6 py-4">
                                2600
                            </td>
                            <td class="px-6 py-4">
                                BCA
                            </td>
                            <td class="px-6 py-4">
                                3rd Year
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Approved
                                </div>
                            </td>
                            <td class="px-6 py-4 space-x-4">
                                <button class="bg-[#1b6c64] text-[#e0e1db] text-sm w-24 h-10 rounded-lg active:scale-95 transition ease-in-out duration-300 text-center">ACCEPT</button>
                                <button class="bg-red-600 text-[#e0e1db] text-sm w-24 h-10 rounded-lg active:scale-95 transition ease-in-out duration-300 text-center">REJECT</button>                               
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>

  )
}

export default AuthenticateUsersList;