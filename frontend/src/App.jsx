import "./App.css";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthHydration from './services/authServices';

import { GlobalStyle } from "./GlobalStyle";
import Register from "./components/userPages/Register";
import Login from "./components/userPages/Login";
import Category from "./components/userPages/Category";
import Navbar from "./components/home/Navbar";
import './global.css'
// Route Guards
import ProtectedRoutes from "./services/ProtectedRoutes";
import PublicRoutes from "./services/PublicRoutes";
import RegisterAdmin from "./components/adminPages/Register";
import AdminDashboard from "./components/adminPages/AdminDashboard";
import LoginAdmin from "./components/adminPages/Login";
import AdminNavbar from './components/adminPages/AdminNavbar';
import Operations from "./components/adminPages/Operations";
import AdminAddBook from "./components/adminPages/AdminAddBook";

import Books from './components/home/Books'
import BookItems from "./components/home/BookItems";
import Cart from './components/home/Cart';
import CheckOut from "./components/home/CheckOut";

const NavbarLayout = () => (
  <div className="main-container">
    <div className="nav-g-container">
     <Navbar/>
    </div>
    <div>
     <Outlet/>
    </div>
  </div>
);

const AdminLayOut = () =>(
  <div className="main-container">
    <div className="nav-g-container">
      <AdminNavbar />
    </div>
    <div>
      <Outlet/>
    </div>
  </div>
)


function App() {
 
  const theme = useSelector((state) => state.theme.theme);
  const bgTheme = theme === 'dark' ? '#0F1C3F' : '#ffffff'; // Adjusted for your navy dark theme



  const {isLoading} = useAuthHydration();
  if(isLoading){
    return <div className="loading-screen">Check Authentication...</div>
  }
  return (
    <Router>
      <GlobalStyle bgTheme={bgTheme} />
      <Routes>
        
        {/* GROUP A: Pages WITH Navbar */}
        <Route element={<NavbarLayout />}>          
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/books" element={<Books/>} />
            <Route path="/:title" element={<BookItems/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>
        </Route>

        {/* GROUP B: Pages WITHOUT Navbar */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
        </Route>

        <Route element={<AdminLayOut/>}>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
            <Route path="/admin/operations" element={<Operations/>}></Route>
            <Route path="/admin/add-book" element={<AdminAddBook/>}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;