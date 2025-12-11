import { useOutletContext } from "react-router-dom";
import ShowBook from "../Books/book-inventory/book-inventory.component";

const UserIssuedBooks = () => {

    const [curUser] = useOutletContext();

    return (
        <>
            {/* Animation CSS inside component */}
            <style>
                {`
                @keyframes scroll-left {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                `}
            </style>

            {/* main body */}
            <main className="pb-4 px-4 h-full">
                <div className="mb-4 h-full">

                    <div>
                        <div className="py-4 sm:py-[2rem]">
                            <div className="px-0 sm:px-[2rem]">

                                {/* Announcement Ticker */}
                                <div className="w-full overflow-hidden bg-red-50 border border-red-200 rounded-md shadow-sm py-2">
                                    <div
                                        className="whitespace-nowrap inline-block text-sm sm:text-base text-black font-medium px-5"
                                        style={{ animation: "scroll-left 40s linear infinite" }}
                                    >
                                        • Two books to BCA and BBA students will be issued for 7 days. &nbsp;&nbsp;
                                        • Delay fine: First 7 days ₹50/day/volume, then ₹100/day/volume. &nbsp;&nbsp;
                                        • Damage/replacement: Reader must replace or pay 5× current price. &nbsp;&nbsp;
                                        • Any book can be recalled anytime. &nbsp;&nbsp;
                                        • Overdue: No more books issued until return. &nbsp;&nbsp;
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold">Issued Books.</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="px-0 sm:px-[2rem] md:px-0 lg:px-[2rem]">

                            <div className="my-4">
                                <div className="w-full grid grid-cols-1 xxsm:grid-cols-2 justify-items-center content-center gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
                                    {curUser.book ? curUser.book.map((book) => (
                                        <ShowBook key={book.s_no} book_item={book} />
                                    )) : <p>No books issued</p>}
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
