import { Link, Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { UsersContext } from "../../context/users.context";
import { ReactComponent as UcbsLogo } from "../../assets/img/home/ucbs-logo.svg";
import { ReactComponent as UserAvatar } from "../../assets/img/user-dashboard/user-avatar.svg";
import { ReactComponent as IssuedBook } from "../../assets/img/user-dashboard/books-issued.svg";
import { ReactComponent as BookInventory } from "../../assets/img/user-dashboard/books-inventory.svg";
import { ReactComponent as PayFine } from "../../assets/img/user-dashboard/pay-fine.svg";
import { ReactComponent as LibLogo } from "../../assets/img/lib-logo.svg";

const UserNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [curUser, setCurUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { Users } = useContext(UsersContext);

  // Memoize user lookup to avoid recalculation on every render
  const user = useMemo(() => {
    const currentUserId = localStorage.getItem("currentuserCreds");
    if (!currentUserId || !Users) return null;
    
    return Users.find(user => user.user_id.toString() === currentUserId);
  }, [Users]);

  // Use context data directly instead of making another API call
  useEffect(() => {
    if (user) {
      setCurUser(user);
      setLoading(false);
      setError(null);
    } else if (Users && Users.length > 0) {
      // User not found in context
      setError("User not found. Please log in again.");
      setLoading(false);
    }
  }, [user, Users]);

  // Handle logout with proper cleanup
  const handleLogout = useCallback((e) => {
    e.preventDefault();
    localStorage.setItem("currentuser", "false");
    localStorage.removeItem("currentuserCreds");
    setCurUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  }, [navigate]);

  // Handle mobile navigation
  const handleMobileNavClick = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsDrawerOpen(false);
      window.scrollTo(0, 0);
    }
  }, []);

  // Handle dropdown toggle
  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("dropdown");
      const avatarBtn = document.getElementById("user-menu-button");
      
      if (
        dropdown &&
        avatarBtn &&
        !dropdown.contains(event.target) &&
        !avatarBtn.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Memoize active link check
  const isActiveLink = useCallback((path) => location.pathname === path, [location.pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show unauthorized state if no user
  if (!curUser) {
    return (
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">User not found. Please log in again.</p>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { name, course, year, user_id } = curUser;

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        {/* navbar */}
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            
            <div className="flex justify-start items-center">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-controls="drawer-navigation"
                aria-label="Toggle sidebar"
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
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <Link to={"/"} className="flex items-center justify-between space-x-2">
                <LibLogo className="w-8 h-8 rounded-full hidden lg:block"/>
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
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </button>

              {/* Notifications */}
              <Link 
                to="/user-dashboard/notifications"
                type="button"
                data-dropdown-toggle="notification-dropdown"
                className="p-2 mr-1 relative text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-label="View book history"
              >
                <span className="sr-only">View history</span>

                {/* ping */}
                <span className="w-2 h-2 bg-red-700 animate-ping-slow rounded-full absolute top-2 right-2"></span>

                {/* Bell icon */}
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

              {/* User Profile */}
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="User menu"
                onClick={handleDropdownToggle}
              >
                <span className="sr-only">Open user menu</span>
                <UcbsLogo className="w-8 h-8 rounded-full"/>
              </button> 

              {/* Dropdown menu */}
              <div 
                className={`${isDropdownOpen ? 'block' : 'hidden'} z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl absolute top-12 right-4`} 
                id="dropdown"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    User Name: <span className="font-semibold">{name}</span>
                  </span>
                  <span className="block text-sm text-gray-900 truncate dark:text-white">
                    User ID: <span className="font-semibold">{user_id}</span>
                  </span>
                </div>
              </div>

            </div>
            
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">

            <div className="space-y-2 pt-5 mt-2 border-gray-300">
              <div className="flex flex-col justify-center items-center gap-4 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <div className="w-24 h-24">
                  <UserAvatar className="rounded-full w-24 h-24"/>                                                  
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-lg font-medium text-gray-900">{name}</div>
                  <div className="text-base font-medium text-gray-500">User Id: <span className="text-gray-900">{user_id}</span></div>
                  <div className="text-base font-medium text-gray-500">Course: <span className="text-gray-900">{course}</span></div>
                  <div className="text-base font-medium text-gray-500">Year: <span className="text-gray-900">{year}</span></div>
                </div>                           
              </div>
            </div>
            
            <ul className="space-y-2 pt-5 mt-2 border-t border-gray-300">
              <li>                                                               
                <Link 
                  to="/user-dashboard" 
                  onClick={handleMobileNavClick} 
                  className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/user-dashboard') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}
                  aria-current={isActiveLink('/user-dashboard') ? 'page' : undefined}
                >
                  <IssuedBook className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Issued Books</span>
                </Link>
              </li>
              <li>      
                <Link 
                  to="/user-dashboard/book-inventory" 
                  onClick={handleMobileNavClick} 
                  className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/user-dashboard/book-inventory') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}
                  aria-current={isActiveLink('/user-dashboard/book-inventory') ? 'page' : undefined}
                >
                  <BookInventory className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ms-3 whitespace-nowrap">Book Inventory</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/user-dashboard/notifications" 
                  onClick={handleMobileNavClick} 
                  className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/user-dashboard/notifications') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}
                  aria-current={isActiveLink('/user-dashboard/notifications') ? 'page' : undefined}
                >
                  <PayFine className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>                    
                  <span className="flex-1 ms-3 whitespace-nowrap">Book History</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/user-dashboard/pay-fine" 
                  onClick={handleMobileNavClick} 
                  className={`flex items-center p-2 text-gray-900 rounded-lg ${isActiveLink('/user-dashboard/pay-fine') ? 'bg-gray-300' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`}
                  aria-current={isActiveLink('/user-dashboard/pay-fine') ? 'page' : undefined}
                >
                  <PayFine className="w-5 h-5 flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>                    
                  <span className="flex-1 ms-3 whitespace-nowrap">Pay Fine & History</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={"/login"} 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-300 dark:hover:bg-gray-700 group"
                >
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                  </svg>
                  <button onClick={handleLogout}>
                    <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
            <div className="bg-white rounded-lg border-2 shadow-lg dark:bg-gray-800">
              <div className="w-full mx-auto max-w-screen-xl p-2 md:flex items-center justify-center text-center md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  Made with ❤️ by Team <Link to="https://digitcrib.com/" className="hover:text-[#06FFFF] font-medium">DigitCrib™</Link><br/> All Rights Reserved.
                </span>
              </div>
            </div>
          </div>
        </aside>

      </div>
      
      <div className="md:ml-64 pt-20">
        <Outlet context={[curUser]}/>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
    </>
  );
};
  
export default UserNav;