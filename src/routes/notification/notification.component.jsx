import { Link, Outlet, useLocation } from "react-router-dom";
const Notification = () => {
    const location = useLocation();
    const isActiveLink = (path) => location.pathname === path;
    return(
        <>
            <h1 className="text-2xl font-bold mb-4">Histories</h1>
            <div className="flex gap-2 justify-start align-center mb-4">
                <Link className={`bg-gray-200 rounded-sm py-1 px-4 ${isActiveLink('/admin-dashboard/history') ? 'bg-gray-400' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`} to={'/admin-dashboard/history'}>Books History</Link>
                <Link className={`bg-gray-200 rounded-sm py-1 px-4 ${isActiveLink('/admin-dashboard/history/fines') ? 'bg-gray-400' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`} to={'/admin-dashboard/history/fines'}>Fine History</Link>
                <Link className={`bg-gray-200 rounded-sm py-1 px-4 ${isActiveLink('/admin-dashboard/history/users') ? 'bg-gray-400' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group'}`} to={'/admin-dashboard/history/users'}>User Books History</Link>
            </div>
            <Outlet/>
        </>
    )
}

export default Notification;