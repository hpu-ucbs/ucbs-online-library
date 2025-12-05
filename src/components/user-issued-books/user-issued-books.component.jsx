import { useOutletContext } from "react-router-dom";
import ShowBook from "../Books/book-inventory/book-inventory.component";

const UserIssuedBooks = () => {

    const [curUser] = useOutletContext();
    return (
        <>

            {/* main body */}
            <main className="pb-4 px-4 h-full">
                <div className="mb-4 h-full">

                    <div>
                        <div className="py-4 sm:py-[2rem]">
                            <div className="px-0 sm:px-[2rem]">
                                <div className="mb-4">
                                    <div className="border border-red-200 bg-red-50 text-black rounded-md px-5 py-4 shadow-sm">
                                        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base">
                                            <li><span className="font-semibold">Two books</span> to BCA and BBA students will be issued for a period of 7 days.</li>
                                            <li><span className="font-semibold">Delay fine:</span> Books returned after the due date will incur a fine — first 7 days: 50 per day per volume; subsequent period: 100 per day per volume.</li>
                                            <li><span className="font-semibold">Damage / replacement:</span> Reader must replace or pay five times the current price for books mutilated or marked by them.</li>
                                            <li><span className="font-semibold">Recall:</span> Any book can be recalled by the librarian at any time.</li>
                                            <li><span className="font-semibold">Overdue restriction:</span> If a book becomes overdue, further books will not be issued until such books are returned.</li>
                                        </ol>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold">Issued Books.</h1>
                                </div>                  
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="px-0 sm:px-[2rem] md:px-0 lg:px-[2rem]">
                                                
                                <div className="my-4">
                                    <div className="w-full grid grid-cols-1 xxsm:grid-cols-2 justify-items-center content-center gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                                    {curUser.book ? curUser.book.map((book) => (
                                    <ShowBook key={book.s_no} book_item={book}></ShowBook>
                                    )) : <p>No books issued</p>}
                                    </div> 
                                </div>
            
                            </div>
                        </div>
                    </div>
                
                </div>

            </main>

        </>
    );
};

export default UserIssuedBooks;