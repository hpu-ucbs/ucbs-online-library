import { useContext, useState } from "react";
import { BooksContext } from "../../../context/books.context";
import ShowBook from "../book-inventory/book-inventory.component";
import { ReactComponent as Sort } from "../../../assets/img/user-dashboard/sort.svg";
import 'flowbite';

export let selectedBook = {}
const UserBooksList = () => {
  const {Books} = useContext(BooksContext);
  const [userSearch, setuserSearch] = useState("");
  const [course, setcourse] = useState("");

  const handleChange = ({ target: { value } }) => setuserSearch(value);
  const handleCourse = ({target: {value}}) => setcourse(value);
  const filteredList = Books && Books.filter(book => book.title.toLowerCase().includes(userSearch.toLowerCase()));

  return(
    <>

        <main className="pb-4 px-4 h-full">
              
            <div className="mb-4 h-full">

                <div>
                  <div className="py-4 sm:py-[2rem]">
                      <div className="px-0 sm:px-[2rem]">
                          <div>
                              <h1 className=" text-3xl sm:text-4xl font-bold">Book Inventory.</h1>
                          </div>                  
                      </div>
                  </div>
                </div>

                <div>
                  <div>
                      <div className="px-0 sm:px-[2rem]">
                          <div>
                              <div className="grid grid-cols-2 content-center justify-items-stretch space-y-4 items-center justify-between pb-4">                            
                                  <label htmlFor="table-search" className="sr-only">Search</label>
                                  <div className="relative col-span-2">
                                      <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                      </div>
                                      <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" onChange={handleChange}/>
                                  </div>

                                  <div className="justify-self-start">
                                    <div className="border-white rounded-xl flex flex-col sm:flex-row gap-y-2 sm:gap-0">
                                        <label htmlFor="books">Select Course</label>
                                        <select className="px-2 py-1 font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white " name="books" id="books" onChange={handleCourse}>
                                            <option value="default" disabled selected hidden>All</option>
                                            <option value="bca">BCA</option>
                                            <option value="bba">BBA</option>
                                        </select>
                                    </div>                                       
                                  </div>

                                  <div className="justify-self-end">
                                    <div className=" border-white rounded-xl flex flex-col sm:flex-row gap-y-2 sm:gap-0">
                                        <label htmlFor="sort">Sort By</label>
                                        <select className="px-2 py-1  font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white" name="sort" id="sort" onChange={handleCourse}>
                                            <option value="default" disabled selected hidden>Sort</option>
                                            <option value="bca">A-Z</option>
                                            <option value="bba">Z-A</option>
                                            <option value="default">Newest</option>
                                            <option value="default">Oldest</option>
                                        </select>
                                    </div> 
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>

                <div >

                  <div className="px-0 sm:px-[2rem] md:px-0 lg:px-[2rem]">
                      <div className="my-4">
                          <div className="w-full grid grid-cols-1 xxsm:grid-cols-2 justify-items-center content-center gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                                {filteredList && filteredList.sort((a, b) => a.title.localeCompare(b.title)).map(book => <ShowBook key={book.s_no} book_item={book} />)}
                          </div>
                      </div>
                  </div>

                </div>
              
            </div>

        </main> 

    </>
  )
}

export default UserBooksList;