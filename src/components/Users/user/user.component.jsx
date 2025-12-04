import { useContext } from "react";
import {UsersContext} from "../../../context/users.context";
const User = ({user_item}) => {
    const {setclickedUser} = useContext(UsersContext);
    const { name, roll_no, course, year, user_id, fine, book} = user_item;
    const book_count = book ? book.length : 0;
    const handleClick = () => {
        setclickedUser(user_item);
    }

    return(
        <>
        <div className="mb-4 flex flex-col justify-around border border-gray-500 rounded-xl p-4">
            <div className="grid grid-cols-2 place-items-center place-content-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16"><img onClick={handleClick} src="https://img.icons8.com/?size=120&id=85147&format=png&color=000000" alt="User Avatar"/></div>
                    <div className="justify-end ">
                        <div className="grid grid-cols text-base">
                            <div className="justify-self-end">Issued Books: <span className="font-semibold"></span>{book_count}</div>
                            <div className="justify-self-end">Fine: <span className="font-semibold">&#x20b9;<span>{fine}</span></span> </div>
                        </div>
                    </div>
                </div>
                <div className="justify-items-start">
                    <div className="text-base">
                        <div>User ID: <span className="font-semibold underline">{user_id}</span></div>
                        <div>Name: <span className="font-semibold">{name}</span></div>
                        <div>Roll No: <span className="font-semibold">{roll_no}</span></div>
                    </div>
                    <div className="text-base flex flex-col">
                        <div className="justify-self-end">Course: <span className="font-semibold">{course}</span></div>
                        <div>Year: <span className="font-semibold">{year}</span></div>   
                    </div>
                </div>            
            </div>
        </div>
        </>
    )
}

export default User;