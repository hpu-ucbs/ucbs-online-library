import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LibLogo } from "../../assets/img/lib-logo.svg";

const SignUp = () => {
  return (
    <>
     
      <section className="bg-home-bg bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/ " className="flex items-center gap-x-4 mb-8 text-3xl font-semibold text-white">
            <LibLogo classNameName="h-11 w-11" alt="UCBS Library Management System Logo"/>
             University College of Business Studies
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      E-Library Sign Up Form
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Full Name</label>
                          <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required=""/>
                      </div>
                      <div>
                          <label for="registrationId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter University Registration No.</label>
                          <input type="number" name="registrationId" id="registrationId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required=""/>
                      </div>
                      <div> 
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required=""/>
                      </div>
                      <div classNameName="flex justify-between items-center">
                        <div>
                            <label for="classNameRollNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter className Roll No.</label>
                            <input type="number" name="classNameRollNo" id="classNameRollNo" placeholder="••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div>
                          <label for="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course</label>
                          <select name="course" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                              <option value="defaukt">Choose Course</option>
                              <option value="BBA">BBA</option>
                              <option value="BCA">BCA</option>
                          </select>
                        </div>
                      </div>
                      <div>
                          <label for="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Date of Birth</label>
                          <input type="date" name="dob" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="terms" className="font-light text-black dark:text-gray-300">I accept the <Link className="font-semibold text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</Link></label>
                          </div>
                      </div>
                      <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                      <p className="text-sm font-light text-black dark:text-gray-400">
                          Already have an account? <Link to="/login" className="font-semibold text-[#0a433d] hover:underline dark:text-primary-500 underline">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
        </div>
      </section>

    </>

)}

export default SignUp;