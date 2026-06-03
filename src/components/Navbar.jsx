import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">
        MIDNIGHT LEDGER
      </div>

      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        ☰
      </button>

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >
        <Link 
         to="/"
         onClick={() => setIsOpen(false)}
        >
          Home
        </Link>

        <Link 
          to="/dashboard"
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </Link>

        <Link
         to="/expenses"
         onClick={() => setIsOpen(false)}
        >
          Expenses
        </Link>

        <Link 
          to="/reports"
          onClick={() => setIsOpen(false)}
        >
          Reports
        </Link>

        <Link
         to="/settings"
         onClick={() => setIsOpen(false)}
        >
          Settings
        </Link>

        <Link 
         to="/about"
         onClick={() => setIsOpen(false)}
        >
          About
        </Link>

        <Link 
         to="/contact"
         onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>

        <Link 
         to="/login"
         onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid #222",
    background: "#0b0b0c",
    position: "sticky",
    top: 0,
  },
  logo: {
    letterSpacing: "2px",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
};