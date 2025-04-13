import FormInput from '../../input-field/input-field.component';
import { useState, useContext, useEffect } from 'react';
import { BooksContext } from '../../../context/books.context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBookComponent = () => {
    const {
        updateThisBook,
        deleteThisBook,
        createThisBook,
        clickedBook,
        refreshBooks
    } = useContext(BooksContext);
    
    const [selectedBook, setselectedBook] = useState({});
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        clickedBook && setselectedBook(clickedBook);
    }, [clickedBook]);
    
    const { s_no, book_no, edition, year, pages, title, description, author, stock, course, image_url } = selectedBook;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setselectedBook({...selectedBook, [name]: value});
    };

    const validateForm = (book) => {
        const newErrors = validateBook(book);
        return newErrors;
    };

    const validateBook = (book) => {
        const newErrors = {};

        if (!book.s_no) {
            newErrors.s_no = "Serial No. is required";
        }

        if (book.s_no && (book.s_no < 0 || book.s_no > 10000)) {
            newErrors.s_no = "Serial No. must be between 0 and 10000";
        }

        if (book.book_no && book.book_no < 1) {
            newErrors.book_no = "Book No. must be greater than 1";
        }

        if (!book.author || book.author.trim() === "") {
            newErrors.author = "Author Name is required";
        }

        if (book.author && book.author.length > 30) {
            newErrors.author = "Author Name must be at most 30 chars";
        }

        if (!book.title || book.title.trim() === "") {
            newErrors.title = "Title is required";
        }

        if (book.title && book.title.length > 100) {
            newErrors.title = "Title must be at most 100 chars";
        }

        if (book.edition && book.edition.length > 100) {
            newErrors.edition = "Enter Valid Edition";
        }

        if (book.year && (book.year > 2025 || book.year < 1000)) {
            newErrors.year = "Enter a valid year";
        }

        if (book.pages && (book.pages > 5000 || book.pages < 1)) {
            newErrors.pages = "Enter a valid number of pages";
        }

        if (book.stock && (book.stock > 50 || book.stock < 1)) {
            newErrors.stock = "Enter a valid number of stock";
        }

        if (book.description && book.description.length > 100) {
            newErrors.description = "Description must be smaller than 2000 chars";
        }

        return newErrors;
    };

    const handleBookAction = async (e, actionType) => {
        e.preventDefault();
        if (isProcessing) return;
        
        const validationErrors = validateForm(selectedBook);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsProcessing(true);
        
        try {
            let result;
            if (actionType === 'update') {
                result = await updateThisBook(selectedBook);
            } else if (actionType === 'add') {
                result = await createThisBook(selectedBook);
            }

            if (result === "updated" || result === "created") {
                toast.success(`Book ${actionType === 'update' ? 'Updated' : 'Created'} Successfully`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                await refreshBooks();
                if (actionType === 'add') {
                    setselectedBook({}); // Clear form after creation
                }
            } else if (result === "exists") {
                toast.error("Book already exists", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                toast.error(`Error ${actionType === 'update' ? 'Updating' : 'Creating'} Book`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error("Operation Failed", {
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

    const handleDelete = async (e) => {
        e.preventDefault();
        if (isProcessing) return;
        
        setIsProcessing(true);
        
        try {
            const result = await deleteThisBook(selectedBook);
            if (result === "deleted") {
                toast.success("Book Deleted Successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                await refreshBooks();
                setselectedBook({}); // Clear form after deletion
            } else {
                toast.error("Error Deleting Book", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error("Operation Failed", {
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

    return (
        <div className="w-full flex px-14 py-8 flex-col">
            <div className="text-3xl md:text-4xl font-bold mb-8">
                <h1 className="w-fit">Manage Book</h1>
            </div>
            <div className="text-xl font-semibold">
                <form className="flex flex-col gap-4" id='book_form'>
                    <div className="grid grid-cols-2 gap-10">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            <FormInput 
                                type="text" 
                                placeholder="image_url" 
                                onChange={handleChange} 
                                label="Book Image URL" 
                                name="image_url" 
                                value={image_url || ''}
                            />

                            <FormInput 
                                type="text" 
                                placeholder="author" 
                                onChange={handleChange} 
                                label="Book Author *" 
                                name="author" 
                                value={author || ''}
                                error={errors.author}
                            />

                            <FormInput 
                                type="number" 
                                placeholder="book No." 
                                onChange={handleChange} 
                                label="Book No." 
                                name="book_no" 
                                value={book_no || ''} 
                                error={errors.book_no}
                            />

                            <FormInput 
                                type="number" 
                                placeholder="Year" 
                                onChange={handleChange} 
                                label="Book Year" 
                                name="year" 
                                value={year || ''} 
                                error={errors.year}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4">
                            <FormInput 
                                type="number" 
                                placeholder="s_no" 
                                onChange={handleChange} 
                                label="Serial Number *" 
                                name="s_no" 
                                value={s_no || ''} 
                                error={errors.s_no}
                            />

                            <FormInput 
                                type="text" 
                                placeholder="name" 
                                onChange={handleChange} 
                                label="Book Name *" 
                                name="title" 
                                value={title || ''} 
                                error={errors.title}
                            />

                            <FormInput 
                                type="text" 
                                placeholder="Edition" 
                                onChange={handleChange} 
                                label="Book Edition" 
                                name="edition" 
                                value={edition || ''} 
                                error={errors.edition}
                            />

                            <FormInput 
                                type="number" 
                                placeholder="Pages" 
                                onChange={handleChange} 
                                label="No. of pages" 
                                name="pages" 
                                value={pages || ''} 
                                error={errors.pages}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="course">Course</label>
                        <select 
                            className="h-10 mt-2 px-2 font-normal border border-black rounded-lg bg-[#F0F0F0]" 
                            name="course" 
                            id="course" 
                            value={course || 'b'}
                            onChange={handleChange}
                        >
                            <option value="b">All</option>
                            <option value="bca">BCA</option>
                            <option value="bba">BBA</option>
                        </select>
                    </div>

                    <FormInput 
                        type="number" 
                        placeholder="number of copies"
                        onChange={handleChange} 
                        label="number of copies *" 
                        name="stock" 
                        value={stock || ''} 
                        error={errors.stock}
                    />

                    <div className="flex flex-col">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            className="mt-2 px-2 w-full h-[14vh] font-normal placeholder:font-normal placeholder:text-gray-500 border border-black rounded-lg bg-[#F0F0F0]" 
                            name="description" 
                            id="description"
                            placeholder="description" 
                            onChange={handleChange} 
                            value={description || ''}
                        />
                    </div>
                </form>
            </div>

            <div className="mt-6">
                <div className="text-white flex justify-around">
                    <button 
                        className={`bg-green-500 px-9 py-2 rounded-xl ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        type="submit" 
                        onClick={(e) => handleBookAction(e, 'add')}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Add'}
                    </button>
                    <button 
                        className={`bg-blue-500 px-9 py-2 rounded-xl ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        type="submit" 
                        onClick={(e) => handleBookAction(e, 'update')}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Update'}
                    </button>
                    <button 
                        className={`bg-red-500 px-9 py-2 rounded-xl ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        type="button" 
                        onClick={handleDelete}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Delete'}
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default UpdateBookComponent;