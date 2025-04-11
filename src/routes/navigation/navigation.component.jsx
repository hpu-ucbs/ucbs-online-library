import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as Bell } from "../../assets/Bell.svg";
import { ReactComponent as Ham } from "../../assets/hamBurger.svg";

const Navigation = () => {
    return(
        <>
            <header>
                <nav className="flex justify-between items-center px-8 py-8"    >
                    <div className="align-middle">
                     <Ham />
                    </div>
                    <div className="align-middle">
                        <Link to={'/notifications'}><Bell /></Link>
                    </div>
                </nav>
            </header>
            <Outlet/>
        </>
    )
}

export default Navigation;