import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Track Every Expense.
          Understand Every Decision.
        </h1>

        <p>
          A premium expense tracking
          platform designed for clarity,
          control and financial insight.
        </p>

        <Link to="/dashboard">
          <button className="hero-button">
            Launch Dashboard
          </button>
        </Link>
      </div>
    </section>
  );
}