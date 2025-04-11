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
  const filteredList = Books && Books.filter(book => book.title.toLowerCase().includes(userSearch.toLowerCase())).filter(book => book.course.toLowerCase().includes(course.toLowerCase()));

  return(
    <>

        <main className="pb-4 px-4 h-full">
              
            <div className="mb-4 h-full">

                <div>
                  <div className="py-[2rem]">
                      <div className="px-[2rem]">
                          <div>
                              <h1 className="text-4xl font-bold">Book inventory.</h1>
                          </div>                  
                      </div>
                  </div>
                </div>

                <div>
                  <div>
                      <div className="px-[2rem]">
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
                                      

                                      {/* <!-- Dropdown menu -->
                                      <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                            <label htmlFor="">Course:</label>
                                            <select className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                                    <option value="B">All</option>
                                                    <option value="bca">BCA</option>
                                                    <option value="bba">BBA</option>
                                            </select  >                     
                                      </div> */}

                                      <div className=" justify-self-end border-white rounded-xl">
                                            <label htmlFor="books">Select Course</label>
                                            <select className="px-2 py-1 ml-2 font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white " name="books" id="books" onChange={handleCourse}>
                                                <option value="B">All</option>
                                                <option value="bca">BCA</option>
                                                <option value="bba">BBA</option>
                                            </select>
                                        </div>
                                        
                                  </div>
                                  <div className="justify-self-end">
                                      <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">                                        
                                          <Sort className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"/>
                                          Sort
                                          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                          </svg>
                                      </button>

                                      {/* <!-- Dropdown menu --> */}
                                      <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{position: `absolute`, inset: `auto auto 0px 0px`, margin: `0px`, transform: `translate3d(522.5px, 3847.5px, 0px)`}}>
                                          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                              <li>
                                                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                      <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                      <label htmlFor="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">A-Z</label>
                                                  </div>
                                              </li>
                                              <li>
                                                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                      <input type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                      <label htmlFor="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Z-A</label>
                                                  </div>
                                              </li>
                                              <li>
                                                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                      <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                      <label htmlFor="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Newest</label>
                                                  </div>
                                              </li>
                                              <li>
                                                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                      <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                      <label htmlFor="filter-radio-example-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Oldest</label>
                                                  </div>
                                              </li>
                                          </ul>
                                      </div>
                                      
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>

                <div >

                  <div className="px-[2rem] md:px-0 lg:px-[2rem]">
                      <div className="my-4">
                          <div className="w-full grid grid-cols-1 justify-items-center content-center gap-x-4 gap-y-8 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
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