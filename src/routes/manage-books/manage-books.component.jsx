import BooksList from "../../components/Books/books-list/books-list.component";
import UpdateBookComponent from "../../components/Books/book-update/update-book.component";
const ManageBooks = () => {

    return(
        <>
            <div className="w-full">
                <div className="grid grid-cols-2 gap-0 w-full">
                    <div className="">
                      <UpdateBookComponent/>  
                    </div>                   
                    <BooksList/>
                </div>
            </div>
        </>
    )
}

export default ManageBooks;