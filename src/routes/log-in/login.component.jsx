import { Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import { ReactComponent as UcbsLogo } from "../../assets/img/home/ucbs-logo.svg";
import { ReactComponent as LibLogo } from "../../assets/img/lib-logo.svg";

const LogIn = () => {

  const location = useLocation(); 
  const isActiveLink = (path) => location.pathname === path;
  
  return (
    <>

      <div>
        <Link to="/" className="ml-[4rem] mt-[4rem] flex items-center fixed space-x-3 rtl:space-x-reverse bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl py-1 px-4">
            <LibLogo className="h-11 w-11" alt="UCBS Library Management System Logo"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UCBS Library</span>
        </Link>

      <div className="font-[sans-serif] bg-[#0A433D] md:h-screen bg-no-repeat bg-center bg-cover bg-login-bg">

        <div className="grid md:grid-cols-2 items-center gap-8 h-full">

          <div className="max-md:order-1 p-4 mx-auto">   
            <Link to="/">     
              <UcbsLogo className="w-[14rem] h-auto md:w-[22rem] opacity-85"/>
              <p className="text-white font-extrabold text-3xl mt-8 text-center">WELCOME</p>
            </Link>
          </div>

          <div className="flex items-center md:p-8 p-6 bg-white h-full">

            <div className="max-w-lg w-full mx-auto">

              <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Log In</h3>
                <div className="text-3xl font-semibold mt-4">We're glad you're back!</div>
                <p className="text-gray-800 md:text-lg font-medium mt-2">University College Of Business Studies<br/>Library Management System</p>
              </div>

              <div>
                <ul className="w-full flex text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <li className="w-full">
                      <Link to={`/login/admin-login`} className={`flex justify-center  items-center p-2 text-black font-semibold rounded-lg ${isActiveLink('/login/admin-login') ? 'bg-[#0a433d] text-white' : 'text-black hover:bg-gray-300 dark:hover:bg-gray-700 group'}`} aria-current="page">Admin</Link>
                  </li>
                  <li className="w-full">
                      <Link to={`/login`} className={`flex justify-center items-center p-2 text-black font-semibold rounded-lg ${isActiveLink('/login') ? 'bg-[#0a433d] text-white' : 'text-black hover:bg-gray-300 dark:hover:bg-gray-700 group'}`}>Student</Link>
                  </li>
                </ul>
                
              </div>

              <Outlet/>

              <p className="text-sm font-light text-black dark:text-gray-400 mt-5 font-sans">
                  New User? Create account <Link to="/signup" className="font-semibold text-[#0a433d] hover:underline dark:text-primary-500 underline">Signup here</Link>
              </p>  
            
            </div> 

          </div>  
        
        </div>

      </div>

      </div>

      

    </>
  );
}

export default LogIn;