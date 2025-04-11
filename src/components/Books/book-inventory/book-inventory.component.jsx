const ShowBook = ({book_item}) => {
    const {title, author, image_url, stock, course, s_no} = book_item;

    return(
        <>
           
                <div className="w-[14rem] h-[23.5rem] flex flex-col justify-center gap-y-2 items-center border border-gray-500 rounded-xl p-5">
                    <div className="font-semibold">
                        <div>serial no:&ensp;<span>{s_no}</span></div>
                    </div> 
                    <div className="w-full">
                        <img className="rounded-md cursor-pointer h-52 w-full" src={image_url} alt={title} />
                    </div>
                    <div className="flex flex-col self-start items-start gap-y-2">
                        <div className="font-bold">
                            {title.slice(0, 15) + (title.length > 15 ? '...' : '')}
                        </div>
                        <div>
                            <div>Author: <span className="font-semibold underline">{author.slice(0, 10) + (author.length > 10 ? "..." : "")}</span></div>
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

export default ShowBook;