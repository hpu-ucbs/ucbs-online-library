import { useContext, useState, useMemo, useEffect } from "react";
import { BooksContext } from "../../../context/books.context";
import ShowBook from "../book-inventory/book-inventory.component";
import 'flowbite';

export let selectedBook = {};
const BOOKS_CACHE_KEY = 'userBooksListCache';
const PAGE_CACHE_KEY = 'userBooksListPage';
const ITEMS_PER_PAGE = 15;

const UserBooksList = () => {
  const { Books } = useContext(BooksContext);
  const [userSearch, setuserSearch] = useState("");
  const [course, setCourse] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);

  // Load cache on mount
  useEffect(() => {
    const cached = localStorage.getItem(BOOKS_CACHE_KEY);
    const cachedPage = localStorage.getItem(PAGE_CACHE_KEY);
    if (cached) {
      try {
        const { userSearch, course, sortOrder } = JSON.parse(cached);
        setuserSearch(userSearch || "");
        setCourse(course || "all");
        setSortOrder(sortOrder || "az");
      } catch {}
    }
    if (cachedPage) {
      setCurrentPage(Number(cachedPage));
    }
  }, []);

  // Memoize filtered and sorted list
  const filteredList = useMemo(() => {
    let list = Books ? [...Books] : [];
    if (userSearch) {
      list = list.filter(book => book.title.toLowerCase().includes(userSearch.toLowerCase()));
    }
    if (course !== "all") {
      list = list.filter(book => book.course && book.course.toLowerCase() === course);
    }
    if (sortOrder === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "za") {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "newest") {
      list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      list = [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return list;
  }, [Books, userSearch, course, sortOrder]);

  // Cache filter/sort/search state
  useEffect(() => {
    localStorage.setItem(BOOKS_CACHE_KEY, JSON.stringify({ userSearch, course, sortOrder }));
  }, [userSearch, course, sortOrder]);

  // Cache current page
  useEffect(() => {
    localStorage.setItem(PAGE_CACHE_KEY, String(currentPage));
  }, [currentPage]);

  // Pagination logic
  const totalBooks = filteredList.length;
  const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE) || 1;
  const paginatedBooks = filteredList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset to page 1 if filters change and current page is out of range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleChange = ({ target: { value } }) => setuserSearch(value);
  const handleCourse = ({ target: { value } }) => setCourse(value);
  const handleSort = ({ target: { value } }) => setSortOrder(value);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
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
                      <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" value={userSearch} onChange={handleChange} />
                    </div>
                    <div className="justify-self-start">
                      <div className="border-white rounded-xl flex flex-col sm:flex-row gap-y-2 sm:gap-0">
                        <label htmlFor="books">Select Course</label>
                        <select className="px-2 py-1 font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white " name="books" id="books" value={course} onChange={handleCourse}>
                          <option value="all">All</option>
                          <option value="bca">BCA</option>
                          <option value="bba">BBA</option>
                        </select>
                      </div>
                    </div>
                    <div className="justify-self-end">
                      <div className=" border-white rounded-xl flex flex-col sm:flex-row gap-y-2 sm:gap-0">
                        <label htmlFor="sort">Sort By</label>
                        <select className="px-2 py-1  font-normal border text-gray-500 border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 bg-white" name="sort" id="sort" value={sortOrder} onChange={handleSort}>
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
            </div>
          </div>
          <div>
            <div className="px-0 sm:px-[2rem] md:px-0 lg:px-[2rem]">
              <div className="my-4">
                <div className="w-full grid grid-cols-1 xxsm:grid-cols-2 justify-items-center content-center gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                  {paginatedBooks && paginatedBooks.length > 0 ? (
                    paginatedBooks.map(book => <ShowBook key={book.s_no} book_item={book} />)
                  ) : (
                    <div className="col-span-full text-center text-gray-500">No books found.</div>
                  )}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserBooksList;