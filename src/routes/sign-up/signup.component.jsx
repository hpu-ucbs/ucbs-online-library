import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";

//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormInput from "../../components/input-field/input-field.component";
import { ReactComponent as UcbsLogo } from "../../assets/img/home/ucbs-logo.svg";
import { AuthUserContext } from "../../context/authenticate-user.context";
import { ReactComponent as LibLogo } from "../../assets/img/lib-logo.svg";

const userCreds = {
  name: "",
  user_id: "",
  email: "",
  roll_no: "",
  course: "",
  password: "",
  year: "",
}

const SignUp = () => {
  const { CreateAuthUser } = useContext(AuthUserContext);
  const [selectedUser, setselectedUser] = useState(userCreds);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (!user.year || (user.year !== "1" && user.year !== "2" && user.year !== "3")) {
      newErrors.year = "Select Course Year";
    }

    if (!document.getElementById("terms").checked) {
      newErrors.terms = "You must accept the terms and conditions";
    }
  
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const newErrors = validateForm(selectedUser);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const result = await CreateAuthUser(selectedUser);
        if (result === "exists") {
          toast.error("Account already exists");
        } 
        else if (result === "added") {
          toast.success("Account sent for approval");
          setselectedUser({...userCreds});
          document.getElementById("terms").checked = false;
          setErrors({});
        }
        else {
          toast.error("Error Occurred");
        }
      } catch (error) {
        toast.error("Submission failed");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const dobDate = selectedUser.password
  ? parse(selectedUser.password, "dd/MM/yyyy", new Date())
  : null;

  return (
    <>
      <section className="bg-home-bg bg-cover w-full h-screen bg-center bg-no-repeat">
        <Link to="/" className="ml-[4rem] mt-[4rem] flex items-center fixed space-x-3 rtl:space-x-reverse bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl py-1 px-4">
            <LibLogo className="h-11 w-11" alt="UCBS Library Management System Logo"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UCBS Library</span>
        </Link>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">           
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <Link to="/" className="flex justify-start items-center gap-x-2">
                    <UcbsLogo className="w-8 h-8" alt="UCBS Library Management System Logo"/>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        UCBS E-Library Sign Up Form
                    </h1>
                  </Link>
                  <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit}>
                      <div>
                          <FormInput value={selectedUser.name || ""} error={errors.name} onChange={handleChange} label={"Enter Full Name"} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required=""/>
                      </div>
                      <div>
                          <FormInput value={selectedUser.user_id || ""} error={errors.user_id} onChange={handleChange} label={"Enter University Registration No."} type="number" name="user_id" id="user_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required=""/>
                      </div>
                      <div> 
                          <FormInput value={selectedUser.email || ""} error={errors.email} onChange={handleChange} label={"Enter Email"} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required=""/>
                      </div>

                      <div className={`flex justify-between items-center ${errors.course || errors.roll_no ? 'mt-0' : 'mb-0'}`}>
                        <div>
                            <FormInput value={selectedUser.roll_no || ""} error={errors.roll_no} onChange={handleChange} label={"Enter Class Roll No."} type="number" name="roll_no" id="roll_no" placeholder="••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course</label>
                            <select
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[130px] sm:w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                errors.course ? 'border-red-500' : 'border-black'
                            }`}
                              onChange={handleChange}
                              value={selectedUser.course || ""}
                              name="course"
                              id="course"
                              required="">
                                <option value=""  hidden defaultValue disabled >Course</option>
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
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Date of Birth</label>
                        <DatePicker
                            selected={dobDate}
                            onChange={(date) =>
                              handleChange({
                                target: {
                                  name: "password", // ideally rename this to "dob"
                                  value: format(date, "dd/MM/yyyy"),
                                },
                              })
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText="DD/MM/YYYY"
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                          )}
                          {/* <FormInput value={selectedUser.password || ""} error={errors.password} onChange={handleChange} label={"Enter Date of Birth"} type="date" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/> */}
                        </div>
                        <div>
                          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course Year</label>
                              <select
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[130px] sm:w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                  errors.year ? 'border-red-500' : 'border-black'
                              }`}
                                onChange={handleChange}
                                value={selectedUser.year || ""}
                                name="year"
                                id="year"
                                required="">
                                  <option value="" hidden defaultValue disabled >Course Year</option>
                                  <option value="1">1st Year</option>
                                  <option value="2">2nd Year</option>
                                  <option value="3">3rd Year</option>
                              </select>
                              {errors.year && (
                                  <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10">
                                      <p className='pb-1'>{errors.year}</p>
                                      <div className="absolute left-2 bottom-[-5px] w-3 h-3 bg-red-500 rotate-45"></div>
                                  </div>
                              )}
                        </div>
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center">
                            <FormInput id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                            {errors.terms && (
                              <p className="text-red-500 pb-1">{errors.terms}</p>
                            )}
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-black dark:text-gray-300">I accept the <Link to="/tas" className="font-semibold text-primary-600 hover:underline dark:text-primary-500 underline">Terms and Conditions</Link></label>
                          </div>
                      </div>
                      <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isSubmitting ? 'Processing...' : 'Create an account'}</button>
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