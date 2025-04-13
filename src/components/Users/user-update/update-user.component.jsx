import { useState, useContext, useEffect } from 'react';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UsersContext } from '../../../context/users.context';
import FormInput from '../../input-field/input-field.component';
import IssuedBook from "../../issued-books/issued-books.component";

const UpdateNewUser = () => {
    const { updateThisUser, deleteThisUser, createThisUser, clickedUser, setibookclick, ibookclick, refreshUsers } = useContext(UsersContext);
    const [selectedUser, setselectedUser] = useState({});
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setselectedUser(clickedUser);
    }, [clickedUser]);

    const { user_id, password, name, roll_no, course, year } = selectedUser;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setselectedUser({ ...selectedUser, [name]: value });
    };

    const validateForm = (user) => {
        const newErrors = validateUser(user);
        return newErrors;
    };
    const validateUser = (user) => {
        const newErrors = {};
        if (!user.name || user.name.trim() === "") {
            newErrors.name = "Name is required";
        }

        if (!user.roll_no || user.roll_no < 1000 || user.roll_no > 9999) {
            newErrors.roll_no = "Roll No. must be between 1000 and 9999";
        }

        if (!user.user_id || user.user_id.toString().length !== 9) {
            newErrors.user_id = "User ID must be exactly 9 digits";
        }

        if (!user.password || user.password.length !== 10) {
            newErrors.password = "Pass must be exactly 10 characters";
        }

        if (!user.course || (user.course !== "BCA" && user.course !== "BBA")) {
            newErrors.course = "Course must be either BCA or BBA";
        }

        if (!user.year || (user.year !== "1" && user.year !== "2" && user.year !== "3" && user.year !== 1 && user.year !== 2 && user.year !== 3)) {
            newErrors.year = "Year must be 1, 2, or 3";
        }

        return newErrors;
    };

    const handleUserAction = async (e, actionType) => {
        e.preventDefault();
        const validationErrors = validateForm(selectedUser);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsProcessing(true);
        try {
            let result;
            if (actionType === 'update') {
                result = await updateThisUser(selectedUser);
            } else if (actionType === 'add') {
                result = await createThisUser(selectedUser);
            }

            if (result === "updated" || result === "created") {
                toast.success(`User ${actionType === 'update' ? 'Updated' : 'Created'}`);
                await refreshUsers();
            } else if (result === "exists") {
                toast.error("Account already exists");
            } else {
                toast.error("Error Occurred");
            }
        } catch (error) {
            toast.error("Operation failed");
        } finally {
            setIsProcessing(false);
            setselectedUser({});
            setErrors({});
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            await deleteThisUser(selectedUser);
            toast.info("User Deleted");
            await refreshUsers();
        } catch (error) {
            toast.error("Error Occurred");
        } finally {
            setselectedUser({});
            setIsProcessing(false);
            setErrors({});
        }
    };

    const handleBook = (e) => {
        e.preventDefault();
        setibookclick(true);
    };
    const handleBack = (e) => {
        e.preventDefault();
        setibookclick(false);
    }

    return (
        <>
            <div className="w-full flex flex-col px-14 py-8">
                <div className="text-3xl md:text-4xl font-bold mb-8">
                    <h1 className="w-fit">Manage User.</h1>
                </div>

                <div className="text-xl font-semibold">
                    <form>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Name Field */}
                            <FormInput
                                type="text"
                                placeholder="User Name"
                                onChange={handleChange}
                                label="Name"
                                name="name"
                                value={name || ""}
                                error={errors.name}
                            />

                            {/* Roll Number Field */}
                            <FormInput
                                type="number"
                                placeholder="Roll No"
                                onChange={handleChange}
                                label="Roll Number"
                                name="roll_no"
                                value={roll_no || ""}
                                error={errors.roll_no}
                            />

                            {/* Course Select Field */}
                            <div className={`flex flex-col relative ${errors.course ? 'mb-8' : 'mb-4'}`}>
                                <label htmlFor="course">Course</label>
                                <select
                                    className={`h-10 mt-2 px-2 text-base font-normal border rounded-lg bg-[#F0F0F0] ${
                                        errors.course ? 'border-red-500' : 'border-black'
                                    }`}
                                    name="course"
                                    id="course"
                                    value={course || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="BCA">BCA</option>
                                    <option value="BBA">BBA</option>
                                </select>
                                {errors.course && (
                                    <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10">
                                        <p className='pb-1'>{errors.course}</p>
                                        <div className="absolute left-2 bottom-[-5px] w-3 h-3 bg-red-500 rotate-45"></div>
                                    </div>
                                )}
                            </div>

                            {/* User ID Field */}
                            <FormInput
                                type="number"
                                placeholder="User ID"
                                onChange={handleChange}
                                label="User ID"
                                name="user_id"
                                value={user_id || ""}
                                error={errors.user_id}
                            />

                            {/* Password Field */}
                            <FormInput
                                type="text"
                                placeholder="Password"
                                onChange={handleChange}
                                label="Password"
                                name="password"
                                value={password || ""}
                                error={errors.password}
                            />

                            {/* Year Select Field */}
                            <div className={`flex flex-col relative ${errors.year ? 'mb-8' : 'mb-4'}`}>
                                <label htmlFor="year">Course Year</label>
                                <select
                                    className={`h-10 mt-2 px-2 text-base font-normal border rounded-lg bg-[#F0F0F0] ${
                                        errors.year ? 'border-red-500' : 'border-black'
                                    }`}
                                    name="year"
                                    id="year"
                                    value={year || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                {errors.year && (
                                    <div className="absolute -top-8 left-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg z-10">
                                        <p className='pb-1'>{errors.year}</p>
                                        <div className="absolute left-2 bottom-[-5px] w-3 h-3 bg-red-500 rotate-45"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <IssuedBook />
                        {!ibookclick && clickedUser.name && <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-base" onClick={handleBook}>Add Issued Books</button>}
                        {ibookclick && <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-base" onClick={handleBack}>Back</button>}
                    </form>
                </div>

                {isProcessing && (
                    <div className="flex items-center gap-2 mb-4 text-blue-600">
                        <svg
                        className="animate-spin h-5 w-5 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                        </svg>
                        Processing...
                    </div>
                    )}
                <div className="mt-6">
                    {ibookclick ? <div></div> :
                    <div className="text-white flex justify-around text-lg font-semibold">
                    <button disabled={isProcessing} className="bg-green-500 px-9 py-2 rounded-xl" onClick={(e) => handleUserAction(e, 'add')}>Create</button>
                    <button disabled={isProcessing} className="bg-blue-500 px-9 py-2 rounded-xl" onClick={(e) => handleUserAction(e, 'update')}>Update</button>
                    <button disabled={isProcessing} className="bg-red-500 px-9 py-2 rounded-xl" onClick={handleDelete}>Dalete</button>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default UpdateNewUser;