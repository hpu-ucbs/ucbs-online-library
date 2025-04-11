import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ManageBookImg } from "../../../src/assets/img/admin-dashboard/manage-book.svg";
import { ReactComponent as ManageUserImg } from "../../../src/assets/img/admin-dashboard/manage-user.svg";
import { ReactComponent as HistoryImg } from "../../../src/assets/img/admin-dashboard/history.svg";
import { ReactComponent as IssueFineImg } from "../../../src/assets/img/admin-dashboard/issue-fine.svg";
import { ReactComponent as UcbsLogo } from "../../assets/img/home/ucbs-logo.svg";
import { ReactComponent as BookInventory } from "../../assets/img/user-dashboard/books-inventory.svg";
import { ReactComponent as About } from "../../assets/img/user-dashboard/about.svg";

const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem('currentadmin', 'false');
    navigate("/login");
  }

  const isActiveLink = (path) => location.pathname === path;
  return(
    <>  
      
      <div className="antialiased bg-gray-50 h-fit dark:bg-gray-900">

        {/* navbar */}
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                  <button
                    data-drawer-target="drawer-navigation"
                    data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="hidden w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Toggle sidebar</span>
                  </button>
                  <Link to={"/"} className="flex items-center justify-between mr-4">
                    <UcbsLogo className="w-8 h-8 rounded-full hidden lg:block"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">UCBS LMS</span>
                  </Link>
                </div>

                <div className="flex items-center lg:order-2">
                  <button
                    type="button"
                    data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="p-2 mr-1 hidden text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Toggle search</span>
                    {/* <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                    </svg> */}
                  </button>

                  {/* <!-- Notifications --> */}
                  <Link to="/admin-dashboard/history"
                      type="button"
                      data-dropdown-toggle="notification-dropdown"
                      className="p-2 mr-1 relative text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    >
                      <span className="sr-only">View history</span>

                      {/* <!-- ping --> */}
                      <span className="w-2 h-2 bg-red-700 animate-ping-slow rounded-full absolute top-2 right-2"></span>

                      {/* <!-- Bell icon --> */}
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                        ></path>
                      </svg>
                  </Link>                   
              
                  {/* <!-- Admin Profile --> */}
                  <button
                    type="button"
                    className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown"
                  >
                    <span className="sr-only">Open admin menu</span>
                    <UcbsLogo className="w-8 h-8 rounded-full"/>
                  </button>

                  {/* <!-- Dropdown menu --> */}
                  <div
                    className="hidden z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                    id="dropdown"
                  >
                    <div className="py-3 px-4">
                      <span
                        className="block text-sm font-semibold text-gray-900 dark:text-white">
                          Admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
        </nav>

        {/* <!-- Sidebar --> */}
        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            
            <ul className="space-y-2 pt-5 mt-2 border-gray-300">
              <li>                                                               
                <Link to="/admin-dashboard " className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/admin-dashboard') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}>
                  <ManageBookImg className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Manage Books</span>
                </Link>
              </li>
              <li>                                                               
                <Link to="/admin-dashboard/manage-users" className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/admin-dashboard/manage-users') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}>
                  <ManageUserImg className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Manage Users</span>
                </Link>
              </li>
              <li>      
                <Link to="/admin-dashboard/book-inventory" className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/admin-dashboard/book-inventory') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}>
                  <BookInventory className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Book Inventory</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/history" className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/admin-dashboard/history') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}>
                  <HistoryImg className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>                    
                  <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/issue-fine" className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/admin-dashboard/issue-fine') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}>
                  <IssueFineImg className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>                    
                  <span className="flex-1 ms-3 whitespace-nowrap">Issue Fine</span>
                </Link>
              </li>
              <li>
              <Link to={"/login"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-300 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <button onClick={handleLogout}><span className="flex-1 ms-3 whitespace-nowrap">Log out</span></button>
                </Link>
              </li>
                            
            </ul>

            <ul
              className="pt-2 mt-2 space-y-2 border-t border-gray-200 dark:border-gray-700"
            >
              <li>
                <Link to="/admin-dashboard/history" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group">       
                  <About className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">About</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
            <div className="bg-white rounded-lg border-2 shadow-lg dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-2 md:flex items-center justify-center text-center md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Made with ❤️ by Team <a href="https://digitcrib.com/" className="hover:text-[#06FFFF] font-medium">DigitCrib™</a><br/> All Rights Reserved.
                </span>
                </div>
            </div>
          </div>
        </aside>

        <div className="p-4 md:ml-64 h-auto pt-20 mt-16">
          <Outlet/>
        </div>
      </div>

        <script src="../node_modules/flowbite/dist/flowbite.min.js"></script>
    </>
  )
}

export default AdminNav;