import "./output.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import Home from './routes/home/home.component';
import SignUp from "./routes/sign-up/signup.component";
import LogIn from './routes/log-in/login.component';
import ManageBooks from "./routes/manage-books/manage-books.component";
import Notification from "./routes/notification/notification.component";
import UserBooksList from "./components/Books/user-books-list/user-books-list.component";
import ManageUsers from "./routes/manage-users/manage-users.component";
import AdminProtectedRoute from "./routes/protected-route/adminProtected-route.component";
import UserProtectedRoute from "./routes/protected-route/userProtected-route.component";
import AdminNav from "./routes/admin-nav/admin-nav.component";
import UserNav from "./routes/user-nav/user-nav.component";
import UserIssuedBooks from "./components/user-issued-books/user-issued-books.component";
import UserNotifications from "./components/user-notifications/user-notifications.component";
import IssueFine from "./routes/issue-fine/issue-fine.component";
import AdminLogIn from "./components/Admin-login/admin-login.component";
import UserLogIn from "./components/user-login/user-login.component";
import PayFine from "./components/History/pay-fine/pay-fine.component";
import BooksHistory from "./components/History/history-books/bookshistory.component";
import FineHistory from "./components/History/history-fines/finehistory.component";
import UserBooksHistory from "./components/History/history-user-books/userbookshistory.component";
import AuthenticateUser from "./routes/authenticate-user/authenticate-user.component";
import TermsAndConditions from "./routes/terms-and-conditions/tas.component";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/tas" element={<TermsAndConditions/>}/>
        <Route path="/login" element={<LogIn/>}> 
          <Route index element={<UserLogIn/>} />
          <Route path="admin-login" element={<AdminLogIn/>} />      
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminNav/></AdminProtectedRoute>}>
          <Route index element={<AuthenticateUser/>}/>
          <Route path="history" element={<Notification/>}>
            <Route index element={<BooksHistory/>}/>
            <Route path="fines" element={<FineHistory/>}/>
            <Route path="users" element={<UserBooksHistory/>}/> 
          </Route>
          <Route path="manage-books" element={<ManageBooks/>}/>
          <Route path="manage-users" element={<ManageUsers/>}/>
          <Route path="issue-fine" element={<IssueFine/>}/>
          <Route path="book-inventory" element={<UserBooksList/>}/>
        </Route>

        {/* User Protected Routes */}
        <Route path="/user-dashboard" element={<UserProtectedRoute><UserNav/></UserProtectedRoute>}>
          <Route index element={<UserIssuedBooks/>}/>
          <Route path="book-inventory" element={<UserBooksList/>} />
          <Route path="notifications" element={<UserNotifications/>} />
          <Route path="pay-fine" element={<PayFine/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;