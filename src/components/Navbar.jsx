import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

  const currency =
    localStorage.getItem("currency") || "₦";

  const totalSpent = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

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
          to="/home"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>

        <Link
          to="/expenses"
          onClick={() => setMenuOpen(false)}
        >
          Expenses
        </Link>

        <Link
          to="/reports"
          onClick={() => setMenuOpen(false)}
        >
          Reports
        </Link>

        <Link
          to="/settings"
          onClick={() => setMenuOpen(false)}
        >
          Settings
        </Link>

        <Link
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>

        <Link
          to="/profile"
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "#333",
          }}
        />

        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "#EEDFCC",
            color: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {initials}
        </div>

        <div>
          <small
            style={{
              display: "block",
              opacity: 0.7,
            }}
          >
            Total
          </small>

          <strong>
            {currency}
            {totalSpent}
          </strong>
        </div>
      </Link>
      </div>
    </nav>
  );
}