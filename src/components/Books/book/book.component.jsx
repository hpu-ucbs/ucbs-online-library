import { useContext } from "react";
import { BooksContext } from "../../../context/books.context";
const Book = ({book_item}) => {
    const {setclickedBook} = useContext(BooksContext);
    const {title, author, image_url, stock, course} = book_item;
    const handleClick = () => {
        setclickedBook(book_item);
    }

    return(
        <>
            <div className="grid grid-cols-2 border border-gray-500 rounded-xl p-5">
                <img className="rounded-md cursor-pointer w-[200px]" onClick={handleClick} src={image_url} alt={title} />
                <div className="flex flex-col self-center items-start gap-y-2">
                    <div className="font-bold">
                        {title}
                    </div>
                    <div>
                        <div>Author: <span className="font-semibold underline">{author}</span></div>
                        <div>Course: <span className="font-semibold underline">{course}</span></div>
                    </div>                       
                    <div className="flex justify-between">
                        <div>Stock Available: <span className="font-semibold">{stock}</span></div>
                    </div>
                </div>                            
            </div>     
        </>
    )
}

export default Book;