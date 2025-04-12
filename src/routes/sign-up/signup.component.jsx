import { useState, useContext } from "react";
import { Link } from "react-router-dom";

//toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormInput from "../../components/input-field/input-field.component";
import { ReactComponent as LibLogo } from "../../assets/img/lib-logo.svg";
import { AuthUserContext } from "../../context/authenticate-user.context";

const userCreds = {
  name: "",
  user_id: "",
  email: "",
  roll_no: "",
  course: "",
  password: "",
  year: 1,
}

const SignUp = () => {
  const { CreateAuthUser } = useContext(AuthUserContext);
  const [selectedUser, setselectedUser] = useState(userCreds);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setselectedUser({ ...selectedUser, [name]: value });
  };

  const validateForm = (user) => {
    const newErrors = {};
    if (!user.name || user.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!user.user_id || user.user_id.toString().length !== 9) {
      newErrors.user_id = "Registration ID must be exactly 9 digits";
    }

    if (!user.email || !user.email.includes("@")) {
      newErrors.email = "Email is required";
    }

    if (!user.roll_no || user.roll_no < 1000 || user.roll_no > 9999) {
      newErrors.roll_no = "Range is 1000 and 9999";
    }

    if (!user.course || (user.course !== "BCA" && user.course !== "BBA")) {
      newErrors.course = "Select BCA or BBA";
    }
    if (!user.password) {
      newErrors.password = "Date of Birth is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(selectedUser);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let result = CreateAuthUser(selectedUser);
      if (result === "exists") {
        toast.error("Account already exists", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      else if (result === "added") {
        toast.success("Account sent for approval",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
      else {
        toast.error(result, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  return (
    <>
      <section className="bg-home-bg bg-cover w-full h-screen bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/ " className="flex items-center gap-x-2 mb-8 text-2xl text-center md:text-3xl font-semibold text-white">
            <LibLogo className="w-20 h-20" alt="UCBS Library Management System Logo"/>
             University College of Business Studies
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      E-Library Sign Up Form
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <FormInput error={errors.name} onChange={handleChange} label={"Enter Full Name"} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required=""/>
                      </div>
                      <div>
                          <FormInput error={errors.user_id} onChange={handleChange} label={"Enter University Registration No."} type="number" name="user_id" id="user_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required=""/>
                      </div>
                      <div> 
                          <FormInput error={errors.email} onChange={handleChange} label={"Enter Email"} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required=""/>
                      </div>

                      <div className={`flex justify-between items-center ${errors.course || errors.roll_no ? 'mt-0' : 'mb-0'}`}>
                        <div>
                            <FormInput error={errors.roll_no} onChange={handleChange} label={"Enter Class Roll No."} type="number" name="roll_no" id="roll_no" placeholder="••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course</label>
                            <select
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[130px] sm:w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                errors.course ? 'border-red-500' : 'border-black'
                            }`}
                              onChange={handleChange}
                              name="course"
                              id="course"
                              required="">
                                <option value="default"  hidden selected disabled >Course</option>
                                <option value="BBA">BBA</option>
                                <option value="BCA">BCA</option>
                            </select>
                            {errors.course && (
                                <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10">
                                    <p className='pb-1'>{errors.course}</p>
                                    <div className="absolute left-2 bottom-[-5px] w-3 h-3 bg-red-500 rotate-45"></div>
                                </div>
                            )}
                        </div>
                        
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <FormInput error={errors.password} onChange={handleChange} label={"Enter Date of Birth"} type="date" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div>
                          <label htmlFor="courseYear" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course Year</label>
                              <select
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[130px] sm:w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                  errors.courseYear ? 'border-red-500' : 'border-black'
                              }`}
                                onChange={handleChange}
                                name="courseYear"
                                id="courseYear"
                                required="">
                                  <option value="default" hidden selected disabled >Course Year</option>
                                  <option value="firstYear">1st Year</option>
                                  <option value="secondYear">2nd Year</option>
                                  <option value="thirdYear">3rd Year</option>
                              </select>
                              {errors.courseYear && (
                                  <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10">
                                      <p className='pb-1'>{errors.courseYear}</p>
                                      <div className="absolute left-2 bottom-[-5px] w-3 h-3 bg-red-500 rotate-45"></div>
                                  </div>
                              )}
                        </div>
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center">
                            <FormInput id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-black dark:text-gray-300">I accept the <Link className="font-semibold text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</Link></label>
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
        <ToastContainer/>
      </section>

    </>

)}

export default SignUp;