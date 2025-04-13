import FormInput from '../../input-field/input-field.component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../../../context/users.context';
import { createUFHistory, updateUFHistory, listUFHistory } from '../../../lib/user-fine-history.appwrite';

const UpdateIssueFine = () => {
    const { updateThisUser, clickedUser, refreshUsers } = useContext(UsersContext);
    const [selectedUser, setselectedUser] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setselectedUser(clickedUser || {});
    }, [clickedUser]);

    const { user_id, fine, name, roll_no, course, year, amount_paid } = selectedUser;

    const updateMultipleDocuments = async (documents) => {
        try {
            const updatePromises = documents.map((doc) => 
                updateUFHistory(doc.$id, { fine_paid_on: new Date().toISOString() })
            );
            await Promise.all(updatePromises);
            return 'updated';
        } catch (error) {
            console.error("Error updating fine history:", error);
            return 'error';
        }
    };

    const getHistoryId = async (user_rno) => {
        try {
            const result = await listUFHistory();
            const unpaidHistory = result.documents.filter((h) => 
                h.user?.roll_no === user_rno && h.fine_paid_on === null
            );

            if (unpaidHistory.length > 0) {
                const hresult = await updateMultipleDocuments(unpaidHistory);
                if (hresult === 'updated') {
                    toast.success("Fine History Updated", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    return true;
                } else {
                    toast.error("Error updating fine history", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    return false;
                }
            } else {
                toast.info("No Unpaid Fine History Found", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return true;
            }
        } catch (error) {
            console.error("Error fetching fine history:", error);
            toast.error("Error fetching fine history", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isProcessing) return;
        
        setIsProcessing(true);

        try {
            if (JSON.stringify(selectedUser) === JSON.stringify(clickedUser)) {
                toast.info("No changes made", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return;
            }
            if (e.target.paid.checked) {
                const historyUpdated = await getHistoryId(clickedUser.roll_no);
                if (!historyUpdated) {
                    return;
                }
            }
            if (fine > clickedUser.fine) {
                const newFineAmount = fine - clickedUser.fine;
                await createUFHistory(clickedUser.$id, newFineAmount);
            }
            const updateResult = await updateThisUser(selectedUser);
            if (updateResult === "updated") {
                toast.success("Fine Status Updated", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                await refreshUsers();
                setselectedUser({});
                document.getElementById("paid").checked = false;
                document.getElementById("input_fine").value = 0;
            } else {
                throw new Error("Failed to update user");
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            toast.error("Error updating fine status", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFine = (e) => {
        const value = parseInt(e.target.value) || 0;
        const newFine = (clickedUser.fine || 0) + value;
        setselectedUser({...selectedUser, fine: newFine});
    };

    const handlePaid = (e) => {
        const isPaid = e.target.checked;
        const currentFine = selectedUser.fine || 0;
        
        setselectedUser(prev => ({
            ...prev,
            amount_paid: isPaid 
                ? (prev.amount_paid || 0) + currentFine 
                : (prev.amount_paid || 0) - currentFine,
            fine: isPaid ? 0 : currentFine
        }));
    };

    return (
        <div className="w-full flex flex-col px-14 py-8">
            <div className="text-3xl md:text-4xl font-bold mb-8">
                <h1 className="w-fit">Issue Fine</h1>
            </div>

            <div className="text-xl font-semibold">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-10">
                        <div className='flex flex-col gap-4'>
                            <FormInput
                                type="text" 
                                placeholder="User Name" 
                                label="Name *" 
                                name="name" 
                                value={name || ""}
                                readOnly 
                            />
                            <FormInput 
                                type="number" 
                                placeholder="Roll No" 
                                label="Roll Number *" 
                                name="roll_no" 
                                value={roll_no || ""} 
                                readOnly 
                            />
                            <div className="flex flex-col">
                                <label htmlFor="course">Course</label>
                                <select 
                                    className="h-10 mt-2 px-2 font-normal border border-black rounded-lg bg-[#F0F0F0]" 
                                    name="course" 
                                    id="course"
                                    disabled
                                    value={course?.toLowerCase() || ""}
                                >
                                    <option value="">Course</option>
                                    <option value="bca">BCA</option>
                                    <option value="bba">BBA</option>
                                </select>
                            </div>
                            <FormInput 
                                type="number" 
                                placeholder="Amount Paid" 
                                label="Amount Paid" 
                                name="amount_paid" 
                                value={amount_paid || ""}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <FormInput 
                                type="number" 
                                placeholder="User ID" 
                                label="User ID *" 
                                name="user_id" 
                                value={user_id || ""} 
                                readOnly 
                            />
                            <div className="flex flex-col">
                                <label htmlFor="year">Year</label>
                                <select 
                                    className="h-10 mt-2 px-2 font-normal border border-black rounded-lg bg-[#F0F0F0]" 
                                    name="year" 
                                    id="year"
                                    disabled 
                                    value={year || ""}
                                >
                                    <option value="">Year</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className='flex justify-between items-center gap-2'>
                                <FormInput 
                                    type="number" 
                                    placeholder="Current Fine"
                                    label="Current Fine" 
                                    name="current_fine" 
                                    value={selectedUser?.fine || 0} 
                                    readOnly
                                    className="flex-1"
                                />
                                <div className="flex items-center mt-6 gap-2">
                                    <input
                                        type="checkbox" 
                                        id="paid"
                                        name="paid"
                                        onChange={handlePaid}
                                        className="w-5 h-5"
                                    />
                                    <label htmlFor="paid">Paid</label>
                                </div>
                            </div>
                            <FormInput 
                                type="number" 
                                placeholder="Add Fine Amount"
                                label="Add Fine Amount"
                                id={"input_fine"}
                                name="fine" 
                                onChange={handleFine}
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="text-white flex justify-around">
                            <button 
                                className={`bg-blue-500 px-9 py-2 rounded-xl ${
                                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                type="submit"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Update"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateIssueFine;