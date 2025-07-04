import { useContext, useState } from "react";
import { BooksContext } from "../../../context/books.context";
import Book from "../book/book.component";

import 'flowbite';

export let selectedBook = {}
const BooksList = () => {
  const { Books } = useContext(BooksContext);
  const [userSearch, setuserSearch] = useState("");
  const [course, setCourse] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");

  const handleChange = ({ target: { value } }) => setuserSearch(value);
  const handleCourse = ({ target: { value } }) => setCourse(value);
  const handleSort = ({ target: { value } }) => setSortOrder(value);

  let filteredList = Books ? [...Books] : [];
  if (userSearch) {
    filteredList = filteredList.filter(book => book.title.toLowerCase().includes(userSearch.toLowerCase()));
  }
  if (course !== "all") {
    filteredList = filteredList.filter(book => book.course && book.course.toLowerCase() === course);
  }
  if (sortOrder === "az") {
    filteredList = [...filteredList].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "za") {
    filteredList = [...filteredList].sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOrder === "newest") {
    filteredList = [...filteredList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === "oldest") {
    filteredList = [...filteredList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return (
    <>
      <div className="px-4">
        <div className="h-full">
          <div className="py-[2rem]">
            <div className="px-[2rem]">
              <div>
                <h1 className="text-4xl font-bold">Book inventory.</h1>
              </div>
            </div>
          </div>
          <div className="px-[2rem]">
            <div>
              <div className="grid grid-cols-2 py-10 bg-black rounded-t-2xl content-center justify-items-stretch items-center justify-between ">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative col-span-2 px-8 mb-8">
                  <div className="absolute inset-y-0 left-8 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" value={userSearch} onChange={handleChange} />
                </div>
                <div className="justify-self-center">
                  <div className="justify-self-end border-white rounded-xl flex flex-col sm:flex-row gap-y-2 sm:gap-0">
                    <label htmlFor="books">Select Course</label>
                    <select className="px-2 py-1 ml-2 font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white " name="books" id="books" value={course} onChange={handleCourse}>
                      <option value="all">All</option>
                      <option value="bca">BCA</option>
                      <option value="bba">BBA</option>
                    </select>
                  </div>
                </div>
                <div className="justify-self-center">
                  <div className="justify-self-end border-white rounded-xl flex flex-col sm:flex-row gap-y-2 sm:gap-0">
                    <label htmlFor="sort">Sort By</label>
                    <select className="px-2 py-1 ml-2 font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white" name="sort" id="sort" value={sortOrder} onChange={handleSort}>
                      <option value="az">A-Z</option>
                      <option value="za">Z-A</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[2rem] md:px-0 lg:px-[2rem]">
            <div>
              <div className="bg-[#F0F0F0] w-full grid grid-cols-1 gap-4 overflow-y-auto rounded-b-2xl p-5 h-[45rem]">
                {filteredList && filteredList.length > 0 ? (
                  filteredList.map(book => <Book key={book.$id} book_item={book} />)
                ) : (
                  <div className="col-span-full text-center text-gray-500">No books found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksList;