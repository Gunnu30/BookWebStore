import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reduxSlices/themeSlice";
import "./home.css";
import useLogoutService  from '../../services/logoutEffectService';
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [isLoggingOut,setLoadingLogout] = useState(false);
  const dispatch = useDispatch();
  
  // Note: If you are using HttpOnly cookies, 
  // you should ideally check 'user' from Redux instead of Cookies.get
  const performLogout = useLogoutService();

  const handleLogOut = async ()=>{
    setLoadingLogout(true);
    try{
      console.log("User's Navbar logout");
      await performLogout();
      setLoadingLogout(false);
      
    }catch{
      setLoadingLogout(false)
    }
  } 
  const handleTheme = () =>{
    setMenuOpen(false)
     dispatch(toggleTheme());

  }
  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>BookWebStore</Link>
        </div>

        <div className="nav-content">
          <button className="theme-toggle-desktop" onClick={handleTheme}>
            {theme === "light" ? "🌙" : "🌞"}
          </button>

          <button className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>

          {/* Corrected Class string with proper spacing */}
          <ul className={`navbar-links ${theme} ${menuOpen ? "active" : ""}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link></li>
            <li>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart: <i className="fa-brands fa-opencart ml-1"></i>
              </Link>
            </li>
            <li>
              <Link to="/category" onClick={() =>setMenuOpen(false)} >
               Books By Category
              </Link>
            </li>
            <li className="mobile-theme-item">
               <button onClick={handleTheme}>
                 {theme === "light" ? "Switch to Dark" : "Switch to Light"}
               </button>
            </li>
            <li>
              <button 
                onClick={handleLogOut}
                className={`logout-btn ${theme}`} // Now it uses your CSS class!
              >
                {isLoggingOut ? (
                  <i className="fa-solid fa-spinner animate-spin bg-transparent"></i>
                ) : (
                  <i className="fa-solid fa-right-from-bracket bg-transparent"></i>
                )}
                <span className='bg-transparent'>{isLoggingOut ? "Processing..." : "LOGOUT"}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;