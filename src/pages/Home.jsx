import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <>
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

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "30px",
              justifyContent: "center",
            }}
          >
            <Link to="/expenses">
              <button className="hero-button">Add Expenses</button>
            </Link>

            <Link to="/dashboard">
              <button className="hero-button">View Dashboard</button>
            </Link>

            <Link to="/reports">
              <button className="hero-button">View Reports</button>
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: "80px",
        }}
      >
        <h2>How It Works</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <div className="feature-card">
            <h3>1. Add Expenses</h3>
            <p>
              Record every purchase, bill,
              subscription, or payment.
            </p>
          </div>

          <div className="feature-card">
            <h3>2. Track Spending</h3>
            <p>
              Organize expenses by category
              and date.
            </p>
          </div>

          <div className="feature-card">
            <h3>3. Analyze Results</h3>
            <p>
              View charts and reports to
              understand spending habits.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
