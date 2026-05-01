import { useSelector } from "react-redux";
import "./home.css";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <footer className={`footer text-white ${theme}`}>
      <p>&copy; {new Date().getFullYear()} BookWebStore. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy" className="hover:text-[#2f6ec0]">Privacy Policy</a>
        <a href="/terms" className="hover:text-[#2f6ec0]">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
