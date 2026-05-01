import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reduxSlices/themeSlice";
import "../home/home.css"; 
import useLogoutService from '../../services/logoutEffectService';

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [isLoggingOut,setIsLoadingLogOut] = useState(false);
  const dispatch = useDispatch();

  // Define isDark so the style logic below works
  const isDark = theme === "dark";
  const performLogOut = useLogoutService();
  const handleLogOut = async ()=>{
    setIsLoadingLogOut(true);
    try{
      console.log("I am from navbar admin logout");
      await performLogOut();
      setIsLoadingLogOut(false)
    }catch(err){
      console.log("Error Occured:",err);
      setIsLoadingLogOut(false)
    }
  }

  return (
    <nav className={`navbar w-full ${theme}`}>
      <div className="navbar-container">
        {/* Admin Branding */}
        <div className="navbar-logo">
          <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center">
            {/* Big Admin Icon */}
            <div className={`hidden md:flex items-center justify-center h-14 rounded-xl shadow-md transition-all
              ${isDark ? 'bg-[#1f2937] border border-slate-700' : 'bg-blue-600 border border-blue-500 text-white'}`}>
              <i className="fa-solid fa-chart-line text-2xl"></i>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black tracking-tighter !m-0 !p-0 leading-none">
                BookWeb<span className={isDark ? "text-white" : "text-blue-600"}>Store</span>
              </h1>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        <div className="nav-content">
          {/* Desktop Toggle */}
          <button className="theme-toggle-desktop" onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? "🌙" : "🌞"}
          </button>

          {/* Mobile Menu Icon */}
          <button className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>

          <ul className={`navbar-links ${theme} ${menuOpen ? "active" : ""}`}>
            <li><Link to="/admin/operations" onClick={() => setMenuOpen(false)}>Operations</Link></li>
            <li><Link to="/admin/books" onClick={() => setMenuOpen(false)}>Books</Link></li>
            
            {/* Theme Toggle for Mobile */}
            <li className="mobile-theme-item">
               <button onClick={() => { dispatch(toggleTheme()); setMenuOpen(false); }}>
                 {theme === "light" ? "Switch to Dark" : "Switch to Light"}
               </button>
            </li>

            {/* Logout Button */}
            <li>
              <button 
                className="logout-btn bg-[#ee2424] bg-[#d10707]"
                onClick={handleLogOut}
                style={{
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 20px',
                    fontSize: '0.8rem',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginLeft: '10px',
                    alignSelf: 'center',
                }}
              >
               {isLoggingOut ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  <i className= {`bg-transparent fa-solid  fa-right-from-bracket`}></i>
                )}
                {isLoggingOut ? "Processing..." : "LOGOUT"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;