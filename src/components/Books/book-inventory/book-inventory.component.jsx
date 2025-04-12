const ShowBook = ({book_item}) => {
    const {title, author, image_url, stock, course, s_no} = book_item;

    return(
        <>
           
                <div className="w-[10rem] h-[14.5rem] sm:w-[14rem] sm:h-[23.5rem] text-[12px] sm:text-base flex flex-col justify-center gap-y-1 sm:gap-y-2 items-center border border-gray-500 rounded-xl p-0 sm:p-5">
                    <div className="font-semibold">
                        <div>serial no:&ensp;<span>{s_no}</span></div>
                    </div> 
                    <div className="sm:w-full">
                        <img className="rounded-md cursor-pointer w-[6rem] h-[7.5rem] sm:h-52 sm:w-full" src={image_url} alt={title} />
                    </div>
                    <div className="sm:flex flex-col sm:self-start sm:items-start gap-y-0 sm:gap-y-2">
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